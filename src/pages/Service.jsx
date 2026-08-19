import { programs } from '../data/content.js'
import './Service.css'

function Service() {
  return (
    <main className="program-page">
      <section className="subpage-hero subpage-hero--program page-section">
        <p className="eyebrow">OUR DEPARTMENTS</p>
        <h1>
          질문을 연구로,
          <span>연구를 변화로 연결합니다.</span>
        </h1>
        <p>
          VAN은 AI 혁신, 금융투자 리서치, 보건의료 미디어, 지식 교류를 중심으로
          각 부서는 전문 분야의 문제를 탐색하고 실행 가능한 프로젝트를 만듭니다.
        </p>
      </section>

      <nav className="program-index page-section" aria-label="부서 바로가기">
        {programs.map((program) => (
          <a href={`#${program.id}`} key={program.id}>
            <span>{program.number}</span>{program.title}
          </a>
        ))}
      </nav>

      <section className="program-detail-list page-section" aria-label="VAN 부서 소개">
        {programs.map((program) => (
          <article className={`program-detail program-detail--${program.accent}`} id={program.id} key={program.id}>
            <div className="program-detail__aside">
              <span>{program.number}</span>
              <small>{program.label}</small>
            </div>
            <div className="program-detail__main">
              <h2>{program.title}</h2>
              <p className="program-detail__lead">{program.summary}</p>
              <p>{program.description}</p>
              <ul>
                {program.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
            <div className="program-detail__visual" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </article>
        ))}
      </section>

      <section className="program-process">
        <div className="page-section">
          <div>
            <p className="eyebrow">HOW WE WORK</p>
            <h2>작은 질문에서 시작해<br />공유 가능한 결과로 만듭니다.</h2>
          </div>
          <ol>
            {[
              ['Discover', '현장의 문제와 필요한 변화를 발견합니다.'],
              ['Research', '데이터와 근거를 바탕으로 질문을 탐구합니다.'],
              ['Build', '아이디어를 프로젝트와 콘텐츠로 구현합니다.'],
              ['Share', '결과와 경험을 기록하고 사회와 공유합니다.'],
            ].map(([title, text], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </main>
  )
}

export default Service
