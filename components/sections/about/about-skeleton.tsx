import {
  EditorialEntrySkeleton,
  Section,
  SectionHeadingSkeleton,
  Skeleton,
} from "@/components/shared";

export function AboutSkeleton() {
  return (
    <Section id="about" aria-busy="true" aria-label="Loading about">
      <SectionHeadingSkeleton />
      <div className="mb-10 max-w-3xl space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-4/5" />
      </div>
      <div className="border-y border-foreground/10">
        {Array.from({ length: 4 }, (_, index) => (
          <EditorialEntrySkeleton key={index} />
        ))}
      </div>
    </Section>
  );
}
