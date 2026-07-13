import { Section, SectionHeading } from "@/components/shared";
import type { AboutSection } from "@/types";

interface AboutProps {
  data: AboutSection;
}

export function About({ data }: AboutProps) {
  return (
    <Section id="about">
      <SectionHeading
        label="Get to know me"
        title={data.title}
        description={data.subtitle}
      />
      <ul className="grid gap-4 sm:grid-cols-2">
        {data.highlights.map((highlight) => (
          <li
            key={highlight}
            className="glass rounded-xl p-5 text-sm leading-relaxed text-white/90"
          >
            {highlight}
          </li>
        ))}
      </ul>
    </Section>
  );
}
