"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getFeaturedProjects } from "@/data/projects";

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const yBg = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : 60]);
  const opacityBg = useTransform(scrollY, [0, 500], [1, 0.3]);
  const yContent = useTransform(scrollY, [0, 400], [0, prefersReduced ? 0 : 30]);

  const featured = getFeaturedProjects()[0];

  const nameWords = ["REYON", "LAU", "JIEMIN"];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col pt-14 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background texture */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: yBg, opacity: opacityBg }}
        aria-hidden="true"
      >
        <Image
          src="/nautical-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover opacity-[0.045] mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]" />
      </motion.div>

      {/* Main grid */}
      <motion.div
        className="relative z-10 flex-1 mx-auto max-w-7xl w-full px-6 lg:px-12 flex flex-col"
        style={prefersReduced ? {} : { y: yContent }}
      >
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0 pt-16 lg:pt-24">
          {/* Left metadata column */}
          <motion.div
            className="hidden lg:flex flex-col gap-8 pt-2 pr-8 border-r border-[#222222]"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <p className="meta-label leading-relaxed">
                PORTFOLIO / 2026
              </p>
            </div>
            <div className="h-px bg-[#222222]" />
            <div>
              <p className="meta-label leading-relaxed">
                INFORMATICS
                <br />
                ENGINEERING
              </p>
            </div>
            <div className="h-px bg-[#222222]" />
            <div>
              <p className="meta-label leading-relaxed">
                WEB DEVELOPMENT
              </p>
            </div>
            <div className="h-px bg-[#222222]" />
            <div>
              <p className="meta-label opacity-40">⌖ 07°S 134°E</p>
            </div>
          </motion.div>

          {/* Right main content */}
          <div className="lg:pl-12 flex flex-col justify-between gap-12">
            {/* Name */}
            <div>
              <h1
                className="font-display leading-[0.88] tracking-tight mb-8"
                aria-label="Reyon Lau Jiemin"
              >
                {nameWords.map((word, i) => (
                  <motion.span
                    key={word}
                    className="block text-[clamp(4rem,11vw,9.5rem)] text-[#F2F2F0]"
                    initial={
                      prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: i * 0.1 + 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Divider */}
              <motion.div
                className="h-px bg-[#222222] mb-7 max-w-md"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: "left" }}
              />

              {/* Role */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="space-y-1 mb-6"
              >
                <p className="font-mono text-xs tracking-[0.2em] text-[#888888]">
                  SOFTWARE ENGINEER
                </p>
                <p className="font-mono text-xs tracking-[0.2em] text-[#555555]">
                  WEB APPLICATION DEVELOPER
                </p>
              </motion.div>

              {/* Statement */}
              <motion.p
                className="text-[clamp(1rem,2vw,1.25rem)] text-[#555555] leading-relaxed max-w-lg mb-10 font-display"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                I build systems, interfaces, and products that solve real
                problems.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
              >
                <Link
                  href="/projects"
                  id="hero-cta-work"
                  className="group inline-flex items-center gap-3 px-7 py-3 bg-[#F2F2F0] text-[#080808] font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#C9B99A] hover:gap-5"
                >
                  VIEW PROJECTS
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <a
                  href="https://github.com/Reyonl"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-cta-github"
                  className="inline-flex items-center gap-2 px-7 py-3 border border-[#222222] text-[#555555] font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:border-[#C9B99A]/30 hover:text-[#C9B99A]"
                >
                  GITHUB ↗
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Current build strip */}
        {featured && (
          <motion.div
            className="mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="border-t border-[#222222] mt-16 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-start sm:items-center gap-4 sm:gap-8">
                <div>
                  <p className="accent-label mb-1">CURRENT BUILD</p>
                </div>
                <div className="sm:border-l sm:border-[#222222] sm:pl-8">
                  <p className="font-mono text-[11px] text-[#F2F2F0] tracking-[0.12em] mb-1">
                    {featured.title}
                  </p>
                  <p className="meta-label">{featured.description}</p>
                </div>
                <div className="sm:border-l sm:border-[#222222] sm:pl-8 space-y-1">
                  <p className="meta-label">
                    STACK&nbsp;&nbsp;
                    <span className="text-[#888888]">
                      {featured.technologies.slice(0, 3).join(" · ")}
                    </span>
                  </p>
                  <p className="meta-label flex items-center gap-1.5">
                    STATUS&nbsp;&nbsp;
                    <span className="status-dot" />
                    <span className="text-[#C9B99A]">SHIPPED</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom padding */}
        <div className="pb-12" />
      </motion.div>
    </section>
  );
}
