"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  y?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  once = true,
  y = 20,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : prefersReduced
          ? { opacity: 0 }
          : { opacity: 0, y }
      }
      transition={{
        duration: prefersReduced ? 0.15 : 0.65,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
