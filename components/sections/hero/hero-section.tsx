"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import Link from "next/link";

import { fadeInUp, staggerContainer, staggerItem } from "@/animations";
import { buttonVariants } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import type { PersonalInfo } from "@/types";
import { scrollToSection } from "@/utils/scroll-to-section";

import { HeroBackground } from "./hero-background";
import { HeroIllustration } from "./hero-illustration";

interface HeroProps {
  personalInfo: PersonalInfo;
}

const HERO_GREETING = "Hello, I'm";
const PRIMARY_CTA = { label: "View My Work", href: "/projects" };
const SECONDARY_CTA = { label: "Get In Touch", href: "#contact" };

export function Hero({ personalInfo }: HeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden lg:scroll-mt-0"
      aria-label={`${personalInfo.name} — ${personalInfo.role}`}
    >
      <HeroBackground />

      <div className="container-max relative z-10 px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-10 lg:gap-14">
          <motion.div
            variants={reducedMotion ? undefined : staggerContainer}
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? undefined : "visible"}
            className="relative min-w-0 flex-1 max-w-2xl"
          >
            <motion.p
              variants={reducedMotion ? undefined : fadeInUp}
              className="mb-3 text-sm uppercase tracking-[0.28em] text-primary sm:text-base"
            >
              {HERO_GREETING}
            </motion.p>

            <motion.h1
              variants={reducedMotion ? undefined : staggerItem}
              className="whitespace-nowrap text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.div
              variants={reducedMotion ? undefined : staggerItem}
              className="mt-5 flex items-center gap-3"
            >
              <span
                className="h-px w-8 shrink-0 bg-primary sm:w-12"
                aria-hidden="true"
              />
              <p className="text-lg font-medium text-foreground/90 sm:text-xl lg:text-2xl">
                {personalInfo.role}
              </p>
            </motion.div>

            <motion.div
              variants={reducedMotion ? undefined : staggerItem}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/55 sm:text-base"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {personalInfo.location}
              </span>
              <span
                className="hidden text-foreground/25 sm:inline"
                aria-hidden="true"
              >
                /
              </span>
              <span>{personalInfo.experienceYears} Years Experience</span>
            </motion.div>

            <motion.p
              variants={reducedMotion ? undefined : staggerItem}
              className="mt-8 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg"
            >
              {personalInfo.heroDescription}
            </motion.p>

            <motion.div
              variants={reducedMotion ? undefined : staggerItem}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link
                href={PRIMARY_CTA.href}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                {PRIMARY_CTA.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={SECONDARY_CTA.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(SECONDARY_CTA.href);
                }}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                {SECONDARY_CTA.label}
              </a>
              {personalInfo.resumeUrl && (
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center justify-center px-2 text-sm font-medium leading-none text-foreground/75 transition-colors hover:text-primary"
                >
                  Resume
                  <Download
                    className="ml-0 h-4 w-4 opacity-0 transition-all duration-300 ease-out group-hover:ml-1.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              )}
            </motion.div>
          </motion.div>

          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
