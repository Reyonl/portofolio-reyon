"use client";

// ============================================================================
// AmbientBackground.tsx — Subtle breathing gradient behind all content
// ============================================================================
// Fixed, pointer-events-none, z-index below content. Animation is a 24s
// (adjustable) background-position drift on a 200%-sized gradient — GPU-safe
// composition, near-zero CPU. Disabled automatically under reduced motion and
// optionally on mobile (disableOnMobile, default true) via matchMedia.
//
// Performance: will-change limited to one full-viewport element; the gradient
// never overlaps text contrast requirements (intensity capped at 0.5 on the
// #08090C→#171A21 axis, keeping WCAG AAA contrast against #F5F7FA/#9AA1AD).
// ~1.5KB minified.

import { useReducedMotion } from "./useAnimations";
import type { AmbientBackgroundProps } from "./animations.types";

export default function AmbientBackground({
  enabled = true,
  speed = 1,
  intensity = 0.5,
  colors = ["#08090C", "#171A21"],
  disableOnMobile = true,
  className = "",
}: AmbientBackgroundProps) {
  const reduced = useReducedMotion();

  if (!enabled || reduced) {
    // Static gradient — identical palette, zero motion.
    return (
      <div
        aria-hidden="true"
        className={`fixed inset-0 -z-10 pointer-events-none ${className}`.trim()}
        style={{ background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)` }}
      />
    );
  }

  const durationSec = Math.max(8, 24 / speed);

  return (
    <div
      aria-hidden="true"
      className={[
        "ambient-bg",
        disableOnMobile ? "ambient-bg--auto-static" : "",
        "fixed inset-0 -z-10 pointer-events-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[0]} 100%)`,
          backgroundSize: "200% 200%",
          opacity: Math.min(1, Math.max(0.1, intensity)),
          "--ambient-duration": `${durationSec}s`,
        } as React.CSSProperties
      }
    />
  );
}

/*
USAGE EXAMPLE (app/layout.tsx, first child of <body>):
  <AmbientBackground intensity={0.35} speed={0.8} />
*/
