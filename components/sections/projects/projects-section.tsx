import Link from "next/link";
import { Code2, ExternalLink } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

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
      <div className="grid gap-6 sm:grid-cols-2">
        {visible.map((project) => (
          <article
            key={project._id}
            className="glass group flex flex-col rounded-2xl p-6 transition-all hover:border-primary/30"
          >
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/80">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-white/75">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="mt-5 flex gap-4">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-primary"
                >
                  <Code2 className="h-4 w-4" />
                  Code
                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
