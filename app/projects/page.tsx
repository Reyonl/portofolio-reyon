import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Web applications and digital systems built by Reyon Lau Jiemin.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal className="mb-20">
          <SectionHeader
            index="02"
            label="SELECTED WORK"
            heading="All Projects"
          />
          <div className="flex items-center gap-4 mt-6 ml-10">
            <div className="h-px w-16 bg-[#222222]" />
            <p className="meta-label">
              {projects.length} project{projects.length !== 1 ? "s" : ""}{" "}
              documented
            </p>
          </div>
        </ScrollReveal>

        {/* Project list */}
        <div className="space-y-px">
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block border border-[#222222] overflow-hidden hover:border-[#C9B99A]/20 transition-all duration-500"
                aria-label={`${project.title} — ${project.description}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
                  {/* Image */}
                  <div className="relative h-48 lg:h-auto overflow-hidden bg-[#0D0D0D]">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 320px"
                        className="object-cover opacity-35 group-hover:opacity-55 group-hover:scale-[1.03] transition-all duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border border-[#222222] rotate-45" />
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="accent-label bg-[#080808]/80 px-2 py-1">
                          FLAGSHIP
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-between bg-[#0D0D0D] group-hover:bg-[#111111] transition-colors duration-500 min-h-[220px]">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="meta-label">
                          PROJECT / 0{index + 1} · {project.year}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="status-dot" />
                          <span className="meta-label text-[#C9B99A]">
                            {project.status === "completed"
                              ? "SHIPPED"
                              : "IN PROGRESS"}
                          </span>
                        </div>
                      </div>

                      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] text-[#F2F2F0] leading-none mb-2 group-hover:text-[#E8E2D5] transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="meta-label text-[#888888] mb-5">
                        {project.description}
                      </p>

                      {project.role && (
                        <p className="meta-label mb-3">
                          ROLE&nbsp;&nbsp;
                          <span className="text-[#555555]">{project.role}</span>
                        </p>
                      )}

                      <p className="meta-label">
                        STACK&nbsp;&nbsp;
                        <span className="text-[#555555]">
                          {project.technologies.join(" · ")}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 font-mono text-[11px] tracking-[0.15em] text-[#C9B99A] group-hover:gap-5 transition-all duration-300">
                      <span>VIEW CASE STUDY</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
