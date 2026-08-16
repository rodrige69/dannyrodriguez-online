import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import RevealObserver from "@/components/RevealObserver";

const description =
  "Send Danny Rodriguez a note about a growth, retention, AI or operating problem, book a conversation, or find him on LinkedIn.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Danny Rodriguez",
    description,
    url: "https://dannyrodriguez.online/contact",
    type: "website",
    images: [
      {
        url: "/assets/danny-rodriguez-og.jpg",
        width: 1200,
        height: 630,
        alt: "Danny Rodriguez — Pattern-Recognition Operator.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Danny Rodriguez",
    description,
    images: ["/assets/danny-rodriguez-og.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav variant="contact" />

      <main id="main-content" tabIndex={-1}>
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero-content">
              <h1 className="contact-headline reveal">Let&apos;s compare notes.</h1>
              <p className="contact-sub reveal delay-1">
                If there&apos;s an interesting growth, retention, AI or operating problem on your
                plate, tell me what you&apos;re seeing.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="container contact-grid">
            <div className="contact-primary reveal delay-2">
              <div className="contact-mark">
                <span className="contact-tick" />
                <span className="contact-num">01</span>
              </div>
              <h2 className="contact-path-title">Send a note</h2>
              <ContactForm />
            </div>

            <div className="contact-secondary reveal delay-3">
              <div className="contact-path">
                <div className="contact-mark">
                  <span className="contact-tick" />
                  <span className="contact-num">02</span>
                </div>
                <h2 className="contact-path-title">Book a conversation</h2>
                <p>Prefer to talk it through directly? Grab time on my calendar.</p>
                <a
                  href="https://calendar.app.google/tW7uopZVevsXWFEA8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Book a conversation
                </a>
              </div>
              <div className="contact-path">
                <div className="contact-mark">
                  <span className="contact-tick" />
                  <span className="contact-num">03</span>
                </div>
                <h2 className="contact-path-title">LinkedIn</h2>
                <a
                  href="https://www.linkedin.com/in/dannyrodriguez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-linkedin"
                  aria-label="Danny Rodriguez's LinkedIn profile"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <RevealObserver />
    </>
  );
}
