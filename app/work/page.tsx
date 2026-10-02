import type { Metadata } from "next";
import Link from "next/link";
import { orderedProjects } from "@/lib/projects";
import { statusLabel } from "@/lib/projects";
import StaggerRevealContainer from "@/components/animations/StaggerRevealContainer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { EvidenceList, RepoLink } from "@/components/work/Evidence";
import { productionUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering projects of Reyon Lau Jiemin: developer automation, web systems, and mobile applications — each documented as a case study with verifiable evidence.",
  alternates: productionUrl ? { canonical: `${productionUrl}/work` } : undefined,
};

export default function WorkPage() {
  const projects = orderedProjects();

  return (
    <div className="min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]),
          ]),
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-20">
          <p className="accent-label mb-4">SELECTED WORK</p>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-none text-[#F5F7FA]">
            Things I have
            <br />
            actually built.
          </h1>
          <p className="mt-6 text-[#9AA1AD] max-w-xl leading-relaxed">
            Four projects, ordered by what they prove about how I work. Every
            claim on this site carries the source a reader can re-derive it
            from.
          </p>
        </ScrollReveal>

        <StaggerRevealContainer className="space-y-20">
          {projects.map((project, i) => (
            <article key={project.slug} className="border border-[#2A2E37] bg-[#101217]">
                <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <span className="meta-label">
                        {String(i + 1).padStart(2, "0")} · {project.period}
                      </span>
                      <span className="meta-label flex items-center gap-2 text-[#63B3FF]">
                        <span className="status-dot" aria-hidden="true" />
                        {statusLabel(project.status)}
                      </span>
                    </div>

                    {project.featured && (
                      <p className="accent-label mb-3">FLAGSHIP CASE STUDY</p>
                    )}

                    <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-none text-[#F5F7FA] mb-4">
                      <Link
                        href={`/work/${project.slug}`}
                        className="hover:text-[#63B3FF] transition-colors duration-200"
                      >
                        {project.title}
                      </Link>
                    </h2>

                    <p className="text-[#9AA1AD] leading-relaxed max-w-prose mb-2">
                      {project.tagline}
                    </p>
                    <p className="meta-label mb-8">{project.category}</p>

                    <EvidenceList project={project} limit={4} />

                    <div className="mt-8 flex items-center gap-8 flex-wrap">
                      <Link
                        href={`/work/${project.slug}`}
                        className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase text-[#63B3FF]"
                      >
                        View case study
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          →
                        </span>
                      </Link>
                      <RepoLink project={project} />
                    </div>
                  </div>

                  <aside className="space-y-8 border-t lg:border-t-0 lg:border-l border-[#2A2E37] pt-8 lg:pt-2 lg:pl-10">
                    <div>
                      <p className="meta-label mb-2">ROLE</p>
                      <p className="font-mono text-[11px] text-[#9AA1AD] leading-relaxed">
                        {project.role}
                      </p>
                    </div>
                    <div>
                      <p className="meta-label mb-2">STACK</p>
                      <p className="font-mono text-[11px] text-[#9AA1AD] leading-relaxed">
                        {project.stack.join(" · ")}
                      </p>
                    </div>
                    <div>
                      <p className="meta-label mb-2">CASE STUDY</p>
                      <p className="font-mono text-[11px] text-[#9AA1AD] leading-relaxed">
                        {project.level === "flagship"
                          ? "Full engineering documentation"
                          : project.level === "standard"
                            ? "System-level case study"
                            : "Ecosystem note"}
                      </p>
                    </div>
                    {project.links.release && (
                      <div>
                        <p className="meta-label mb-2">LATEST RELEASE</p>
                        <a
                          href={project.links.release}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-[#63B3FF] hover-line"
                        >
                          GitHub Release ↗
                        </a>
                      </div>
                    )}
                  </aside>
                </div>
              </article>
          ))}
        </StaggerRevealContainer>
      </div>
    </div>
  );
}
