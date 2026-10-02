"use client";

// ============================================================================
// AmbientBackground.tsx — Breathing gradient (pure CSS drift, minimal wrapper)
// ============================================================================
// Per revised brief: pure CSS keyframes carry the drift; this wrapper only
// supplies palette/opacity/duration. Mobile disable is a CSS media query
// (globals.css `.ambient-bg--auto-static`) — no matchMedia, no hydration
// branch, identical server/client HTML.
// A11y: aria-hidden (decorative). Reduced-motion: global CSS guard flattens.
// Performance: background-position on one fixed layer, ~0.3KB component.

import type { AmbientBackgroundProps } from "./animations.types";

export default function AmbientBackground({
  enabled = true,
  speed = 1,
  intensity = 0.5,
  colors = ["#08090C", "#171A21"],
  disableOnMobile = true,
  className = "",
}: AmbientBackgroundProps) {
  if (!enabled) return null;

  const durationSec = Math.max(8, 26 / speed);

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
  <AmbientBackground intensity={0.35} speed={0.8} disableOnMobile />
*/
