"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { scrollToSection } from "@/utils/scroll-to-section";

import { fadeInUp, staggerContainer, staggerItem } from "@/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks";
import type { HeroSection, PersonalInfo } from "@/types";

import { HeroBackground } from "./hero-background";
import { HeroStats } from "./hero-stats";

interface HeroSectionProps {
  hero: HeroSection;
  personalInfo: PersonalInfo;
}

export function Hero({ hero, personalInfo }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden lg:scroll-mt-0"
      aria-label="Hero section"
    >
      <HeroBackground />

      <div className="container-max relative z-10 px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={reducedMotion ? undefined : staggerContainer}
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "visible"}
          className="max-w-4xl"
        >
          <motion.div variants={reducedMotion ? undefined : staggerItem}>
            <Badge variant="accent" className="mb-6">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
              Available for opportunities
            </Badge>
          </motion.div>

          <motion.p
            variants={reducedMotion ? undefined : fadeInUp}
            className="mb-2 text-lg text-white/80 sm:text-xl"
          >
            {hero.greeting}
          </motion.p>

          <motion.h1
            variants={reducedMotion ? undefined : staggerItem}
            className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="text-gradient">{hero.headline}</span>
          </motion.h1>

          <motion.p
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-2 text-xl font-medium text-white sm:text-2xl"
          >
            {personalInfo.role}
          </motion.p>

          <motion.div
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-4 flex items-center gap-2 text-white/70"
          >
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-sm sm:text-base">{personalInfo.location}</span>
            <span className="text-border">•</span>
            <span className="text-sm sm:text-base">
              {personalInfo.experienceYears} Years Experience
            </span>
          </motion.div>

          <motion.p
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={hero.ctaPrimary.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(hero.ctaPrimary.href);
              }}
            >
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                {hero.ctaPrimary.label}
              </Button>
            </a>
            <a
              href={hero.ctaSecondary.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(hero.ctaSecondary.href);
              }}
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                {hero.ctaSecondary.label}
              </Button>
            </a>
            {personalInfo.resumeUrl && (
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="lg" className="w-full text-white sm:w-auto hover:bg-white/10">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Resume
                </Button>
              </a>
            )}
          </motion.div>

          <HeroStats stats={hero.stats} />
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
          animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ArrowDown className="h-5 w-5 text-white/50" />
        </motion.div>
      </div>
    </section>
  );
}
