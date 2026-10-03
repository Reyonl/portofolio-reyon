import type { ProjectMedia as Media } from "@/content/schema";

// ProjectMedia (P7.1) — real captures of the system, registry-driven only.
// Plain server-rendered <img>: explicit width/height gives the browser the
// intrinsic aspect ratio (zero CLS), native lazy-loading keeps first paint
// fast, and nothing here needs client JS. Caption is provenance text — it
// states where the capture came from, never a marketing claim.

export function WorkFrame({
  item,
  priority = false,
  className = "",
}: {
  item: Media;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`border border-[#2A2E37] bg-[#101217] ${className}`}>
      <img
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block w-full h-auto"
      />
      {item.caption && (
        <figcaption className="border-t border-[#2A2E37] px-4 py-2.5 meta-label text-[#9AA1AD]">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default WorkFrame;
