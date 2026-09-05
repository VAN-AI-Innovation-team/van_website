/**
 * VAN 공식 홈페이지 인터랙션 레이어.
 *
 * 원칙
 * - 콘텐츠는 JS 없이도 항상 보인다. (`html.js-ready`가 붙었을 때만 리빌 대상이 숨는다)
 * - `prefers-reduced-motion: reduce`면 모든 모션을 끄고 최종 상태로 즉시 확정한다.
 * - 스크롤/포인터 핸들러는 rAF로 묶어 프레임당 1회만 레이아웃을 만진다.
 * - 페이지 전환(View Transitions) 후에도 재초기화된다. 이전 리스너는
 *   AbortController로 한 번에 정리해 중복 등록을 막는다.
 */

const root = document.documentElement
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

/** 페이지 단위 리스너 정리용. 전환 시 abort 하고 새로 만든다. */
let pageController = null

const raf = (fn) => {
  let queued = false
  return (...args) => {
    if (queued) return
    queued = true
    window.requestAnimationFrame(() => {
      queued = false
      fn(...args)
    })
  }
}

/* ------------------------------------------------------------------ *
 * 1. 스크롤 리빌
 * ------------------------------------------------------------------ */
function setupReveal(signal) {
  const targets = [...document.querySelectorAll('[data-reveal]')]
  if (targets.length === 0) return

  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    [...group.children].forEach((child, index) => {
      if (child instanceof HTMLElement) child.style.setProperty('--reveal-index', String(Math.min(index, 11)))
    })
  })

  const revealAll = () => targets.forEach((target) => target.classList.add('is-revealed'))

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealAll()
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-revealed')
      observer.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 })

  targets.forEach((target) => observer.observe(target))
  signal.addEventListener('abort', () => observer.disconnect())
  reduceMotion.addEventListener('change', (event) => { if (event.matches) revealAll() }, { signal })
}

/* ------------------------------------------------------------------ *
 * 2. 제목 단어 단위 등장
 *    한국어는 `word-break: keep-all`로 어절 단위 줄바꿈을 쓰므로
 *    공백 기준 분할이 그대로 의미 단위가 된다.
 * ------------------------------------------------------------------ */
function setupHeadingSplit() {
  document.querySelectorAll('[data-split]').forEach((node) => {
    if (!(node instanceof HTMLElement) || node.dataset.splitDone === 'true') return
    const text = node.textContent || ''
    if (!text.trim()) return

    node.dataset.splitDone = 'true'
    node.setAttribute('aria-label', text)

    const frag = document.createDocumentFragment()
    text.split(/(\s+)/).forEach((chunk) => {
      if (/^\s+$/.test(chunk)) {
        frag.append(document.createTextNode(' '))
        return
      }
      if (!chunk) return
      const outer = document.createElement('span')
      outer.className = 'split-word'
      outer.setAttribute('aria-hidden', 'true')
      const inner = document.createElement('span')
      inner.textContent = chunk
      outer.append(inner)
      frag.append(outer)
    })

    node.replaceChildren(frag)
    node.querySelectorAll('.split-word').forEach((word, index) => {
      if (word instanceof HTMLElement) word.style.setProperty('--word-index', String(Math.min(index, 24)))
    })
  })
}

/* ------------------------------------------------------------------ *
 * 3. 스크롤 진행 표시 · 헤더 축소 · 맨 위로
 *    진행 바는 CSS scroll-driven animation을 지원하면 그쪽에 맡기고
 *    여기서는 값을 갱신하지 않는다. (JS 스크롤 작업량 감소)
 * ------------------------------------------------------------------ */
const supportsScrollTimeline = CSS.supports?.('animation-timeline: scroll()') ?? false

