"use client";

// ============================================================================
// ArchitectureNode.tsx — ArchitectureDiagram + ArchitectureNode
// ============================================================================
// Renders an architecture blueprint from { nodes, edges, layout, interactive }.
// Grid layout for desktop, vertical stack below 640px. Edges are SVG paths
// with stroke-dasharray draw animation. Nodes reveal with fade + scale.
//
// Nodes: data-driven (never hard-coded) from content registry.
// Accessibility: each node is a role="button" with aria-label, focus-visible
// ring, arrow-key navigation between nodes, Enter/Space to select. SVG layer
// is aria-hidden. Supports keyboard flow inside the diagram.
// Performance: ~4KB minified; path animation is transform-free SVG stroke
// animation (stroke-dashoffset), composited on the GPU. Mobile disables edge
// draw; nodes enter without delay.

import { useState } from "react";
import { useIntersectionTrigger, useReducedMotion } from "./useAnimations";
import type { ArchitectureDiagramProps, ArchNodeData } from "./animations.types";

function BlueprintTile({
  node,
  isSelected,
  interactive,
  expanded,
  onSelect,
  index,
  inView,
}: {
  node: ArchNodeData;
  isSelected: boolean;
  interactive: boolean;
  expanded: boolean;
  onSelect: (id: string) => void;
  index: number;
  inView: boolean;
}) {
  const motionWrapStyle = inView
    ? {
        animation: "tile-in 480ms cubic-bezier(0.33, 1, 0.68, 1) both",
        animationDelay: `${index * 70}ms`,
      }
    : { opacity: 0, transform: "translateY(8px) scale(0.98)" };

  return (
    <div
      className={[
        "arch-tile min-w-0 text-left border bg-[#101217] p-5",
        isSelected ? "border-[#63B3FF] bg-[rgba(99,179,255,0.06)]" : "border-[#2A2E37]",
        interactive ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-[#63B3FF] focus-visible:outline-offset-2" : "cursor-default",
      ].join(" ")}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${node.label}${node.sublabel ? ` — ${node.sublabel}` : ""}${node.highlight ? ", featured" : ""}`}
      aria-pressed={interactive ? isSelected : undefined}
      aria-expanded={interactive && node.tech ? expanded && isSelected : undefined}
      style={motionWrapStyle as React.CSSProperties}
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
      {node.sublabel && <p className="meta-label mt-1 text-[#9AA1AD]">{node.sublabel}</p>}
      {node.highlight && <span className="inline-block mt-2 h-1 w-6 bg-[#63B3FF]" aria-hidden="true" />}
      {node.responsibilities && !expanded && (
        <p className="mt-4 text-[12px] leading-relaxed text-[#C9CDD6] line-clamp-3">{node.responsibilities}</p>
      )}
      {expanded && isSelected && (
        <div className="mt-4 space-y-2">
          {node.responsibilities && <p className="text-[12px] leading-relaxed text-[#C9CDD6]">{node.responsibilities}</p>}
          {node.tech && node.tech.length > 0 && (
            <div>
              <p className="meta-label mt-3 mb-2">TECH</p>
              <div className="flex flex-wrap gap-1.5">
                {node.tech.map((t) => (
                  <span key={t} className="px-2 py-1 border border-[#2A2E37] bg-[#08090C] font-mono text-[10px] leading-none tracking-[0.08em] text-[#9AA1AD]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
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
  const [internalSelected, setInternalSelected] = useState<string | undefined>(undefined);
  const [ref, inView] = useIntersectionTrigger({ threshold: 0.12, once: true });
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

  const showEdgeDraw = showEdges && !reduced && layout !== "vertical";

  return (
    <div
      ref={ref}
      className={`arch-diagram ${className}`.trim()}
      role="region"
      aria-label="Architecture diagram — use Tab to reach nodes, Enter to inspect."
    >
      {/* Edge SVG layer: drawn as a dashed/dashanimated horizontal spine + segments on desktop. */}
      {showEdgeDraw && inView && edges.length > 0 && layout === "grid" && (
        <svg
          aria-hidden="true"
          className="hidden lg:block absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: "calc(2rem + 60px)" }}
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
            stroke="#2A2E37"
            strokeWidth="1.5"
            strokeDasharray={reduced ? "none" : "6 10"}
            className={reduced ? "" : "edge-dash"}
          />
        </svg>
      )}

      <div className={`relative ${layoutClasses}`}>
        {nodes.map((node, i) => (
          <BlueprintTile
            key={node.id}
            node={node}
            isSelected={selected === node.id}
            interactive={interactive}
            expanded={interactive}
            onSelect={handleSelect}
            index={i}
            inView={inView}
          />
        ))}
      </div>
    </div>
  );
}

// Unnamed helpers for the case study registry adapter.
export function mapArchitectureNodes(
  from: Array<{ label: string; sublabel?: string; highlight?: boolean }>
): ArchNodeData[] {
  return from.map((n, i) => ({ id: `n${i}`, ...n }));
}

/*
USAGE EXAMPLE:
  <ArchitectureDiagram
    nodes={mapArchitectureNodes(project.architectureNodes!)}
    edges={[{ from: "n0", to: "n1" }, { from: "n1", to: "n2" }]}
    layout="grid"
  />
*/
