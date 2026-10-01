import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, orderedProjects, statusLabel } from "@/lib/projects";
import { productionUrl } from "@/lib/site";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { EvidenceList, RepoLink } from "@/components/work/Evidence";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return orderedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: productionUrl
      ? { canonical: `${productionUrl}/work/${project.slug}` }
      : undefined,
    openGraph: {
      type: "article",
      title: `${project.title} — case study`,
      description: project.summary,
    },
  };
}

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
    <section>
      <div className="flex items-center gap-4 mb-8">
        <span className="accent-label">{index}</span>
        <div className="flex-1 h-px bg-[#222222]" aria-hidden="true" />
        <h2 className="meta-label m-0">{label}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: project.title, path: `/work/${project.slug}` },
            ]),
            projectJsonLd(project),
          ]),
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-between gap-4 mb-10">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#888888] hover:text-[#C9B99A] transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
              All work
            </Link>
            <span className="meta-label flex items-center gap-2 text-[#C9B99A]">
              <span className="status-dot" aria-hidden="true" />
              {statusLabel(project.status)}
            </span>
          </div>

          {project.featured && <p className="accent-label mb-4">FLAGSHIP CASE STUDY</p>}
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-none text-[#F2F2F0] mb-5">
            {project.title}
          </h1>
          <p className="text-[clamp(1.05rem,2vw,1.35rem)] text-[#888888] leading-relaxed max-w-3xl font-display">
            {project.tagline}
          </p>
        </ScrollReveal>

        {/* Facts strip */}
        <ScrollReveal delay={0.05}>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#222222] border-y border-[#222222]">
            {[
              { label: "CATEGORY", value: project.category },
              { label: "ROLE", value: project.role },
              { label: "PERIOD", value: project.period },
              { label: "STACK", value: project.stack.join(" · ") },
            ].map((item) => (
              <div key={item.label} className="px-5 py-5 first:pl-0">
                <p className="meta-label mb-1.5">{item.label}</p>
                <p className="font-mono text-[11px] tracking-[0.06em] text-[#888888] leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Body */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 lg:gap-20">
          <div className="space-y-20 min-w-0">
            <ScrollReveal>
              <CaseSection index="01" label="OVERVIEW">
                <Prose text={project.overview ?? ""} />
              </CaseSection>
            </ScrollReveal>

            {(project.problem || project.context) && (
              <ScrollReveal>
                <CaseSection index="02" label="THE PROBLEM">
                  {project.problem && <Prose text={project.problem} />}
                  {project.context && (
                    <div className="mt-8 border-l border-[#222222] pl-6">
                      <p className="meta-label mb-2">CONTEXT</p>
                      <Prose text={project.context} muted />
                    </div>
                  )}
                </CaseSection>
              </ScrollReveal>
            )}

            {project.constraints && project.constraints.length > 0 && (
              <ScrollReveal>
                <CaseSection index="03" label="CONSTRAINTS">
                  <ul className="space-y-3">
                    {project.constraints.map((c) => (
                      <li key={c} className="flex gap-4 text-[#888888] text-sm leading-relaxed">
                        <span className="text-[#C9B99A] font-mono text-[11px] mt-0.5 shrink-0">▸</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </CaseSection>
              </ScrollReveal>
            )}

            {project.architectureNodes && project.architectureNodes.length > 0 && (
              <ScrollReveal>
                <CaseSection index="04" label="ARCHITECTURE">
                  <div className="flex flex-col items-start gap-0 w-full max-w-sm">
                    {project.architectureNodes.map((node, i) => (
                      <div key={node.label} className="w-full">
                        <div
                          className={`arch-node w-full text-left ${
                            node.highlight ? "border-[#C9B99A]/30" : ""
                          }`}
                        >
                          <p className={`font-mono text-[11px] tracking-[0.1em] ${node.highlight ? "text-[#C9B99A]" : "text-[#888888]"}`}>
                            {node.label}
                          </p>
                          {node.sublabel && <p className="meta-label mt-0.5">{node.sublabel}</p>}
                        </div>
                        {i < project.architectureNodes!.length - 1 && <div className="arch-arrow" aria-hidden="true" />}
                      </div>
                    ))}
                  </div>
                </CaseSection>
              </ScrollReveal>
            )}

            {project.decisions && project.decisions.length > 0 && (
              <ScrollReveal>
                <CaseSection index="05" label="ENGINEERING DECISIONS">
                  <div className="space-y-12">
                    {project.decisions.map((d) => (
                      <div key={d.title} className="border-l border-[#C9B99A]/20 pl-6">
                        <h3 className="font-display text-xl text-[#F2F2F0] mb-5">{d.title}</h3>
                        <dl className="space-y-3 text-sm leading-relaxed">
                          <Row term="DECISION" desc={d.decision} strong />
                          <Row term="REASON" desc={d.reason} />
                          <Row term="TRADE-OFF" desc={d.tradeoff} />
                          <Row term="ALTERNATIVE REJECTED" desc={d.alternative} />
                        </dl>
                      </div>
                    ))}
                  </div>
                </CaseSection>
              </ScrollReveal>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <ScrollReveal>
                <CaseSection index="05" label="CHALLENGES">
                  <div className="space-y-10">
                    {project.challenges.map((c) => (
                      <div key={c.title} className="border-l border-[#222222] pl-6">
                        <h3 className="font-display text-lg text-[#F2F2F0] mb-4">{c.title}</h3>
                        <dl className="space-y-3 text-sm leading-relaxed">
                          <Row term="PROBLEM" desc={c.problem} />
                          <Row term="SOLUTION" desc={c.solution} strong />
                        </dl>
                      </div>
                    ))}
                  </div>
                </CaseSection>
              </ScrollReveal>
            )}

            {project.testing && (
              <ScrollReveal>
                <CaseSection index="06" label="TESTING & EVIDENCE">
                  <Prose text={project.testing} />
                  <div className="mt-10">
                    <EvidenceList project={project} />
                  </div>
                </CaseSection>
              </ScrollReveal>
            )}

            {project.retrospective && project.retrospective.length > 0 && (
              <ScrollReveal>
                <CaseSection index="07" label="WHAT I'D CHANGE">
                  <div className="space-y-6">
                    {project.retrospective.map((r) => (
                      <p key={r.slice(0, 40)} className="text-[#888888] leading-relaxed text-sm border-l border-[#222222] pl-5">
                        {r}
                      </p>
                    ))}
                  </div>
                </CaseSection>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 self-start">
            <ScrollReveal delay={0.1}>
              <div className="border border-[#222222] p-6 bg-[#0D0D0D]">
                <p className="meta-label mb-5">STACK</p>
                <ul className="space-y-2">
                  {project.stack.map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#555555] shrink-0" aria-hidden="true" />
                      <span className="font-mono text-[11px] text-[#888888]">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="border border-[#222222] p-6 bg-[#0D0D0D] space-y-4">
                <p className="meta-label">LINKS & STATUS</p>
                <RepoLink project={project} />
                {project.links.release && (
                  <a
                    href={project.links.release}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-[11px] tracking-[0.15em] uppercase text-[#888888] hover:text-[#C9B99A] transition-colors hover-line"
                  >
                    Release ↗
                  </a>
                )}
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-[11px] tracking-[0.15em] uppercase text-[#888888] hover:text-[#C9B99A] transition-colors hover-line"
                  >
                    Live site ↗
                  </a>
                ) : (
                  <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#888888]">
                    No live deployment
                  </p>
                )}
                <p className="meta-label pt-3 border-t border-[#111111]">
                  Status: {statusLabel(project.status)}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase text-[#C9B99A]"
              >
                Discuss this work
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </article>
  );
}

function Prose({ text, muted }: { text: string; muted?: boolean }) {
  return (
    <div className={`space-y-4 leading-relaxed ${muted ? "text-[#888888]" : "text-[#888888]"}`}>
      {text.split("\n\n").map((para) => (
        <p key={para.slice(0, 50)}>{para}</p>
      ))}
    </div>
  );
}

function Row({ term, desc, strong }: { term: string; desc: string; strong?: boolean }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4 items-baseline">
      <dt className="meta-label pt-0.5">{term}</dt>
      <dd className={strong ? "text-[#F2F2F0]" : "text-[#888888]"}>{desc}</dd>
    </div>
  );
}
