import type { Metadata } from "next";

import { JsonLdScript } from "@/components/shared";
import { BlogsSection } from "@/components/sections/blogs";
import { buildMetadata, buildPageJsonLd } from "@/lib/seo";
import { getPortfolioData } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return buildMetadata({
    page: "blogs",
    personalInfo: data.personalInfo,
  });
}

export default async function BlogsPage() {
  const data = await getPortfolioData();
  const jsonLd = buildPageJsonLd({
    personalInfo: data.personalInfo,
    page: "blogs",
  });

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <main id="main-content" aria-label="Blogs">
        <BlogsSection blogs={data.blogs} />
      </main>
    </>
  );
}
