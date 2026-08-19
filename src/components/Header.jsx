import { NavLink } from 'react-router'
import { useMenuStore } from '../stores/useMenuStore.js'

const navigation = [
  { to: '/about', label: 'VAN 소개' },
  { to: '/departments', label: '부서 소개' },
  { to: '/archive', label: '소식 · 아카이브' },
]

function Header() {
  const menuOpen = useMenuStore((state) => state.menuOpen)
  const toggleMenu = useMenuStore((state) => state.toggleMenu)
  const closeMenu = useMenuStore((state) => state.closeMenu)

  return (
    <header className="site-header">
      <div className="header-inner page-section">
        <NavLink className="brand" to="/" onClick={closeMenu} aria-label="VAN 홈">
          <span className="brand__mark">V</span>
          <span className="brand__name">VAN</span>
          <span className="brand__descriptor">AI Research Network</span>
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="global-navigation"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={toggleMenu}
        >
          <span />
          <span />
        </button>

        <nav
          id="global-navigation"
          className={`gnb${menuOpen ? ' is-open' : ''}`}
          aria-label="주요 메뉴"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) => `gnb__link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
