import type { ReactNode } from "react";

import { PortfolioLayout } from "@/components/shared";
import { getPortfolioData } from "@/services";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await getPortfolioData();

  return (
    <PortfolioLayout personalInfo={data.personalInfo}>
      {children}
    </PortfolioLayout>
  );
}
