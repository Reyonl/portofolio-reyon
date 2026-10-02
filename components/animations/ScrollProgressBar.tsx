"use client";

// ============================================================================
// ScrollProgressBar.tsx — Fixed top reading-progress indicator
// ============================================================================
// Replaces components/ui/ScrollProgress with the same rAF pattern, now with
// Framer-compatible props (height, gradient, glow, color, zIndex) and proper
// ARIA progressbar semantics.
//
// Performance: scaleX transform only (no reflow, GPU-composited), passive
// scroll listener, one shared rAF. ~1.2KB minified.
// A11y: role="progressbar" with live aria-valuenow; decorative for AT that
// ignore it; no keyboard target needed (purely informational).

import { useEffect, useRef } from "react";
import { useScrollProgress, useReducedMotion } from "./useAnimations";
import type { ScrollProgressBarProps } from "./animations.types";

export default function ScrollProgressBar({
  height = 3,
  gradient = true,
  glowEffect = true,
  color = "#63B3FF",
  zIndex = 60,
  className = "",
}: ScrollProgressBarProps) {
  const progress = useScrollProgress(); // 0..1, rAF-throttled
  const reduced = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  // Write the transform imperatively so React state updates (which we still
  // need for aria-valuenow) never double-paint the bar itself.
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progress})`;
    }
  }, [progress]);

  const background = gradient
    ? "linear-gradient(90deg, #63B3FF 0%, #8CC8FF 100%)"
    : color;

  return (
    <div
      className={`fixed top-0 left-0 right-0 pointer-events-none ${className}`.trim()}
      style={{ height: `${height}px`, zIndex }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          background,
          transform: "scaleX(0)",
          boxShadow: glowEffect && !reduced ? `0 0 10px ${color}80` : "none",
          willChange: reduced ? "auto" : "transform",
        }}
      />
    </div>
  );
}

/*
USAGE EXAMPLE (app/layout.tsx):
  <ScrollProgressBar height={3} gradient glowEffect />
*/
