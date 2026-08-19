import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-section">
        <div className="footer-brand-block">
          <Link className="brand brand--footer" to="/" aria-label="VAN 홈">
            <span className="brand__mark">V</span>
            <span className="brand__name">VAN</span>
          </Link>
          <p>
            AI와 데이터로 사회의 변화를 읽고,
            <br />사람과 지식을 연결합니다.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link to="/about">VAN 소개</Link>
            <Link to="/departments">부서 소개</Link>
            <Link to="/archive">소식 · 아카이브</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} VAN. All rights reserved.</small>
          <span>Responsible AI · Evidence First · Human Review</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
