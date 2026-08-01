import Image from "next/image";

import { Section, SectionHeading } from "@/components/shared";
import type { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
}

function SkillIcon({ skill }: { skill: Skill }) {
  if (skill.iconUrl) {
    return (
      <Image
        src={skill.iconUrl}
        alt={`${skill.name} icon`}
        width={48}
        height={48}
        className="h-12 w-12 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
        unoptimized
      />
    );
  }

  return (
    <span
      className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-sm font-semibold text-primary transition-transform duration-300 ease-out group-hover:scale-110"
      aria-hidden="true"
    >
      {skill.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const visible = skills.filter(
    (skill) => skill.isVisible !== false && skill.tag?.title,
  );

  const tags = [
    ...new Map(visible.map((skill) => [skill.tag._id, skill.tag])).values(),
  ].sort((a, b) => (a.orderRank ?? "").localeCompare(b.orderRank ?? ""));

  return (
    <Section id="skills">
      <SectionHeading
        label="Expertise"
        title="Skills"
        description="Technologies I use to build modern web applications."
      />
      <div className="space-y-12">
        {tags.map((tag) => (
          <div key={tag._id} className="flex flex-col gap-5">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary">
              {tag.title}
            </h3>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {visible
                .filter((skill) => skill.tag._id === tag._id)
                .map((skill) => (
                  <li key={skill._id}>
                    <div className="group relative flex h-full cursor-pointer flex-col items-center gap-3 rounded-xl border border-transparent px-3 py-4 text-center transition-all duration-300 ease-out hover:-translate-y-1 ">
                      <SkillIcon skill={skill} />
                      <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                        {skill.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-5 bottom-0 h-[3px] origin-center scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
