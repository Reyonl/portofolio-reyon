import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const entries = [
  {
    year: "2024",
    label: "START",
    title: "Started building web applications.",
    description:
      "First contact with HTML, CSS, and JavaScript. Built initial projects exploring the fundamentals of web development and client-server interaction.",
  },
  {
    year: "2025",
    label: "BUILD",
    title: "Expanded into PHP, Laravel, and full-stack development.",
    description:
      "Built first database-driven applications with user authentication, file handling, and structured MVC architecture. Developed understanding of backend systems and API design.",
  },
  {
    year: "2026",
    label: "SHIP",
    title: "Built and shipped DAILY.CO.",
    description:
      "Developed a full-stack web-based screen printing mockup design system using Laravel, Fabric.js, MySQL, and Tailwind CSS.",
  },
];

export default function EngineeringLog() {
  return (
    <section
      className="border-t border-[#222222] py-28"
      aria-labelledby="engineering-log-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-16">
          <SectionHeader
            index="05"
            label="DEVELOPMENT HISTORY"
            heading={
              <span id="engineering-log-heading">Engineering Log</span>
            }
          />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative ml-10 lg:ml-16">
          {/* Vertical route line */}
          <div
            className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-[#C9B99A]/30 via-[#222222] to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-14 pl-10">
            {entries.map((entry, i) => (
              <ScrollReveal key={entry.year} delay={i * 0.08}>
                <div className="relative">
                  {/* Node */}
                  <div
                    className="absolute -left-10 top-1.5 w-2 h-2 bg-[#222222] border border-[#C9B99A]/40 rounded-full"
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 mb-2">
                    <span className="accent-label shrink-0">{entry.year} · {entry.label}</span>
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
    </section>
  );
}
