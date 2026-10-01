"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const navLinks = [
  { href: "/projects", label: "WORK" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
  {
    href: "https://github.com/Reyonl",
    label: "GITHUB",
    external: true,
  },
];

export default function Nav() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#222222] bg-[#080808]/95 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Wordmark */}
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.2em] text-[#F2F2F0] hover:text-[#C9B99A] transition-colors duration-200"
              aria-label="Reyon Lau Jiemin — Home"
            >
              REYON
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-200 hover-line ${
                    !link.external && pathname === link.href
                      ? "text-[#C9B99A]"
                      : "text-[#555555] hover:text-[#F2F2F0]"
                  }`}
                >
                  {link.label}
                  {link.external && (
                    <span className="ml-0.5 text-[#555555]">↗</span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-px bg-[#888888] transition-all duration-250 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-[#888888] transition-all duration-250 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-[#888888] transition-all duration-250 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col pt-14"
          >
            <div className="border-b border-[#222222]" />
            <nav
              className="flex flex-col flex-1 px-6 pt-10"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={prefersReduced ? {} : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="border-b border-[#222222]"
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`flex items-center justify-between py-6 font-display text-3xl transition-colors ${
                      !link.external && pathname === link.href
                        ? "text-[#C9B99A]"
                        : "text-[#F2F2F0]"
                    }`}
                  >
                    {link.label}
                    {link.external && (
                      <span className="font-mono text-sm text-[#555555]">↗</span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 py-8">
              <p className="meta-label">PORTFOLIO · 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
