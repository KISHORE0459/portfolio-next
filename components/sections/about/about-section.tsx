import { Globe, Palette, Server, Zap, type LucideIcon } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared";
import type { AboutHighlight, AboutSection } from "@/types";

interface AboutProps {
  data: AboutSection;
}

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  palette: Palette,
  server: Server,
  zap: Zap,
};

function AboutCard({ highlight }: { highlight: AboutHighlight }) {
  const Icon = iconMap[highlight.icon ?? ""] ?? Globe;

  return (
    <li className="glass group flex h-full flex-col rounded-xl p-5 transition-colors hover:border-primary/30">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-white">{highlight.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">
        {highlight.description}
      </p>
    </li>
  );
}

export function About({ data }: AboutProps) {
  return (
    <Section id="about">
      <SectionHeading
        label="About Me"
        title={data.title}
        description={data.subtitle}
      />
      {data.description && (
        <p className="mb-10 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
          {data.description}
        </p>
      )}
      <ul className="grid auto-rows-fr gap-4 sm:grid-cols-2">
        {data.highlights.map((highlight) => (
          <AboutCard key={highlight.title} highlight={highlight} />
        ))}
      </ul>
    </Section>
  );
}
