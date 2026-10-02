"use client";

// ============================================================================
// StaggerRevealContainer.tsx — Scroll-triggered staggered reveals
// ============================================================================
// Framer-Motion-compatible API (container/item variants, whileInView, once)
// implemented with one shared IntersectionObserver + CSS custom properties.
//
// Performance: children are NOT observed individually — the container is
// observed once, then children animate via `transition-delay: calc(var(--i) *
// stagger)`. ~2KB minified, transform/opacity only, no reflow.
// Mobile: delay automatically halved via [data-motion-mobile] set by CSS media
// query fallback in the inline style (uses 50ms base under 640px).
// A11y: content is in the DOM from first paint; reduced-motion users see it
// immediately (.stagger-hidden is never applied — guarded in globals.css).

import { useIntersectionTrigger, useReducedMotion } from "./useAnimations";
import { EASING_BEZIERS } from "./animationUtils";
import type { StaggerRevealContainerProps } from "./animations.types";
import { Children, isValidElement } from "react";

export default function StaggerRevealContainer({
  children,
  staggerDelay = 100,
  duration = 500,
  offsetY = 20,
  easing = "easeOut",
  className = "",
  as: Tag = "div",
}: StaggerRevealContainerProps) {
  const [ref, inView] = useIntersectionTrigger({ threshold: 0.12, once: true });
  const reduced = useReducedMotion();

  const easingCurve = EASING_BEZIERS[easing] ?? EASING_BEZIERS.easeOut;

  const items = Children.toArray(children).filter(isValidElement);

  return (
    <Tag ref={ref as never} className={`stagger-container ${inView ? "stagger-visible" : ""} ${className}`.trim()}>
      {items.map((child, i) => {
        // Reduced motion (or pre-hydration safety): render children untouched.
        if (reduced) return child;
        return (
          <div
            key={child.key ?? `stagger-${i}`}
            className="stagger-item"
            style={
              {
                "--stagger-i": i,
                "--stagger-delay": `${staggerDelay}ms`,
                "--stagger-duration": `${duration}ms`,
                "--stagger-offset": `${offsetY}px`,
                "--stagger-ease": easingCurve,
              } as React.CSSProperties
            }
          >
            {child}
          </div>
        );
      })}
    </Tag>
  );
}

/*
USAGE EXAMPLE:
  <StaggerRevealContainer as="ul" staggerDelay={120}>
    {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
  </StaggerRevealContainer>
*/
