import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Flagship Story — one deep entry (Hermes) rendered as a reading experience,
// with its architecture drawn as a CSS diagram (no SVG art, no stock image).
// Purpose: the "2 minutes → sees engineering depth" step of the visit funnel.

export default function FlagshipStory() {
  const flagship = featuredProjects()[0];
  if (!flagship) return null;
  const nodes = flagship.architectureNodes ?? [];

  return (
    <section className="border-t border-[#222222] py-28" aria-labelledby="flagship-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Text */}
          <ScrollReveal>
            <p className="accent-label mb-4">FLAGSHIP — DEVELOPER AUTOMATION</p>
            <h2 id="flagship-heading" className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-[#F2F2F0] mb-8">
              A tool that refuses
              <br />
              to report success
              <br />
              <span className="text-[#888888]">without evidence.</span>
            </h2>
            <p className="text-[#888888] leading-relaxed max-w-prose mb-6">{flagship.overview}</p>
            <p className="text-[#888888] leading-relaxed max-w-prose mb-10">
              {flagship.problem}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[#222222] pt-6 mb-10">
              {flagship.evidence.slice(0, 4).map((e) => (
                <div key={e.label}>
                  <p className="font-mono text-[11px] text-[#F2F2F0]">{e.value.length > 46 ? `${e.value.slice(0, 46)}…` : e.value}</p>
                  <p className="meta-label mt-1">{e.label}</p>
                </div>
              ))}
            </div>

            <Link
              href={`/work/${flagship.slug}`}
              className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase text-[#C9B99A]"
            >
              Read the full case study
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </ScrollReveal>

          {/* Architecture diagram — pure markup, reveal draws itself */}
          <ScrollReveal delay={0.1}>
            <figure className="border border-[#222222] bg-[#0D0D0D] p-8 lg:p-10 lg:sticky lg:top-24">
              <figcaption className="meta-label mb-8">
                HERMES EXECUTION MODEL
              </figcaption>
              <div className="flex flex-col w-full max-w-[300px] mx-auto">
                {nodes.map((node, i) => (
                  <div key={node.label} className="w-full">
                    <div className={`arch-node w-full text-left ${node.highlight ? "border-[#C9B99A]/30" : ""}`}>
                      <p className={`font-mono text-[11px] tracking-[0.12em] ${node.highlight ? "text-[#C9B99A]" : "text-[#F2F2F0]"}`}>
                        {node.label}
                      </p>
                      {node.sublabel && <p className="meta-label mt-1">{node.sublabel}</p>}
                    </div>
                    {i < nodes.length - 1 && <div className="arch-arrow" aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <p className="meta-label mt-8 leading-relaxed">
                Every mutation passes the gate; every pass is re-read
                before it is believed.
              </p>
            </figure>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
