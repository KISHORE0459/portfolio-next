"use client";

import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  InstagramIcon,
  LinkedInIcon,
} from "@/components/shared/social-icons";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useActiveSection } from "@/hooks";
import { cn } from "@/lib/utils";
import type { NavItem, PersonalInfo } from "@/types";
import { getNavIcon } from "@/utils/nav-icons";
import { scrollToSection } from "@/utils/scroll-to-section";

interface SidebarProps {
  personalInfo: PersonalInfo;
  navigation: NavItem[];
}

interface SidebarSocialItem {
  id: string;
  label: string;
  href: string;
  icon: "linkedin" | "instagram" | "email";
  external: boolean;
}

function ProfileAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-card text-base font-bold text-foreground shadow-md">
      {initials}
    </div>
  );
}

function SocialIcon({
  icon,
  className,
}: {
  icon: SidebarSocialItem["icon"];
  className?: string;
}) {
  if (icon === "linkedin") return <LinkedInIcon className={className} />;
  if (icon === "instagram") return <InstagramIcon className={className} />;
  return <Mail className={className} />;
}

function getHashId(href: string): string | null {
  if (!href.includes("#")) return null;
  return href.split("#")[1] || null;
}

function isPageLink(href: string): boolean {
  return !href.includes("#");
}

function getSectionIdFromHref(href: string): string | null {
  const hashId = getHashId(href);
  if (hashId) return hashId;
  if (href.startsWith("/")) {
    const segment = href.replace(/^\//, "").split("/")[0];
    return segment || null;
  }
  return null;
}

const HOME_SCROLL_SECTIONS = [
  "hero",
  "about",
  "experience",
  "skills",
  "projects",
  "blogs",
  "contact",
] as const;

export function Sidebar({ personalInfo, navigation }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hash, setHash] = useState("");

  const homeSectionIds = useMemo(() => [...HOME_SCROLL_SECTIONS], []);

  const activeSection = useActiveSection(
    pathname === "/" ? homeSectionIds : [],
  );

  const sidebarSocials = useMemo((): SidebarSocialItem[] => {
    const items: SidebarSocialItem[] = [];

    if (personalInfo.linkedinUrl) {
      items.push({
        id: "linkedin",
        label: "LinkedIn",
        href: personalInfo.linkedinUrl,
        icon: "linkedin",
        external: true,
      });
    }

    if (personalInfo.instagramUrl) {
      items.push({
        id: "instagram",
        label: "Instagram",
        href: personalInfo.instagramUrl,
        icon: "instagram",
        external: true,
      });
    }

    if (personalInfo.email) {
      items.push({
        id: "email",
        label: "Email",
        href: `mailto:${personalInfo.email}`,
        icon: "email",
        external: false,
      });
    }

    return items;
  }, [personalInfo]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileOpen]);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace("#", ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const currentHash = window.location.hash;
    if (!currentHash) return;
    const timer = window.setTimeout(() => scrollToSection(currentHash), 80);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const isItemActive = useCallback(
    (href: string) => {
      const sectionId = getSectionIdFromHref(href);

      // Dedicated projects/blogs pages
      if (isPageLink(href)) {
        if (pathname === href || pathname.startsWith(`${href}/`)) {
          return true;
        }
        // Homepage preview sections
        return pathname === "/" && sectionId === activeSection;
      }

      if (pathname !== "/") return false;
      if (!sectionId) return false;

      if (sectionId === "hero") {
        return activeSection === "hero" || (!activeSection && !hash);
      }

      return activeSection === sectionId || hash === sectionId;
    },
    [activeSection, hash, pathname],
  );

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (isPageLink(href)) {
        setIsMobileOpen(false);
        return;
      }

      const sectionId = getHashId(href);
      if (!sectionId) return;

      if (pathname === "/") {
        event.preventDefault();
        scrollToSection(`#${sectionId}`);
        setHash(sectionId === "hero" ? "" : sectionId);
        setIsMobileOpen(false);
      } else {
        setIsMobileOpen(false);
      }
    },
    [pathname],
  );

  const sidebarContent = (
    <div className="flex h-full flex-col px-5 py-8">
      <div className="text-center">
        <Link
          href="/#hero"
          className="inline-block"
          onClick={(event) => handleNavClick(event, "/#hero")}
        >
          <ProfileAvatar name={personalInfo.name} />
          <h2 className="mt-3 text-base font-semibold text-foreground">
            {personalInfo.name}
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {personalInfo.role}
          </p>
        </Link>
      </div>

      <ul className="mt-4 flex justify-center gap-2" aria-label="Social links">
        {sidebarSocials.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label={link.label}
            >
              <SocialIcon icon={link.icon} className="h-3.5 w-3.5" />
            </Link>
          </li>
        ))}
      </ul>

      <nav className="mt-8 flex-1" aria-label="Main navigation">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = isItemActive(item.href);
            const Icon = getNavIcon(item.label);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-card hover:text-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 lg:right-6 lg:top-6">
        <ThemeToggle />
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card/90 text-foreground shadow-lg backdrop-blur-xl lg:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-expanded={isMobileOpen}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-[260px] border-r border-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        aria-label="Sidebar"
      >
        {sidebarContent}
      </aside>
    </>
  );
}
