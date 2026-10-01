// Content-integrity test (P2 contract: "invalid content must fail the build").
// Runs under plain `node --test` (Node >= 23.6 strips types natively) — the
// content/ module is self-contained relative-imports specifically so this file
// can import it without Next's alias resolution.
import test from "node:test";
import assert from "node:assert/strict";

import { projects, orderedProjects, getProjectBySlug } from "../content/index.ts";
import { validateProject } from "../content/schema.ts";

test("registry loads and passes integrity validation", () => {
  assert.ok(projects.length >= 3, "expected at least 3 projects");
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length, "slugs must be unique");
  assert.deepEqual(
    orderedProjects().map((p) => p.index),
    [...orderedProjects().map((p) => p.index)].sort((a, b) => a - b),
    "display order must be sorted",
  );
});

test("every evidence item carries a source", () => {
  for (const p of projects) {
    for (const e of p.evidence) {
      assert.ok(e.source.trim().length > 10, `${p.slug}/${e.label}: source too thin to re-derive`);
    }
  }
});

test("no private repo is linked publicly", () => {
  for (const p of projects) {
    if (p.links.repoVisibility === "private") {
      assert.equal(p.links.repo, undefined, `${p.slug}: private repo must not carry a public link`);
    }
    if (p.links.repo) assert.match(p.links.repo, /^https:\/\/github\.com\/Reyonl\//);
  }
});

test("no live URLs are claimed without a deployment", () => {
  // Current reality (P1 §12.4): none of these projects has a verified live site.
  for (const p of projects) {
    assert.equal(p.links.live, undefined, `${p.slug}: live link present but no verified deployment`);
  }
});

test("case study levels match content depth", () => {
  for (const p of projects) {
    if (p.level === "flagship") {
      assert.ok(p.decisions && p.decisions.length >= 3, `${p.slug}: flagship needs >=3 decisions`);
      assert.ok(p.retrospective?.length, `${p.slug}: flagship needs retrospective`);
      assert.ok(p.constraints?.length, `${p.slug}: flagship needs constraints`);
    }
    if (p.level === "standard") {
      assert.ok(p.challenges?.length, `${p.slug}: standard needs challenges`);
    }
  }
});

test("validator rejects an unverifiable evidence item", () => {
  const broken = structuredClone(getProjectBySlug("hermes-devops")!);
  broken.evidence.push({ label: "Made-up", value: "999 users", kind: "artifact", source: "  " });
  const errors = validateProject(broken);
  assert.ok(errors.some((e) => e.includes("no source")), "missing source must be an error");
});

test("validator rejects a dead public link on a private repo", () => {
  const broken = structuredClone(getProjectBySlug("hermes-devops")!);
  broken.links.repo = "https://github.com/Reyonl/hermes-devops";
  broken.links.repoVisibility = "private";
  const errors = validateProject(broken);
  assert.ok(errors.some((e) => e.includes("dead public link")), "private+linked must error");
});
