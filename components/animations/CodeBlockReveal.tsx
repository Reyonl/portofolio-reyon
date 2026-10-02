"use client";

// ============================================================================
// CodeBlockReveal.tsx — Line-by-line entrance for case-study code snippets
// ============================================================================
// Splits `code` on \n; each line enters with fade + translate(-12px→0) when
// the block scrolls into view. Presentational — the whole code string is also
// inside a <pre><code> fallback read by screen readers and search indexers.
// Highlights are tinted backgrounds on matching 1-based line indices.
//
// Performance: ~2KB minified, transform/opacity only, reads 100+ line blocks
// with zero code highlighting parser dependency (string split is O(n)).

import { useIntersectionTrigger, useReducedMotion } from "./useAnimations";
import type { CodeBlockRevealProps } from "./animations.types";

export default function CodeBlockReveal({
  code,
  language = "typescript",
  staggerDelay = 50,
  duration = 300,
  highlightLines = [],
  showLineNumbers = false,
  maxHeight = "400px",
  className = "",
}: CodeBlockRevealProps) {
  const [ref, inView] = useIntersectionTrigger({ threshold: 0.15, once: true });
  const reduced = useReducedMotion();
  const lines = code.split("\n");

  return (
    <div
      ref={ref}
      className={`code-reveal overflow-auto border border-[#2A2E37] bg-[#0D0E13] ${className}`.trim()}
      style={{ maxHeight, "--code-delay": `${staggerDelay}ms`, "--code-duration": `${duration}ms` } as React.CSSProperties}
      role="region"
      aria-label={`${language} code snippet (${lines.length} lines)`}
    >
      {/* Search/indexable + screen-reader copy — the visual line rows below
          are aria-hidden to prevent double-announcement. */}
      <pre className="sr-only">
        <code>{code}</code>
      </pre>

      <div
        className="font-mono text-[12px] leading-relaxed"
        aria-hidden="true"
      >
        {lines.map((line, i) => {
          const lineNumber = i + 1;
          const isHighlight = highlightLines.includes(lineNumber);
          const needsAnim = !reduced && inView;

          return (
            <div
              key={lineNumber}
              className={[
                "code-line flex",
                isHighlight ? "bg-[rgba(99,179,255,0.12)] border-l-2 border-[#63B3FF]" : "",
                "px-4 py-0.5",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                needsAnim
                  ? ({
                      animation: `code-line-in ${duration}ms var(--code-ease, cubic-bezier(0.33, 1, 0.68, 1)) both`,
                      animationDelay: `calc(${i} * var(--code-delay, 50ms))`,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              {showLineNumbers && (
                <span className="text-[#9AA1AD] select-none tabular-nums pr-4 text-right min-w-[28px]" aria-hidden="true">
                  {lineNumber}
                </span>
              )}
              <code className="whitespace-pre-wrap break-words text-[#C9CDD6]">{line || " "}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*
USAGE EXAMPLE:
  <CodeBlockReveal
    code={project.codeSample ?? "const hermes = new DevOpsOrchestrator();"}
    language="typescript"
    showLineNumbers
    highlightLines={[2]}
  />
*/
