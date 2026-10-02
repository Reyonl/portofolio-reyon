# Animation Library — Integration Guide & Contract

> Built for **portofolio-reyon** (Next.js 16 App Router · React 19 · Tailwind v4 · Zero new runtime deps).
> Engineering blueprint aesthetic: Onyx Black `#08090C`, Sky Blue `#63B3FF`, hard offset shadows, modular panels.
> Every component meets **Lighthouse 100** accessibility and respects `prefers-reduced-motion`.

---

## 1. Inventory & Bundle Size Estimate

| File | Purpose | Deps | Est. Minified Size |
| :--- | :--- | :--- | :--- |
| `animations.types.ts` | Complete TypeScript contract | none (types only) | 0 KB |
| `animationUtils.ts` | Easing curves, bezier maps, rAF clamp/tween math | none | ~0.8 KB |
| `useAnimations.ts` | `useReducedMotion`, `useScrollProgress`, `useIntersectionTrigger`, `useNumberTween` | none (React built-in) | ~2.2 KB |
| `PageTransitionWrapper.tsx` | App Router route entrance with staggered children | none | ~1.1 KB |
| `StaggerRevealContainer.tsx` | Scroll-triggered staggered reveal (`as="div\|ul\|ol"`), one shared observer | none | ~2.1 KB |
| `AnimatedCounter.tsx` | rAF number tween for stats with server-safe fallback & `sr-only` honesty | none | ~1.4 KB |
| `ScrollProgressBar.tsx` | Fixed 3px Sky Blue gradient progressbar, `role="progressbar"` ARIA compliance | none | ~1.3 KB |
| `PolishedHoverState.tsx` | `HoverCard`, `HoverButton`, `HoverLink` with `@media (hover: hover)` safety | none | ~2.4 KB |
| `AmbientBackground.tsx` | Slow (24s) breathing gradient behind all content, auto-disabled on mobile | none | ~1.2 KB |
| `CodeBlockReveal.tsx` | Line-by-line staggered code reveal with highlight lines & line numbers | none | ~2.3 KB |
| `ArchitectureNode.tsx` | Data-driven architecture diagram with SVG edge draw, keyboard navigation & expand | none | ~4.2 KB |
| **TOTAL LIBRARY** | | **0 external runtime deps** | **~19 KB** |

---

## 2. Global CSS Requirements

Add the following to `app/globals.css` (guarded by `@media (prefers-reduced-motion: no-preference)` so reduced-motion users get zero animation by default):

```css
/* Page transition entrance */
@keyframes pt-enter {
  from { opacity: 0; transform: scale(0.985); }
  to { opacity: 1; transform: scale(1); }
}
.page-transition {
  animation: pt-enter var(--pt-enter, 400ms) cubic-bezier(0.16, 1, 0.3, 1) both;
}
.page-transition--stagger > * {
  animation: pt-enter var(--pt-enter, 400ms) cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Stagger container items */
@keyframes stagger-in {
  from { opacity: 0; transform: translateY(var(--stagger-offset, 20px)); }
  to { opacity: 1; transform: translateY(0); }
}
.stagger-container .stagger-item {
  opacity: 0;
}
.stagger-container.stagger-visible .stagger-item {
  animation: stagger-in var(--stagger-duration, 500ms) var(--stagger-ease, cubic-bezier(0.16, 1, 0.3, 1)) both;
  animation-delay: calc(var(--stagger-i, 0) * var(--stagger-delay, 100ms));
}

/* Ambient breathing background */
@keyframes ambient-drift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.ambient-bg {
  animation: ambient-drift var(--ambient-duration, 24s) ease-in-out infinite;
}

/* Code block line reveal */
@keyframes code-line-in {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Architecture diagram node tile entrance */
@keyframes tile-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Multi-layer hover states (scoped to devices that support true hover) */
@media (hover: hover) {
  .hover-card {
    transition: transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
  }
  .hover-card:hover {
    transform: scale(var(--hover-scale, 1.02));
    border-color: #63B3FF;
    box-shadow: 0 16px 48px var(--hover-glow, rgba(99, 179, 255, 0.28));
  }
  .hover-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px var(--btn-glow, rgba(99, 179, 255, 0.4));
  }
}

/* Global reduced-motion override */
@media (prefers-reduced-motion: reduce) {
  .page-transition,
  .stagger-container .stagger-item,
  .ambient-bg,
  .code-line,
  .arch-tile,
  .hover-card,
  .hover-btn {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
```

---

## 3. Usage Examples Per Component

### Component 1 — `PageTransitionWrapper`
Place inside `app/template.tsx` (Next.js App Router re-renders templates per route):

```tsx
// app/template.tsx
import PageTransitionWrapper from "@/components/animations/PageTransitionWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionWrapper duration={{ enter: 360 }} staggerChildren>
      {children}
    </PageTransitionWrapper>
  );
}
```

### Component 2 — `StaggerRevealContainer`
Wrap project cards or lists:

```tsx
import StaggerRevealContainer from "@/components/animations/StaggerRevealContainer";

<StaggerRevealContainer as="div" staggerDelay={80} offsetY={16}>
  {projects.map((p) => (
    <ProjectCard key={p.slug} project={p} />
  ))}
</StaggerRevealContainer>
```

### Component 3 — `AnimatedCounter`
Animate numeric stats without breaking the Honesty Engine (the final number is always visible in `noscript` and to screen readers):

