export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="exp-intro reveal">
          <span className="eyebrow-label">Experience</span>
          <h2>
            The map changed.
            <br />
            The work kept teaching me things.
          </h2>
        </div>

        <div className="exp-chapter reveal delay-1">
          <div className="exp-chapter-head">
            <h3 className="exp-label">LATAM + Caribbean · CPG / Retail</h3>
            <span className="exp-evidence">15 Markets</span>
          </div>
          <p className="exp-lead">Products taught me to watch behavior, not assumptions.</p>
        </div>

        <div className="exp-chapter exp-drift-2 exp-recede reveal delay-2">
          <div className="exp-chapter-head">
            <h3 className="exp-label">Distribution + Commercial</h3>
          </div>
          <p className="exp-lead">Getting onto the shelf was only half the problem.</p>
        </div>

        <div className="exp-chapter exp-drift-3 exp-elevate reveal delay-3">
          <div className="exp-chapter-head">
            <h3 className="exp-label">Sales + Customer</h3>
          </div>
          <p className="exp-lead">I started paying attention to what stopped happening.</p>
        </div>

        <div className="exp-chapter exp-drift-4 exp-bridge reveal delay-4">
          <div className="exp-chapter-head">
            <h3 className="exp-label">Systems + AI</h3>
          </div>
          <p className="exp-lead">Eventually I stopped doing everything manually.</p>
        </div>
      </div>
    </section>
  );
}
