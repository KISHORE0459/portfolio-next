import {
  Section,
  SectionHeadingSkeleton,
  Skeleton,
} from "@/components/shared";

export function ContactSkeleton() {
  return (
    <Section id="contact" aria-busy="true" aria-label="Loading contact">
      <SectionHeadingSkeleton />
      <div className="max-w-2xl">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-12 w-full rounded-xl sm:w-40" />
          <Skeleton className="h-12 w-full rounded-xl sm:w-32" />
        </div>
        <div className="mt-12 space-y-0 border-y border-foreground/10 py-2">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="grid grid-cols-[6.5rem_1fr] items-center gap-4 border-b border-foreground/10 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr]"
            >
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-48" />
            </div>
          ))}
        </div>
        <div className="mt-10 flex gap-8">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </Section>
  );
}
