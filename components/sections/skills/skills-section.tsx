import { Section, SectionHeading } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import type { Technology } from "@/types";

interface SkillsSectionProps {
  technologies: Technology[];
}

export function SkillsSection({ technologies }: SkillsSectionProps) {
  const visible = technologies.filter((tech) => tech.isVisible !== false);
  const categories = [...new Set(visible.map((tech) => tech.category))];

  return (
    <Section id="skills">
      <SectionHeading
        label="Expertise"
        title="Skills & Tech Stack"
        description="Technologies I use to build modern web applications."
      />
      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {visible
                .filter((tech) => tech.category === category)
                .map((tech) => (
                  <Badge
                    key={tech._id}
                    variant="secondary"
                    className="px-4 py-2 text-sm text-white/90"
                  >
                    {tech.name}
                  </Badge>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
