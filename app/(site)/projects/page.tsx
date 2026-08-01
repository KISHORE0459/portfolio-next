import type { Metadata } from "next";

import { JsonLdScript } from "@/components/shared";
import { ProjectsSection } from "@/components/sections/projects";
import { buildMetadata, buildPageJsonLd } from "@/lib/seo";
import { getPortfolioData } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return buildMetadata({
    page: "projects",
    personalInfo: data.personalInfo,
  });
}

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  const jsonLd = buildPageJsonLd({
    personalInfo: data.personalInfo,
    page: "projects",
  });

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <main id="main-content" aria-label="Featured projects">
        <ProjectsSection projects={data.projects} />
      </main>
    </>
  );
}
