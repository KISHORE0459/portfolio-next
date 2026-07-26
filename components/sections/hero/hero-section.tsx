"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";

import { fadeInUp, staggerContainer, staggerItem } from "@/animations";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks";
import type { PersonalInfo } from "@/types";
import { scrollToSection } from "@/utils/scroll-to-section";

import { HeroBackground } from "./hero-background";

interface HeroProps {
  personalInfo: PersonalInfo;
}

const HERO_GREETING = "Hello, I'm";
const PRIMARY_CTA = { label: "View My Work", href: "#projects" };
const SECONDARY_CTA = { label: "Get In Touch", href: "#contact" };

export function Hero({ personalInfo }: HeroProps) {
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
          <motion.p
            variants={reducedMotion ? undefined : fadeInUp}
            className="mb-2 text-lg text-muted-foreground sm:text-xl"
          >
            {HERO_GREETING}
          </motion.p>

          <motion.h1
            variants={reducedMotion ? undefined : staggerItem}
            className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-2 text-xl font-medium text-foreground sm:text-2xl"
          >
            {personalInfo.role}
          </motion.p>

          <motion.div
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-4 flex flex-wrap items-center gap-2 text-muted-foreground"
          >
            <MapPin
              className="h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="text-sm sm:text-base">{personalInfo.location}</span>
            <span className="text-border" aria-hidden="true">
              •
            </span>
            <span className="text-sm sm:text-base">
              {personalInfo.experienceYears} Years Experience
            </span>
          </motion.div>

          <motion.p
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {personalInfo.heroDescription}
          </motion.p>

          <motion.div
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={PRIMARY_CTA.href}
              className="cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(PRIMARY_CTA.href);
              }}
            >
              <Button variant="default" size="lg" className="w-full sm:w-auto">
                {PRIMARY_CTA.label}
              </Button>
            </a>
            <a
              href={SECONDARY_CTA.href}
              className="cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(SECONDARY_CTA.href);
              }}
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {SECONDARY_CTA.label}
              </Button>
            </a>
            {personalInfo.resumeUrl && (
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Resume
                </Button>
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
          animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
