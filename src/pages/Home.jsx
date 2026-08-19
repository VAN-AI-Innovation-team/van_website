import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import heroImage from '../assets/hero-intelligence-panel.webp'
import { archiveItems, principles, programs } from '../data/content.js'

function ArrowLink({ to, children, light = false }) {
  return (
    <Link className={`arrow-link${light ? ' arrow-link--light' : ''}`} to={to}>
      <span>{children}</span>
      <span className="arrow-link__icon" aria-hidden="true">↗</span>
    </Link>
  )
}

function Home() {
  const heroRef = useRef(null)
  const heroBackdropRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) return undefined

    let frameId = null

    const updateHeroImage = () => {
      frameId = null
      const hero = heroRef.current
      const backdrop = heroBackdropRef.current

      if (!hero || !backdrop) return

      const rect = hero.getBoundingClientRect()
      const progress = Math.min(Math.max(-rect.top / (rect.height * 0.72), 0), 1)
      backdrop.style.opacity = String(0.58 * (1 - progress))
      backdrop.style.transform = `translate3d(0, ${progress * 44}px, 0) scale(${1 + progress * 0.025})`
    }

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateHeroImage)
    }

    updateHeroImage()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title" ref={heroRef}>
        <div className="hero__backdrop" ref={heroBackdropRef} aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="hero__inner page-section">
          <div className="hero__content">
          <p className="eyebrow"><span>VAN</span> AI RESEARCH NETWORK</p>
          <h1 id="hero-title">
            AI로 변화를 읽고,
            <span>더 나은 연결을 설계합니다.</span>
          </h1>
          <p className="hero__description">
            VAN은 AI와 데이터를 기반으로 금융투자와 보건의료의 변화를 연구하고,
            근거 있는 지식을 사회와 연결하는 열린 네트워크입니다.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/departments">
              부서 소개 보기 <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button--ghost" to="/about">
              VAN 알아보기
            </Link>
          </div>
          <div className="hero__proof" aria-label="VAN의 원칙">
            <span>Evidence First</span>
            <span>Human Review</span>
            <span>Open Connection</span>
          </div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="VAN 주요 분야">
        <div className="page-section signal-strip__inner">
          <p>WE READ THE SIGNALS OF CHANGE</p>
          <div>
            <span>AI INNOVATION</span>
            <span>FINANCIAL RESEARCH</span>
            <span>HEALTHCARE MEDIA</span>
            <span>OPEN NETWORK</span>
          </div>
        </div>
      </section>

      <section className="home-intro section-space page-section" aria-labelledby="intro-title">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">WHAT WE DO</p>
            <h2 id="intro-title">기술보다 먼저,<br />변화의 맥락을 봅니다.</h2>
          </div>
          <div className="section-heading__copy">
            <p>
              빠르게 변하는 시대일수록 정확한 근거와 다양한 관점이 필요합니다.
              VAN은 데이터를 읽고, 질문을 만들고, 사람과 지식을 연결합니다.
            </p>
            <ArrowLink to="/about">VAN의 관점 알아보기</ArrowLink>
          </div>
        </div>

        <div className="principle-grid">
          {principles.map((principle) => (
            <article className="principle-card" key={principle.number}>
              <span className="principle-card__number">{principle.number}</span>
              <div>
                <p>{principle.title}</p>
                <h3>{principle.korean}</h3>
                <span>{principle.text}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="program-section section-space" aria-labelledby="program-title">
        <div className="page-section">
          <div className="section-heading section-heading--row">
            <div>
              <p className="eyebrow">OUR FOCUS</p>
              <h2 id="program-title">VAN을 구성하는 네 부서</h2>
            </div>
            <ArrowLink to="/departments">전체 부서 보기</ArrowLink>
          </div>

          <div className="program-preview-grid">
            {programs.map((program) => (
              <article className={`program-preview program-preview--${program.accent}`} key={program.id}>
                <div className="program-preview__top">
                  <span>{program.number}</span>
                  <span>{program.label}</span>
                </div>
                <div className="program-preview__graphic" aria-hidden="true">
                  <i /><i /><i />
                </div>
                <h3>{program.title}</h3>
                <p>{program.summary}</p>
                <Link to={`/departments#${program.id}`} aria-label={`${program.title} 자세히 보기`}>
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section" aria-labelledby="method-title">
        <div className="page-section method-section__inner">
          <div className="method-copy">
            <p className="eyebrow">RESPONSIBLE AI</p>
            <h2 id="method-title">AI의 속도에<br />사람의 책임을 더합니다.</h2>
            <p>
              VAN의 모든 AI 활용은 근거 확인과 사람의 검토를 전제로 합니다.
              AI는 더 넓게 탐색하고, 사람은 더 깊게 판단합니다.
            </p>
            <ArrowLink to="/about" light>운영 원칙 보기</ArrowLink>
          </div>

          <div className="method-flow" aria-label="VAN의 AI 활용 절차">
            {['자료 탐색', '출처 확인', 'AI 분석', '사람 검토', '지식 공유'].map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
                {index < 4 && <i aria-hidden="true">→</i>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="latest-section section-space page-section" aria-labelledby="latest-title">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">LATEST FROM VAN</p>
            <h2 id="latest-title">새로운 소식과 활동</h2>
          </div>
          <ArrowLink to="/archive">아카이브 전체 보기</ArrowLink>
        </div>

        <div className="latest-grid">
          {archiveItems.slice(0, 3).map((item) => (
            <article className={`latest-card latest-card--${item.theme}`} key={item.id}>
              <div className="latest-card__visual">
                <span>{item.eyebrow}</span>
                <i /><i /><i />
              </div>
              <div className="latest-card__content">
                <div><span>{item.category}</span><span>{item.meta}</span></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}

export default Home
