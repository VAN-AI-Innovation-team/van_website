import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-section">
        <div>
          <Link className="brand brand--footer" to="/" aria-label="VAN 홈">
            <span>V</span>AN
          </Link>
          <p>기술로 더 나은 연결과 가능성을 만듭니다.</p>
        </div>

        <nav aria-label="하단 메뉴">
          <Link to="/">HOME</Link>
          <Link to="/company">COMPANY</Link>
          <Link to="/service">SERVICE</Link>
        </nav>

        <small>© {new Date().getFullYear()} VAN AI INNOVATION. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer
