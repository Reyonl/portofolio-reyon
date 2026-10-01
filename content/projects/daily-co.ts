import type { Project } from "../schema.ts";

export const dailyCo: Project = {
  slug: "daily-co",
  index: 2,
  title: "DAILY.CO",
  tagline: "A browser-based mockup editor that lets a screen-printing business turn design intent into an order — front, back, left, and right — without a single back-and-forth sketch.",
  summary:
    "Full-stack custom-apparel design system built for a real screen-printing business: multi-zone Fabric.js canvas editing, safe-area constraints, persisted design state, and an order workflow verified by the shop's admin side.",
  category: "Web Application",
  role: "Full-stack design and implementation",
  period: "2025 — 2026",
  status: "shipped",
  level: "standard",
  featured: false,
  stack: ["Laravel 12", "Livewire 4", "Tailwind CSS 4", "Fabric.js", "MySQL"],
  links: {
    repo: "https://github.com/Reyonl/project_TA",
    repoVisibility: "public",
  },
  evidence: [
    {
      label: "Multi-zone canvas editor",
      value: "Front / back / left / right print zones, each an independent canvas state",
      kind: "capability",
      source: "resources/views/customer/designs/_editor_scripts.blade.php (zone logic in the published repository)",
    },
    {
      label: "Design persistence",
      value: "Canvas state serialized to JSON and restored after reload and after admin review",
      kind: "capability",
      source: "design editor + Laravel persistence path in resources/views/customer/designs/",
    },
    {
      label: "Order workflow",
      value: "Orders move through a state machine: reviewing → pending_payment → processing → completed / cancelled",
      kind: "architecture",
      source: "code-verified from the order models/controllers; Feature tests exercise the flow (tests/Feature/OrderFlowTest.php)",
    },
    {
      label: "Automated tests",
      value: "46 test methods across 11 test files, including auth (dual-guard) and order-flow suites",
      kind: "test",
      source: "tests/Feature + tests/Unit in the repository; CI runs them against MySQL 8.0",
    },
    {
      label: "System scale",
      value: "31 migrations, 84 Blade views",
      kind: "artifact",
      source: "database/migrations/ and resources/views/ counted from the checkout",
    },
  ],

  overview:
    "DAILY.CO is a Laravel + Livewire web application for a custom screen-printing business. Customers design apparel directly in the browser — placing text, images, and stickers on a live garment preview across four print zones — and submit orders that carry the design itself. The shop side reviews, verifies, and moves the order through payment and production. It grew out of my final thesis (Rapid Application Development was the working method), but the thing to look at is not the paper — it is a real multi-tenant order system with a genuine canvas editor inside it, built and maintained solo.",
  problem:
    "Orders started as sketches sent through chat apps. The print team mocked them up by hand, sent images back, and the loop repeated until the customer accepted something. Every order began with ambiguity: there was no shared visual language between the person describing the design and the person producing it. The manual mockup step ate production-team hours before a single shirt was printed.",
  context:
    "The business needed customers to express the design themselves, in the form the production process actually consumes. Two audiences share the app: customers designing on phones and desktops, and admin/owner staff verifying designs and managing orders, payments, and status. The whole system had to work in a browser with no install step, because the customer base would never install software to order a t-shirt.",
  constraints: [
    "Customers design on mobile — touch interaction with a canvas is a different problem than mouse interaction, and the preview must survive both.",
    "The design is the order: whatever the customer finalizes must be restorable exactly, server-side, for admin verification and for production.",
    "One developer, thesis deadline, an existing Laravel/MySQL stack the business could actually host.",
    "Print has physical limits: artwork outside the safe area cannot be produced, so the editor must make that state impossible to submit silently.",
  ],
  architectureNodes: [
    { label: "CUSTOMER BROWSER", sublabel: "Livewire pages + Fabric.js editor" },
    { label: "DESIGN STATE", sublabel: "JSON canvas serialization", highlight: true },
    { label: "LARAVEL APPLICATION", sublabel: "auth · orders · admin workflow · persistence" },
    { label: "MYSQL", sublabel: "customers · designs · orders · payment status" },
  ],
  challenges: [
    {
      title: "Canvas state has to survive being data",
      problem:
        "A Fabric.js canvas is live object state — custom objects, transforms, layer order. Orders had to carry it to the server and admins had to reopen it identically.",
      solution:
        "The canvas serializes to JSON on save and is stored against the order via the Laravel layer; loading rehydrates the exact state. Editing after review restores what the admin verified, not an approximation.",
    },
    {
      title: "Four zones without four headaches",
      problem:
        "Front, back, left, and right are separate print surfaces with separate placements; a single canvas model makes cross-zone state ambiguous.",
      solution:
        "Each zone keeps its own independent canvas instance and state; the order composes all four. Zone switching is explicit, so state can't leak between surfaces.",
    },
    {
      title: "One canvas, many screens",
      problem:
        "Fabric.js renders at fixed pixel size. The same design created on a phone had to render identically on a desktop preview and in the admin verification view.",
      solution:
        "Container-width-driven scaling with normalized coordinates: placement is stored relative to the print area, not the viewport, so exports and previews agree across devices.",
    },
  ],
  testing:
    "46 test methods cover the auth flows (a dual-guard customer/admin login system with custom password reset), dashboards, customer design flows, and the order state machine. Tests run in CI against MySQL 8.0 — deliberately, because parts of the schema use raw MySQL ALTER/ENUM migrations that make a sqlite test database impossible. Feature-level flow tests assert the order state transitions rather than UI details.",
  retrospective: [
    "Designing the persistence contract first would have saved rework: the canvas JSON shape is effectively an API between customer, admin, and production, and it evolved late.",
    "Dual-guard auth was the right call for a two-sided app, but the reset flow deserves its own review — custom email + last-3-digits verification works, and the trade-offs should be documented when this system takes a second developer.",
  ],
};
