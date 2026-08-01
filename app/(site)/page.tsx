import type { Metadata } from "next";

import { JsonLdScript } from "@/components/shared";
import { Hero } from "@/components/sections/hero";
import { buildMetadata, buildPageJsonLd } from "@/lib/seo";
import { getPortfolioData } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return buildMetadata({
    page: "home",
    personalInfo: data.personalInfo,
  });
}

export default async function HomePage() {
  const data = await getPortfolioData();
  const jsonLd = buildPageJsonLd({
    personalInfo: data.personalInfo,
    page: "home",
  });

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <main
        id="main-content"
        aria-label={`${data.personalInfo.name} — ${data.personalInfo.role} portfolio`}
      >
        {data.personalInfo.isVisible !== false && (
          <Hero personalInfo={data.personalInfo} />
        )}
      </main>
    </>
  );
}
