/**
 * VAN 공식 홈페이지 인터랙션 레이어.
 *
 * 원칙
 * - 콘텐츠는 JS 없이도 항상 보인다. (`html.js`가 붙었을 때만 리빌 대상이 숨는다)
 * - `prefers-reduced-motion: reduce`면 모든 모션을 끄고 최종 상태로 즉시 확정한다.
 * - 스크롤/포인터 핸들러는 rAF로 묶어 프레임당 1회만 레이아웃을 만진다.
 */

const root = document.documentElement
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

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
 * 1. 스크롤 리빌 — 섹션·카드가 뷰포트에 들어올 때 순차적으로 등장
 * ------------------------------------------------------------------ */
function setupReveal() {
  const targets = [...document.querySelectorAll('[data-reveal]')]
  if (targets.length === 0) return

  // 그룹 내 순번을 CSS 변수로 넘겨 stagger 지연을 만든다.
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
  reduceMotion.addEventListener('change', (event) => { if (event.matches) revealAll() })
}

/* ------------------------------------------------------------------ *
 * 2. 스크롤 진행 표시 + 헤더 축소 + 맨 위로 버튼
 * ------------------------------------------------------------------ */
function setupScrollChrome() {
  const header = document.querySelector('.site-header')
  const progress = document.querySelector('[data-scroll-progress]')
  const toTop = document.querySelector('[data-to-top]')
  if (!header && !progress && !toTop) return

  const onScroll = raf(() => {
    const scrolled = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    const ratio = max > 0 ? Math.min(scrolled / max, 1) : 0

    if (progress instanceof HTMLElement) {
      progress.style.setProperty('--scroll-progress', ratio.toFixed(4))
      progress.setAttribute('aria-valuenow', String(Math.round(ratio * 100)))
    }
    if (header) header.classList.toggle('is-condensed', scrolled > 40)
    if (toTop) toTop.classList.toggle('is-visible', scrolled > window.innerHeight * 0.9)
  })

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' })
    })
  }
}

/* ------------------------------------------------------------------ *
 * 3. 스크롤스파이 — 현재 섹션을 상단 내비게이션과 우측 레일에 표시
 * ------------------------------------------------------------------ */
function setupScrollSpy() {
  const rail = document.querySelector('[data-section-rail]')
  const dots = rail ? [...rail.querySelectorAll('[data-rail-target]')] : []
  const navLinks = [...document.querySelectorAll('[data-nav-section]')]
  if (dots.length === 0 && navLinks.length === 0) return

  const ids = [...new Set([
    ...dots.map((dot) => dot.dataset.railTarget),
    ...navLinks.map((link) => link.dataset.navSection),
  ])].filter(Boolean)

  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((section) => section instanceof HTMLElement)

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
  }

  const onScroll = raf(() => {
    const line = window.scrollY + window.innerHeight * 0.34
    let active = sections[0]
    sections.forEach((section) => { if (section.offsetTop <= line) active = section })
    mark(active)
  })

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
}

/* ------------------------------------------------------------------ *
 * 4. 히어로 패럴랙스 — 배경만 느리게 밀어 깊이를 만든다
 * ------------------------------------------------------------------ */
function setupHeroParallax() {
  const hero = document.querySelector('[data-parallax]')
  if (!(hero instanceof HTMLElement) || reduceMotion.matches) return

  const onScroll = raf(() => {
    const offset = Math.min(window.scrollY, hero.offsetHeight)
    hero.style.setProperty('--parallax-shift', `${(offset * 0.16).toFixed(1)}px`)
    hero.style.setProperty('--parallax-fade', String(Math.max(1 - offset / (hero.offsetHeight * 0.9), 0).toFixed(3)))
  })

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ------------------------------------------------------------------ *
 * 5. 포인터 스포트라이트 — 커서 위치를 따라가는 광원
 * ------------------------------------------------------------------ */
function setupSpotlight() {
  const targets = [...document.querySelectorAll('[data-spotlight]')]
  if (targets.length === 0 || reduceMotion.matches || !finePointer.matches) return

  targets.forEach((target) => {
    if (!(target instanceof HTMLElement)) return
    const onMove = raf((event) => {
      const rect = target.getBoundingClientRect()
      target.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width * 100).toFixed(2)}%`)
      target.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height * 100).toFixed(2)}%`)
    })
    target.addEventListener('pointermove', onMove)
    target.addEventListener('pointerenter', () => target.classList.add('is-lit'))
    target.addEventListener('pointerleave', () => target.classList.remove('is-lit'))
  })
}

/* ------------------------------------------------------------------ *
 * 6. 미세 틸트 — 카드가 커서를 향해 살짝 기울어진다
 * ------------------------------------------------------------------ */
function setupTilt() {
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
    target.addEventListener('pointermove', onMove)
    target.addEventListener('pointerleave', () => {
      target.style.setProperty('--tilt-x', '0deg')
      target.style.setProperty('--tilt-y', '0deg')
    })
  })
}

/* ------------------------------------------------------------------ *
 * 7. 모바일 메뉴 — 열려 있을 때 배경 스크롤 잠금 + 링크 클릭 시 닫기
 * ------------------------------------------------------------------ */
function setupMobileMenu() {
  const menu = document.querySelector('.mobile-menu')
  if (!(menu instanceof HTMLDetailsElement)) return

  menu.addEventListener('toggle', () => {
    document.body.classList.toggle('has-menu-open', menu.open)
  })
  menu.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => { menu.open = false })
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) menu.open = false
  })
}

/* ------------------------------------------------------------------ *
 * 8. 계좌 복사 버튼 — 성공 피드백 애니메이션
 * ------------------------------------------------------------------ */
function setupCopyButtons() {
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
    })
  })
}

/* ------------------------------------------------------------------ *
 * 9. 아카이브 검색·필터 — 결과 개수 갱신과 카드 재등장 애니메이션
 * ------------------------------------------------------------------ */
function setupArchiveBrowser() {
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
        // 다음 프레임에 클래스를 되돌려 등장 트랜지션을 다시 태운다.
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
    })
  })
  if (input instanceof HTMLInputElement) input.addEventListener('input', apply)
}

/* ------------------------------------------------------------------ */

function boot() {
  root.classList.add('js-ready')
  root.classList.add('js-booted')
  setupReveal()
  setupScrollChrome()
  setupScrollSpy()
  setupHeroParallax()
  setupSpotlight()
  setupTilt()
  setupMobileMenu()
  setupCopyButtons()
  setupArchiveBrowser()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()
