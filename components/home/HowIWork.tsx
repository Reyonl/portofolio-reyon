import Link from "next/link";
import { workPrinciples } from "@/content/profile";
import ScrollReveal from "@/components/ui/ScrollReveal";

// How I Work — principles anchored to real project decisions. This replaces
// the old "Skills" logo wall: a claim about how I work is worth more than a
// list of technologies, and each line links to the project where it was applied.

export default function HowIWork() {
  return (
    <section className="border-t border-[#222222] py-28" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="accent-label mb-4">HOW I WORK</p>
          <h2 id="how-heading" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-[#F2F2F0] max-w-3xl">
            Four principles,
            <br />
            each from a real decision.
          </h2>
        </ScrollReveal>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222222] border border-[#222222] list-none">
          {workPrinciples.map((wp) => (
            <li key={wp.label} className="bg-[#080808] p-8 lg:p-12 flex flex-col gap-5 min-h-[240px]">
              <div className="flex items-baseline justify-between">
                <span className="section-index">{wp.label}</span>
                <Link
                  href={`/work/${wp.projectSlug}`}
                  className="meta-label text-[#555555] hover:text-[#C9B99A] transition-colors hover-line"
                >
                  {wp.projectLabel} →
                </Link>
              </div>
              <h3 className="font-display text-xl lg:text-2xl text-[#F2F2F0] leading-snug">
                {wp.principle}
              </h3>
              <p className="text-sm text-[#888888] leading-relaxed max-w-prose">{wp.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
