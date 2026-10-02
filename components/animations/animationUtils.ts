// ============================================================================
// animationUtils.ts — Easing curves, variant generators, and performance helpers
// ============================================================================
// Performance: pure mathematical transforms + CSS cubic-bezier strings.
// Bundle size: < 1.5KB minified, 0 dependencies.

import type { EasingPreset } from "./animations.types";

/**
 * Standard CSS easing curves matching Framer Motion's default presets.
 * Used across CSS animations, inline styles, and JS-driven rAF transitions.
 */
export const EASING_BEZIERS: Record<EasingPreset, string> = {
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)", // snappy start, smooth landing
  easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  backOut: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  anticipate: "cubic-bezier(0.36, 0, 0.66, -0.56)",
};

/**
 * Standard cubic easeOut formula for numeric interpolation: f(t) = 1 - (1 - t)^3.
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Clamp a number between min and max bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Formats a number with thousand separators (e.g. 1000 -> "1,000").
 */
export function formatLocaleNumber(n: number, decimals: number = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Check whether the client environment requests reduced motion.
 * Safely returns false during Server Component rendering.
 */
export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
