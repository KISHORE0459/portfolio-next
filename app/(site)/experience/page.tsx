import type { Metadata } from "next";

import { JsonLdScript } from "@/components/shared";
import { ExperienceSection } from "@/components/sections/experience";
import { buildMetadata, buildPageJsonLd } from "@/lib/seo";
import { getPortfolioData } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return buildMetadata({
    page: "experience",
    personalInfo: data.personalInfo,
  });
}

export default async function ExperiencePage() {
  const data = await getPortfolioData();
  const jsonLd = buildPageJsonLd({
    personalInfo: data.personalInfo,
    page: "experience",
  });

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <main id="main-content" aria-label="Work experience">
        <ExperienceSection experiences={data.experiences} />
      </main>
    </>
  );
}
