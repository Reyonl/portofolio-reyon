// P4 verification: every statically generated route must be reachable from
// the nav/footer, and every URL in the content registry must be well-formed.
// A dangling link is the most common portfolio failure — catch it at build.
import test from "node:test";
import assert from "node:assert/strict";

import { orderedProjects } from "../content/index.ts";

// Routes the app must serve (kept in sync manually with app/**; if a route is
// removed, this test fails and forces the nav/content to be corrected too).
const ROUTES = ["/", "/work", "/about", "/contact"];

function caseStudyPaths() {
  return orderedProjects().map((p) => `/work/${p.slug}`);
}

function repoUrls() {
  const urls: string[] = [];
  for (const p of orderedProjects()) {
    if (p.links.repo) urls.push(p.links.repo);
    if (p.links.release) urls.push(p.links.release);
    if (p.links.live) urls.push(p.links.live);
  }
  return urls;
}

test("internal routes are unique and kebab-case", () => {
  const all = [...ROUTES, ...caseStudyPaths()];
  assert.equal(new Set(all).size, all.length, "duplicate route");
  for (const r of all) assert.match(r, /^\/[a-z0-9\-/]*$/, `bad route shape: ${r}`);
});

test("nav and footer expose every internal route", async () => {
  const { readFile } = await import("node:fs/promises");
  const nav = await readFile(new URL("../components/layout/Nav.tsx", import.meta.url), "utf8");
  const footer = await readFile(new URL("../components/layout/Footer.tsx", import.meta.url), "utf8");
  for (const r of ROUTES) {
    if (r === "/") continue; // wordmark links home
    const covered = nav.includes(`"${r}"`) || footer.includes(`"${r}"`) || nav.includes(`{ href: "${r}"`) || footer.includes(`href: "${r}"`);
    assert.ok(covered, `${r} not reachable from nav/footer`);
  }
});

test("every case study page is linked from /work", async () => {
  const { readFile } = await import("node:fs/promises");
  const work = await readFile(new URL("../app/work/page.tsx", import.meta.url), "utf8");
  // /work builds hrefs from the registry: href={`/work/${project.slug}` —
  // assert the page iterates the registry and links per-slug (and that the
  // registry itself is covered by the content tests).
  assert.match(work, /orderedProjects\(\)/, "/work must render the project registry");
  assert.match(work, /\/work\/\$\{project\.slug\}/, "/work must link each project detail page");
});

test("external URLs are absolute https and from known hosts", () => {
  for (const u of repoUrls()) {
    assert.match(u, /^https:\/\//, `non-https url: ${u}`);
    assert.ok(
      /github\.com/.test(u),
      `unexpected external host (add deliberately if real): ${u}`,
    );
  }
});

// JSON-LD shape rules, asserted on the builders directly (the prerendered
// artifacts are checked by CI's build step + this same logic).
test("JSON-LD nodes are schema-complete", async () => {
  const { projectJsonLd, breadcrumbJsonLd, personJsonLd, websiteJsonLd, profilePageJsonLd } =
    await import("../lib/jsonld.ts");
  const nodes = [
    websiteJsonLd(),
    personJsonLd(),
    profilePageJsonLd(),
    breadcrumbJsonLd([{ name: "Home", path: "/" }]),
    ...orderedProjects().map((p) => projectJsonLd(p)),
  ];
  for (const n of nodes) {
    assert.equal(n["@context"], "https://schema.org", `@context missing: ${n["@type"]}`);
    assert.ok(n["@type"], "every node needs @type");
    const j = JSON.stringify(n);
    assert.ok(!/localhost/.test(j), "no localhost URLs in structured data");
    assert.ok(!/aggregateRating|"\s*employer/i.test(j), "no unverifiable properties");
  }
});
