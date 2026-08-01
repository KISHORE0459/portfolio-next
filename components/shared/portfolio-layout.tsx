import type { ReactNode } from "react";

import { Footer } from "@/components/shared/footer";
import { Sidebar } from "@/components/shared/sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { siteConfig } from "@/config";
import type { PersonalInfo } from "@/types";

interface PortfolioLayoutProps {
  children: ReactNode;
  personalInfo: PersonalInfo;
}

export function PortfolioLayout({
  children,
  personalInfo,
}: PortfolioLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <Sidebar
        personalInfo={personalInfo}
        navigation={[...siteConfig.navigation]}
      />
      <div className="flex min-h-screen flex-col lg:pl-[260px]">
        <div className="flex-1">{children}</div>
        <Footer personalInfo={personalInfo} />
      </div>
    </div>
  );
}
