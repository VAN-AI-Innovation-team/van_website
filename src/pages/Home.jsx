import { Link } from 'react-router'
import heroImage from '../assets/hero.png'

const highlights = [
  { value: 'OPEN', label: '학교와 전공을 넘는 연결' },
  { value: 'TEAM', label: '함께 완성하는 프로젝트' },
  { value: 'GROW', label: '배움과 경험의 성장' },
]

function Home() {
  return (
    <main>
      <section className="hero page-section" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="eyebrow">VAN INTERCOLLEGIATE CLUB</p>
          <h1 id="hero-title">
            학교를 넘어 연결되고,
            <span>함께 만들며 성장합니다.</span>
          </h1>
          <p className="hero__description">
            VAN은 다양한 학교와 전공의 대학생이 모여 관심사를 나누고, 배우고, 직접
            프로젝트를 만드는 연합동아리입니다.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/about">
              동아리 소개 보기
            </Link>
            <Link className="button button--ghost" to="/activities">
              활동 알아보기
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
