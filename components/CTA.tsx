import Link from "next/link";

export default function CTA() {
  return (
    <section id="lets-talk" className="cta-section">
      <div className="container">
        <div className="cta-content reveal">
          <h2 className="cta-headline">See something I might see differently?</h2>
          <p className="cta-subhead">Let&apos;s compare notes.</p>
          <p className="cta-body">
            If there&apos;s an interesting growth, retention, AI or operating problem on your
            plate, I&apos;d like to hear about it.
          </p>
          <Link href="/contact" className="btn">
            Let&apos;s Talk →
          </Link>
        </div>
      </div>
    </section>
  );
}
