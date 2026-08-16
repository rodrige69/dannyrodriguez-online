import HermesTrace from "./HermesTrace";

export default function Building() {
  return (
    <section id="building" className="building-section">
      <div className="container">
        <div className="build-intro reveal">
          <span className="eyebrow-label">What I&apos;m Building</span>
          <h2 className="sr-only">What I&apos;m Building</h2>
        </div>

        <div className="build-row build-row-secondary reveal delay-1">
          <div className="build-status">
            <span className="status-rule status-rule-cyan" />
            <span className="status-text">Active</span>
          </div>
          <h3 className="build-name">AI Operations / Hermes</h3>
          <p className="build-desc">
            The agent infrastructure running underneath everything else I build and operate.
          </p>
          <HermesTrace />
        </div>

        <div className="build-row build-row-personal reveal delay-2">
          <div className="build-status">
            <span className="status-rule status-rule-warm" />
            <span className="status-text">Personal Build</span>
          </div>
          <div className="personal-grid">
            <div className="personal-shot">
              <img
                src="/assets/many-nickles-dashboard.jpg"
                alt="Many Nickles trading dashboard overview: live ticker tape, market regime status, category movers, and sector inflow/outflow data."
                loading="lazy"
                width={1360}
                height={1042}
              />
            </div>
            <div className="personal-text">
              <h3 className="build-name">Many Nickles</h3>
              <p className="build-desc">
                My father wanted a simpler way to understand the market. So I built him one.
              </p>
            </div>
          </div>
        </div>

        {/* /building does not exist yet — non-link preview affordance, same rationale as Hero's
            "Read Field Notes". Restore href="/building" once that page is built. */}
        <a className="build-exit reveal delay-3">
          See everything I&apos;m building <span className="build-exit-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
