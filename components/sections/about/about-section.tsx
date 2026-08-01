import { EditorialEntry, Section, SectionHeading } from "@/components/shared";
import type { AboutHighlight, AboutSection } from "@/types";

interface AboutProps {
  data: AboutSection;
}

const highlightMeta: Record<
  string,
  { label: string; tags: string[] }
> = {
  globe: { label: "Product", tags: ["web", "apps", "frontend"] },
  palette: { label: "Design", tags: ["ui", "ux", "accessibility"] },
  server: { label: "Engineering", tags: ["backend", "apis", "nodejs"] },
  zap: { label: "Quality", tags: ["performance", "scale", "craft"] },
};

function AboutHighlightEntry({
  highlight,
  index,
}: {
  highlight: AboutHighlight;
  index: number;
}) {
  const meta = highlightMeta[highlight.icon ?? ""] ?? {
    label: "Focus",
    tags: ["development"],
  };

  return (
    <EditorialEntry
      metaLeft={meta.label}
      metaRight={String(index + 1).padStart(2, "0")}
      title={highlight.title}
      description={highlight.description}
      tags={meta.tags}
    />
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
        <p className="mb-10 max-w-3xl text-base leading-relaxed text-foreground/55 sm:text-lg">
          {data.description}
        </p>
      )}
      <div className="border-y border-foreground/10">
        {data.highlights.map((highlight, index) => (
          <AboutHighlightEntry
            key={highlight.title}
            highlight={highlight}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
