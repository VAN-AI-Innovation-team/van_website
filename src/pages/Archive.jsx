import { useState } from 'react'
import { archiveItems } from '../data/content.js'
import './Archive.css'

const filters = ['전체', '행사', '프로젝트', '미디어', '언론보도']

function Archive() {
  const [activeFilter, setActiveFilter] = useState('전체')
  const visibleItems = activeFilter === '전체'
    ? archiveItems
    : archiveItems.filter((item) => item.category === activeFilter)

  return (
    <main className="archive-page">
      <section className="subpage-hero subpage-hero--archive page-section">
        <p className="eyebrow">NEWS & ARCHIVE</p>
        <h1>
          VAN의 질문과 실행을
          <span>차곡차곡 기록합니다.</span>
        </h1>
        <p>행사, 프로젝트, 미디어 콘텐츠와 언론보도를 한곳에서 확인할 수 있습니다.</p>
      </section>

      <section className="archive-content page-section" aria-labelledby="archive-title">
        <div className="archive-toolbar">
          <h2 id="archive-title">전체 아카이브 <span>{String(visibleItems.length).padStart(2, '0')}</span></h2>
          <div className="archive-filters" aria-label="아카이브 분류">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="archive-grid">
          {visibleItems.map((item) => (
            <article className={`archive-card archive-card--${item.theme}`} key={item.id}>
              <div className="archive-card__visual">
                <span>{item.eyebrow}</span>
                <div aria-hidden="true"><i /><i /><i /><i /></div>
              </div>
              <div className="archive-card__meta">
                <span>{item.category}</span><span>{item.meta}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button type="button" aria-label={`${item.title} 상세 보기 준비 중`}>
                <span>자세히 보기</span><span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>

        <p className="archive-notice">
          현재 화면의 일부 콘텐츠는 프론트엔드 시안을 위한 예시입니다. 실제 행사·언론보도 자료로 교체할 수 있습니다.
        </p>
      </section>
    </main>
  )
}

export default Archive
