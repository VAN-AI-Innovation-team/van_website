import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-section">
        <div>
          <Link className="brand brand--footer" to="/" aria-label="VAN 홈">
            <span>V</span>AN
          </Link>
          <p>학교와 전공을 넘어, 배움과 경험으로 연결되는 연합동아리입니다.</p>
        </div>

        <nav aria-label="하단 메뉴">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/activities">ACTIVITIES</Link>
        </nav>

        <small>© {new Date().getFullYear()} VAN. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer
