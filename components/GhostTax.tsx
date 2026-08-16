export default function GhostTax() {
  return (
    <section id="ghost-tax" className="pattern-example-section">
      <div className="container">
        <div className="pe-intro reveal">
          <span className="eyebrow-label">One I Noticed</span>
          <h2 className="sr-only">One I Noticed: The Ghost Tax</h2>
        </div>

        <div className="pe-sequence">
          <div className="pe-stage reveal" style={{ transitionDelay: "0s" }}>
            <span className="pe-dot" />
            <span className="pe-label">New Client</span>
          </div>
          <div className="pe-stage reveal" style={{ transitionDelay: "0.5s" }}>
            <span className="pe-dot" />
            <span className="pe-label">First Visit</span>
          </div>
          <div className="pe-stage reveal" style={{ transitionDelay: "1s" }}>
            <span className="pe-dot" />
            <span className="pe-label">Service Delivered</span>
          </div>
          <div className="pe-stage pe-stage-silence reveal" style={{ transitionDelay: "2.8s" }}>
            <span className="pe-dot" />
            <span className="pe-label">Silence</span>
          </div>
          <div className="pe-stage pe-stage-fade reveal" style={{ transitionDelay: "4.3s" }}>
            <span className="pe-dot" />
            <span className="pe-label">Client Disappears</span>
          </div>
        </div>

        {/* NOTE: "Ghost Tax™" (with the trademark glyph) is carried over verbatim from the
            currently-approved live HTML, whose own comment calls this a deliberate "first
            occurrence carries the ™" copy rule. That directly conflicts with the Master
            Technical Migration doc's locked terminology rule (§5 / §41): "never use any ™
            symbol on any framework name." Preserved as-is for Phase 2 pixel/copy parity —
            flagged for Danny to resolve explicitly rather than silently changed, since it's
            visible copy. */}
        <p className="pe-narrative reveal" style={{ transitionDelay: "5.8s" }}>
          Everyone was measuring how the client arrived. I got interested in what happened after
          they left. I called that gap the <em>Ghost Tax™</em>.
        </p>
      </div>
    </section>
  );
}
