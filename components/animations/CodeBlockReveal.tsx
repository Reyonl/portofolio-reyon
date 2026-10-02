"use client";

// ============================================================================
// CodeBlockReveal.tsx — Line-by-line staggered code reveal
// ============================================================================
// Each line enters with fade + translateX(-12→0) on a 45ms stagger once the
// block scrolls into view. Text remains selectable; the full string is also
// exposed via <pre class="sr-only"> for screen readers/search (visual rows are
// aria-hidden to avoid double announcement).
//
// No syntax-highlight parser dependency — token colors come from the registry
// if provided later; meanwhile monochrome #C9CDD6 keeps AAA contrast.
// Dynamic-import ready: parent can next/dynamic(() => import(...), { ssr:false }).
// Performance: ~2KB, transform/opacity only.

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { CodeBlockRevealProps } from "./animations.types";

export default function CodeBlockReveal({
  code,
  language = "typescript",
  staggerDelay = 0.045,
  duration = 0.28,
  highlightLines = [],
  showLineNumbers = false,
  maxHeight = "420px",
  className = "",
}: CodeBlockRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();
  const lines = code.split("\n");

  return (
    <div
      ref={ref}
      className={`code-reveal overflow-auto border border-[#2A2E37] bg-[#0D0E13] ${className}`.trim()}
      style={{ maxHeight }}
      role="region"
      aria-label={`${language} code snippet (${lines.length} lines)`}
    >
      {/* Accessible + indexable copy — visual rows below are aria-hidden. */}
      <pre className="sr-only">
        <code>{code}</code>
      </pre>

      <div className="font-mono text-[12px] leading-relaxed" aria-hidden="true">
        {lines.map((line, i) => {
          const isHighlight = highlightLines.includes(i + 1);
          return (
            <motion.div
              key={i}
              className={[
                "code-line flex",
                isHighlight
                  ? "bg-[rgba(99,179,255,0.12)] border-l-2 border-[#63B3FF]"
                  : "",
                "px-4 py-0.5",
              ]
                .filter(Boolean)
                .join(" ")}
              initial={reduced || inView ? false : { opacity: 0, x: -12 }}
              animate={inView || reduced ? { opacity: 1, x: 0 } : undefined}
              transition={{
                duration,
                ease: [0.33, 1, 0.68, 1],
                delay: reduced ? 0 : i * staggerDelay,
              }}
            >
              {showLineNumbers && (
                <span
                  className="text-[#9AA1AD] select-none tabular-nums pr-4 text-right min-w-[28px]"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              )}
              <code className="whitespace-pre-wrap break-words text-[#C9CDD6]">
                {line || " "}
              </code>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/*
USAGE EXAMPLE (app/work/[slug]/page.tsx):
  {project.codeSample && (
    <CodeBlockReveal
      code={project.codeSample.code}
      language={project.codeSample.language}
      highlightLines={project.codeSample.highlightLines}
      showLineNumbers
    />
  )}
*/
