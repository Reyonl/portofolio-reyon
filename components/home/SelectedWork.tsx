import Link from "next/link";
import { orderedProjects, statusLabel } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Selected Work — case-study previews, not image cards. The preview shows
// what each project PROVES (system line + evidence), because a recruiter
// decides in ~15 seconds whether to go deeper.

export default function SelectedWork() {
  const projects = orderedProjects();

  return (
    <section className="border-t border-[#222222] py-28" aria-labelledby="work-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="accent-label mb-4">SELECTED WORK</p>
              <h2 id="work-heading" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-[#F2F2F0]">
                Four systems,
                <br />
                each with receipts.
              </h2>
            </div>
            <Link href="/work" className="meta-label text-[#555555] hover:text-[#C9B99A] transition-colors hover-line pb-2">
              ALL PROJECTS →
            </Link>
          </div>
        </ScrollReveal>

        <div className="border-t border-[#222222]">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid grid-cols-1 md:grid-cols-[64px_1fr_260px] gap-y-4 md:gap-x-10 items-baseline border-b border-[#222222] py-10 md:py-12 transition-colors duration-300 hover:bg-[#0D0D0D]"
                aria-label={`${project.title} — view case study`}
              >
                <span className="section-index md:pl-2" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-tight text-[#F2F2F0] group-hover:text-[#C9B99A] transition-colors duration-200">
                    {project.title}
                    <span className="inline-block ml-3 align-middle text-[#222222] group-hover:text-[#C9B99A] group-hover:translate-x-1.5 transition-all duration-200">→</span>
                  </h3>
                  <p className="mt-3 text-[#888888] leading-relaxed max-w-2xl">{project.tagline}</p>
                  <p className="meta-label mt-4">
                    {project.stack.slice(0, 4).join(" · ")}
                  </p>
                </div>

                {/* Proof column — this is the case-study-preview idea made concrete */}
                <div className="flex md:flex-col gap-x-6 gap-y-3 md:gap-0 md:pt-1">
                  {project.evidence.slice(0, 2).map((e) => (
                    <div key={e.label}>
                      <p className="font-mono text-[11px] text-[#F2F2F0] tracking-[0.04em] leading-snug">
                        {e.value.length > 52 ? `${e.value.slice(0, 52)}…` : e.value}
                      </p>
                      <p className="meta-label mt-1 opacity-60">{e.label}</p>
                    </div>
                  ))}
                  <p className="meta-label mt-0 md:mt-1 flex items-center gap-2 text-[#C9B99A]/70">
                    <span className="status-dot md:hidden" aria-hidden="true" />
                    {statusLabel(project.status)}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
