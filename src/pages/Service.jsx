import { Link } from 'react-router'
import './Service.css'

const services = [
  {
    number: '01',
    label: 'AI TRANSFORMATION',
    title: '비즈니스에 맞는 AI를 설계합니다.',
    text: '기술 도입 자체보다 해결해야 할 문제에 집중해, 실제 업무에 적용되는 AI 경험을 만듭니다.',
    outcomes: ['업무 자동화', '데이터 기반 의사결정', 'AI 서비스 기획'],
  },
  {
    number: '02',
    label: 'DIGITAL PRODUCT',
    title: '사용자가 다시 찾는 경험을 만듭니다.',
    text: '브랜드의 목표와 사용자의 맥락을 연결해 명확하고 직관적인 디지털 제품을 구현합니다.',
    outcomes: ['웹·앱 서비스', 'UX/UI 디자인', '프로토타입 개발'],
  },
  {
    number: '03',
    label: 'GROWTH PARTNERSHIP',
    title: '아이디어가 성과가 될 때까지 함께합니다.',
    text: '작은 검증부터 안정적인 확장까지, 빠른 실행과 반복으로 지속 가능한 성장을 지원합니다.',
    outcomes: ['MVP 구축', '서비스 고도화', '운영·성장 전략'],
  },
]

const processSteps = [
  { number: '01', title: 'Discover', text: '사용자와 비즈니스의 핵심 문제를 발견합니다.' },
  { number: '02', title: 'Define', text: '우선순위와 성공 기준을 명확하게 정의합니다.' },
  { number: '03', title: 'Build', text: '빠르게 만들고 검증하며 완성도를 높입니다.' },
  { number: '04', title: 'Grow', text: '데이터를 바탕으로 다음 성장을 설계합니다.' },
]

function Service() {
  return (
    <main className="service-page">
      <section className="service-hero page-section" aria-labelledby="service-title">
        <div className="service-hero__content">
          <p className="eyebrow">WHAT WE DO</p>
          <h1 id="service-title">
            좋은 아이디어를
            <span>움직이는 경험으로.</span>
          </h1>
          <p className="service-hero__description">
            VAN은 기술, 디자인, 비즈니스를 하나의 흐름으로 연결해 아이디어가 실제 변화로
            이어지도록 돕습니다.
          </p>
          <div className="service-hero__actions">
            <a className="button button--primary" href="#service-list">
              서비스 살펴보기
            </a>
            <a className="service-text-link" href="#process">
              진행 방식 보기 <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>

        <div className="service-hero__visual" aria-hidden="true">
          <span className="service-orbit service-orbit--outer" />
          <span className="service-orbit service-orbit--inner" />
          <div className="service-visual__core">
            <span>IDEA</span>
            <strong>VAN</strong>
            <span>IMPACT</span>
          </div>
          <span className="service-visual__tag service-visual__tag--ai">AI</span>
          <span className="service-visual__tag service-visual__tag--ux">UX</span>
          <span className="service-visual__tag service-visual__tag--data">DATA</span>
        </div>
      </section>

      <section className="service-offerings" id="service-list" aria-labelledby="offerings-title">
        <div className="page-section">
          <div className="service-section-heading">
            <div>
              <p className="eyebrow">OUR SERVICES</p>
              <h2 id="offerings-title">필요한 변화를 함께 만듭니다.</h2>
            </div>
            <p>
              전략에서 실행까지 끊김 없이 연결해 가장 필요한 해답을 가장 현실적인 방식으로
              구현합니다.
            </p>
          </div>

          <div className="service-card-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card__meta">
                  <span>{service.number}</span>
                  <span>{service.label}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul aria-label={`${service.title} 주요 제공 항목`}>
                  {service.outcomes.map((outcome) => (
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
            <p className="eyebrow">HOW WE WORK</p>
            <h2 id="process-title">
              빠르게 움직이고,
              <span>분명하게 나아갑니다.</span>
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
          <p className="eyebrow">START WITH VAN</p>
          <h2 id="service-cta-title">새로운 가능성을 함께 시작해 보세요.</h2>
          <p>아직 구체적인 계획이 없어도 괜찮습니다. VAN이 필요한 질문부터 함께 찾겠습니다.</p>
        </div>
        <div className="service-cta__actions">
          <Link className="button service-cta__primary" to="/company">
            VAN 소개 보기
          </Link>
          <a className="button service-cta__secondary" href="#service-list">
            서비스 다시 보기
          </a>
        </div>
      </section>
    </main>
  )
}

export default Service
