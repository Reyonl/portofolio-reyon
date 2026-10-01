import Link from "next/link";
import { workPrinciples } from "@/content/profile";
import ScrollReveal from "@/components/ui/ScrollReveal";

// How I Work — principles anchored to real project decisions. This replaces
// the old "Skills" logo wall: a claim about how I work is worth more than a
// list of technologies, and each line links to the project where it was applied.

export default function HowIWork() {
  return (
    <section className="border-t border-[#2A2E37] py-28" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="accent-label mb-4">02 / HOW I WORK</p>
          <h2 id="how-heading" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-[#F5F7FA] max-w-3xl">
            Four principles,
            <br />
            each from a real decision.
          </h2>
        </ScrollReveal>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2A2E37] border border-[#2A2E37] list-none">
          {workPrinciples.map((wp) => (
            <li key={wp.label} className="bg-[#08090C] p-8 lg:p-12 flex flex-col gap-5 min-h-[240px]">
              <div className="flex items-baseline justify-between">
                <span className="section-index">{wp.label}</span>
                <Link
                  href={`/work/${wp.projectSlug}`}
                  className="meta-label text-[#9AA1AD] hover:text-[#63B3FF] transition-colors hover-line"
                >
                  {wp.projectLabel} →
                </Link>
              </div>
              <h3 className="font-display text-xl lg:text-2xl text-[#F5F7FA] leading-snug">
                {wp.principle}
              </h3>
              <p className="text-sm text-[#9AA1AD] leading-relaxed max-w-prose">{wp.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
