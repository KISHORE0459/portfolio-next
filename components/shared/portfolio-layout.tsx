import type { ReactNode } from "react";

import { Sidebar } from "@/components/shared/sidebar";
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
      <Sidebar
        personalInfo={personalInfo}
        navigation={[...siteConfig.navigation]}
      />
      <div className="lg:pl-[260px]">{children}</div>
    </div>
  );
}
