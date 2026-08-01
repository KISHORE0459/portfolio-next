import {
  Section,
  SectionHeadingSkeleton,
  Skeleton,
} from "@/components/shared";

export function SkillsSkeleton() {
  return (
    <Section id="skills" aria-busy="true" aria-label="Loading skills">
      <SectionHeadingSkeleton />
      <div className="space-y-12">
        {Array.from({ length: 3 }, (_, groupIndex) => (
          <div key={groupIndex}>
            <Skeleton className="mb-5 h-4 w-24" />
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }, (_, index) => (
                <li
                  key={index}
                  className="flex flex-col items-center gap-3 px-3 py-4"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