function setupScrollChrome(signal) {
  const header = document.querySelector('.site-header')
  const progress = document.querySelector('[data-scroll-progress]')
  const toTop = document.querySelector('[data-to-top]')
  if (!header && !progress && !toTop) return

  const onScroll = raf(() => {
    const scrolled = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    const ratio = max > 0 ? Math.min(scrolled / max, 1) : 0

    if (progress instanceof HTMLElement) {
      if (!supportsScrollTimeline) progress.style.setProperty('--scroll-progress', ratio.toFixed(4))
      progress.setAttribute('aria-valuenow', String(Math.round(ratio * 100)))
    }
    if (header) header.classList.toggle('is-condensed', scrolled > 40)
    if (toTop) toTop.classList.toggle('is-visible', scrolled > window.innerHeight * 0.9)
  })

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true, signal })
  window.addEventListener('resize', onScroll, { signal })

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' })
    }, { signal })
  }
}

/* ------------------------------------------------------------------ *
 * 4. 스크롤스파이 — 상단 내비게이션 + 우측 레일
 * ------------------------------------------------------------------ */
function setupScrollSpy(signal) {
  const rail = document.querySelector('[data-section-rail]')
  const dots = rail ? [...rail.querySelectorAll('[data-rail-target]')] : []
  const navLinks = [...document.querySelectorAll('[data-nav-section]')]
  if (dots.length === 0 && navLinks.length === 0) return

  const ids = [...new Set([
    ...dots.map((dot) => dot.dataset.railTarget),
    ...navLinks.map((link) => link.dataset.navSection),
  ])].filter(Boolean)

  const sections = ids.map((id) => document.getElementById(id)).filter((s) => s instanceof HTMLElement)
  if (sections.length === 0) return
  if (rail) rail.hidden = false

  const darkSections = ['home-section--ink', 'conference-spotlight', 'philosophy-section', 'contact-section']
  const isDark = (section) => darkSections.some((name) => section.classList.contains(name))

  let current = ''
  const mark = (section) => {
    const id = section.id
    if (id === current) return
    current = id
    dots.forEach((dot) => dot.classList.toggle('is-active', dot.dataset.railTarget === id))
    navLinks.forEach((link) => {
      if (link.dataset.navSection === id) link.setAttribute('data-active', 'true')
      else link.removeAttribute('data-active')
    })
    if (rail) rail.classList.toggle('on-dark', isDark(section))
    document.dispatchEvent(new CustomEvent('van:sectionchange'))
  }

  const onScroll = raf(() => {
    const line = window.scrollY + window.innerHeight * 0.34
    let active = sections[0]
    sections.forEach((section) => { if (section.offsetTop <= line) active = section })
    mark(active)
  })

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true, signal })
  window.addEventListener('resize', onScroll, { signal })
}

/* ------------------------------------------------------------------ *
 * 5. 내비게이션 슬라이딩 인디케이터
 * ------------------------------------------------------------------ */
function setupNavIndicator(signal) {
  const nav = document.querySelector('.desktop-nav')
  if (!(nav instanceof HTMLElement) || reduceMotion.matches) return

  // boot()은 초기 로드와 View Transitions 이동에서 모두 호출되므로
  // 요소를 새로 만들기 전에 기존 것을 재사용한다. 매번 append 하면
  // 이전 인디케이터가 옛 위치에 얼어붙은 채 남아 밑줄이 두 개로 보인다.
  const indicator = nav.querySelector('.nav-indicator') ?? document.createElement('span')
  indicator.className = 'nav-indicator'
  indicator.setAttribute('aria-hidden', 'true')
  if (!indicator.isConnected) nav.append(indicator)

  const moveTo = (link) => {
    if (!(link instanceof HTMLElement)) {
      indicator.classList.remove('is-visible')
      return
    }
    const navBox = nav.getBoundingClientRect()
    const box = link.getBoundingClientRect()
    indicator.style.setProperty('--indicator-x', `${box.left - navBox.left}px`)
    indicator.style.setProperty('--indicator-w', `${box.width}px`)
    indicator.classList.add('is-visible')
  }

  const activeLink = () => nav.querySelector('a[data-active], a[aria-current="page"]')
  const settle = raf(() => moveTo(activeLink()))

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('pointerenter', () => moveTo(link), { signal })
  })
  nav.addEventListener('pointerleave', settle, { signal })
  document.addEventListener('van:sectionchange', settle, { signal })
  window.addEventListener('resize', settle, { signal })
  settle()
}

