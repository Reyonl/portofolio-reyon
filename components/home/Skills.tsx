import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const skillGroups = [
  {
    category: "FRONTEND",
    skills: [
      { name: "JavaScript", project: "DAILY.CO · Portfolio" },
      { name: "TypeScript", project: "Portfolio" },
      { name: "HTML / CSS", project: "All Projects" },
      { name: "Tailwind CSS", project: "DAILY.CO · Portfolio" },
      { name: "Fabric.js", project: "DAILY.CO (Canvas Engine)" },
      { name: "React / Next.js", project: "Portfolio" },
    ],
  },
  {
    category: "BACKEND",
    skills: [
      { name: "PHP", project: "DAILY.CO" },
      { name: "Laravel", project: "DAILY.CO (Core Application)" },
    ],
  },
  {
    category: "DATABASE",
    skills: [{ name: "MySQL", project: "DAILY.CO (Data Layer)" }],
  },
  {
    category: "TOOLS",
    skills: [
      { name: "Git / GitHub", project: "All Projects" },
      { name: "VS Code", project: "All Projects" },
      { name: "Figma", project: "UI Design" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      className="border-t border-[#222222] py-28"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-16">
          <SectionHeader
            index="04"
            label="TECHNOLOGIES"
            heading={<span id="skills-heading">Arsenal</span>}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222222]">
          {skillGroups.map((group, gi) => (
            <ScrollReveal key={group.category} delay={gi * 0.06}>
              <div className="bg-[#080808] p-8 h-full">
                <p className="meta-label mb-7">{group.category}</p>
                <ul className="space-y-5">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <p className="font-mono text-xs text-[#888888] mb-0.5">
                        {skill.name}
                      </p>
                      <p className="meta-label opacity-50">{skill.project}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Note */}
        <ScrollReveal delay={0.2} className="mt-8">
          <p className="meta-label opacity-40">
            Technologies shown alongside projects where they were applied.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
