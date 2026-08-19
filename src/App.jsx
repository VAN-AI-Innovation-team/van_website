import { Navigate, Route, Routes } from 'react-router'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
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
          <Route path="/activities" element={<Service />} />
          <Route path="/company" element={<Navigate replace to="/about" />} />
          <Route path="/service" element={<Navigate replace to="/activities" />} />
          <Route
            path="*"
            element={
              <main className="page-section empty-state">
                <p className="eyebrow">404</p>
                <h1>페이지를 찾을 수 없습니다.</h1>
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
