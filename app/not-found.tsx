import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        <p className="meta-label">UNCHARTED TERRITORY</p>
        <h1 className="font-display text-[9rem] text-[#F5F7FA] leading-none">
          404
        </h1>
        <p className="meta-label text-[#9AA1AD] max-w-xs mx-auto leading-relaxed">
          This route doesn&apos;t exist in the project. Navigate back to known
          territory.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] text-[#63B3FF] tracking-[0.18em] uppercase hover-line group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
