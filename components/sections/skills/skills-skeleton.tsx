import {
  Section,
  SectionHeadingSkeleton,
  Skeleton,
} from "@/components/shared";

export function SkillsSkeleton() {
  return (
    <Section id="skills" aria-busy="true" aria-label="Loading skills">
      <SectionHeadingSkeleton />
      <div className="space-y-8">
        {Array.from({ length: 3 }, (_, groupIndex) => (
          <div
            key={groupIndex}
            className="grid gap-4 border-t border-foreground/10 pt-8 first:border-t-0 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-8"
          >
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-wrap gap-2.5">
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="h-9 w-24 rounded-full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