/* ------------------------------------------------------------------ *
 * 6. 히어로 패럴랙스
 * ------------------------------------------------------------------ */
function setupHeroParallax(signal) {
  const hero = document.querySelector('[data-parallax]')
  if (!(hero instanceof HTMLElement) || reduceMotion.matches) return

  const onScroll = raf(() => {
    const offset = Math.min(window.scrollY, hero.offsetHeight)
    hero.style.setProperty('--parallax-shift', `${(offset * 0.16).toFixed(1)}px`)
    hero.style.setProperty('--parallax-fade', String(Math.max(1 - offset / (hero.offsetHeight * 0.9), 0).toFixed(3)))
  })

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true, signal })
}

/* ------------------------------------------------------------------ *
 * 7. 포인터 스포트라이트 (카드 · 섹션 공용)
 * ------------------------------------------------------------------ */
function setupSpotlight(signal) {
  const targets = [...document.querySelectorAll('[data-spotlight]')]
  if (targets.length === 0 || reduceMotion.matches || !finePointer.matches) return

  targets.forEach((target) => {
    if (!(target instanceof HTMLElement)) return
    const onMove = raf((event) => {
      const rect = target.getBoundingClientRect()
      target.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width * 100).toFixed(2)}%`)
      target.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height * 100).toFixed(2)}%`)
    })
    target.addEventListener('pointermove', onMove, { signal })
    target.addEventListener('pointerenter', () => target.classList.add('is-lit'), { signal })
    target.addEventListener('pointerleave', () => target.classList.remove('is-lit'), { signal })
  })
}

/* ------------------------------------------------------------------ *
 * 8. 3D 틸트
 * ------------------------------------------------------------------ */
function setupTilt(signal) {
  const targets = [...document.querySelectorAll('[data-tilt]')]
  if (targets.length === 0 || reduceMotion.matches || !finePointer.matches) return

  targets.forEach((target) => {
    if (!(target instanceof HTMLElement)) return
    const limit = Number(target.dataset.tilt) || 4
    const onMove = raf((event) => {
      const rect = target.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      target.style.setProperty('--tilt-x', `${(-y * limit).toFixed(2)}deg`)
      target.style.setProperty('--tilt-y', `${(x * limit).toFixed(2)}deg`)
    })
    target.addEventListener('pointermove', onMove, { signal })
    target.addEventListener('pointerleave', () => {
      target.style.setProperty('--tilt-x', '0deg')
      target.style.setProperty('--tilt-y', '0deg')
    }, { signal })
  })
}

/* ------------------------------------------------------------------ *
 * 9. 마그네틱 버튼 — 커서를 향해 살짝 끌려간다
 * ------------------------------------------------------------------ */
function setupMagnetic(signal) {
  const targets = [...document.querySelectorAll('[data-magnetic]')]
  if (targets.length === 0 || reduceMotion.matches || !finePointer.matches) return

  targets.forEach((target) => {
    if (!(target instanceof HTMLElement)) return
    const strength = Number(target.dataset.magnetic) || 10
    const onMove = raf((event) => {
      const rect = target.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      target.style.setProperty('--magnet-x', `${(x * strength).toFixed(2)}px`)
      target.style.setProperty('--magnet-y', `${(y * strength).toFixed(2)}px`)
    })
    target.addEventListener('pointermove', onMove, { signal })
    target.addEventListener('pointerleave', () => {
      target.style.setProperty('--magnet-x', '0px')
      target.style.setProperty('--magnet-y', '0px')
    }, { signal })
  })
}

/* ------------------------------------------------------------------ *
 * 10. 모바일 메뉴
 * ------------------------------------------------------------------ */
