"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { staggerContainer, staggerItem } from "@/animations";
import { Section, SectionHeading } from "@/components/shared";
import {
  InstagramIcon,
  LinkedInIcon,
} from "@/components/shared/social-icons";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks";
import type { PersonalInfo } from "@/types";

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}

export function ContactSection({ personalInfo }: ContactSectionProps) {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? {}
    : {
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
      };

  const socials = [
    personalInfo.linkedinUrl
      ? {
          id: "linkedin",
          label: "LinkedIn",
          href: personalInfo.linkedinUrl,
          icon: LinkedInIcon,
        }
      : null,
    personalInfo.instagramUrl
      ? {
          id: "instagram",
          label: "Instagram",
          href: personalInfo.instagramUrl,
          icon: InstagramIcon,
        }
      : null,
  ].filter(Boolean) as Array<{
    id: string;
    label: string;
    href: string;
    icon: typeof LinkedInIcon;
  }>;

  const details: Array<{
    id: string;
    label: string;
    value: string;
    href: string;
    icon: typeof Mail;
    external?: boolean;
  }> = [
    {
      id: "email",
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
    },
    ...(personalInfo.phone
      ? [
          {
            id: "phone",
            label: "Phone",
            value: personalInfo.phone,
            href: `tel:${personalInfo.phone.replace(/\s+/g, "")}`,
            icon: Phone,
          },
        ]
      : []),
    {
      id: "location",
      label: "Location",
      value: personalInfo.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`,
      icon: MapPin,
      external: true,
    },
  ];

  return (
    <Section id="contact" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-0 top-0 h-80 w-[36rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <SectionHeading
        label="Let's connect"
        title="Get In Touch"
        description="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
      />

      <motion.div {...motionProps} className="max-w-2xl">
        {personalInfo.availability && (
          <motion.p
            variants={reducedMotion ? undefined : staggerItem}
            className="mb-8 inline-flex items-center gap-2.5 text-sm text-foreground/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {personalInfo.availability}
          </motion.p>
        )}

        <motion.div
          variants={reducedMotion ? undefined : staggerItem}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link href={`mailto:${personalInfo.email}`}>
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              Send an email
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          {personalInfo.phone && (
            <Link href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Call me
              </Button>
            </Link>
          )}
        </motion.div>

        <motion.dl
          variants={reducedMotion ? undefined : staggerItem}
          className="mt-12 w-full border-y border-foreground/10 py-2"
        >
          {details.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-foreground/10 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-8"
              >
                <dt className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/45">
                  <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {item.label}
                </dt>
                <dd>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-foreground transition-colors hover:text-primary sm:text-base"
                  >
                    {item.value}
                  </Link>
                </dd>
              </div>
            );
          })}
        </motion.dl>

        {socials.length > 0 && (
          <motion.ul
            variants={reducedMotion ? undefined : staggerItem}
            className="mt-10 flex flex-wrap items-center gap-8"
            aria-label="Social links"
          >
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.id}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                    {social.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </motion.div>
    </Section>
  );
}
