function TimelineItem({ year, text, detail }) {
  return (
    <article className="timeline-item">
      <time dateTime={year}>{year}</time>
      <span className="timeline-dot" aria-hidden="true" />
      <div>
        <h3>{text}</h3>
        <p>{detail}</p>
      </div>
    </article>
  )
}

export default TimelineItem
