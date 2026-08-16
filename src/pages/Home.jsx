import { Link } from 'react-router'
import heroImage from '../assets/hero.png'

const highlights = [
  { value: 'AI', label: '기술 기반 혁신' },
  { value: '24/7', label: '안정적인 서비스' },
  { value: 'NEXT', label: '미래를 향한 연결' },
]

function Home() {
  return (
    <main>
      <section className="hero page-section" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="eyebrow">VAN AI INNOVATION</p>
          <h1 id="hero-title">
            기술로 연결하고,
            <span>혁신으로 성장합니다.</span>
          </h1>
          <p className="hero__description">
            VAN은 AI 기술과 창의적인 실행력을 바탕으로 더 나은 비즈니스 경험을 만듭니다.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/company">
              회사 소개 보기
            </Link>
            <Link className="button button--ghost" to="/service">
              서비스 알아보기
            </Link>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <span className="hero__glow" />
          <img src={heroImage} alt="" />
        </div>
      </section>

      <section className="highlight-section" aria-label="VAN 핵심 가치">
        <div className="highlight-grid page-section">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
