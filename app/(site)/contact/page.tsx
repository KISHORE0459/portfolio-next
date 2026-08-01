import type { Metadata } from "next";

import { JsonLdScript } from "@/components/shared";
import { ContactSection } from "@/components/sections/contact";
import { buildMetadata, buildPageJsonLd } from "@/lib/seo";
import { getPortfolioData } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return buildMetadata({
    page: "contact",
    personalInfo: data.personalInfo,
  });
}

export default async function ContactPage() {
  const data = await getPortfolioData();
  const jsonLd = buildPageJsonLd({
    personalInfo: data.personalInfo,
    page: "contact",
  });

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <main id="main-content" aria-label="Contact">
        {data.personalInfo.isVisible !== false && (
          <ContactSection personalInfo={data.personalInfo} />
        )}
      </main>
    </>
  );
}
