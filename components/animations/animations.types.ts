// ============================================================================
// animations.types.ts — TypeScript contract for the portfolio animation library
// ============================================================================
// Architecture (P6.3): REAL Framer Motion 13 (AnimatePresence, motion, useScroll,
// useMotionValue/useTransform, useInView, useReducedMotion) on Next 16 / React 19.
// Every component keeps the Honesty Engine contract: server HTML shows the FINAL
// state; motion only enhances after hydration. All props strict-mode typed.

import type { ReactNode } from "react";

/** Easing presets (Framer Motion easing names). */
export type EasingPreset = "easeOut" | "easeInOut" | "circOut" | "backOut";

// 1. PageTransitionWrapper
export interface PageTransitionWrapperProps {
  children: ReactNode;
  /** Durations in seconds for { exit, enter }. Defaults: { exit: 0.2, enter: 0.4 }. */
  duration?: { exit?: number; enter?: number };
  /** Stagger direct children on entrance. Default: false (full-page feels tighter). */
  staggerChildren?: boolean;
  className?: string;
}

// 2. StaggerRevealContainer
export interface StaggerRevealContainerProps {
  children: ReactNode;
  /** Stagger delay between items in seconds. Default: 0.09. */
  staggerDelay?: number;
  /** Duration per child in seconds. Default: 0.5. */
  duration?: number;
  /** Initial slide offset on Y axis in pixels. Default: 24 (punchy). */
  offsetY?: number;
  easing?: EasingPreset;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}

// 3. AnimatedCounter
export interface AnimatedCounterProps {
  /** Target number to count to — this value is what SSR/no-JS users see. */
  to: number;
  /** Starting number. Default: 0. */
  from?: number;
  /** Duration in seconds. Default: 1.4. */
  duration?: number;
  /** Text appended after the number, e.g. " / 15 PASS". */
  suffix?: string;
  /** Text prepended before the number, e.g. "+". */
  prefix?: string;
  /** Custom formatter. Defaults to locale-formatted whole number. */
  formatNumber?: (n: number) => string;
  /** Decimal places. Default: 0. */
  decimalPlaces?: number;
  className?: string;
}

// 4. ScrollProgressBar
export interface ScrollProgressBarProps {
  /** Height in pixels. Default: 3. */
  height?: number;
  /** Sky Blue gradient (#63B3FF → #8CC8FF). Default: true. */
  gradient?: boolean;
  /** Subtle glow shadow. Default: true. */
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
  /** Scale on hover. Default: 1.03. */
  scale?: number;
  className?: string;
  /** If set, renders an <a> instead of <div>. */
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
  /** Duration multiplier (1 = 26s cycle). Default: 1. */
  speed?: number;
  /** Opacity 0–1. Default: 0.5. */
  intensity?: number;
  colors?: [string, string];
  /** Disable drift on screens < 768px (pure CSS, no hydration branch). Default: true. */
  disableOnMobile?: boolean;
  className?: string;
}

// 7. CodeBlockReveal
export interface CodeBlockRevealProps {
  code: string;
  language?: string;
  /** Per-line stagger in seconds. Default: 0.045. */
  staggerDelay?: number;
  /** Per-line duration in seconds. Default: 0.28. */
  duration?: number;
  /** 1-based line numbers highlighted with accent tint. */
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
