"use client";

// CSS-first scroll reveal: one tiny client component that only toggles a
// data-visible attribute via IntersectionObserver; all motion lives in
// globals.css and is disabled wholesale under prefers-reduced-motion.
// (Replaces the previous framer-motion version — same call-site API.)

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute("data-visible", "1");
            io.disconnect();
          }
        }
      },
      { rootMargin: "-60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay > 0 ? ({ transitionDelay: `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
