# Portfolio — Reyon Lau Jiemin

Personal engineering portfolio: dark editorial, typography-driven, evidence-first.

**Stack:** Next.js 16 (App Router, Server Components by default) · TypeScript strict · Tailwind CSS 4 · zero animation libraries (motion is CSS-first with `prefers-reduced-motion` support).

## The honesty rule

Every project claim on this site lives in `content/` and must carry a `source` a reader can re-derive (a command, a file path, a CI run, a release tag). The registry is validated at import time — **unverifiable evidence, duplicate slugs, or dead public links on private repositories fail the production build.** This is enforced by `content/index.ts` + `test/content.test.ts`, not by discipline.

## Structure

```
content/            typed project registry + profile facts (single source of truth)
  schema.ts         Project/Evidence types + validateProject()
  projects/         case-study content per project
  index.ts          assertRegistry() — runs at import, fails the build
app/                routes: / · /work · /work/[slug] · /about · /contact · sitemap · robots
components/         layout, home sections, work blocks (3 client components only)
test/               content integrity + gate + link tests (node --test)
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run verify   # typecheck + lint + tests + production build
```

## Deployment

Target: Vercel. Production domain: **PENDING** — until it is set, `metadataBase` stays unset, the sitemap is intentionally empty, and JSON-LD emits relative URLs, so no fabricated domain can leak into search metadata. Set `NEXT_PUBLIC_SITE_URL` when the domain is final.
