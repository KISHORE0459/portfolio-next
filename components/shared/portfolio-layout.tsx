import type { ReactNode } from "react";

import { Sidebar } from "@/components/shared/sidebar";
import type { NavItem, PersonalInfo, SocialLink } from "@/types";

interface PortfolioLayoutProps {
  children: ReactNode;
  personalInfo: PersonalInfo;
  navigation: NavItem[];
  socialLinks: SocialLink[];
}

export function PortfolioLayout({
  children,
  personalInfo,
  navigation,
  socialLinks,
}: PortfolioLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        personalInfo={personalInfo}
        navigation={navigation}
        socialLinks={socialLinks}
      />
      <div className="lg:pl-[280px]">{children}</div>
    </div>
  );
}
