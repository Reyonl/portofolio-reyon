"use client";

// ============================================================================
// AnimatedCounter.tsx — Scroll-triggered number counter for verified stats
// ============================================================================
// rAF tween from `from` → `to` with easeOut over durationSec, triggered when
// the element scrolls into view. Cleanup via cancelAnimationFrame in the hook.
//
// HONESTY RULE (this portfolio's contract): only animate numbers that are
// already displayed as static text server-side. The SSR render shows the
// FINAL value inside <noscript>-safe markup; hydration swaps to 0 → tween.
// Search engines, screen readers, JS-disabled users, and reduced-motion users
// all see the verified final number, never an animated lie.
// Performance: ~1.5KB, no interval leaks, single rAF per element.
// A11y: aria-hidden on the animating copy; a visually-hidden static span
// carries the final value for assistive tech at all times.

import type { AnimatedCounterProps } from "./animations.types";
import { useIntersectionTrigger, useNumberTween } from "./useAnimations";
import { formatLocaleNumber } from "./animationUtils";

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 1.2,
  suffix = "",
  prefix = "",
  formatNumber,
  decimalPlaces = 0,
  className = "",
}: AnimatedCounterProps) {
  const [ref, inView] = useIntersectionTrigger({ threshold: 0.4, once: true });
  const value = useNumberTween({ from, to, durationSec: duration, trigger: inView });

  const fmt = formatNumber ?? ((n: number) => formatLocaleNumber(n, decimalPlaces));
  const finalText = `${prefix}${fmt(to)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {fmt(value)}
        {suffix}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}

/*
USAGE EXAMPLES:
  <AnimatedCounter to={3} suffix=" shipped systems" />
  <AnimatedCounter to={198} suffix=" / 198 tests" />
  <AnimatedCounter to={15} suffix=" / 15" />
*/
