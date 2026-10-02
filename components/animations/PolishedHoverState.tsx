"use client";

// ============================================================================
// PolishedHoverState.tsx — HoverCard · HoverButton · HoverLink
// ============================================================================
// Multi-layer hover states implemented with CSS transitions + :focus-visible
// parity (keyboard users get the identical treatment). No JS listener churn:
// the browser compositor runs transform/box-shadow transitions at 60fps.
//
// Performance: transform-only motion (scale, translateY), shadow via
// box-shadow transition on a pseudo-layered border color. ~2KB minified total.
// Touch: hover effects are wrapped in @media (hover: hover) in globals.css so
// swipe gestures never stick a card in its hover state on mobile.

import Link from "next/link";
import type { HoverCardProps, HoverButtonProps, HoverLinkProps } from "./animations.types";

// ─── 5a. HoverCard ───────────────────────────────────────────────────────────
export function HoverCard({
  children,
  onHover,
  glowColor = "rgba(99, 179, 255, 0.28)",
  scale = 1.02,
  className = "",
  href,
}: HoverCardProps) {
  const style = {
    "--hover-glow": glowColor,
    "--hover-scale": String(scale),
  } as React.CSSProperties;

  const inner = <div className={`hover-card ${className}`.trim()} style={style} onMouseEnter={onHover}>{children}</div>;

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-2 focus-visible:outline-[#63B3FF] focus-visible:outline-offset-2">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className="block focus-visible:outline-2 focus-visible:outline-[#63B3FF] focus-visible:outline-offset-2">
        {inner}
      </Link>
    );
  }
  return inner;
}

// ─── 5b. HoverButton ─────────────────────────────────────────────────────────
export function HoverButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  glowColor = "rgba(99, 179, 255, 0.4)",
  type = "button",
  className = "",
}: HoverButtonProps) {
  const variantClasses = {
    primary:
      "bg-[#63B3FF] text-[#08090C] font-bold hover:bg-[#8CC8FF]",
    secondary:
      "border-2 border-[#2A2E37] text-[#9AA1AD] hover:border-[#63B3FF] hover:text-[#63B3FF]",
    ghost: "text-[#9AA1AD] hover:text-[#63B3FF]",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={[
        "hover-btn",
        "inline-flex items-center gap-2 px-7 py-3.5 font-mono text-[11px] tracking-[0.15em] uppercase",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-2 focus-visible:outline-[#8CC8FF] focus-visible:outline-offset-2",
        "disabled:opacity-40 disabled:pointer-events-none",
        variantClasses,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--btn-glow": glowColor } as React.CSSProperties}
    >
      {children}
    </button>
  );
}

// ─── 5c. HoverLink ───────────────────────────────────────────────────────────
export function HoverLink({
  children,
  href,
  target,
  rel,
  external = false,
  className = "",
}: HoverLinkProps) {
  const classes = [
    "hover-link",
    "relative inline-block font-mono text-[11px] tracking-[0.12em] uppercase",
    "text-[#9AA1AD] hover:text-[#63B3FF] transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-[#63B3FF] focus-visible:outline-offset-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedRel = rel ?? (external ? "noopener noreferrer" : undefined);
  const resolvedTarget = target ?? (external ? "_blank" : undefined);

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} target={resolvedTarget} rel={resolvedRel} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/*
USAGE EXAMPLE:
  <HoverCard href="/work/hermes-devops">…</HoverCard>
  <HoverButton variant="primary">Deploy v0.7.5</HoverButton>
  <HoverLink href="https://github.com/Reyonl" external>GitHub ↗</HoverLink>
*/
