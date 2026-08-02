import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

import { ProjectCard } from "./project-card";

interface ProjectsSectionProps {
  projects: Project[];
  limit?: number;
  showViewAll?: boolean;
}

export function ProjectsSection({
  projects,
  limit,
  showViewAll = false,
}: ProjectsSectionProps) {
  const visible = projects.filter((project) => project.isVisible !== false);
  const items = typeof limit === "number" ? visible.slice(0, limit) : visible;

  return (
    <Section id="projects">
      <SectionHeading
        label="Portfolio"
        title="Featured Projects"
        description="Selected work showcasing my frontend engineering capabilities."
      />
      <div className="border-y border-foreground/10">
        {items.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
      {showViewAll && (
        <div className="mt-10 flex justify-start">
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            View all projects
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </Section>
  );
}
