import { Link } from 'react-router'
import './Service.css'

const activities = [
  {
    number: '01',
    label: 'STUDY & SEMINAR',
    title: '함께 배우고 지식을 나눕니다.',
    text: '관심 분야를 중심으로 정기 스터디를 진행하고, 각자의 배움과 경험을 세미나에서 공유합니다.',
    outcomes: ['정기 스터디', '주제별 세미나', '멤버 발표'],
  },
  {
    number: '02',
    label: 'TEAM PROJECT',
    title: '다른 전공이 만나 결과물을 만듭니다.',
    text: '기획, 디자인, 개발 등 서로 다른 강점을 가진 멤버들이 팀을 이루어 아이디어를 구현합니다.',
    outcomes: ['아이디어 기획', '팀 프로젝트', '결과 공유회'],
  },
  {
    number: '03',
    label: 'COMMUNITY',
    title: '학교 밖의 연결을 오래 이어갑니다.',
    text: '활동 안팎에서 편하게 교류하고, 서로의 고민과 경험을 나누는 연합 커뮤니티를 만듭니다.',
    outcomes: ['멤버 네트워킹', '교류 프로그램', '활동 아카이빙'],
  },
]

const processSteps = [
  { number: '01', title: 'Meet', text: '서로 다른 학교와 전공의 멤버가 만나 연결됩니다.' },
  { number: '02', title: 'Learn', text: '관심 분야를 함께 공부하고 경험과 지식을 나눕니다.' },
  { number: '03', title: 'Make', text: '팀을 이루어 아이디어를 직접 결과물로 완성합니다.' },
  { number: '04', title: 'Share', text: '과정과 결과를 공유하며 다음 활동으로 성장합니다.' },
]

function Service() {
  return (
    <main className="service-page">
      <section className="service-hero page-section" aria-labelledby="service-title">
        <div className="service-hero__content">
          <p className="eyebrow">VAN ACTIVITIES</p>
          <h1 id="service-title">
            함께 배우고,
            <span>직접 만들며 성장합니다.</span>
          </h1>
          <p className="service-hero__description">
            VAN은 스터디, 팀 프로젝트, 교류 활동을 통해 혼자서는 어려웠던 도전을 함께
            시작하고 끝까지 완성합니다.
          </p>
          <div className="service-hero__actions">
            <a className="button button--primary" href="#activity-list">
              활동 살펴보기
            </a>
            <a className="service-text-link" href="#process">
              활동 방식 보기 <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>

        <div className="service-hero__visual" aria-hidden="true">
          <span className="service-orbit service-orbit--outer" />
          <span className="service-orbit service-orbit--inner" />
          <div className="service-visual__core">
            <span>MEET</span>
            <strong>VAN</strong>
            <span>GROW</span>
          </div>
          <span className="service-visual__tag service-visual__tag--ai">STUDY</span>
          <span className="service-visual__tag service-visual__tag--ux">TEAM</span>
          <span className="service-visual__tag service-visual__tag--data">MEET</span>
        </div>
      </section>

      <section className="service-offerings" id="activity-list" aria-labelledby="offerings-title">
        <div className="page-section">
          <div className="service-section-heading">
            <div>
              <p className="eyebrow">OUR ACTIVITIES</p>
              <h2 id="offerings-title">관심을 경험으로 바꾸는 활동</h2>
            </div>
            <p>
              함께 공부하고, 직접 만들고, 자유롭게 교류하며 각자의 관심사를 오래 이어갈
              동료와 경험을 만듭니다.
            </p>
          </div>

          <div className="service-card-grid">
            {activities.map((activity) => (
              <article className="service-card" key={activity.number}>
                <div className="service-card__meta">
                  <span>{activity.number}</span>
                  <span>{activity.label}</span>
                </div>
                <h3>{activity.title}</h3>
                <p>{activity.text}</p>
                <ul aria-label={`${activity.title} 주요 활동`}>
                  {activity.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-process" id="process" aria-labelledby="process-title">
        <div className="page-section">
          <div className="service-process__intro">
            <p className="eyebrow">HOW WE GROW</p>
            <h2 id="process-title">
              연결에서 시작해,
              <span>함께한 경험으로 성장합니다.</span>
            </h2>
          </div>

          <ol className="process-list">
            {processSteps.map((step) => (
              <li key={step.number}>
                <span className="process-list__number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-cta page-section" aria-labelledby="service-cta-title">
        <div>
          <p className="eyebrow">JOIN THE NEXT VAN</p>
          <h2 id="service-cta-title">VAN의 다음 활동을 함께 만들어 보세요.</h2>
          <p>새로운 사람을 만나 배우고, 아이디어를 직접 실현하고 싶은 멤버를 기다립니다.</p>
        </div>
        <div className="service-cta__actions">
          <Link className="button service-cta__primary" to="/about">
            동아리 소개 보기
          </Link>
          <a className="button service-cta__secondary" href="#activity-list">
            활동 다시 보기
          </a>
        </div>
      </section>
    </main>
  )
}

export default Service
