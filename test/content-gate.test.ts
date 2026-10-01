// Proves the build-gate actually gates: assertRegistry() must THROW when the
// registry contains invalid content. If this test ever passes silently, the
// gate is broken — which is worse than having no gate at all.
import test from "node:test";
import assert from "node:assert/strict";

import { projects, assertRegistry } from "../content/index.ts";

test("assertRegistry throws when evidence loses its source", () => {
  const target = projects.find((p) => p.slug === "hermes-devops")!;
  const original = target.evidence[0].source;
  try {
    target.evidence[0].source = "   ";
    assert.throws(() => assertRegistry(), /Content integrity check failed/);
  } finally {
    target.evidence[0].source = original;
  }
});

test("assertRegistry throws on duplicate slug", () => {
  const extra = structuredClone(projects[1]);
  projects.push(extra);
  try {
    assert.throws(() => assertRegistry(), /duplicate slug/);
  } finally {
    projects.pop();
  }
});

test("registry is healthy again after mutation is undone", () => {
  assert.doesNotThrow(() => assertRegistry());
});
