export default function Hero() {
  return (
    <header className="hero" id="main-content" tabIndex={-1}>
      <div className="hero-bg" />
      <div className="hero-photo-atmosphere">
        <img
          src="/assets/hero-danny-operator.jpg"
          alt="Danny Rodriguez smiling at his desk at night, trading and market monitors lit beside him, the city visible through the window behind."
          loading="eager"
          fetchPriority="high"
          width={1536}
          height={1024}
        />
      </div>
      <div className="hero-photo-fade" />
      <div className="container hero-grid">
        <div className="hero-left">
          <div className="hero-kicker reveal delay-1">
            <span className="kicker-rule" />
            <span>Pattern-Recognition Operator</span>
          </div>
          <h1>
            <span className="reveal reveal-block delay-2">I read patterns.</span>
            <span className="reveal reveal-block delay-3">
              Then I <em>build</em>
            </span>
            <span className="reveal reveal-block delay-4">around them.</span>
          </h1>
          <p className="hero-sub reveal delay-5">
            Across markets, customers, technology and business, the signals change. The patterns
            don&apos;t.
          </p>
          <div className="btn-group reveal delay-5">
            <a href="#building" className="btn">
              Explore What I&apos;m Building
            </a>
            {/* /field-notes does not exist yet — rendered as a non-link preview affordance (no
                href) rather than a dead href="#" link. Restore href="/field-notes" once that
                page is built. */}
            <a className="btn btn-secondary">Read Field Notes</a>
          </div>
        </div>
      </div>
    </header>
  );
}
