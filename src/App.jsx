import { Link, Navigate, Route, Routes } from 'react-router'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Archive from './pages/Archive.jsx'
import Company from './pages/Company.jsx'
import Home from './pages/Home.jsx'
import Service from './pages/Service.jsx'
import './App.css'

function App() {
  return (
    <div className="site-shell">
      <Header />

      <div className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Company />} />
          <Route path="/departments" element={<Service />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/programs" element={<Navigate replace to="/departments" />} />
          <Route path="/activities" element={<Navigate replace to="/departments" />} />
          <Route path="/company" element={<Navigate replace to="/about" />} />
          <Route path="/service" element={<Navigate replace to="/departments" />} />
          <Route
            path="*"
            element={
              <main className="page-section empty-state">
                <p className="eyebrow">404 ERROR</p>
                <h1>페이지를 찾을 수 없습니다.</h1>
                <Link className="button button--primary" to="/">
                  홈으로 돌아가기
                </Link>
              </main>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
