import Link from "next/link";
import { milestones, profile } from "@/content/profile";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Background — short by design; full version lives on /about. This section is
// the "who is this person" beat, placed after the work has been shown.

export default function Background() {
  return (
    <section className="border-t border-[#2A2E37] py-28" aria-labelledby="background-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          <ScrollReveal>
            <p className="accent-label mb-4">03 / BACKGROUND</p>
            <h2 id="background-heading" className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] text-[#F5F7FA] mb-8">
              Informatics engineer,
              <br />
              self-managed ship cycle.
            </h2>
            <p className="text-[#9AA1AD] leading-relaxed max-w-prose mb-4">
              {profile.name} — {profile.background} {profile.positioningLines.join(" ")}
            </p>
            <p className="text-[#9AA1AD] leading-relaxed max-w-prose mb-10">
              Everything in this portfolio was designed, built, tested, and
              shipped by me, with AI-assisted workflows as the development
              accelerator — not as a substitute for understanding the system.
            </p>
            <Link href="/about" className="meta-label text-[#63B3FF] hover-line">
              MORE ABOUT ME →
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <ol className="space-y-0 border-l border-[#2A2E37] ml-2 list-none">
              {milestones.map((m) => (
                <li key={m.title} className="relative pl-8 lg:pl-12 py-7 border-b border-[#171A21] last:border-b-0">
                  <span className="absolute -left-[5px] top-10 w-[9px] h-[9px] border border-[#2A2E37] bg-[#08090C]" aria-hidden="true" />
                  <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                    <p className="meta-label text-[#9AA1AD]">{m.period}</p>
                    <p className="accent-label">{m.label}</p>
                  </div>
                  <h3 className="font-display text-lg text-[#F5F7FA] leading-snug mb-2">{m.title}</h3>
                  <p className="text-sm text-[#9AA1AD] leading-relaxed max-w-lg">{m.description}</p>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
