import type { Project } from "../schema.ts";

export const hermesDevops: Project = {
  slug: "hermes-devops",
  index: 1,
  title: "Hermes DevOps",
  tagline: "A developer-automation CLI that runs a project's real build, test, deploy, and release steps — and refuses to report success without evidence.",
  summary:
    "TypeScript/Node.js CLI that registers local projects, detects their stack, executes their own commands through safety gates, verifies results against freshly-read facts, and keeps an audit trail of every guarded operation.",
  category: "Developer Automation",
  role: "Design · Implementation · Dogfooding",
  period: "2026 — present",
  status: "active",
  level: "flagship",
  featured: true,
  stack: ["TypeScript", "Node.js", "GitHub Actions", "Git", "gh CLI"],
  links: {
    // Repository exists but is currently PRIVATE. Until publication is approved,
    // no public repo link is rendered — the UI must state "private repository".
    repoVisibility: "private",
  },
  evidence: [
    {
      label: "Unit + integration tests",
      value: "198 / 198 passing",
      kind: "test",
      source: "node --test test/*.test.ts — run from the repository checkout (18 test files)",
    },
    {
      label: "Type safety",
      value: "TypeScript strict, typecheck clean",
      kind: "test",
      source: "npx tsc --noEmit on main",
    },
    {
      label: "Verification model",
      value: "A step passes only when freshly-read post-conditions agree — exit codes alone are never trusted",
      kind: "architecture",
      source: "src/core/auto-ops.ts + executor adapters (before/after snapshots; build requires a fresh artifact)",
    },
    {
      label: "Safety gates",
      value: "Every operation classified SAFE / REVIEW / DANGEROUS, with explicit approval keys per automation type",
      kind: "capability",
      source: "src/core/safety.ts + test/safety-gate.test.ts (full gate matrix tested)",
    },
    {
      label: "Audit trail",
      value: "Every gated decision and step outcome written to a local append-only audit log",
      kind: "capability",
      source: "src/core/audit.ts (entries under ~/.config/hermes-devops/data/audit/, readable via `hermes log`)",
    },
    {
      label: "Release orchestration",
      value: "v0.7.2 → v0.7.5 released through the tool's own gated pipeline",
      kind: "release",
      source: "git tags + .github/workflows/release.yml (tag → npm pack tarball on a GitHub Release)",
    },
    {
      label: "Portfolio metadata",
      value: "Deterministic .hermes/portfolio.json artifact — fields emitted only where evidence exists",
      kind: "capability",
      source: "src/core/portfolio.ts (schema v1, ownership marker, pure builder)",
    },
  ],

  overview:
    "Hermes DevOps is a personal engineering project: a command-line tool that sits between \"I have projects on disk\" and \"each project has a reproducible workflow\". It registers projects, detects what they are built with, runs their own commands — test, build, lint, deploy, release — and then checks whether the claimed result actually happened. A build is only PASS if a fresh artifact exists. A release is only done if the tag points at the new HEAD. Every mutation goes through a safety gate, and every decision is written to an audit trail. It is not a CI server and not a git wrapper; it is the verification layer that neither provides for a solo developer working locally.",
  problem:
    "Personal projects accumulate without a consistent workflow. Some have CI, some don't. Deploys are tribal knowledge kept in my head. \"Did the build actually produce an artifact?\" and \"Did the release tag really land on the commit I shipped?\" go unanswered because the tools available either run commands without checking results, or check results only inside a hosted CI I don't control. The failure mode is worse than missing automation: it is a tool that reports success when nothing was verified. Hermes exists to make that failure mode impossible by construction — the engine can classify an outcome as FAILED or UNVERIFIED even when every command exited 0.",
  constraints: [
    "Runs locally on Windows with a mix of ecosystems (Node, PHP/Laravel, Flutter) — the same pipeline had to work against cmd.exe, MSYS paths, and spaces in arguments.",
    "Solo maintainer: nothing could depend on a service I'd have to keep alive; the tool must work offline and degrade honestly when GitHub or CI is unreachable.",
    "Zero build step: TypeScript sources are executed directly by Node, which constrains syntax and tooling choices but removes a whole class of stale-dist bugs.",
    "One runtime dependency: the package ships with only `yaml`. Everything else is Node built-ins.",
    "It mutates real repositories — commits, tags, pushes, releases — so a wrong assumption is not a log line, it's damage to my actual work.",
  ],
  architectureNodes: [
    { label: "CLI", sublabel: "command parsing · context assembly" },
    { label: "SAFETY GATE", sublabel: "operation class + approval policy", highlight: true },
    { label: "PLANNER", sublabel: "pure plan from real facts — no disk, no spawn" },
    { label: "EXECUTOR", sublabel: "audited command runner" },
    { label: "VERIFICATION", sublabel: "freshly-read post-conditions" },
    { label: "AUDIT TRAIL", sublabel: "append-only decision log" },
  ],
  decisions: [
    {
      title: "Verification is evidence-based, never exit-code-based",
      decision:
        "Every mutating or claiming step declares a post-condition, and the executor evaluates it against state re-read after the run: a fresh artifact's mtime, a tag's target commit, a GitHub object fetched back through the CLI.",
      reason:
        "The first real failure this design caught was mine: a no-op build that exited 0 while producing nothing. An exit-code-only tool would have reported \"build passing\" for weeks.",
      tradeoff:
        "Each capability costs an extra read-back and a snapshot model, and some remote effects (a deploy landing on shared hosting) cannot be verified locally — those stamp says \"verified by procedure exit codes only\".",
      alternative:
        "Trust exit codes and parse output for \"success\" strings. Rejected: that is exactly the unverified success Hermes exists to prevent.",
    },
    {
      title: "Plans are pure functions; executors have no business logic",
      decision:
        "Each capability is split into a pure plan catalog (request → steps + verification spec, no I/O) and a thin executor adapter that runs argv arrays through an audited runner.",
      reason:
        "The planning layer — where the real bugs live — is unit-testable without touching disk or spawning processes. Most of the 198 tests are against these pure catalogs.",
      tradeoff: "One more layer to keep aligned when adding a command; a plan and its adapter must evolve together.",
      alternative:
        "Inline command logic per handler, the way most CLIs ship. Rejected for testability and because the same engine had to serve both manual commands and the automated pipeline.",
    },
    {
      title: "Automation never approves itself",
      decision:
        "Operations that touch a repository carry an explicit approval key (auto_commit, auto_push, auto_deploy, auto_release) that must come from config or a --yes flag. Automation level alone never grants them, and production deploys are never automated regardless of settings.",
      reason:
        "A tool that chains git → GitHub → release unattended needs a bright line between \"observing\" and \"mutating\". The audit trail records where each approval came from.",
      tradeoff: "Fully unattended runs need deliberate configuration first; the pipeline refuses and exits 4 rather than guessing.",
      alternative:
        "An --auto-everything flag for convenience. Rejected: the whole safety model exists to make that impossible by accident.",
    },
    {
      title: "The registry is memory, not config",
      decision:
        "Discovered commands, proven steps, deploy procedures and last-run stamps persist per project in a local registry. A step resolved and passing once is remembered; an unresolved step reports NOT_CONFIGURED with the actual reason (listing the scripts that do exist).",
      reason:
        "Solo workflows repeat. Remembering \"this Flutter app's test command is flutter test\" removes friction without inventing a default command that might be wrong.",
      tradeoff: "Stateful tools can drift; the registry is plain JSON I can inspect, and raw-path refs are deliberately not trusted for memory writes.",
      alternative: "A per-project YAML config I hand-maintain. Rejected: duplicated the friction the tool was meant to remove.",
    },
    {
      title: "Run TypeScript directly — no compile step",
      decision:
        "Node ≥23.6 executes the .ts sources (allowImportingTsExtensions). `npm link` exposes a bin shim that imports src/cli.ts.",
      reason:
        "A build step for a CLI is a source of stale-artifact bugs — the very category this tool exists to catch. Shipping source means what I run is what I test.",
      tradeoff: "Locked to recent Node; startup pays TS compilation; distribution is source/tarball, not npm-published (package.json is intentionally private: true).",
      alternative: "tsup/tsc to dist/. Rejected: it would add the class of failure I refuse to trust in others.",
    },
  ],
  testing:
    "The suite is 198 tests in 18 files on Node's built-in test runner — TAP, no test framework dependency. Coverage follows the architecture: pure plan catalogs get unit tests; executors get mock-runner sandbox tests that emulate the state real verbs leave behind; the safety gate has a full approval-matrix test (level must not approve flagged ops, sibling flags must not leak approval, --no + --yes must refuse). CI (typecheck + full suite on push/PR) and the tag-triggered Release workflow run on GitHub Actions. The repo dogfoods itself: every v0.7.x release was cut through Hermes' own gated pipeline, and when a real CD failure happened on the runner (npm pack without a dist/ directory), the failed run and its tag were kept as audit trail — the fix shipped forward as the next patch release instead of rewriting history.",
  retrospective: [
    "TOCTOU taught the hardest lesson: plan-time snapshots go stale inside a single run when an earlier stage mutates the repo. Consumers of pipeline-top facts must re-read at execution time; one stage shipped without this and was fixed in the 7.5 audit.",
    "Documentation is a safety surface: an undocumented approval mechanism (an env var) counted as an audit finding in its own right. Behavior-vs-docs grepping is now part of hardening passes.",
    "The portfolio metadata artifact (schema v1) cannot yet carry test counts or release tags — exactly the evidence a portfolio needs. Schema v2 should emit an evidence block, closing the loop the other half of this site assumes exists.",
    "The dashboard and serve commands read real state, but there is no cross-machine story yet; the registry is a single-user design and I'd rather say so than paper over it.",
  ],
};
