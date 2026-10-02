// Content schema — the honesty mechanism.
//
// Every Project is validated at import time by assertRegistry() (see content/index.ts).
// A project with an evidence item that has no `source`, a dead/unverified link shape,
// or an invalid status/level FAILS THE BUILD. This is deliberate (P1.1 §12, P2 contract):
// a typo'd or unverifiable metric must be impossible to ship.

export type ProjectStatus = "active" | "shipped" | "archived" | "in-development";
export type CaseStudyLevel = "flagship" | "standard" | "compact";
export type EvidenceKind =
  | "test"
  | "ci"
  | "release"
  | "artifact"
  | "architecture"
  | "capability";

export interface EvidenceItem {
  /** Short human label, e.g. "Unit + integration tests". */
  label: string;
  /** The verifiable statement, e.g. "198 / 198 passing". No value may exist here
   *  that cannot be re-derived from `source`. Qualitative capability statements are
   *  allowed but must name what a reader can point at. */
  value: string;
  kind: EvidenceKind;
  /** How a reader re-derives this claim: a command, a file path, a workflow name,
   *  a release tag, or a URL. REQUIRED — an evidence item without a source fails the build. */
  source: string;
  /** Optional clickable proof (workflow run, release page, file in repo). */
  url?: string;
}

export interface ProjectLinks {
  /** GitHub repository URL. Only set if the repo is PUBLIC and reachable. */
  repo?: string;
  /** True repository state regardless of visibility. When visibility is "private",
   *  `repo` must be unset and renderers must say "Private repository" — never a dead link. */
  repoVisibility?: "public" | "private";
  /** GitHub Release page (only if a release actually exists). */
  release?: string;
  /** Live deployment — only if a real, reachable live site exists. Currently none. */
  live?: string;
}

export interface DecisionBlock {
  title: string;
  decision: string;
  reason: string;
  tradeoff: string;
  alternative: string;
}

export interface ChallengeBlock {
  title: string;
  problem: string;
  solution: string;
}

export interface CaseStudySection {
  /** Heading is a CLAIM, not a label (P1.1 §9). */
  heading: string;
  /** Body paragraphs, one idea each. */
  paragraphs: string[];
}

export interface ArchitectureNode {
  label: string;
  sublabel?: string;
  highlight?: boolean;
}

export interface Project {
  slug: string;
  /** Display order on /work and the homepage (1-based, unique). */
  index: number;
  title: string;
  /** One line: what the SYSTEM does — never "I built X with Laravel" (P1.1 B3). */
  tagline: string;
  /** Slightly longer summary used on cards and meta descriptions. */
  summary: string;
  category: string;
  role: string;
  /** Human period label, e.g. "2026 — present". */
  period: string;
  status: ProjectStatus;
  level: CaseStudyLevel;
  stack: string[];
  evidence: EvidenceItem[];
  links: ProjectLinks;
  featured: boolean;

  // Case study body (flagship + standard render these; compact renders overview+challenge only).
  overview?: string;
  problem?: string;
  context?: string;
  constraints?: string[];
  architectureNodes?: ArchitectureNode[];
  /** Optional verifiable code snippet displayed on flagship case studies. */
  codeSample?: {
    code: string;
    language?: string;
    caption?: string;
    highlightLines?: number[];
  };
  decisions?: DecisionBlock[];
  challenges?: ChallengeBlock[];
  testing?: string;
  retrospective?: string[];
}

const GITHUB_REPO_RE = /^https:\/\/github\.com\/Reyonl\/[\w.-]+$/;
const HTTPS_RE = /^https:\/\//;

export function validateProject(p: Project): string[] {
  const errors: string[] = [];
  if (!p.slug || !/^[a-z0-9-]+$/.test(p.slug))
    errors.push(`${p.slug || "?"}: slug missing or not kebab-case`);
  if (!p.title) errors.push(`${p.slug}: title required`);
  if (!p.tagline) errors.push(`${p.slug}: tagline required`);
  if (!p.summary) errors.push(`${p.slug}: summary required`);
  if (!p.stack.length) errors.push(`${p.slug}: stack must not be empty`);
  if (!["active", "shipped", "archived", "in-development"].includes(p.status))
    errors.push(`${p.slug}: invalid status "${p.status}"`);
  if (!["flagship", "standard", "compact"].includes(p.level))
    errors.push(`${p.slug}: invalid level "${p.level}"`);

  if (p.evidence.length === 0)
    errors.push(`${p.slug}: must carry at least one evidence item or be removed`);
  for (const e of p.evidence) {
    if (!e.source.trim())
      errors.push(`${p.slug} / evidence "${e.label}": no source — unverifiable claims fail the build`);
    if (e.url && !HTTPS_RE.test(e.url))
      errors.push(`${p.slug} / evidence "${e.label}": url must be https`);
  }

  if (p.links.repo) {
    if (!GITHUB_REPO_RE.test(p.links.repo))
      errors.push(`${p.slug}: repo link must be a github.com/Reyonl URL: ${p.links.repo}`);
    if (p.links.repoVisibility === "private")
      errors.push(`${p.slug}: repo link present but repository is private — dead public link`);
  }
  if (p.links.release && !HTTPS_RE.test(p.links.release))
    errors.push(`${p.slug}: release url must be https`);
  if (p.links.live && !HTTPS_RE.test(p.links.live))
    errors.push(`${p.slug}: live url must be https`);

  if ((p.level === "flagship" || p.level === "standard") && !p.overview)
    errors.push(`${p.slug}: ${p.level} case study requires overview`);
  return errors;
}
