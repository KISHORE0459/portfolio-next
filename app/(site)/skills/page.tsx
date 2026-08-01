import type { Metadata } from "next";

import { JsonLdScript } from "@/components/shared";
import { SkillsSection } from "@/components/sections/skills";
import { buildMetadata, buildPageJsonLd } from "@/lib/seo";
import { getPortfolioData } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return buildMetadata({
    page: "skills",
    personalInfo: data.personalInfo,
  });
}

export default async function SkillsPage() {
  const data = await getPortfolioData();
  const jsonLd = buildPageJsonLd({
    personalInfo: data.personalInfo,
    page: "skills",
  });

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <main id="main-content" aria-label="Skills">
        <SkillsSection skills={data.skills} />
      </main>
    </>
  );
}
