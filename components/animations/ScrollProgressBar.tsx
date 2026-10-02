"use client";

// ============================================================================
// ScrollProgressBar.tsx — useScroll + useSpring gradient progress indicator
// ============================================================================
// Framer's useScroll() reads document scroll on the main thread without
// React state; scaleX is driven by a spring-smoothed MotionValue written
// straight to the transform — no re-render per scroll frame.
// A11y: role="progressbar" with live aria-valuenow (updated via state at a
// throttled rate — 1 state write per percent step, not per frame).
// Performance: compositor-only transform, passive by default. ~1.5KB.

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import type { ScrollProgressBarProps } from "./animations.types";

export default function ScrollProgressBar({
  height = 3,
  gradient = true,
  glowEffect = true,
  color = "#63B3FF",
  zIndex = 60,
  className = "",
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });
  const [pct, setPct] = useState(0);

  // aria-valuenow only changes per whole percent → ~100 state writes max/page.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(v * 100);
    setPct((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 pointer-events-none ${className}`.trim()}
      style={{ height: `${height}px`, zIndex }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full w-full origin-left"
        style={{
          scaleX,
          background: gradient
            ? "linear-gradient(90deg, #63B3FF 0%, #8CC8FF 100%)"
            : color,
          boxShadow: glowEffect ? `0 0 10px ${color}80` : "none",
          willChange: "transform",
        }}
      />
    </motion.div>
  );
}

/*
USAGE EXAMPLE (app/layout.tsx):
  <ScrollProgressBar height={3} gradient glowEffect />
*/
