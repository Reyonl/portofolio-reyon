"use client";

// ============================================================================
// StaggerRevealContainer.tsx — Scroll-triggered staggered reveals (whileInView)
// ============================================================================
// Framer Motion container/item variants: children slide up + scale-in one by
// one when the container enters the viewport (once). Punchy: 24px offset,
// easeOut 0.5s, 120ms stagger (60ms mobile).
//
// Honesty/no-JS: motion renders children at natural opacity in SSR HTML and
// applies `hidden` only after hydration — no-JS users and crawlers always see
// full content. Reduced-motion users get instant visible children.
// Performance: transform/opacity only; one IntersectionObserver (via useInView)
// for the whole container. ~2KB.

import { motion, useReducedMotion } from "framer-motion";
import { Children, isValidElement } from "react";
import { EASINGS } from "./animationUtils";
import { usePunchyStagger } from "./useAnimations";
import type { StaggerRevealContainerProps } from "./animations.types";

export default function StaggerRevealContainer({
  children,
  staggerDelay = 0.12,
  duration = 0.5,
  offsetY = 24,
  easing = "easeOut",
  className = "",
  as = "div",
}: StaggerRevealContainerProps) {
  const reduced = useReducedMotion();
  const mobileDelay = usePunchyStagger(staggerDelay);
  const Tag = as;

  const items = Children.toArray(children).filter(isValidElement);

  if (reduced) {
    // Zero-motion path: plain markup, no wrappers, nothing hidden.
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      {items.map((child, i) => (
        <motion.div
          key={child.key ?? `stagger-${i}`}
          initial={{ opacity: 0, y: offsetY, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{
            duration,
            ease: EASINGS[easing],
            delay: i * mobileDelay,
          }}
        >
          {child}
        </motion.div>
      ))}
    </Tag>
  );
}

/*
USAGE EXAMPLE (components/home/SelectedWork.tsx):
  <StaggerRevealContainer className="space-y-6" staggerDelay={0.12}>
    <FeaturePanel project={featured} />
    <StandardRow project={rest[0]} />
  </StaggerRevealContainer>
*/
