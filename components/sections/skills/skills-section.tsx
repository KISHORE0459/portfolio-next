import Image from "next/image";

import { Section, SectionHeading } from "@/components/shared";
import type { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
}

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <li>
      <div className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 transition-colors duration-200 hover:border-primary/40 hover:bg-primary/10">
        {skill.iconUrl ? (
          <Image
            src={skill.iconUrl}
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain"
            unoptimized
          />
        ) : (
          <span
            className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary/15 text-[9px] font-semibold text-primary"
            aria-hidden="true"
          >
            {skill.name.slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className="text-sm text-foreground/80 transition-colors group-hover:text-primary">
          {skill.name}
        </span>
      </div>
    </li>
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
      <div className="space-y-8">
        {tags.map((tag) => {
          const groupSkills = visible.filter(
            (skill) => skill.tag._id === tag._id,
          );

          return (
            <div
              key={tag._id}
              className="grid gap-4 border-t border-foreground/10 pt-8 first:border-t-0 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-8"
            >
              <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-primary sm:pt-1.5">
                {tag.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {groupSkills.map((skill) => (
                  <SkillPill key={skill._id} skill={skill} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
