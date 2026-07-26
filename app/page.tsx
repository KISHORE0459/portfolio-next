import {
  Footer,
  PortfolioLayout,
} from "@/components/shared";
import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { getPortfolioData } from "@/services";

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <PortfolioLayout personalInfo={data.personalInfo}>
      <main>
        {data.personalInfo.isVisible !== false && (
          <Hero personalInfo={data.personalInfo} />
        )}
        {data.about.isVisible !== false && <About data={data.about} />}
        <ExperienceSection experiences={data.experiences} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} />
        {data.personalInfo.isVisible !== false && (
          <ContactSection personalInfo={data.personalInfo} />
        )}
      </main>
      <Footer personalInfo={data.personalInfo} />
    </PortfolioLayout>
  );
}
