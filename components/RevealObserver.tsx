"use client";

import { useEffect } from "react";

// Generic scroll-reveal — mounted once per page (not in the shared layout, since layout
// doesn't remount on client-side navigation and this needs to see each page's own .reveal
// elements). Adds .active the first time an element crosses the 15% threshold, then stops
// observing it — matches the original inline script's IntersectionObserver exactly.
export default function RevealObserver() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
