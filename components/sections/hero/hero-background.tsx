"use client";

import { motion } from "framer-motion";

import { floatAnimation } from "@/animations";
import { useReducedMotion } from "@/hooks";

export function HeroBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(63 63 70 / 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(63 63 70 / 0.35) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 40% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Warm light wells */}
      <motion.div
        className="absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[100px]"
        animate={reducedMotion ? undefined : floatAnimation}
      />
      <motion.div
        className="absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-[110px]"
        animate={
          reducedMotion
            ? undefined
            : {
                ...floatAnimation,
                transition: {
                  ...floatAnimation.transition,
                  duration: 9,
                  delay: 0.8,
                },
              }
        }
      />
      <div className="absolute left-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-accent-light/5 blur-3xl" />

      {/* Accent beam */}
      <div className="absolute -right-10 top-0 h-full w-px bg-linear-to-b from-transparent via-primary/40 to-transparent opacity-60" />
      <div className="absolute right-8 top-24 h-40 w-px bg-linear-to-b from-primary/70 to-transparent" />
    </div>
  );
}
