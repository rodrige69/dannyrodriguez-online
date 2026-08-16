"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { target: "reveal-observe", label: "Observe", text: "A client disappears after visit one." },
  { target: "reveal-recognize", label: "Recognize", text: "The behavior repeats across businesses." },
  { target: "reveal-frame", label: "Frame", text: "Name the hidden problem." },
  { target: "reveal-build", label: "Build", text: "Create a system around it." },
  { target: "reveal-test", label: "Test", text: "See whether behavior changes." },
];

// How I Think — hover/focus activates on desktop (fluid, momentary, releases on
// mouse-out/blur). Tap toggles on touch devices (persistent, since touch has no hover to
// release it). Only one stage active at a time either way. The loop-arc (Test → Observe)
// reveals only while Test is the active stage. Observe opens by default so the mechanic is
// demonstrated once on load, on both desktop and touch.
//
// Ported as an imperative DOM effect (refs + classList/attribute toggling), matching the
// original inline script 1:1 — the mouseleave/blur logic depends on live :hover/:focus-visible
// pseudo-class checks that don't have a clean declarative React equivalent, so preserving the
// exact interaction feel took priority over idiomatic state management here.
export default function HowIThink() {
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const revealRefs = useRef<Array<HTMLDivElement | null>>([]);
  const arrowRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const loopArcRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const steps = stepRefs.current.filter((el): el is HTMLButtonElement => Boolean(el));
    const arrows = arrowRefs.current;
    const loopArc = loopArcRef.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function clearSignatureEffects() {
      arrows.forEach((a) => a?.classList.remove("fa-repeat", "fa-connect"));
    }

    function applySignatureEffect(step: HTMLButtonElement) {
      clearSignatureEffects();
      const idx = steps.indexOf(step);
      if (idx === 1 && arrows[0]) {
        arrows[0].classList.add("fa-repeat"); // Recognize — repetition
      } else if (idx === 2) {
        // Frame — connection (both sides)
        arrows[1]?.classList.add("fa-connect");
        arrows[2]?.classList.add("fa-connect");
      }
      // Build (idx 3) is handled purely via CSS on [aria-expanded="true"].
      // Test (idx 4) is handled via loopArc below.
    }

    function activateStep(step: HTMLButtonElement) {
      steps.forEach((s, i) => {
        const on = s === step;
        s.setAttribute("aria-expanded", on ? "true" : "false");
        revealRefs.current[i]?.classList.toggle("open", on);
      });
      applySignatureEffect(step);
      loopArc?.classList.toggle("active", step.dataset.target === "reveal-test");
    }

    function deactivateAll() {
      steps.forEach((s, i) => {
        s.setAttribute("aria-expanded", "false");
        revealRefs.current[i]?.classList.remove("open");
      });
      clearSignatureEffects();
      loopArc?.classList.remove("active");
    }

    const cleanups: Array<() => void> = [];

    steps.forEach((step) => {
      if (canHover) {
        const onEnter = () => activateStep(step);
        const onFocus = () => activateStep(step);
        const onLeave = () => {
          if (!step.matches(":focus-visible")) deactivateAll();
        };
        const onBlur = () => {
          if (!step.matches(":hover")) deactivateAll();
        };
        step.addEventListener("mouseenter", onEnter);
        step.addEventListener("focus", onFocus);
        step.addEventListener("mouseleave", onLeave);
        step.addEventListener("blur", onBlur);
        cleanups.push(() => {
          step.removeEventListener("mouseenter", onEnter);
          step.removeEventListener("focus", onFocus);
          step.removeEventListener("mouseleave", onLeave);
          step.removeEventListener("blur", onBlur);
        });
      } else {
        const onClick = () => {
          const isOpen = step.getAttribute("aria-expanded") === "true";
          if (isOpen) deactivateAll();
          else activateStep(step);
        };
        step.addEventListener("click", onClick);
        cleanups.push(() => step.removeEventListener("click", onClick));
      }
    });

    // Default-open Observe — demonstrates the mechanic once on load, through the same
    // activateStep() path every other interaction uses.
    if (steps[0]) activateStep(steps[0]);

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="how-i-think" className="think-section">
      <div className="container">
        <div className="think-intro reveal">
          <span className="eyebrow-label">How I Think</span>
          <h2>
            Most opportunities don&apos;t announce themselves.
            <br />
            They show up as <em>patterns.</em>
          </h2>
        </div>

        <div className="think-rail reveal delay-1">
          {STEPS.flatMap((step, i) => {
            const node = (
              <div className="think-node" key={step.target}>
                <button
                  className="think-step"
                  data-target={step.target}
                  aria-expanded={i === 0 ? "true" : "false"}
                  aria-controls={step.target}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                >
                  {step.label}
                </button>
                <div
                  className={`think-reveal${i === 0 ? " open" : ""}`}
                  id={step.target}
                  ref={(el) => {
                    revealRefs.current[i] = el;
                  }}
                >
                  <div className="think-reveal-inner">
                    <p>{step.text}</p>
                  </div>
                </div>
              </div>
            );
            if (i === STEPS.length - 1) return [node];
            const arrow = (
              <span
                className="flow-arrow"
                key={`arrow-${step.target}`}
                ref={(el) => {
                  arrowRefs.current[i] = el;
                }}
              >
                →
              </span>
            );
            return [node, arrow];
          })}
        </div>
        <svg
          className="loop-arc"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          aria-hidden="true"
          ref={loopArcRef}
        >
          <path className="loop-arc-path" d="M 97 4 Q 50 22 3 4" />
          <path className="loop-arc-head" d="M 3 4 L 9 2 M 3 4 L 8 8" />
        </svg>
      </div>
    </section>
  );
}
