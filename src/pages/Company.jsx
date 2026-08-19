import TimelineItem from '../components/TimelineItem.jsx'
import { principles } from '../data/content.js'
import './Company.css'

const organization = [
  { label: 'AI INNOVATION', title: 'AI혁신부', text: '디지털 전략, AI 프로젝트, 연구 방법론을 기획하고 실행합니다.' },
  { label: 'FINANCIAL RESEARCH', title: '금융투자리서치부', text: '산업과 시장 데이터를 분석해 변화의 흐름과 위험 요인을 연구합니다.' },
  { label: 'HEALTHCARE MEDIA', title: '보건의료언론부', text: '보건의료 정책과 산업 변화를 근거 중심 콘텐츠로 전달합니다.' },
  { label: 'PARTNERSHIP', title: '대외협력부', text: '기관·전문가·학생을 연결하고 공동 프로젝트와 행사를 운영합니다.' },
]

const history = [
  {
    year: '2022',
    text: 'VAN 첫 모임',
    detail: 'AI에 관심 있는 다양한 학교와 전공의 구성원이 처음 모여 활동의 기반을 만들었습니다.',
  },
  {
    year: '2023',
    text: 'AI 프로젝트 시작',
    detail: '학습한 기술을 아이디어에 머물게 하지 않고 실제 결과물로 구현하기 시작했습니다.',
  },
  {
    year: '2024',
    text: '연구·콘텐츠 영역 확장',
    detail: 'AI를 중심으로 금융투자 리서치와 보건의료 미디어 등 활동 분야를 넓혔습니다.',
  },
  {
    year: '2025',
    text: '연합 네트워크 성장',
    detail: '학교와 전공의 경계를 넘어 더 많은 구성원과 협력 기관을 연결하고 있습니다.',
  },
]

function Company() {
  return (
    <main className="about-page">
      <section className="subpage-hero page-section">
        <p className="eyebrow">ABOUT VAN</p>
        <h1>
          서로 다른 지식이 만나
          <span>더 나은 질문이 되는 곳.</span>
        </h1>
        <p>
          VAN은 AI를 중심으로 금융투자와 보건의료 등 다양한 분야를 연결하며,
          배움과 연구를 실제 사회적 가치로 확장하는 네트워크입니다.
        </p>
      </section>

      <section className="about-statement page-section" aria-labelledby="mission-title">
        <div className="about-statement__index">01</div>
        <div>
          <p className="eyebrow">OUR MISSION</p>
          <h2 id="mission-title">복잡한 변화를 이해할 수 있는 지식으로 바꿉니다.</h2>
        </div>
        <p>
          기술은 빠르게 변하지만 중요한 것은 사람과 사회입니다. VAN은 데이터를 맥락 없이 소비하지 않고,
          신뢰할 수 있는 근거와 다양한 관점을 연결해 누구나 이해하고 활용할 수 있는 지식으로 만듭니다.
        </p>
      </section>

      <section className="value-section">
        <div className="page-section">
          <div className="section-heading section-heading--row">
            <div>
              <p className="eyebrow">OUR PRINCIPLES</p>
              <h2>VAN이 일하는 세 가지 원칙</h2>
            </div>
            <p className="section-note">기술의 가능성과 사회적 책임을 함께 생각합니다.</p>
          </div>
          <div className="about-principles">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <p>{principle.title}</p>
                <h3>{principle.korean}</h3>
                <div className="about-principles__line" />
                <small>{principle.text}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="organization-section section-space page-section" aria-labelledby="organization-title">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">ORGANIZATION</p>
            <h2 id="organization-title">목적에 따라 연결되는<br />유연한 네트워크</h2>
          </div>
          <p className="section-heading__copy">
            각 분야의 전문성을 존중하면서도 하나의 목표를 향해 협업합니다.
            실제 조직·소속 학회 정보는 운영 자료에 맞춰 이 영역에서 관리할 수 있습니다.
          </p>
        </div>

        <div className="organization-map">
          <div className="organization-map__core">
            <span>VAN</span>
            <strong>AI Research<br />Network</strong>
          </div>
          <div className="organization-map__groups">
            {organization.map((group, index) => (
              <article key={group.title}>
                <span>0{index + 1} · {group.label}</span>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="history-section" aria-labelledby="history-title">
        <div className="page-section history-layout">
          <div className="history-heading">
            <p className="eyebrow">OUR HISTORY</p>
            <h2 id="history-title">VAN이 연결을<br />넓혀온 시간</h2>
            <p>첫 모임부터 연구와 프로젝트의 확장까지, VAN의 주요 흐름을 소개합니다.</p>
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
