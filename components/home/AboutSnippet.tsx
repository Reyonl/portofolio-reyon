import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AboutSnippet() {
  return (
    <section
      className="border-t border-[#222222] py-28"
      aria-labelledby="about-snippet-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <ScrollReveal>
            <SectionHeader
              index="03"
              label="ABOUT THE ENGINEER"
              heading={
                <span id="about-snippet-heading">
                  Building practical
                  <br />
                  systems.
                </span>
              }
            />
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={0.1} className="lg:pt-10">
            <div className="space-y-5">
              <p className="font-display text-xl text-[#888888] leading-relaxed">
                An Informatics Engineering student who turns ideas into
                functional digital products — from backend architecture to
                interactive interfaces.
              </p>
              <p className="text-[#555555] leading-relaxed text-sm">
                I focus on building software that is useful, maintainable, and
                built on sound engineering fundamentals. Every project is an
                opportunity to understand a real problem deeply before writing
                a single line of code.
              </p>
              <div className="pt-4 flex items-center gap-6">
                <Link
                  href="/about"
                  id="about-snippet-link"
                  className="font-mono text-[11px] tracking-[0.18em] text-[#C9B99A] hover-line"
                >
                  READ MORE →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
