import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { statusLabel } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FeaturedProjects() {
  const featured = featuredProjects();

  return (
    <section
      className="border-t border-[#222222] py-28"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-16">
          <SectionHeader
            index="02"
            label="SELECTED WORK"
            heading={<span id="featured-heading">Selected Projects</span>}
          />
        </ScrollReveal>

        {/* Project list */}
        <div className="space-y-0">
          {featured.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.05}>
              <Link
                href={`/work/${project.slug}`}
                className="group block border border-[#222222] overflow-hidden hover:border-[#C9B99A]/20 transition-all duration-500"
                aria-label={`${project.title} — ${project.summary}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
                  {/* Identity panel (replaces cover image; visual rebuild in P3) */}
                  <div className="relative min-h-[220px] bg-[#0D0D0D] p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#222222]">
                    <div>
                      {project.featured && (
                        <span className="accent-label">FLAGSHIP PROJECT</span>
                      )}
                      <h3 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] text-[#F2F2F0] leading-none mt-6 group-hover:text-[#E8E2D5] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="meta-label text-[#888888] mt-3">{project.category}</p>
                    </div>

                    {/* Evidence chips — verifiable claims only */}
                    <div className="flex flex-wrap gap-2 mt-8">
                      {project.evidence.slice(0, 3).map((e) => (
                        <span
                          key={e.label}
                          className="font-mono text-[10px] tracking-[0.08em] text-[#C9B99A]/80 border border-[#222222] px-2.5 py-1.5 bg-[#080808]"
                        >
                          {e.value.length > 28 ? `${e.value.slice(0, 28)}…` : e.value}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-between bg-[#0D0D0D] group-hover:bg-[#111111] transition-colors duration-500">
                    <div>
                      {/* Index + status */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="meta-label">
                          PROJECT / 0{index + 1} · {project.period}
                        </span>
                        <span className="meta-label flex items-center gap-2 text-[#C9B99A]">
                          <span className="status-dot" aria-hidden="true" />
                          {statusLabel(project.status)}
                        </span>
                      </div>

                      <p className="meta-label text-[#888888] tracking-widest mb-2">
                        {project.summary}
                      </p>

                      {/* Role */}
                      {project.role && (
                        <p className="meta-label mt-5 mb-5">
                          ROLE&nbsp;&nbsp;
                          <span className="text-[#888888]">{project.role}</span>
                        </p>
                      )}

                      {/* Stack */}
                      <div className="space-y-1 mb-8">
                        <p className="meta-label">STACK</p>
                        <p className="font-mono text-xs text-[#555555] leading-relaxed">
                          {project.stack.join(" · ")}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.15em]">
                      <span className="text-[#C9B99A] group-hover:text-[#F2F2F0] transition-colors duration-300">
                        VIEW CASE STUDY
                      </span>
                      <span className="text-[#C9B99A] group-hover:translate-x-1.5 transition-transform duration-300">
                        →
                      </span>
                      <div className="flex-1 h-px bg-[#222222] group-hover:bg-[#C9B99A]/20 transition-colors duration-300" />
                      {project.links.repo && (
                        <span className="text-[#555555]">VIEW SOURCE ↗</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* All work link */}
        <ScrollReveal delay={0.15} className="mt-8 flex justify-end">
          <Link
            href="/projects"
            className="font-mono text-[11px] tracking-[0.18em] text-[#555555] hover:text-[#C9B99A] transition-colors duration-200 hover-line"
          >
            ALL PROJECTS →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
