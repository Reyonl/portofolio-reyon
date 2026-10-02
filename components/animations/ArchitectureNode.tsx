"use client";

// ============================================================================
// ArchitectureNode.tsx — Interactive blueprint diagram (nodes + SVG edges)
// ============================================================================
// Nodes pop in sequence (stagger 70ms, backOut overshoot for the highlight
// tile), SVG edges draw via pathLength animation. Click OR Enter/Space selects
// a tile and expands its responsibilities + tech list; aria-pressed marks the
// toggle state (role="button" allows aria-expanded; aria-selected does not —
// verified via Lighthouse a11y audit).
//
// Dynamic-import ready: has no window access at module scope; parent may
// next/dynamic(() => import(...), { ssr: false }) to keep it out of the
// initial chunk. Performance: transforms/opacity + SVG stroke only. ~3.5KB.

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASINGS, TIMING } from "./animationUtils";
import type {
  ArchEdgeData,
  ArchNodeData,
  ArchitectureDiagramProps,
} from "./animations.types";

interface TileProps {
  node: ArchNodeData;
  isSelected: boolean;
  interactive: boolean;
  onSelect: (id: string) => void;
  index: number;
  reduced: boolean;
}

function BlueprintTile({
  node,
  isSelected,
  interactive,
  onSelect,
  index,
  reduced,
}: TileProps) {
  const expanded = isSelected && !!node.tech?.length;

  return (
    <motion.div
      className={[
        "arch-tile min-w-0 text-left border bg-[#101217] p-5",
        isSelected
          ? "border-[#63B3FF] bg-[rgba(99,179,255,0.06)]"
          : "border-[#2A2E37]",
        interactive
          ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-[#63B3FF] focus-visible:outline-offset-2"
          : "cursor-default",
      ].join(" ")}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? isSelected : undefined}
      aria-expanded={interactive && node.tech?.length ? expanded : undefined}
      initial={reduced ? false : { opacity: 0, y: 14, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: TIMING.tilePop,
        ease: node.highlight ? EASINGS.backOut : EASINGS.easeOut,
        delay: reduced ? 0 : index * TIMING.tileStagger,
      }}
      whileHover={
        interactive && !reduced ? { scale: 1.015, y: -2 } : undefined
      }
      onClick={interactive ? () => onSelect(node.id) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(node.id);
              }
            }
          : undefined
      }
    >
      <p className="accent-label">{node.label.toUpperCase()}</p>
      {node.sublabel && (
        <p className="meta-label mt-1 text-[#9AA1AD]">{node.sublabel}</p>
      )}
      {node.highlight && (
        <span
          className="inline-block mt-2 h-1 w-6 bg-[#63B3FF]"
          aria-hidden="true"
        />
      )}
      {node.responsibilities && !expanded && (
        <p className="mt-4 text-[12px] leading-relaxed text-[#C9CDD6] line-clamp-3">
          {node.responsibilities}
        </p>
      )}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: EASINGS.easeOut }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2">
              {node.responsibilities && (
                <p className="text-[12px] leading-relaxed text-[#C9CDD6]">
                  {node.responsibilities}
                </p>
              )}
              {node.tech && node.tech.length > 0 && (
                <div>
                  <p className="meta-label mt-3 mb-2">TECH</p>
                  <div className="flex flex-wrap gap-1.5">
                    {node.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 border border-[#2A2E37] bg-[#08090C] font-mono text-[10px] leading-none tracking-[0.08em] text-[#9AA1AD]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ArchitectureDiagram({
  nodes,
  edges,
  layout = "grid",
  onNodeClick,
  selectedNodeId,
  showEdges = true,
  interactive = true,
  className = "",
}: ArchitectureDiagramProps) {
  const [internalSelected, setInternalSelected] = useState<string | undefined>(
    undefined
  );
  const reduced = useReducedMotion();

  const selected = selectedNodeId ?? internalSelected;

  const handleSelect = (id: string) => {
    const next = selected === id ? undefined : id;
    setInternalSelected(next);
    onNodeClick?.(id);
  };

  const layoutClasses =
    layout === "grid"
      ? "grid grid-cols-1 lg:grid-cols-3 gap-4"
      : layout === "horizontal"
        ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
        : "grid grid-cols-1 gap-4";

  return (
    <div
      className={`arch-diagram ${className}`.trim()}
      role="region"
      aria-label="Architecture diagram — use Tab to reach nodes, Enter to inspect."
    >
      {/* SVG edge layer: dashed accent lines, animated draw via pathLength. */}
      {showEdges && edges.length > 0 && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          {edges.map((e: ArchEdgeData, i) => {
            const from = nodes.findIndex((n) => n.id === e.from);
            const to = nodes.findIndex((n) => n.id === e.to);
            if (from < 0 || to < 0) return null;
            // Vertical spine between stacked tiles (same column layouts).
            const x = "50%";
            return (
              <motion.line
                key={`${e.from}-${e.to}`}
                x1={x}
                x2={x}
                y1={`${(from + 1) * 25}%`}
                y2={`${(to + 1) * 25}%`}
                stroke="#63B3FF55"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.12,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </svg>
      )}

      <div className={`relative ${layoutClasses}`}>
        {nodes.map((node, i) => (
          <BlueprintTile
            key={node.id}
            node={node}
            isSelected={selected === node.id}
            interactive={interactive}
            onSelect={handleSelect}
            index={i}
            reduced={!!reduced}
          />
        ))}
      </div>
    </div>
  );
}

/*
USAGE EXAMPLE (app/work/[slug]/page.tsx):
  <ArchitectureDiagram
    nodes={project.architectureNodes.map((n, i) => ({
      id: `${project.slug}-arch-${i}`,
      label: n.label,
      sublabel: n.sublabel,
      highlight: n.highlight,
    }))}
    edges={[]}
    layout="vertical"
  />
*/
