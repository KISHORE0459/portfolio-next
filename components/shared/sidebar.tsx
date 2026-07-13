"use client";

import { Code2, Menu, Users, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { useActiveSection } from "@/hooks";
import { cn } from "@/lib/utils";
import type { NavItem, PersonalInfo, SocialLink } from "@/types";
import { getNavIcon } from "@/utils/nav-icons";
import { scrollToSection } from "@/utils/scroll-to-section";

interface SidebarProps {
  personalInfo: PersonalInfo;
  navigation: NavItem[];
  socialLinks: SocialLink[];
}

const socialIconMap: Record<string, typeof Code2> = {
  github: Code2,
  linkedin: Users,
};

function ProfileAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/10 bg-gradient-to-br from-primary/30 to-accent/30 text-2xl font-bold text-white shadow-lg">
      {initials}
    </div>
  );
}

export function Sidebar({
  personalInfo,
  navigation,
  socialLinks,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const visibleNav = navigation.filter((item) => item.isVisible !== false);
  const sectionIds = visibleNav.map((item) => item.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();
      if (scrollToSection(href)) {
        setIsMobileOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileOpen]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => scrollToSection(hash), 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const sidebarContent = (
    <div className="flex h-full flex-col px-6 py-10">
      <div className="text-center">
        <ProfileAvatar name={personalInfo.name} />
        <h2 className="mt-5 text-xl font-bold text-white">{personalInfo.name}</h2>
        <p className="mt-1 text-sm text-white/70">{personalInfo.role}</p>
      </div>

      <ul className="mt-6 flex justify-center gap-3" aria-label="Social links">
        {socialLinks
          .filter((link) => link.isVisible !== false)
          .map((link) => {
            const Icon = socialIconMap[link.icon] ?? Code2;
            return (
              <li key={link._id}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 transition-colors hover:bg-primary hover:text-white"
                  aria-label={link.platform}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              </li>
            );
          })}
      </ul>

      <nav className="mt-10 flex-1" aria-label="Main navigation">
        <ul className="space-y-1">
          {visibleNav.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            const Icon = getNavIcon(item.label);

            return (
              <li key={item._id}>
                <a
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-white/80 hover:bg-white/5 hover:text-white",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-sidebar text-white lg:hidden"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        aria-expanded={isMobileOpen}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-[280px] border-r border-white/5 bg-sidebar transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        aria-label="Sidebar"
      >
        {sidebarContent}
      </aside>
    </>
  );
}
