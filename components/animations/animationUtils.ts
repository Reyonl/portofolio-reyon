// ============================================================================
// animationUtils.ts — Easing presets, variants, timing constants, formatters
// ============================================================================
// Single source of truth for motion timing across the library. Framer Motion
// accepts bezier arrays directly, so we keep typed presets here and pass them
// into transitions. No runtime deps — tree-shakes to <1KB.

/** Easing bezier presets (Framer Motion cubic-bezier arrays). */
export const EASINGS = {
  easeOut: [0.16, 1, 0.3, 1] as const, // snappy decel — entrances
  easeInOut: [0.65, 0, 0.35, 1] as const, // symmetric — exits
  circOut: [0, 0.55, 0.45, 1] as const, // long glide
  backOut: [0.34, 1.56, 0.64, 1] as const, // overshoot — playful pops
} as const;

export type EasingName = keyof typeof EASINGS;

/** Global timing constants (seconds — Framer Motion unit). */
export const TIMING = {
  pageExit: 0.2,
  pageEnter: 0.4,
  staggerItem: 0.5,
  counter: 1.4,
  codeLine: 0.28,
  codeStagger: 0.045,
  tilePop: 0.5,
  tileStagger: 0.07,
  hoverMs: 180,
} as const;

/** Container/item variant factory for StaggerRevealContainer (whileInView). */
export function staggerVariants(offsetY: number, duration: number) {
  return {
    container: {
      hidden: {},
      visible: { transition: { staggerChildren: TIMING.tileStagger * 1.3 } },
    },
    item: {
      hidden: { opacity: 0, y: offsetY, scale: 0.985 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration, ease: EASINGS.easeOut },
      },
    },
  } as const;
}

/** Page enter/exit variant for AnimatePresence in app/template.tsx. */
export const pageVariants = {
  initial: { opacity: 0, scale: 0.985, y: 14 },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: TIMING.pageEnter, ease: EASINGS.easeOut },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    y: -8,
    transition: { duration: TIMING.pageExit, ease: EASINGS.easeInOut },
  },
} as const;

/** Formats a number with locale separators, fixed decimals. */
export function formatLocaleNumber(n: number, decimalPlaces = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

/** Clamp helper (used by scroll math). */
export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}
