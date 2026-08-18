import TimelineItem from '../components/TimelineItem.jsx'
import './Company.css'

const history = [
  { year: '2022', text: 'VAN 설립', detail: '새로운 디지털 경험을 만들기 위한 첫걸음을 시작했습니다.' },
  { year: '2023', text: 'VAN 서비스 개발', detail: '사용자와 비즈니스를 연결하는 핵심 서비스를 구축했습니다.' },
  { year: '2024', text: '서비스 영역 확대', detail: '다양한 산업군으로 기술과 서비스의 범위를 넓혔습니다.' },
  { year: '2025', text: '신규 사업 진출', detail: 'AI 기반의 새로운 성장 동력을 발굴하고 도전을 이어갑니다.' },
]

function Company() {
  return (
    <main>
      <section className="company-hero page-section">
        <p className="eyebrow">COMPANY</p>
        <h1>
          사람과 기술 사이의
          <span>새로운 가능성을 만듭니다.</span>
        </h1>
        <p>
          VAN은 빠르게 변하는 환경 속에서 본질적인 문제를 발견하고,
          기술과 실행력으로 지속 가능한 답을 만들어가는 기업입니다.
        </p>
      </section>

      <section className="company-values page-section" aria-labelledby="values-title">
        <div>
          <p className="eyebrow">OUR DIRECTION</p>
          <h2 id="values-title">더 나은 연결을 위한 세 가지 기준</h2>
        </div>
        <div className="value-grid">
          <article>
            <span>01</span>
            <h3>기술</h3>
            <p>검증된 기술을 가장 필요한 곳에 적용합니다.</p>
          </article>
          <article>
            <span>02</span>
            <h3>사람</h3>
            <p>모든 결정의 중심에 사용자 경험을 둡니다.</p>
          </article>
          <article>
            <span>03</span>
            <h3>성장</h3>
            <p>파트너와 함께 오래 성장할 수 있는 방식을 고민합니다.</p>
          </article>
        </div>
      </section>

      <section className="timeline-section" aria-labelledby="history-title">
        <div className="page-section timeline-layout">
          <div className="timeline-heading">
            <p className="eyebrow">HISTORY</p>
            <h2 id="history-title">VAN이 걸어온 길</h2>
            <p>작은 시작부터 새로운 도전까지, VAN의 주요 순간을 소개합니다.</p>
          </div>

          <div className="timeline-list">
            {history.map((item) => (
              <TimelineItem
                key={item.year}
                year={item.year}
                text={item.text}
                detail={item.detail}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Company
