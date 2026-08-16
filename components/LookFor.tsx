const ITEMS = [
  {
    num: "01",
    title: "Lost Value",
    body: "Revenue that should have returned. A customer buys, then quietly disappears.",
  },
  {
    num: "02",
    title: "Manual Friction",
    body: "Work people shouldn't still be doing. The same research and follow-up, over and over.",
  },
  {
    num: "03",
    title: "Missed Signals",
    body: "Information that looks unrelated — until it isn't. Customer behavior. Market movement. Operational data.",
  },
];

export default function LookFor() {
  return (
    <section id="look-for" className="lookfor-section">
      <div className="container">
        <div className="lookfor-intro reveal">
          <span className="eyebrow-label">What I Look For</span>
          <h2>The expensive things businesses learn to live with.</h2>
        </div>
        <div className="lookfor-grid">
          {ITEMS.map((item, i) => (
            <div className={`lookfor-item reveal delay-${i + 1}`} key={item.num}>
              <div className="lookfor-mark">
                <span className="lookfor-tick" />
                <span className="lookfor-num">{item.num}</span>
              </div>
              <h3 className="lookfor-title">{item.title}</h3>
              <p className="lookfor-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
