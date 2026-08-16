"use client";

import { useEffect, useRef } from "react";

const STEP_LABELS = ["Researching", "Analyzing", "Routing", "Executing", "Reporting Back"];

// Hermes execution trace — plays ONCE when the section enters view, then rests resolved (no
// perpetual loop). Cyan marks only whichever step is currently "being worked" (transient);
// once the sequence finishes, the final step settles to bone and stays there.
export default function HermesTrace() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const traceSteps = stepRefs.current.filter((el): el is HTMLSpanElement => Boolean(el));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resolveTrace() {
      traceSteps.forEach((s) => s.classList.remove("trace-active", "trace-done"));
      traceSteps[traceSteps.length - 1]?.classList.add("trace-resolved");
    }

    if (reduceMotion) {
      resolveTrace();
      return;
    }

    if (!traceSteps.length) return;

    const timeouts: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const stepDelay = 550;
          traceSteps.forEach((step, i) => {
            timeouts.push(
              window.setTimeout(() => {
                traceSteps.forEach((s) => s.classList.remove("trace-active"));
                if (i > 0) traceSteps[i - 1].classList.add("trace-done");
                step.classList.add("trace-active");
              }, i * stepDelay)
            );
          });
          timeouts.push(window.setTimeout(resolveTrace, traceSteps.length * stepDelay + 150));
        });
      },
      { threshold: 0.35 }
    );
    io.observe(wrap);

    return () => {
      io.disconnect();
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div className="hermes-trace" ref={wrapRef}>
      <p className="trace-request">&ldquo;Find every client who&apos;s gone quiet this month.&rdquo;</p>
      <div className="trace-steps">
        {STEP_LABELS.map((label, i) => (
          <span
            className="trace-step"
            key={label}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
