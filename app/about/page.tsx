import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Reyon Lau Jiemin — Informatics Engineering student and web application developer.",
};

const timeline = [
  {
    year: "2024",
    label: "START",
    title: "Started building web applications.",
    description:
      "First contact with HTML, CSS, and JavaScript. Built initial projects exploring the fundamentals of web development and client-server architecture.",
  },
  {
    year: "2025",
    label: "BUILD",
    title: "Expanded into PHP, Laravel, and full-stack development.",
    description:
      "Built first database-driven applications with authentication, file handling, and structured MVC architecture. Developed understanding of backend systems.",
  },
  {
    year: "2026",
    label: "SHIP",
    title: "Built and shipped DAILY.CO.",
    description:
      "Developed a full-stack web-based screen printing mockup design system using Laravel, Fabric.js, MySQL, and Tailwind CSS.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal className="mb-20">
          <SectionHeader
            index="03"
            label="ABOUT THE ENGINEER"
            heading={
              <>
                The Person Behind
                <br />
                the Systems
              </>
            }
          />
        </ScrollReveal>

        {/* Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 mb-28">
          <div className="space-y-5">
            <ScrollReveal>
              <p className="font-display text-2xl text-[#888888] leading-relaxed">
                An Informatics Engineering student who turns ideas into
                functional digital products — from backend architecture to
                interactive interfaces.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <p className="text-[#555555] leading-relaxed">
                I focus on building software that is useful, maintainable, and
                built on sound engineering fundamentals. I approach every
                project with the same mindset: understand the problem deeply
                before writing a single line of code.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <p className="text-[#555555] leading-relaxed">
                My work spans full-stack web development — from Laravel
                backends and MySQL databases to interactive browser-based
                canvas editors. I&apos;m drawn to projects that require both
                technical rigor and creative problem-solving.
              </p>
            </ScrollReveal>
          </div>

          {/* Education */}
          <ScrollReveal delay={0.1}>
            <div className="border border-[#222222] p-8 bg-[#0D0D0D]">
              <p className="meta-label mb-6">EDUCATION</p>
              <div className="space-y-5">
                <div>
                  <p className="font-display text-xl text-[#F2F2F0] mb-1">
                    Informatics Engineering
                  </p>
                  <p className="meta-label">Bachelor&apos;s Degree · Ongoing</p>
                </div>
                <div className="h-px bg-[#222222]" />
                <div>
                  <p className="meta-label mb-4">AREAS OF STUDY</p>
                  <ul className="space-y-2">
                    {[
                      "Web Application Development",
                      "Software Architecture",
                      "Database Systems",
                      "UI/UX Engineering",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-[#555555] shrink-0" />
                        <span className="font-mono text-[11px] text-[#888888]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Engineering Log Timeline */}
        <ScrollReveal className="mb-14">
          <SectionHeader
            index="—"
            label="DEVELOPMENT HISTORY"
            heading="Engineering Log"
          />
        </ScrollReveal>

        <div className="relative ml-10 lg:ml-16">
          <div
            className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-[#C9B99A]/30 via-[#222222] to-transparent"
            aria-hidden="true"
          />
          <div className="space-y-14 pl-10">
            {timeline.map((entry, i) => (
              <ScrollReveal key={entry.year} delay={i * 0.08}>
                <div className="relative">
                  <div
                    className="absolute -left-10 top-1.5 w-2 h-2 bg-[#222222] border border-[#C9B99A]/40 rounded-full"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 mb-2">
                    <span className="accent-label shrink-0">
                      {entry.year} · {entry.label}
                    </span>
                    <h3 className="font-display text-lg text-[#F2F2F0]">
                      {entry.title}
                    </h3>
                  </div>
                  <p className="text-[#555555] text-sm leading-relaxed max-w-xl sm:ml-[calc(4rem+2rem)]">
                    {entry.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
