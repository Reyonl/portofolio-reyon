import Link from "next/link";
import { featuredProjects, statusLabel } from "@/lib/projects";
import { profile } from "@/content/profile";

// Hero (P6.1) — boxed signature layout: left = name block inside nested
// module, right = engineered SVG visual (execution pipeline diagram).
// Server Component; entrance animation is CSS-only (.hero-seq), gone under
// prefers-reduced-motion.

function SignatureVisual() {
  // The Hermes execution pipeline, drawn as a technical diagram: nodes,
  // guides, one highlighted gate. Entrance: line draw + node reveal (CSS,
  // one-shot). Pure SVG — no stock, no mascot, no logo wall.
  return (
    <svg
      viewBox="0 0 320 340"
      className="w-full max-w-[320px] hero-visual"
      role="img"
      aria-label="Diagram of an execution pipeline: CLI, safety gate, planner, executor, verification, audit trail — connected in sequence."
    >
      {/* guides */}
      <g stroke="#2A2E37" strokeWidth="1">
        <line x1="30" y1="20" x2="30" y2="320" />
        <line x1="30" y1="20" x2="290" y2="20" />
      </g>
      {/* coordinates ticks — aligned to each node center */}
      <g fill="#9AA1AD" fontSize="8" fontFamily="monospace">
        {[30, 80, 130, 180, 230, 280].map((y, i) => (
          <text key={y} x="34" y={y + 19}>
            {String(i).padStart(2, "0")}
          </text>
        ))}
      </g>
      {/* connecting line: draws in on entrance */}
      <path
        className="sig-line"
        d="M 160 46 V 70 M 160 96 V 120 M 160 146 V 170 M 160 196 V 220 M 160 246 V 270"
        stroke="#2A2E37"
        strokeWidth="2"
        fill="none"
      />
      {/* nodes */}
      {[
        { y: 30, label: "CLI", hot: false },
        { y: 80, label: "SAFETY GATE", hot: true },
        { y: 130, label: "PLANNER", hot: false },
        { y: 180, label: "EXECUTOR", hot: false },
        { y: 230, label: "VERIFICATION", hot: false },
        { y: 280, label: "AUDIT TRAIL", hot: false },
      ].map((n, i) => (
        <g key={n.label} className="sig-node" style={{ animationDelay: `${0.35 + i * 0.09}s` }}>
          <rect
            x="70"
            y={n.y}
            width="180"
            height="30"
            fill={n.hot ? "#63B3FF14" : "#101217"}
            stroke={n.hot ? "#63B3FF" : "#2A2E37"}
            strokeWidth={n.hot ? 2 : 1.5}
          />
          <text
            x="160"
            y={n.y + 19}
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="2"
            fill={n.hot ? "#63B3FF" : "#9AA1AD"}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function Hero() {
  const current = featuredProjects()[0]; // Hermes — the actual current build

  return (
    <section className="relative flex flex-col pt-16 pb-14 min-h-[86vh]" aria-label="Introduction">
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-center py-6">
          {/* Left: identity module */}
          <div className="hero-seq">
            <div className="flex items-center gap-3 mb-6">
              <span className="accent-label">REYON LAU JIEMIN</span>
              <span className="h-px flex-1 bg-[#2A2E37]" aria-hidden="true" />
              <span className="meta-label">2026</span>
            </div>

            <h1 className="font-display leading-[0.9]">
              <span className="sr-only">
                Reyon Lau Jiemin. Software Engineer building practical software
                systems with AI-assisted development workflows.
              </span>
              <span className="block text-[clamp(3.25rem,9vw,7.5rem)] text-[#F5F7FA]" aria-hidden="true">
                SOFTWARE
              </span>
              <span className="block text-[clamp(3.25rem,9vw,7.5rem)]" aria-hidden="true">
                <span className="text-[#63B3FF]">ENGINEER.</span>
              </span>
            </h1>

            <div className="panel mt-9 p-6 lg:p-7 max-w-2xl shadow-offset-dark">
              <p className="text-[#9AA1AD] leading-relaxed">
                I build <span className="text-[#F5F7FA]">web systems</span>,{" "}
                <span className="text-[#F5F7FA]">mobile applications</span>, and{" "}
                <span className="text-[#F5F7FA]">developer automation</span> —
                practical software with AI-assisted workflows, shipped with
                evidence you can inspect.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <Link
                href="/work"
                className="group inline-flex items-center justify-between gap-6 px-7 py-3.5 bg-[#63B3FF] text-[#08090C] font-mono text-[11px] tracking-[0.15em] uppercase font-bold transition-colors duration-200 hover:bg-[#8CC8FF]"
              >
                Selected work
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#2A2E37] text-[#9AA1AD] font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 hover:border-[#63B3FF] hover:text-[#63B3FF]"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Right: signature visual */}
          <div className="hidden lg:block hero-seq">
            <SignatureVisual />
          </div>
        </div>

        {/* NOW strip — boxed module, one checkable fact */}
        {current && (
          <div className="panel mt-14 px-6 py-4 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-x-8 gap-y-3">
            <p className="accent-label">NOW</p>
            <p className="font-mono text-[11px] tracking-[0.06em] text-[#F5F7FA] sm:border-l sm:border-[#2A2E37] sm:pl-8">
              {current.title}
              <span className="text-[#9AA1AD]">
                {" "}— v0.7.5 · {current.evidence[0].value} · {statusLabel(current.status)}
              </span>
            </p>
            <Link
              href={`/work/${current.slug}`}
              className="meta-label text-[#63B3FF] hover-line sm:border-l sm:border-[#2A2E37] sm:pl-8"
            >
              READ THE CASE STUDY →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
