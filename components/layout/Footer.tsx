import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#222222] mt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-16 items-start">
          {/* Identity */}
          <div className="space-y-3">
            <p className="font-display text-xl text-[#F2F2F0]">
              Reyon Lau Jiemin
            </p>
            <p className="meta-label">
              Software Engineer · Web Application Developer
            </p>
            {/* Very subtle One Piece easter egg */}
            <p className="meta-label mt-6">The sea is still wide.</p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="meta-label mb-5">Navigation</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {[
                { href: "/work", label: "WORK" },
                { href: "/about", label: "ABOUT" },
                { href: "/contact", label: "CONTACT" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-[11px] tracking-[0.15em] text-[#888888] hover:text-[#C9B99A] transition-colors duration-200 hover-line w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="meta-label mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:liurey55@gmail.com"
                className="font-mono text-[11px] tracking-[0.15em] text-[#888888] hover:text-[#C9B99A] transition-colors duration-200 hover-line w-fit"
              >
                EMAIL ↗
              </a>
              <a
                href="https://github.com/Reyonl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.15em] text-[#888888] hover:text-[#C9B99A] transition-colors duration-200 hover-line w-fit"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="meta-label">© {year} Reyon Lau Jiemin</p>
          <p className="meta-label">Built with Next.js · TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
