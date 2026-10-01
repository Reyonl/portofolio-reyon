interface TagProps {
  label: string;
  variant?: "default" | "highlight";
}

export default function Tag({ label, variant = "default" }: TagProps) {
  return (
    <span
      className={`tech-tag ${
        variant === "highlight" ? "border-[#c9b99a44] text-[#c9b99a]" : ""
      }`}
    >
      {label}
    </span>
  );
}
