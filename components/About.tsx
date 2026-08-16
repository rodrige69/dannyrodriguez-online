export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        <div className="about-intro reveal">
          <span className="eyebrow-label">About</span>
          <h2>I&apos;ve spent a career moving between categories, countries and problems.</h2>
          <div className="about-body">
            <p>
              Miami is home. Bogotá is where I spend enough time that it&apos;s become part of
              how I see things too — different pace, and just enough distance from everything
              else to notice what I&apos;d otherwise miss.
            </p>
            <p>
              My career never followed a straight line — twenty-plus years moving between
              products, retail, distribution and sales, mostly across the U.S., Latin America
              and the Caribbean. I learned more from the differences between those rooms than
              from any one of them.
            </p>
            <p>
              These days that shows up in retention systems, in what I&apos;m building with AI,
              and in whatever problem happens to be in front of me. Same habit. Different rooms.
            </p>
          </div>
        </div>
        <div className="about-photo reveal delay-2">
          <div className="about-photo-wrapper">
            <img
              src="/assets/about-danny-bogota.jpg"
              alt="Danny Rodriguez writing in a notebook at a café table in Bogotá, coffee in hand, the city visible through the window behind him."
              loading="lazy"
              width={1448}
              height={1086}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
