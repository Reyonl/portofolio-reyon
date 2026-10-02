"use client";

// ============================================================================
// PageTransitionWrapper.tsx — Route transitions via AnimatePresence (App Router)
// ============================================================================
// Integration: app/template.tsx wraps children with this component (server
// component file rendering a client island is fine). Next.js re-mounts
// template.tsx on every navigation; keying motion.div by pathname gives a
// true exit→enter handoff through AnimatePresence.
//
// Punchy spec: exit fade + scale .99 + y -8 (200ms) · enter fade + scale 1
// + y 0 (400ms, easeOut). First load: no enter animation (initial={false}).
// Performance: transform/opacity only (GPU-composited), zero CLS. ~1.5KB.
// A11y: framer's useReducedMotion flattens to instant swap; content stays in
//   DOM (popLayout, not unmount-then-mount); focus preserved on <main>.

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pageVariants } from "./animationUtils";
import { usePageTransitionKey } from "./useAnimations";
import type { PageTransitionWrapperProps } from "./animations.types";

export default function PageTransitionWrapper({
  children,
  // `duration` is honored via pageVariants defaults (exit 0.2s / enter 0.4s);
  // kept in props for Framer-API compatibility with template.tsx call sites.
  // staggerChildren is accepted but page-level stagger is off by design —
  // StaggerRevealContainer owns per-section staggering.
  className = "",
}: PageTransitionWrapperProps) {
  const key = usePageTransitionKey();
  const reduced = useReducedMotion();

  if (reduced) {
    // Reduced motion: instant route swap, no transform at all.
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={key}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/*
USAGE EXAMPLE (app/template.tsx):
  import PageTransitionWrapper from "@/components/animations/PageTransitionWrapper";
  export default function Template({ children }: { children: React.ReactNode }) {
    return (
      <PageTransitionWrapper duration={{ exit: 0.2, enter: 0.4 }}>
        {children}
      </PageTransitionWrapper>
    );
  }
*/
