// Identity + profile facts. Same honesty rule as projects: every link here has
// been verified reachable (GitHub: HTTP 200), and nothing is claimed that has
// no artifact. No phone, no fake LinkedIn, no placeholder domain.

export const profile = {
  name: "Reyon Lau Jiemin",
  role: "Software Engineer",
  positioningLines: [
    "Software Engineer building practical software systems",
    "with AI-assisted development workflows.",
  ],
  focus: [
    "Software Engineering",
    "Web Development",
    "Mobile Development",
    "Developer Automation",
    "AI-Assisted Development",
  ] as const,
  background: "Informatics Engineering graduate.",
  links: {
    github: "https://github.com/Reyonl", // verified 200
    githubHandle: "Reyonl",
    email: "liurey55@gmail.com", // git identity of both engineering repos
    // No LinkedIn: handle could not be verified. No website until the
    // production domain is final (P2.0 decision: domain PENDING).
  },
} as const;

// Milestone timeline — real, dated, artifact-backed. Deliberately NOT a job
// history (none exists; inventing one would break the honesty rules).
export interface Milestone {
  period: string;
  label: string;
  title: string;
  description: string;
  projectSlug?: string;
}

export const milestones: Milestone[] = [
  {
    period: "2025 — 2026",
    label: "SYSTEM",
    title: "Built DAILY.CO — a real apparel-mockup order system",
    description:
      "Thesis-turned-product: Laravel + Livewire + Fabric.js multi-zone canvas editor with persisted design state and an admin-verified order workflow.",
    projectSlug: "daily-co",
  },
  {
    period: "2026",
    label: "MOBILE",
    title: "Shipped Warung Lupi for Android",
    description:
      "Flutter transaction app with Bluetooth thermal printing; released v1.0.1 APK through its own CI/CD pipeline.",
    projectSlug: "warung-lupi-flutter",
  },
  {
    period: "2026 — present",
    label: "TOOLING",
    title: "Building Hermes DevOps",
    description:
      "A TypeScript developer-automation CLI with evidence-based verification, safety gates, and an audit trail — 198 tests, released v0.7.5, dogfooding its own release pipeline.",
    projectSlug: "hermes-devops",
  },
];

// How I work — principles, each anchored to a real project decision (P1.1 §7.05).
export interface WorkPrinciple {
  label: string;
  principle: string;
  detail: string;
  projectSlug: string;
  projectLabel: string;
}

export const workPrinciples: WorkPrinciple[] = [
  {
    label: "01",
    principle: "Success must be verified, not assumed.",
    detail:
      "A build that exits 0 but produces no fresh artifact is a failed build. Every claim in my tools re-reads the world before it reports.",
    projectSlug: "hermes-devops",
    projectLabel: "Hermes DevOps",
  },
  {
    label: "02",
    principle: "Platform limits are part of the design.",
    detail:
      "A canvas editor has to work on a phone; a receipt has to leave via Bluetooth. I design around the device, not around the demo.",
    projectSlug: "daily-co",
    projectLabel: "DAILY.CO · Warung Lupi",
  },
  {
    label: "03",
    principle: "Mutating tools need bright lines.",
    detail:
      "Anything that touches git, GitHub, or releases goes through an explicit approval gate with an audit trail. Automation never approves itself.",
    projectSlug: "hermes-devops",
    projectLabel: "Hermes DevOps",
  },
  {
    label: "04",
    principle: "Ship, then learn in the open.",
    detail:
      "When a real CI release failed on a missing directory, the failed run stayed in history and the fix shipped as the next patch. Rewrite nothing you can learn from.",
    projectSlug: "hermes-devops",
    projectLabel: "Hermes DevOps",
  },
];

// Tools with a reason (P1.1: never a bare logo wall).
export interface ToolEntry {
  name: string;
  reason: string;
}

export const tools: ToolEntry[] = [
  { name: "TypeScript", reason: "typed content models and a strict typecheck gate" },
  { name: "Node.js", reason: "runs Hermes' TS sources directly — no stale build step" },
  { name: "Next.js", reason: "this portfolio: server components, static case studies" },
  { name: "React", reason: "UI layer for the Warung Lupi web system" },
  { name: "Tailwind CSS", reason: "token-driven styling without a runtime" },
  { name: "Laravel", reason: "application backbone for DAILY.CO and Warung Lupi" },
  { name: "Livewire", reason: "server-state UI inside the Laravel app" },
  { name: "MySQL", reason: "orders, designs, and transaction records" },
  { name: "Fabric.js", reason: "the multi-zone canvas editor" },
  { name: "Flutter", reason: "Android surface of Warung Lupi" },
  { name: "Provider", reason: "state management in the Flutter app" },
  { name: "GitHub Actions", reason: "CI, APK releases, and versioned tool releases" },
];
