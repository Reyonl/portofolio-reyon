import type { Project } from "@/content/schema";
import { statusLabel } from "@/lib/projects";

/**
 * Repository affordance with the honesty rule built in (P1.1 §12.3):
 * - public repo   → real link
 * - private repo  → a STATEMENT, never a dead link
 */
export function RepoLink({ project }: { project: Project }) {
  const { repo, repoVisibility } = project.links;
  if (repo) {
    return (
      <a
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#9AA1AD] hover:text-[#63B3FF] transition-colors duration-200 hover-line w-fit"
      >
        REPOSITORY ↗
      </a>
    );
  }
  if (repoVisibility === "private") {
    return (
      <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#9AA1AD]">
        Private repository
      </p>
    );
  }
  return null;
}

/**
 * Evidence block: every item must carry a source (enforced at build).
 * Rendered as claim + how-to-verify, never as naked numbers.
 */
export function EvidenceList({
  project,
  limit,
}: {
  project: Project;
  limit?: number;
}) {
  const items = limit ? project.evidence.slice(0, limit) : project.evidence;
  return (
    <ul className="divide-y divide-[#171A21] border-y border-[#171A21]">
      {items.map((e) => (
        <li key={e.label} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:gap-8 group/e">
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9AA1AD]">
              {e.label}
            </p>
            <p className="text-sm text-[#F5F7FA] leading-snug mt-0.5">{e.value}</p>
          </div>
          <p
            className="font-mono text-[10px] leading-snug text-[#9AA1AD] sm:text-right sm:max-w-[45%] shrink-0 mt-1 sm:mt-0"
            title={e.source}
          >
            {e.source}
          </p>
        </li>
      ))}
    </ul>
  );
}

export { statusLabel };
