import { Section, SectionHeading } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(date: string): string {
  const [year, month] = date.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[parseInt(month, 10) - 1] ?? ""} ${year}`;
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const visible = experiences.filter((exp) => exp.isVisible !== false);

  return (
    <Section id="experience">
      <SectionHeading
        label="Career"
        title="Work Experience"
        description="Building products that serve thousands of users."
      />
      <div className="space-y-8">
        {visible.map((exp) => (
          <article key={exp._id} className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                <p className="mt-1 text-primary">{exp.company}</p>
              </div>
              <p className="text-sm text-white/70">
                {formatDate(exp.startDate)} —{" "}
                {exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
              </p>
            </div>
            <ul className="mt-5 space-y-2">
              {exp.responsibilities.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-3 text-sm text-white/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-white/80">
                  {tech}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
