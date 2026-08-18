import { Link } from 'react-router'
import heroImage from '../assets/hero.png'

const highlights = [
  { value: 'AI', label: '함께 배우는 AI' },
  { value: 'TEAM', label: '직접 만드는 프로젝트' },
  { value: 'SHARE', label: '공유하며 성장하는 커뮤니티' },
]

function Home() {
  return (
    <main>
      <section className="hero page-section" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="eyebrow">VAN AI COMMUNITY</p>
          <h1 id="hero-title">
            AI를 함께 배우고,
            <span>프로젝트로 성장합니다.</span>
          </h1>
          <p className="hero__description">
            VAN은 다양한 학교와 전공의 대학생이 모여 AI를 공부하고, 아이디어를 팀
            프로젝트로 구현하며 함께 성장하는 연합동아리입니다.
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
