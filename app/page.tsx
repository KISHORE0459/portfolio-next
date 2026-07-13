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
    <PortfolioLayout
      personalInfo={data.personalInfo}
      navigation={data.navigation}
      socialLinks={data.socialLinks}
    >
      <main>
        {data.hero.isVisible !== false && (
          <Hero hero={data.hero} personalInfo={data.personalInfo} />
        )}
        {data.about.isVisible !== false && <About data={data.about} />}
        <ExperienceSection experiences={data.experiences} />
        <SkillsSection technologies={data.technologies} />
        <ProjectsSection projects={data.projects} />
        {data.contact.isVisible !== false && (
          <ContactSection contact={data.contact} />
        )}
      </main>
      {data.footer.isVisible !== false && (
        <Footer
          footer={data.footer}
          socialLinks={data.socialLinks}
          name={data.personalInfo.name}
        />
      )}
    </PortfolioLayout>
  );
}
