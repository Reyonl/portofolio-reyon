"use client";

// ============================================================================
// PageTransitionWrapper.tsx — Route-change entrance transitions (App Router)
// ============================================================================
// Usage: create `app/template.tsx` exporting <PageTransitionWrapper>{children}
// — Next.js re-mounts template.tsx on every navigation, which IS the hook.
//
// Why no exit animation: App Router swaps pages without overlap; an exit tween
// would delay the new page's paint for zero perceived benefit. Entrance =
// fade + scale 0.98→1 (400ms easeOut), children staggered 50ms via CSS vars.
// Performance: transform/opacity only, no layout shift, ~1KB minified.
// A11y: motion fully disabled under prefers-reduced-motion (CSS media guard).

import type { PageTransitionWrapperProps } from "./animations.types";

export default function PageTransitionWrapper({
  children,
  duration = {},
  staggerChildren = true,
  className = "",
}: PageTransitionWrapperProps) {
  const enterMs = duration.enter ?? 400;

  return (
    <div
      className={`page-transition ${staggerChildren ? "page-transition--stagger" : ""} ${className}`.trim()}
      style={{ "--pt-enter": `${enterMs}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/*
USAGE EXAMPLE:
  // app/template.tsx
  import PageTransitionWrapper from "@/components/animations/PageTransitionWrapper";
  export default function Template({ children }: { children: React.ReactNode }) {
    return <PageTransitionWrapper>{children}</PageTransitionWrapper>;
  }
*/
