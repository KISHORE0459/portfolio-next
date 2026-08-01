import { EditorialEntry, Section, SectionHeading } from "@/components/shared";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(date: string): string {
  const [year, month] = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(month, 10) - 1] ?? ""} ${year}`;
}

function formatPeriod(exp: Experience): string {
  const start = formatDate(exp.startDate);
  const end = exp.isCurrent
    ? "Present"
    : exp.endDate
      ? formatDate(exp.endDate)
      : "";
  return end ? `${start} — ${end}` : start;
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
      <div className="border-y border-foreground/10">
        {visible.map((exp) => (
          <EditorialEntry
            key={exp._id}
            metaLeft={formatPeriod(exp)}
            metaRight={exp.location}
            title={`${exp.role} @ ${exp.company}`}
            description={exp.responsibilities.slice(0, 3).join(" ")}
            tags={exp.technologies}
          />
        ))}
      </div>
    </Section>
  );
}
