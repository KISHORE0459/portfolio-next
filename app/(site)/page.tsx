import type { Metadata } from "next";

import { JsonLdScript } from "@/components/shared";
import { About } from "@/components/sections/about";
import { BlogsSection } from "@/components/sections/blogs";
import { ContactSection } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { buildMetadata, buildPageJsonLd } from "@/lib/seo";
import { getPortfolioData } from "@/services";

const HOME_PREVIEW_LIMIT = 4;

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
        {data.about.isVisible !== false && <About data={data.about} />}
        <ExperienceSection experiences={data.experiences} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection
          projects={data.projects}
          limit={HOME_PREVIEW_LIMIT}
          showViewAll
        />
        <BlogsSection
          blogs={data.blogs}
          limit={HOME_PREVIEW_LIMIT}
          showViewAll
        />
        {data.personalInfo.isVisible !== false && (
          <ContactSection personalInfo={data.personalInfo} />
        )}
      </main>
    </>
  );
}
