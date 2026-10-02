"use client";

// ============================================================================
// useAnimations.ts — Custom React hooks for high-performance UI animations
// ============================================================================
// - useReducedMotion: live subscription to prefers-reduced-motion media query
// - useScrollProgress: 60fps scroll position tracker via passive event + rAF
// - useIntersectionTrigger: triggers one-shot or continuous in-view state
// - useNumberTween: rAF-driven number tween with easing
// Bundle size: ~2.5KB minified, zero external runtime deps.

import { useEffect, useState, useRef } from "react";
import { easeOutCubic, clamp } from "./animationUtils";

/**
 * Live hook that tracks the user's OS-level motion preference.
 * Degrades gracefully on SSR (defaults to false, updates immediately on client mount).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/**
 * Tracks document scroll progress from 0.0 to 1.0 using rAF throttling.
 * Performance: transform-only consumer friendly, non-blocking passive listeners.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const current = clamp(doc.scrollTop / total, 0, 1);
      setProgress(current);
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}

/**
 * Intersection Observer hook for scroll-triggered entrance reveals.
 */
export function useIntersectionTrigger({
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px",
  once = true,
}: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/**
 * Animates a numeric value from `from` to `to` over `durationSec` seconds with easeOut.
 */
export function useNumberTween({
  from = 0,
  to,
  durationSec = 1.2,
  trigger = true,
}: {
  from?: number;
  to: number;
  durationSec?: number;
  trigger?: boolean;
}): number {
  const reducedMotion = useReducedMotion();
  // Honesty contract: the RESTING value is the final number, not 0. SSR,
  // no-JS, and pre-trigger renders all show `to`; the tween only takes over
  // the frame the element scrolls into view (below-fold, so the snap to
  // `from` is never observed).
  const [current, setCurrent] = useState(to);

  useEffect(() => {
    if (!trigger) return;
    if (reducedMotion) return;

    let start = 0;
    let rafId = 0;
    const durationMs = durationSec * 1000;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const progress = clamp(elapsed / durationMs, 0, 1);
      const eased = easeOutCubic(progress);
      const val = from + (to - from) * eased;
      setCurrent(val);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCurrent(to);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [from, to, durationSec, trigger, reducedMotion]);

  return current;
}
