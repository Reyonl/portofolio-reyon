import { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  heading: ReactNode;
  className?: string;
}

export default function SectionHeader({
  index,
  label,
  heading,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start gap-5 ${className}`}>
      <span className="section-index shrink-0 mt-1.5">{index}</span>
      <div>
        <p className="meta-label mb-2.5">{label}</p>
        <div className="font-display text-[clamp(2rem,5vw,3.75rem)] text-[#F2F2F0] leading-tight">
          {heading}
        </div>
      </div>
    </div>
  );
}
