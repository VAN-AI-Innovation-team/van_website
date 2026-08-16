const services = [
  { number: '01', title: 'AI Solution', text: '비즈니스 문제에 맞춘 실용적인 AI 솔루션을 설계합니다.' },
  { number: '02', title: 'Digital Experience', text: '사용하기 쉽고 기억에 남는 디지털 경험을 만듭니다.' },
  { number: '03', title: 'Growth Partner', text: '아이디어가 실제 성과로 이어지도록 실행 과정을 함께합니다.' },
]

function Service() {
  return (
    <main className="service-page page-section">
      <p className="eyebrow">SERVICE</p>
      <h1>아이디어를 현실로 만드는 VAN의 방식</h1>
      <div className="service-grid">
        {services.map((service) => (
          <article key={service.number}>
            <span>{service.number}</span>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Service
