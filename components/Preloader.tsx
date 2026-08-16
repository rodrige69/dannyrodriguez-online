"use client";

import { useEffect, useRef } from "react";

// Preloader — fades out ~0.9s after window 'load', with an 1.8s hard fallback in case
// 'load' already fired before this component mounted (matches the original inline script
// exactly, including the belt-and-suspenders timeout).
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hide = () => ref.current?.classList.add("hide");
    const onLoad = () => {
      window.setTimeout(hide, 900);
    };
    window.addEventListener("load", onLoad);
    const fallback = window.setTimeout(hide, 1800);
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div id="preloader" ref={ref}>
      <img
        className="dr-logo"
        src="/assets/apple-touch-icon.png"
        alt="Danny Rodriguez"
        width={88}
        height={88}
      />
    </div>
  );
}
