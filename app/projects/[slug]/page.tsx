import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const architectureNodes = project.architectureNodes ?? [];
  const challenges = project.challenges ?? [];
  const features = project.features ?? [];

  return (
    <article className="min-h-screen pt-14" aria-label={`${project.title} case study`}>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden bg-[#0D0D0D]">
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover opacity-25"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-6 lg:left-12 z-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[#555555] hover:text-[#C9B99A] transition-colors uppercase"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>
            ALL PROJECTS
          </Link>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-10">
          <div className="mx-auto max-w-7xl">
            {project.featured && (
              <p className="accent-label mb-4">FLAGSHIP PROJECT</p>
            )}
            <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] text-[#F2F2F0] leading-none">
              {project.title}
            </h1>
            <p className="meta-label text-[#888888] mt-3">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Meta strip */}
      <div className="border-y border-[#222222] bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#222222]">
            {[
              { label: "YEAR", value: project.year.toString() },
              { label: "ROLE", value: project.role ?? "—" },
              {
                label: "STATUS",
                value: project.status === "completed" ? "SHIPPED" : "IN PROGRESS",
                accent: true,
              },
              { label: "CATEGORY", value: project.category ?? "—" },
            ].map((item) => (
              <div key={item.label} className="px-5 py-5">
                <p className="meta-label mb-1.5">{item.label}</p>
                <p
                  className={`font-mono text-[11px] tracking-[0.08em] ${
                    item.accent ? "text-[#C9B99A]" : "text-[#888888]"
                  }`}
                >
                  {item.accent && <span className="status-dot" />}
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-24">
          {/* Main content */}
          <div className="space-y-24">
            {/* 01 / CONTEXT */}
            {project.context && (
              <ScrollReveal>
                <CaseSection index="01" label="CONTEXT">
                  <p className="text-[#888888] leading-relaxed">
                    {project.context}
                  </p>
                </CaseSection>
              </ScrollReveal>
            )}

            {/* 02 / PROBLEM */}
            {project.problem && (
              <ScrollReveal>
                <CaseSection index="02" label="THE PROBLEM">
                  <p className="font-display text-xl text-[#F2F2F0] leading-relaxed mb-4">
                    {project.problem.split(".")[0]}.
                  </p>
                  <p className="text-[#888888] leading-relaxed">
                    {project.problem.split(".").slice(1).join(".").trim()}
                  </p>
                </CaseSection>
              </ScrollReveal>
            )}

            {/* 03 / APPROACH */}
            {project.approach && (
              <ScrollReveal>
                <CaseSection index="03" label="APPROACH">
                  <p className="text-[#888888] leading-relaxed">
                    {project.approach}
                  </p>
                </CaseSection>
              </ScrollReveal>
            )}

            {/* 04 / ARCHITECTURE */}
            {architectureNodes.length > 0 && (
              <ScrollReveal>
                <CaseSection index="04" label="SYSTEM ARCHITECTURE">
                  <div className="flex flex-col items-start gap-0 w-full max-w-xs">
                    {architectureNodes.map((node, i) => (
                      <div key={node.label} className="w-full">
                        <div
                          className={`arch-node w-full text-left ${
                            node.highlight
                              ? "border-[#C9B99A]/30 text-[#C9B99A]"
                              : ""
                          }`}
                        >
                          <p
                            className={`font-mono text-[11px] tracking-[0.1em] ${
                              node.highlight ? "text-[#C9B99A]" : "text-[#888888]"
                            }`}
                          >
                            {node.label}
                          </p>
                          {node.sublabel && (
                            <p className="meta-label mt-0.5 opacity-50">
                              {node.sublabel}
                            </p>
                          )}
                        </div>
                        {i < architectureNodes.length - 1 && (
                          <div className="arch-arrow" />
                        )}
                      </div>
                    ))}
                  </div>
                </CaseSection>
              </ScrollReveal>
            )}

            {/* 05 / ENGINEERING CHALLENGES */}
            {challenges.length > 0 && (
              <ScrollReveal>
                <CaseSection index="05" label="ENGINEERING CHALLENGES">
                  <div className="space-y-10">
                    {challenges.map((c, i) => (
                      <div
                        key={c.title}
                        className="border-l border-[#222222] pl-6"
                      >
                        <p className="meta-label mb-3">
                          CHALLENGE / 0{i + 1}
                        </p>
                        <h4 className="font-display text-lg text-[#F2F2F0] mb-4">
                          {c.title}
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="meta-label mb-1.5">PROBLEM</p>
                            <p className="text-[#888888] text-sm leading-relaxed">
                              {c.problem}
                            </p>
                          </div>
                          <div>
                            <p className="meta-label mb-1.5">SOLUTION</p>
                            <p className="text-[#555555] text-sm leading-relaxed">
                              {c.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CaseSection>
              </ScrollReveal>
            )}

            {/* 06 / FEATURES */}
            {features.length > 0 && (
              <ScrollReveal>
                <CaseSection index="06" label="FEATURES IMPLEMENTED">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-[#888888]"
                      >
                        <span className="text-[#C9B99A] mt-0.5 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </CaseSection>
              </ScrollReveal>
            )}

            {/* 07 / RESULT */}
            {project.result && (
              <ScrollReveal>
                <CaseSection index="07" label="RESULT">
                  <p className="font-display text-xl text-[#F2F2F0] leading-relaxed">
                    {project.result}
                  </p>
                </CaseSection>
              </ScrollReveal>
            )}

            {/* 08 / LESSONS */}
            {project.lessons && (
              <ScrollReveal>
                <CaseSection index="08" label="LESSONS LEARNED">
                  <p className="text-[#888888] leading-relaxed">
                    {project.lessons}
                  </p>
                </CaseSection>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-10 lg:sticky lg:top-20 self-start">
            {/* Stack */}
            <ScrollReveal delay={0.1}>
              <div className="border border-[#222222] p-6 bg-[#0D0D0D]">
                <p className="meta-label mb-5">TECH STACK</p>
                <div className="space-y-2">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-[#555555] shrink-0" />
                      <span className="font-mono text-[11px] text-[#888888]">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Links */}
            <ScrollReveal delay={0.15}>
              <div className="border border-[#222222] p-6 bg-[#0D0D0D]">
                <p className="meta-label mb-5">EXTERNAL LINKS</p>
                <div className="space-y-4">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between font-mono text-[11px] text-[#555555] hover:text-[#C9B99A] transition-colors tracking-[0.15em] uppercase hover-line"
                    >
                      LIVE SITE <span>↗</span>
                    </a>
                  ) : (
                    <p className="meta-label opacity-30">No live URL</p>
                  )}
                  {project.repositoryUrl ? (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between font-mono text-[11px] text-[#555555] hover:text-[#C9B99A] transition-colors tracking-[0.15em] uppercase hover-line"
                    >
                      VIEW SOURCE <span>↗</span>
                    </a>
                  ) : (
                    <p className="meta-label opacity-30">Private repository</p>
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Back */}
            <ScrollReveal delay={0.2}>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[#555555] hover:text-[#C9B99A] transition-colors uppercase"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  ←
                </span>
                ALL PROJECTS
              </Link>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </article>
  );
}

/* Reusable case study section */
function CaseSection({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <span className="accent-label">{index}</span>
        <div className="flex-1 h-px bg-[#222222]" />
        <span className="meta-label">{label}</span>
      </div>
      {children}
    </div>
  );
}
