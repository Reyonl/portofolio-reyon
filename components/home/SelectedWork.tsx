import Link from "next/link";
import { orderedProjects, statusLabel, type Project } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import StaggerRevealContainer from "@/components/animations/StaggerRevealContainer";

// Selected Work (P6.1) — a hierarchy of modules, not four identical cards:
// 01 Hermes = featured panel (3px border, blue offset shadow)
// 02/03   = standard panels (2px border)
// 04      = compact strip (1px border)
// Hover/focus: border -> sky blue, arrow shifts. Keyboard focus mirrors hover.
// P6.2: the three blocks share ONE IntersectionObserver via
// StaggerRevealContainer (client island) instead of three ScrollReveal
// wrappers — panels enter 120ms apart; reduced-motion and no-JS users get
// plain visible children (animation classes never apply).

function SectionMarker({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[11px] tracking-[0.18em] text-[#63B3FF]">
        {String(index).padStart(2, "0")}
      </span>
      <span className="h-px w-8 bg-[#2A2E37]" aria-hidden="true" />
      <span className="meta-label">{label}</span>
    </div>
  );
}

function Proof({ project }: { project: Project }) {
  return (
    <div className="flex md:flex-col gap-x-6 gap-y-3 md:gap-2">
      {project.evidence.slice(0, 2).map((e) => (
        <div key={e.label}>
          <p className="font-mono text-[11px] text-[#F5F7FA] tracking-[0.04em] leading-snug">
            {e.value.length > 52 ? `${e.value.slice(0, 52)}…` : e.value}
          </p>
          <p className="meta-label mt-1">{e.label}</p>
        </div>
      ))}
    </div>
  );
}

function FeaturePanel({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="panel-feature block p-8 lg:p-10 bg-[#101217] shadow-offset-dark transition-[border-color,box-shadow] duration-200 hover:border-[#63B3FF] focus-visible:border-[#63B3FF]"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SectionMarker index={project.index} label={project.category.toUpperCase()} />
        <span className="meta-label flex items-center gap-2 text-[#63B3FF]">
          <span className="status-dot" aria-hidden="true" />
          {statusLabel(project.status)} · FLAGSHIP
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12 mt-8 items-start">
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-none text-[#F5F7FA]">
            {project.title}
            <span className="inline-block ml-4 align-middle text-[#2A2E37] group-hover:text-[#63B3FF] transition-colors">→</span>
          </h3>
          <p className="mt-5 text-[#9AA1AD] leading-relaxed max-w-2xl">{project.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
        <div className="border-t lg:border-t-0 lg:border-l border-[#2A2E37] pt-6 lg:pt-1 lg:pl-8">
          <p className="meta-label mb-4">EVIDENCE</p>
          <Proof project={project} />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#2A2E37] flex items-center justify-between gap-6 flex-wrap">
        <p className="meta-label">{project.period}</p>
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#63B3FF] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
          View case study <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

function StandardRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group panel block p-7 lg:p-8 hover:border-[#63B3FF] transition-[border-color,box-shadow,transform] duration-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-[56px_1fr_240px] gap-y-4 md:gap-x-10 items-start">
        <SectionMarker index={index} label="" />
        <div className="min-w-0 md:-mt-5">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-[#F5F7FA] group-hover:text-[#63B3FF] transition-colors duration-200">
            {project.title}
            <span className="inline-block ml-3 align-middle text-[#2A2E37] group-hover:text-[#63B3FF] group-hover:translate-x-1.5 transition-all duration-200">→</span>
          </h3>
          <p className="mt-2.5 text-[#9AA1AD] leading-relaxed max-w-2xl text-sm">{project.tagline}</p>
          <p className="meta-label mt-4">{project.category.toUpperCase()} · {project.period}</p>
        </div>
        <div className="md:pt-1 flex md:flex-col gap-x-6 gap-y-3 md:gap-2">
          <Proof project={project} />
          <p className="meta-label flex items-center gap-2 text-[#63B3FF]/80">
            <span className="status-dot md:hidden" aria-hidden="true" />
            {statusLabel(project.status)}
          </p>
        </div>
      </div>
    </Link>
  );
}

function CompactStrip({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border border-[#2A2E37] bg-[#101217] px-6 py-5 grid grid-cols-1 sm:grid-cols-[56px_1fr_auto] gap-x-6 gap-y-2 items-center hover:border-[#63B3FF] transition-colors duration-200"
    >
      <SectionMarker index={index} label="" />
      <div className="min-w-0">
        <p className="font-display text-lg text-[#F5F7FA] group-hover:text-[#63B3FF] transition-colors inline">
          {project.title}
        </p>
        <span className="text-[#9AA1AD] text-sm ml-3 hidden md:inline">{project.tagline.slice(0, 72)}…</span>
      </div>
      <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#63B3FF] sm:text-right">
        ECOSYSTEM NOTE <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}

export default function SelectedWork() {
  const projects = orderedProjects();
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section className="border-t border-[#2A2E37] py-28" aria-labelledby="work-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <SectionMarker index={1} label="SELECTED WORK" />
              <h2 id="work-heading" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-[#F5F7FA] mt-4">
                Four systems,
                <br />
                each with receipts.
              </h2>
            </div>
            <Link href="/work" className="meta-label text-[#9AA1AD] hover:text-[#63B3FF] transition-colors hover-line pb-2">
              ALL PROJECTS →
            </Link>
          </div>
        </ScrollReveal>

        <StaggerRevealContainer className="space-y-6" staggerDelay={120}>
          <div className="group">
            <FeaturePanel project={featured} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {rest
              .filter((p) => p.level !== "compact")
              .map((p) => (
                <StandardRow key={p.slug} project={p} index={p.index} />
              ))}
          </div>

          {rest
            .filter((p) => p.level === "compact")
            .map((p) => (
              <CompactStrip key={p.slug} project={p} index={p.index} />
            ))}
        </StaggerRevealContainer>
      </div>
    </section>
  );
}