```tsx
import AnimatedCounter from "@/components/animations/AnimatedCounter";

<AnimatedCounter to={198} suffix=" / 198 tests" duration={1.2} />
<AnimatedCounter to={3} suffix=" shipped systems" />
<AnimatedCounter to={100} prefix="Lighthouse " suffix="%" />
```

### Component 4 — `ScrollProgressBar`
Drop at the root of `app/layout.tsx` (supersedes `components/ui/ScrollProgress`):

```tsx
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";

// Inside RootLayout:
<ScrollProgressBar height={3} gradient glowEffect />
```

### Component 5 — `HoverCard`, `HoverButton`, `HoverLink`
```tsx
import { HoverCard, HoverButton, HoverLink } from "@/components/animations/PolishedHoverState";

<HoverCard href="/work/hermes-devops">
  <h3>Hermes DevOps CLI</h3>
</HoverCard>

<HoverButton variant="primary" onClick={() => triggerDeploy()}>
  Deploy Artifact ↗
</HoverButton>

<HoverLink href="https://github.com/Reyonl" external>
  GitHub ↗
</HoverLink>
```

### Component 6 — `AmbientBackground`
Subtle breathing gradient fixed to the background:

```tsx
import AmbientBackground from "@/components/animations/AmbientBackground";

// In app/layout.tsx, right after <body>:
<AmbientBackground intensity={0.35} speed={0.9} disableOnMobile />
```

### Component 7 — `CodeBlockReveal`
Case-study code reveal triggered on scroll:

```tsx
import CodeBlockReveal from "@/components/animations/CodeBlockReveal";

<CodeBlockReveal
  code={`export function gateOperation(op, policy) {\n  if (policy === 'STRICT') return false;\n  return true;\n}`}
  language="typescript"
  showLineNumbers
  highlightLines={[2]}
/>
```

### Component 8 — `ArchitectureDiagram`
Data-driven architecture visualization reading from the `content/` registry:

```tsx
import ArchitectureDiagram, { mapArchitectureNodes } from "@/components/animations/ArchitectureNode";

<ArchitectureDiagram
  nodes={mapArchitectureNodes(project.architectureNodes ?? [])}
  edges={[{ from: "n0", to: "n1" }, { from: "n1", to: "n2" }]}
  layout="grid"
  interactive
/>
```

---

## 4. Accessibility & Honesty Checklist

- [x] **Zero fake data**: Numbers animated via `AnimatedCounter` render their exact target in the initial HTML and to screen readers via `.sr-only`.
- [x] **`prefers-reduced-motion` compliance**: All CSS animations, rAF tweens, and hover states instantly flatten to their final visible state.
- [x] **Focus-visible parity**: Every clickable component (`HoverButton`, `HoverCard`, `ArchitectureDiagram` nodes) carries a high-contrast focus ring (`outline-2 outline-[#63B3FF]`).
- [x] **Mobile safety**: Hover transitions are scoped behind `@media (hover: hover)` to prevent sticky-touch bugs on mobile browsers; ambient drift is disabled under 768px by pure CSS (`.ambient-bg--auto-static` — no matchMedia branching, so server and client HTML are identical).
- [x] **Lighthouse 100 preserved**: No heavy runtime dependencies, no layout shift (`transform` + `opacity` only), zero unneeded script evaluation. Verified live after integration: `/` and `/work/hermes-devops` both score **100 / 100 / 100** (a11y / best-practices / SEO).

## 5. Final Integration State (P6.2, verified 2026-10-02)

| Surface | Component(s) | Evidence |
|---|---|---|
| `app/layout.tsx` | `AmbientBackground` + `ScrollProgressBar` (replaces `components/ui/ScrollProgress`, now deleted) | `role="progressbar"` aria-valuenow tracks scroll; ambient drift animates on desktop only |
| `app/template.tsx` | `PageTransitionWrapper` | `.page-transition` element with `pt-enter` animation confirmed live |
| `app/work/page.tsx` + `components/home/SelectedWork.tsx` | `StaggerRevealContainer` | shared-observer stagger; items animate `stagger-in` with per-index delay |
| `app/work/[slug]/page.tsx` | `ArchitectureDiagram` + `CodeBlockReveal` | 6 keyboard-navigable tiles (`aria-pressed` toggle semantics); 24-line verbatim `src/core/safety.ts` snippet revealed line-by-line |
| `components/home/TrustIndicators.tsx` | `AnimatedCounter` ×2 | SSR ships final `15 / 15 PASS` and `198 / 198`; tween only after scroll-into-view |
| `content/schema.ts` + `content/projects/hermes-devops.ts` | optional `codeSample` field | registry-validated; only Hermes carries a snippet (verbatim from the real source file) |

Notes:
- `CodeBlockReveal` exposes one accessible copy: `<pre class="sr-only">` for AT/search, visual rows `aria-hidden`. Line-number color `#9AA1AD` keeps ≥7:1 contrast even on highlighted rows (Lighthouse `color-contrast` pass).
- `hover: hover` gating means touch devices never see hover transforms; focus states mirror them.

## 6. Performance Contract Status

- Runtime dependencies remain **3** (`next`, `react`, `react-dom`) — animation library adds ~0 external KB.
- `npm run verify` (tsc → eslint → node --test 15/15 → next build) passes on the integrated tree.
- Headless-Lighthouse performance on this dev laptop throttles both baseline and integrated builds to ~69–75 (TBT dominated by React hydration of a 165 KB framework chunk present since before this change — A/B confirmed: baseline HEAD = 71, integrated = 69, identical long-task profile). A11y/BP/SEO are exactly 100 as before.
