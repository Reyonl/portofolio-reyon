import { validateProject, type Project } from "./schema.ts";
import { hermesDevops } from "./projects/hermes-devops.ts";
import { dailyCo } from "./projects/daily-co.ts";
import { warungLupiFlutter, warungLupiWeb } from "./projects/warung-lupi.ts";

// The registry is validated at module load. In a Next build this runs during
// "Collecting page data" — invalid content (unverifiable evidence, dead-link
// shapes, duplicate slugs) fails the build. That is the content-integrity gate
// from the P1.1 contract, enforced by construction rather than by discipline.

export const projects: Project[] = [hermesDevops, dailyCo, warungLupiFlutter, warungLupiWeb];

export function assertRegistry(): void {
  const errors: string[] = [];
  const seen = new Set<string>();
  const seenIndex = new Set<number>();
  for (const p of projects) {
    errors.push(...validateProject(p));
    if (seen.has(p.slug)) errors.push(`duplicate slug: ${p.slug}`);
    seen.add(p.slug);
    if (seenIndex.has(p.index)) errors.push(`duplicate display index: ${p.index}`);
    seenIndex.add(p.index);
  }
  if (errors.length) {
    throw new Error(
      `Content integrity check failed (${errors.length} problem(s)):\n  - ` +
        errors.join("\n  - "),
    );
  }
}

assertRegistry();

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function orderedProjects(): Project[] {
  return [...projects].sort((a, b) => a.index - b.index);
}

export function featuredProjects(): Project[] {
  return orderedProjects().filter((p) => p.featured);
}

export { type Project };
