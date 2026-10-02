// ============================================================================
// useAnimations.ts — Shared hooks on top of Framer Motion
// ============================================================================
// framer-motion already ships useReducedMotion / useInView / useScroll; these
// wrappers add the portfolio-specific behavior:
//  - usePunchyStagger: mobile-aware stagger delay (halved < 640px)
//  - usePageTransitionKey: pathname key for AnimatePresence in template.tsx
// Everything else is imported directly from "framer-motion" at call sites.
// ~1.5KB minified.

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Halves the stagger delay on small screens so lists feel faster on mobile.
 * Reads matchMedia once on mount (client-only); SSR value = desktop delay so
 * server/client HTML never diverge on first paint.
 */
export function usePunchyStagger(delaySec: number): number {
  // Lazy initializer reads matchMedia on first client render; SSR renders the
  // desktop value. The effect below only *subscribes* — no sync setState.
  const [mobile, setMobile] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(max-width: 639px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return mobile ? delaySec / 2 : delaySec;
}

/**
 * Stable key for AnimatePresence route transitions. App Router re-renders
 * template.tsx per navigation; keying by pathname lets exit/enter overlap.
 */
export function usePageTransitionKey(): string {
  const pathname = usePathname();
  return pathname ?? "root";
}
