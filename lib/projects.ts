// Public accessor layer over the content registry (content/).
// Pages import from here, never from content/ directly — this keeps the
// enrichment seam (P1.1 §16: build-time Hermes/GitHub merge, opt-in, fail-soft)
// in one place.

export {
  projects,
  orderedProjects,
  getProjectBySlug,
  featuredProjects,
  assertRegistry,
} from "@/content";
export type { Project, EvidenceItem, CaseStudyLevel } from "@/content/schema";

import type { ProjectStatus } from "@/content/schema";

export function statusLabel(status: ProjectStatus): string {
  switch (status) {
    case "active":
      return "ACTIVE";
    case "shipped":
      return "SHIPPED";
    case "archived":
      return "ARCHIVED";
    case "in-development":
      return "IN DEVELOPMENT";
  }
}
