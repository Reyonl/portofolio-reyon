import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTA() {
  return (
    <section
      className="border-t border-[#222222] py-36 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Subtle cross lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#222222]/50" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#222222]/50" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative">
        <div className="flex items-start gap-5 mb-10">
          <span className="section-index mt-1">06</span>
          <p className="meta-label mt-0.5">NEXT DESTINATION</p>
        </div>

        <ScrollReveal>
          <h2
            id="cta-heading"
            className="font-display text-[clamp(3rem,9vw,7.5rem)] text-[#F2F2F0] leading-none mb-6"
          >
            Let&apos;s build
            <br />
            <span className="text-[#888888]">something.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="meta-label text-[#555555] mb-12 max-w-sm leading-relaxed">
            Open to project collaborations, freelance work, and opportunities
            in web development.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              id="cta-contact"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#F2F2F0] text-[#080808] font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#C9B99A] hover:gap-5"
            >
              GET IN TOUCH
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/projects"
              id="cta-work"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#222222] text-[#555555] font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:border-[#C9B99A]/30 hover:text-[#C9B99A]"
            >
              VIEW WORK
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
