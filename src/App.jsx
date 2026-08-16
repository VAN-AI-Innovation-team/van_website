import { NavLink, Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Company from './pages/Company.jsx'
import { useMenuStore } from './stores/useMenuStore.js'
import './App.css'

function App() {
  const menuOpen = useMenuStore((state) => state.menuOpen)
  const toggleMenu = useMenuStore((state) => state.toggleMenu)

  return (
    <div className="app-shell">
      <nav className="route-nav" aria-label="주요 메뉴">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          HOME
        </NavLink>
        <NavLink
          to="/company"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          COMPANY
        </NavLink>
      </nav>

      <section className="store-test" aria-labelledby="store-test-title">
        <div>
          <strong id="store-test-title">Zustand 상태 테스트</strong>
          <p>메뉴 상태: {menuOpen ? '열림' : '닫힘'}</p>
        </div>
        <button type="button" onClick={toggleMenu}>
          메뉴 상태 변경
        </button>
      </section>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
      </Routes>
    </div>
  )
}

export default App
