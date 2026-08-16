export default function RetainOS() {
  return (
    <section id="retainos" className="retainos-section">
      <div className="container">
        <p className="retain-transition reveal">So I built around it.</p>
        <div className="retain-main">
          <div className="build-status reveal delay-1">
            <span className="status-rule status-rule-cyan" />
            <span className="status-text">Active</span>
          </div>
          <h2 className="build-name reveal delay-1">RetainOS</h2>
          <p className="build-desc reveal delay-1">
            Retention infrastructure for businesses where the second visit matters more than the
            first.
          </p>
          <div className="retain-signal">
            <div className="signal-id reveal delay-1">Client 0472</div>
            <div className="signal-row reveal" style={{ transitionDelay: "0.4s" }}>
              <span className="signal-label">Last visit</span>
              <span className="signal-value">63 days</span>
            </div>
            <div className="signal-row reveal" style={{ transitionDelay: "0.7s" }}>
              <span className="signal-label">Expected return</span>
              <span className="signal-value">35–45 days</span>
            </div>
            <div className="signal-flag reveal" style={{ transitionDelay: "2.1s" }}>
              <span className="signal-flag-dot" />
              Return Risk Detected
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
