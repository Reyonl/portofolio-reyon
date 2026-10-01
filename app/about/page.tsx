import type { Metadata } from "next";
import Link from "next/link";
import { profile, milestones, workPrinciples, tools } from "@/content/profile";
import { personJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { productionUrl } from "@/lib/site";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Reyon Lau Jiemin — Informatics Engineering graduate and software engineer building practical web and mobile systems with AI-assisted development workflows.",
  alternates: productionUrl ? { canonical: `${productionUrl}/about` } : undefined,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            personJsonLd(),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ]),
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Statement */}
        <ScrollReveal className="mb-24">
          <p className="accent-label mb-5">ABOUT</p>
          <h1 className="font-display text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.02] text-[#F2F2F0] max-w-4xl mb-10">
            {profile.name}
          </h1>
          <p className="text-[clamp(1.15rem,2.2vw,1.45rem)] font-display text-[#888888] leading-relaxed max-w-2xl">
            {profile.positioningLines.join(" ")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start">
          {/* Left: facts */}
          <div className="space-y-12">
            <ScrollReveal>
              <div className="border border-[#222222] bg-[#0D0D0D] p-8">
                <p className="meta-label mb-5">BACKGROUND</p>
                <p className="text-[#F2F2F0] mb-2">{profile.background}</p>
                <p className="meta-label">
                  Informatics Engineering — Bachelor&apos;s degree.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div>
                <p className="meta-label mb-5">FOCUS</p>
                <ul className="space-y-2.5 list-none">
                  {profile.focus.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-[#C9B99A] shrink-0" aria-hidden="true" />
                      <span className="font-mono text-[11px] tracking-[0.06em] text-[#888888] uppercase">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <p className="meta-label mb-5">ELSEWHERE</p>
                <div className="flex flex-col gap-3">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#888888] hover:text-[#C9B99A] transition-colors hover-line w-fit"
                  >
                    GitHub /{profile.links.githubHandle} ↗
                  </a>
                  <a
                    href={`mailto:${profile.links.email}`}
                    className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#888888] hover:text-[#C9B99A] transition-colors hover-line w-fit"
                  >
                    {profile.links.email} ↗
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: narrative + principles + timeline */}
          <div className="space-y-20">
            <ScrollReveal>
              <p className="text-[#888888] leading-relaxed max-w-prose">
                I work at the point where software actually has to run: a CLI
                that must refuse to lie about a build, an editor that must
                survive a phone screen, a receipt that must come out of a
                Bluetooth printer during a sale. My projects started as real
                problems in businesses around me — a print shop, a food stall —
                and grew into systems with CI, releases, and audit trails
                because that&apos;s what &quot;finished&quot; means to me.
              </p>
              <p className="text-[#888888] leading-relaxed max-w-prose mt-5">
                AI-assisted development is how I work: agents and automation
                accelerate implementation, while design, verification, and
                judgment stay mine. Every project in this portfolio lists the
                evidence a reader can re-check.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div>
                <p className="meta-label mb-6">WORKING PRINCIPLES</p>
                <ol className="divide-y divide-[#111111] border-y border-[#111111] list-none">
                  {workPrinciples.map((wp) => (
                    <li key={wp.label} className="py-5 grid grid-cols-[40px_1fr] gap-4 items-baseline">
                      <span className="section-index">{wp.label}</span>
                      <div>
                        <p className="text-[#F2F2F0] text-sm mb-1">
                          <Link href={`/work/${wp.projectSlug}`} className="hover:text-[#C9B99A] transition-colors">
                            {wp.principle}
                          </Link>
                        </p>
                        <p className="meta-label">{wp.projectLabel}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div>
                <p className="meta-label mb-6">TRAJECTORY</p>
                <ol className="border-l border-[#222222] ml-2 list-none">
                  {milestones.map((m) => (
                    <li key={m.title} className="relative pl-8 pb-8 last:pb-0">
                      <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] border border-[#C9B99A]/40 bg-[#080808]" aria-hidden="true" />
                      <p className="meta-label mb-1.5">
                        <span className="text-[#888888]">{m.period}</span>
                        <span className="text-[#C9B99A]"> · {m.label}</span>
                      </p>
                      <p className="text-[#F2F2F0] text-sm mb-1.5 leading-snug">{m.title}</p>
                      <p className="text-[#888888] text-xs leading-relaxed max-w-md">{m.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Tools with reasons — replaces a logo wall */}
        <ScrollReveal className="mt-24 pt-12 border-t border-[#222222]">
          <p className="meta-label mb-6">TOOLS, AND WHY</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
            {tools.map((t) => (
              <div key={t.name} className="flex items-baseline justify-between gap-4 border-b border-[#111111] pb-2">
                <dt className="font-mono text-[11px] text-[#F2F2F0] tracking-[0.06em]">{t.name}</dt>
                <dd className="meta-label text-right leading-snug">{t.reason}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-20 flex gap-10 flex-wrap">
            <Link href="/work" className="meta-label text-[#C9B99A] hover-line">
              SELECTED WORK →
            </Link>
            <Link href="/contact" className="meta-label text-[#888888] hover:text-[#C9B99A] transition-colors hover-line">
              CONTACT →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
