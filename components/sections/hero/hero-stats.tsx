"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { staggerContainer, staggerItem } from "@/animations";
import { useAnimatedCounter, useReducedMotion } from "@/hooks";
import type { HeroStat } from "@/types";

interface HeroStatsProps {
  stats: HeroStat[];
}

function StatItem({ stat, enabled }: { stat: HeroStat; enabled: boolean }) {
  const numericValue = parseInt(stat.value, 10) || 0;
  const count = useAnimatedCounter({ end: numericValue, enabled });

  return (
    <motion.div
      variants={staggerItem}
      className="glass rounded-2xl p-5 text-center sm:p-6"
    >
      <p className="text-3xl font-bold text-gradient sm:text-4xl">
        {enabled ? count : stat.value}
        {stat.suffix}
      </p>
      <p className="mt-1 text-sm text-white/70">{stat.label}</p>
    </motion.div>
  );
}

export function HeroStats({ stats }: HeroStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          stat={stat}
          enabled={isInView && !reducedMotion}
        />
      ))}
    </motion.div>
  );
}
