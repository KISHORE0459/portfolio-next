import type { Metadata } from "next";

import { JsonLdScript } from "@/components/shared";
import { About } from "@/components/sections/about";
import { buildMetadata, buildPageJsonLd } from "@/lib/seo";
import { getPortfolioData } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return buildMetadata({
    page: "about",
    personalInfo: data.personalInfo,
  });
}

export default async function AboutPage() {
  const data = await getPortfolioData();
  const jsonLd = buildPageJsonLd({
    personalInfo: data.personalInfo,
    page: "about",
  });

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <main id="main-content" aria-label="About">
        {data.about.isVisible !== false && <About data={data.about} />}
      </main>
    </>
  );
}
