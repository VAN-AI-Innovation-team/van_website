import TimelineItem from '../components/TimelineItem.jsx'
import './Company.css'

const history = [
  {
    year: '2022',
    text: 'VAN 첫 모임',
    detail: 'AI에 관심 있는 서로 다른 학교와 전공의 멤버들이 처음 모였습니다.',
  },
  {
    year: '2023',
    text: '첫 AI 팀 프로젝트',
    detail: '배운 AI 기술을 아이디어에 그치지 않고 팀의 결과물로 완성했습니다.',
  },
  {
    year: '2024',
    text: '활동 분야 확대',
    detail: 'AI 스터디와 프로젝트, 기술 세미나로 활동의 폭을 넓혔습니다.',
  },
  {
    year: '2025',
    text: '연합 커뮤니티 성장',
    detail: '더 다양한 캠퍼스의 멤버들과 새로운 연결을 이어가고 있습니다.',
  },
]

function Company() {
  return (
    <main>
      <section className="company-hero page-section">
        <p className="eyebrow">ABOUT VAN</p>
        <h1>
          AI라는 관심으로 만나,
          <span>함께 성장하는 연결을 만듭니다.</span>
        </h1>
        <p>
          VAN은 다양한 대학과 전공의 구성원이 모여 AI를 배우고 서로의 경험을 나누며,
          팀 프로젝트를 통해 함께 성장하는 대학생 연합동아리입니다.
        </p>
      </section>

      <section className="company-values page-section" aria-labelledby="values-title">
        <div>
          <p className="eyebrow">OUR VALUES</p>
          <h2 id="values-title">함께 성장하기 위한 세 가지 약속</h2>
        </div>
        <div className="value-grid">
          <article>
            <span>01</span>
            <h3>연결</h3>
            <p>서로 다른 학교와 전공의 경험을 편견 없이 나눕니다.</p>
          </article>
          <article>
            <span>02</span>
            <h3>배움</h3>
            <p>배운 것을 나누고, 모르는 것은 함께 탐구합니다.</p>
          </article>
          <article>
            <span>03</span>
            <h3>도전</h3>
            <p>아이디어를 팀 프로젝트와 실제 결과물로 완성합니다.</p>
          </article>
        </div>
      </section>

      <section className="timeline-section" aria-labelledby="history-title">
        <div className="page-section timeline-layout">
          <div className="timeline-heading">
            <p className="eyebrow">HISTORY</p>
            <h2 id="history-title">VAN이 함께해 온 시간</h2>
            <p>첫 모임부터 새로운 캠퍼스와의 연결까지, VAN의 활동 연혁을 소개합니다.</p>
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
