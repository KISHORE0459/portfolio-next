import Link from "next/link";

import type { PersonalInfo } from "@/types";

interface FooterProps {
  personalInfo: PersonalInfo;
}

export function Footer({ personalInfo }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-10">
      <div className="container-max flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-white">{personalInfo.name}</p>
          <p className="mt-1 text-sm text-white/70">{personalInfo.role}</p>
        </div>

        <ul className="flex items-center gap-4" aria-label="Social links">
          {personalInfo.linkedinUrl && (
            <li>
              <Link
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 transition-colors hover:text-primary"
              >
                LinkedIn
              </Link>
            </li>
          )}
          {personalInfo.instagramUrl && (
            <li>
              <Link
                href={personalInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 transition-colors hover:text-primary"
              >
                Instagram
              </Link>
            </li>
          )}
          {personalInfo.email && (
            <li>
              <Link
                href={`mailto:${personalInfo.email}`}
                className="text-sm text-white/70 transition-colors hover:text-primary"
              >
                Email
              </Link>
            </li>
          )}
        </ul>

        <p className="text-sm text-white/60">
          © {year} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
