import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects } from "@/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

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
                href={`/projects/${project.slug}`}
                className="group block border border-[#222222] overflow-hidden hover:border-[#C9B99A]/20 transition-all duration-500"
                aria-label={`${project.title} — ${project.description}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-60 lg:min-h-[360px] overflow-hidden bg-[#0D0D0D]">
                    {project.coverImage && (
                      <Image
                        src={project.coverImage}
                        alt={`${project.title} cover`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                      />
                    )}
                    {/* Grid overlay on hover */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                      style={{
                        backgroundImage:
                          "linear-gradient(#C9B99A08 1px, transparent 1px), linear-gradient(90deg, #C9B99A08 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                      }}
                    />
                    {/* Flagship badge */}
                    {project.featured && (
                      <div className="absolute top-5 left-5">
                        <span className="accent-label bg-[#080808]/80 px-2.5 py-1.5 backdrop-blur-sm">
                          FLAGSHIP PROJECT
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-between bg-[#0D0D0D] group-hover:bg-[#111111] transition-colors duration-500">
                    <div>
                      {/* Index + year */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="meta-label">
                          PROJECT / 0{index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="status-dot" />
                          <span className="meta-label text-[#C9B99A]">
                            {project.status === "completed"
                              ? "SHIPPED"
                              : "IN PROGRESS"}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] text-[#F2F2F0] leading-none mb-3 group-hover:text-[#E8E2D5] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="meta-label text-[#888888] tracking-widest mb-2">
                        {project.description}
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
                          {project.technologies.join(" · ")}
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
                      {project.repositoryUrl && (
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