function setupMobileMenu(signal) {
  const menu = document.querySelector('.mobile-menu')
  if (!(menu instanceof HTMLDetailsElement)) return

  menu.addEventListener('toggle', () => {
    document.body.classList.toggle('has-menu-open', menu.open)
  }, { signal })
  menu.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => { menu.open = false }, { signal })
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) menu.open = false
  }, { signal })
}

/* ------------------------------------------------------------------ *
 * 11. 계좌 복사 버튼
 * ------------------------------------------------------------------ */
function setupCopyButtons(signal) {
  document.querySelectorAll('[data-copy-account]').forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return
    let timer = 0
    button.addEventListener('click', async () => {
      const account = button.dataset.copyAccount || ''
      const label = button.dataset.copyLabel || 'Copy'
      const done = button.dataset.copiedLabel || 'Copied'
      try {
        await navigator.clipboard.writeText(account)
        button.textContent = done
      } catch {
        button.textContent = account
      }
      button.classList.add('is-copied')
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        button.classList.remove('is-copied')
        button.textContent = label
      }, 1800)
    }, { signal })
  })
}

/* ------------------------------------------------------------------ *
 * 12. 아카이브 검색·필터
 * ------------------------------------------------------------------ */
function setupArchiveBrowser(signal) {
  const browser = document.querySelector('[data-archive-browser]')
  if (!(browser instanceof HTMLElement)) return

  const input = browser.querySelector('[data-archive-search-input]')
  const cards = [...browser.querySelectorAll('[data-archive-card]')]
  const buttons = [...browser.querySelectorAll('[data-archive-filter]')]
  const count = browser.querySelector('[data-archive-count]')
  const empty = browser.querySelector('[data-archive-empty]')
  let category = 'ALL'

  const apply = () => {
    const query = input instanceof HTMLInputElement ? input.value.trim().toLocaleLowerCase() : ''
    let visible = 0

    cards.forEach((card) => {
      if (!(card instanceof HTMLElement)) return
      const matchesCategory = category === 'ALL' || card.dataset.archiveCategory === category
      const matchesQuery = !query || (card.dataset.archiveHaystack || '').includes(query)
      const show = matchesCategory && matchesQuery
      card.hidden = !show
      if (show) {
        card.style.setProperty('--reveal-index', String(Math.min(visible, 11)))
        card.classList.remove('is-revealed')
        window.requestAnimationFrame(() => card.classList.add('is-revealed'))
        visible += 1
      }
    })

    buttons.forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.setAttribute('aria-pressed', String(button.dataset.archiveFilter === category))
      }
    })
    if (count instanceof HTMLElement) count.textContent = String(visible)
    if (empty instanceof HTMLElement) empty.hidden = visible !== 0
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!(button instanceof HTMLButtonElement)) return
      category = button.dataset.archiveFilter || 'ALL'
      apply()
    }, { signal })
  })
  if (input instanceof HTMLInputElement) input.addEventListener('input', apply, { signal })
}

/* ------------------------------------------------------------------ */

function boot() {
  pageController?.abort()
  pageController = new AbortController()
  const { signal } = pageController

  root.classList.add('js-ready', 'js-booted')
  if (supportsScrollTimeline) root.classList.add('has-scroll-timeline')

  setupHeadingSplit()
  setupReveal(signal)
  setupScrollChrome(signal)
  setupScrollSpy(signal)
  setupNavIndicator(signal)
  setupHeroParallax(signal)
  setupSpotlight(signal)
  setupTilt(signal)
  setupMagnetic(signal)
  setupMobileMenu(signal)
  setupCopyButtons(signal)
  setupArchiveBrowser(signal)
}

/*
  ClientRouter가 있으면 초기 로드에서도 astro:page-load가 발생한다.
  DOMContentLoaded와 겹쳐 boot()이 두 번 돌아도 안전해야 하므로
  각 setup은 멱등이어야 하고, 이전 리스너는 AbortController로 정리한다.
*/
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()

// View Transitions로 페이지가 바뀌면 새 DOM에 다시 붙인다.
document.addEventListener('astro:page-load', boot)
