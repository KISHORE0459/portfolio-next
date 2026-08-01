import {
  EditorialEntrySkeleton,
  Section,
  SectionHeadingSkeleton,
} from "@/components/shared";

export function ExperienceSkeleton() {
  return (
    <Section id="experience" aria-busy="true" aria-label="Loading experience">
      <SectionHeadingSkeleton />
      <div className="border-y border-foreground/10">
        {Array.from({ length: 2 }, (_, index) => (
          <EditorialEntrySkeleton key={index} />
        ))}
      </div>
    </Section>
  );
}
