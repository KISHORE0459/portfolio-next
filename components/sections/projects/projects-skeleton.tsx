import {
  EditorialEntrySkeleton,
  Section,
  SectionHeadingSkeleton,
} from "@/components/shared";

export function ProjectsSkeleton() {
  return (
    <Section id="projects" aria-busy="true" aria-label="Loading projects">
      <SectionHeadingSkeleton />
      <div className="border-y border-foreground/10">
        {Array.from({ length: 3 }, (_, index) => (
          <EditorialEntrySkeleton key={index} />
        ))}
      </div>
    </Section>
  );
}
