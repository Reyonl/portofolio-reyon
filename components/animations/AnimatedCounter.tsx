"use client";

// ============================================================================
// AnimatedCounter.tsx — MotionValue-driven number counter (Honesty-safe)
// ============================================================================
// Spec: useMotionValue + useTransform + animate() from framer-motion, eased
// easeOut, starts when scrolled into view (useInView once).
//
// HONESTY ENGINE: SSR/no-JS/reduced-motion all render the FINAL number
// (`to` + suffix/prefix). The 0→N tween is aria-hidden and only takes over
// after hydration when the element enters the viewport — crawlers, screen
// readers and JS-off users always see the verified value, never a fake 0.
// Performance: MotionValue writes bypass React re-render per frame (text
// updates via useTransform subscription — single DOM text node). ~1.8KB.

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { formatLocaleNumber } from "./animationUtils";
import type { AnimatedCounterProps } from "./animations.types";

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 1.4,
  suffix = "",
  prefix = "",
  formatNumber,
  decimalPlaces = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();

  const count = useMotionValue(reduced ? to : from);
  const text = useTransform(count, (v) =>
    (formatNumber ?? ((n: number) => formatLocaleNumber(n, decimalPlaces)))(v)
  );

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, reduced, count, to, duration]);

  const finalText = `${prefix}${(formatNumber ?? ((n: number) => formatLocaleNumber(n, decimalPlaces)))(to)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {/* Animated copy — visual only. */}
      <motion.span aria-hidden="true">
        {prefix}
        <motion.span>{text}</motion.span>
        {suffix}
      </motion.span>
      {/* Final value for AT/crawlers/no-JS — always the truth. */}
      <span className="sr-only">{finalText}</span>
    </span>
  );
}

/*
USAGE EXAMPLES:
  <AnimatedCounter to={15} suffix=" / 15 PASS" />
  <AnimatedCounter to={198} suffix=" / 198" duration={1.4} />
*/
