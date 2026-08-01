import { Section, SectionHeading } from "@/components/shared";
import type { Project } from "@/types";

import { ProjectCard } from "./project-card";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const visible = projects.filter((project) => project.isVisible !== false);

  return (
    <Section id="projects">
      <SectionHeading
        label="Portfolio"
        title="Featured Projects"
        description="Selected work showcasing my frontend engineering capabilities."
      />
      <div className="border-y border-foreground/10">
        {visible.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
