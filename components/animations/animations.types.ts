// ============================================================================
// animations.types.ts — TypeScript contract for the portfolio animation library
// ============================================================================
// Architecture: Framer Motion-compatible props, implemented with Next 16 / React 19
// performance guarantees (CSS scroll-driven, IntersectionObserver, requestAnimationFrame).
// Zero-runtime footprint when animations are disabled by prefers-reduced-motion.

import type { ReactNode } from "react";

/** Easing preset names aligned with Framer Motion easing curves. */
export type EasingPreset = "easeOut" | "easeInOut" | "backOut" | "anticipate";

// 1. PageTransitionWrapper
export interface PageTransitionWrapperProps {
  children: ReactNode;
  /** Duration in ms for { exit, enter }. Defaults: { exit: 200, enter: 400 }. */
  duration?: { exit?: number; enter?: number };
  /** Whether direct children are staggered on entrance. Default: true. */
  staggerChildren?: boolean;
  className?: string;
}

// 2. StaggerRevealContainer
export interface StaggerRevealContainerProps {
  children: ReactNode;
  /** Stagger delay between items in ms. Default: 100ms (50ms on mobile). */
  staggerDelay?: number;
  /** Duration per child in ms. Default: 500ms. */
  duration?: number;
  /** Initial slide offset on Y axis in pixels. Default: 20px. */
  offsetY?: number;
  easing?: EasingPreset;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}

// 3. AnimatedCounter
export interface AnimatedCounterProps {
  /** Target integer to count to. */
  to: number;
  /** Starting integer. Default: 0. */
  from?: number;
  /** Duration in seconds. Default: 1.2s. */
  duration?: number;
  /** Text appended after the number, e.g. " shipped systems". */
  suffix?: string;
  /** Text prepended before the number, e.g. "+". */
  prefix?: string;
  /** Custom formatter function. Defaults to locale-formatted whole number. */
  formatNumber?: (n: number) => string;
  /** Number of decimal places. Default: 0. */
  decimalPlaces?: number;
  className?: string;
}

// 4. ScrollProgressBar
export interface ScrollProgressBarProps {
  /** Height in pixels. Default: 3. */
  height?: number;
  /** Enable Sky Blue gradient (#63B3FF → #8CC8FF). Default: true. */
  gradient?: boolean;
  /** Enable subtle glow shadow. Default: true. */
  glowEffect?: boolean;
  color?: string;
  zIndex?: number;
  className?: string;
}

// 5. PolishedHoverState (HoverCard, HoverButton, HoverLink)
export interface HoverCardProps {
  children: ReactNode;
  onHover?: () => void;
  glowColor?: string;
  scale?: number;
  className?: string;
  /** Optional clickable URL wrapping the card. */
  href?: string;
}

export interface HoverButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  glowColor?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface HoverLinkProps {
  children: ReactNode;
  href: string;
  target?: string;
  rel?: string;
  external?: boolean;
  className?: string;
}

// 6. AmbientBackground
export interface AmbientBackgroundProps {
  enabled?: boolean;
  /** Duration multiplier (1 = 24s cycle). Default: 1. */
  speed?: number;
  /** Opacity range 0–1. Default: 0.5. */
  intensity?: number;
  colors?: [string, string];
  /** Disable automatic ambient drift on screens < 768px. Default: true. */
  disableOnMobile?: boolean;
  className?: string;
}

// 7. CodeBlockReveal
export interface CodeBlockRevealProps {
  code: string;
  language?: string;
  staggerDelay?: number;
  duration?: number;
  /** 1-based line numbers to highlight with accent tint. */
  highlightLines?: number[];
  showLineNumbers?: boolean;
  maxHeight?: string;
  className?: string;
}

// 8. ArchitectureNode / ArchitectureDiagram
export interface ArchNodeData {
  id: string;
  label: string;
  sublabel?: string;
  tech?: string[];
  responsibilities?: string;
  highlight?: boolean;
}

export interface ArchEdgeData {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureNodeProps {
  node: ArchNodeData;
  isSelected?: boolean;
  onClick?: (id: string) => void;
  className?: string;
}

export interface ArchitectureDiagramProps {
  nodes: ArchNodeData[];
  edges: ArchEdgeData[];
  layout?: "grid" | "vertical" | "horizontal";
  onNodeClick?: (id: string) => void;
  selectedNodeId?: string;
  showEdges?: boolean;
  interactive?: boolean;
  className?: string;
}
