import type { ReactNode } from "react";

// ScrollReveal is a ZERO-JS Server Component wrapper (P5 hardening): the
// reveal motion is CSS scroll-driven animation (animation-timeline: view()),
// supported in modern browsers; elsewhere the .reveal class is inert and
// content is visible by default. Reduced-motion users get no animation at
// all. The `delay` prop is kept for call-site compatibility and ignored.

export default function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={`reveal ${className}`.trim()}>{children}</div>;
}
