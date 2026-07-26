"use client";

import { motion } from "framer-motion";

import { floatAnimation } from "@/animations";
import { useReducedMotion } from "@/hooks";

export function HeroBackground() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#F97316]/10 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-[#EA580C]/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#F97316]/15 blur-3xl"
        animate={floatAnimation}
      />
      <motion.div
        className="absolute -left-20 bottom-32 h-96 w-96 rounded-full bg-[#EA580C]/10 blur-3xl"
        animate={{
          ...floatAnimation,
          transition: { ...floatAnimation.transition, duration: 8, delay: 1 },
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
}
