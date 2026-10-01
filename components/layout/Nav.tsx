"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/work", label: "WORK" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
  { href: "https://github.com/Reyonl", label: "GITHUB", external: true },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Escape closes the mobile menu; body scroll locks while open.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-4 focus:py-2 focus:bg-[#F2F2F0] focus:text-[#080808] focus:font-mono focus:text-[11px] focus:tracking-[0.15em] focus:uppercase"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-[#222222] bg-[#080808]/95 backdrop-blur-[2px]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.22em] text-[#F2F2F0] hover:text-[#C9B99A] transition-colors duration-200"
              aria-label="Reyon Lau Jiemin — Home"
            >
              REYON
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-current={!link.external && pathname === link.href ? "page" : undefined}
                  className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-200 hover-line ${
                    !link.external && pathname.startsWith(link.href)
                      ? "text-[#C9B99A]"
                      : "text-[#555555] hover:text-[#F2F2F0]"
                  }`}
                >
                  {link.label}
                  {link.external && <span className="ml-0.5 text-[#555555]">↗</span>}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span className={`block w-5 h-px bg-[#888888] transition-transform duration-200 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block w-5 h-px bg-[#888888] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-[#888888] transition-transform duration-200 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 bg-[#080808] flex flex-col pt-14 motion-fade"
        >
          <nav className="flex flex-col flex-1 px-6 pt-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-6 font-display text-3xl border-b border-[#222222] text-[#F2F2F0]"
              >
                {link.label}
                {link.external && <span className="font-mono text-sm text-[#555555]">↗</span>}
              </Link>
            ))}
          </nav>
          <div className="px-6 py-8">
            <p className="meta-label">PORTFOLIO · 2026</p>
          </div>
        </div>
      )}
    </>
  );
}
