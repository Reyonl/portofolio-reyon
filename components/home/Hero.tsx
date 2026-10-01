import Link from "next/link";
import { featuredProjects, statusLabel } from "@/lib/projects";
import { profile } from "@/content/profile";

// Hero is a Server Component. The entry sequence is pure CSS
// (.hero-seq in globals.css) and disappears entirely under
// prefers-reduced-motion — no JS, no animation library, zero runtime cost.

export default function Hero() {
  const current = featuredProjects()[0]; // Hermes — the actual current build

  return (
    <section className="relative min-h-[92vh] flex flex-col pt-24 pb-12" aria-label="Introduction">
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-12 flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[190px_1fr] pt-10 lg:pt-20">
          {/* Left rail — editorial metadata */}
          <div className="hidden lg:flex flex-col gap-6 pr-7 border-r border-[#222222] hero-seq" aria-hidden="true">
            <p className="meta-label leading-relaxed">PORTFOLIO — 2026</p>
            <div className="h-px bg-[#222222]" />
            <p className="meta-label leading-relaxed">
              INFORMATICS
              <br />
              ENGINEERING
            </p>
            <div className="h-px bg-[#222222]" />
            <p className="meta-label leading-relaxed">
              WEB · MOBILE
              <br />
              TOOLING
            </p>
          </div>

          {/* Main column */}
          <div className="lg:pl-14 flex flex-col justify-center hero-seq">
            <h1 className="font-display leading-[0.86] tracking-tight">
              <span className="sr-only">
                Reyon Lau Jiemin. Software Engineer building practical software
                systems with AI-assisted development workflows.
              </span>
              <span className="block text-[clamp(4.25rem,12vw,10rem)] text-[#F2F2F0]" aria-hidden="true">
                REYON
              </span>
              <span className="block text-[clamp(4.25rem,12vw,10rem)] text-[#F2F2F0]" aria-hidden="true">
                LAU <span className="text-[#555555]">JIEMIN</span>
              </span>
            </h1>

            <div className="h-px bg-[#222222] my-9 max-w-xl" aria-hidden="true" />

            <p className="font-mono text-[11px] tracking-[0.22em] text-[#C9B99A] uppercase mb-5">
              Software Engineer
            </p>

            <p className="text-[clamp(1.15rem,2.4vw,1.55rem)] leading-relaxed text-[#888888] max-w-2xl mb-10">
              Building practical software systems{" "}
              <span className="text-[#F2F2F0]">with AI-assisted development
              workflows</span> — real projects, verified, shipped.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center justify-between gap-6 px-7 py-3.5 bg-[#F2F2F0] text-[#080808] font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[#C9B99A]"
              >
                Selected work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#222222] text-[#888888] font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 hover:border-[#C9B99A]/40 hover:text-[#C9B99A]"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* NOW strip — one fact, checkable */}
        {current && (
          <div className="mt-14 border-t border-[#222222] pt-6 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-start sm:items-center gap-4 sm:gap-10">
            <p className="accent-label">NOW</p>
            <p className="font-mono text-[11px] tracking-[0.08em] text-[#F2F2F0] sm:border-l sm:border-[#222222] sm:pl-10">
              {current.title}
              <span className="text-[#888888]">
                {" "}— v0.7.5 · {current.evidence[0].value} · {statusLabel(current.status)}
              </span>
            </p>
            <Link
              href={`/work/${current.slug}`}
              className="meta-label text-[#555555] hover:text-[#C9B99A] transition-colors sm:border-l sm:border-[#222222] sm:pl-10 hover-line"
            >
              READ THE CASE STUDY →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
