import PageTransitionWrapper from "@/components/animations/PageTransitionWrapper";

// Route-level entrance (P6.2 animation library): Next.js App Router re-mounts
// app/template.tsx on every navigation, so this IS the page-transition hook.
// First load and subsequent navigations get the same fade + scale entrance;
// there is deliberately no exit animation (App Router swaps without overlap —
// an exit tween would only delay the new page's paint).
// Reduced-motion users: CSS guard in globals.css flattens the animation.

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionWrapper duration={{ enter: 400 }} staggerChildren={false}>
      {children}
    </PageTransitionWrapper>
  );
}
