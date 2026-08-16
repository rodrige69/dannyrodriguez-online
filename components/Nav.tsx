"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type NavProps = {
  variant: "home" | "contact";
};

// Nav — same markup/behavior on both pages, just the anchor targets and the trailing action
// differ (homepage links are same-page hashes + a "Let's Talk" CTA; contact page links point
// back at the homepage sections + a quiet "← Home" link instead).
export default function Nav({ variant }: NavProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hashPrefix = variant === "home" ? "" : "/";

  return (
    <nav id="navbar" ref={navRef}>
      <Link href="/" className="nav-brand">
        Danny Rodriguez
      </Link>
      <div className="nav-links">
        <a href={`${hashPrefix}#how-i-think`}>Thinking</a>
        <a href={`${hashPrefix}#building`}>Building</a>
        <a href={`${hashPrefix}#retainos`}>Operating</a>
        <a href={`${hashPrefix}#about`}>About</a>
      </div>
      <div className="nav-status">
        <span className="live-dot" />
        NOW — RetainOS + AI Operations
      </div>
      <div className="nav-actions">
        {variant === "home" ? (
          <Link href="/contact" className="btn" style={{ padding: "0.75rem 1.5rem" }}>
            Let&apos;s Talk
          </Link>
        ) : (
          <Link href="/" className="nav-home-link">
            ← Home
          </Link>
        )}
      </div>
    </nav>
  );
}
