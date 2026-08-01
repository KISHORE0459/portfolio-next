import {
  Section,
  SectionHeadingSkeleton,
  Skeleton,
} from "@/components/shared";

function BlogCardSkeleton() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="mt-5 h-4 w-28" />
      </div>
    </div>
  );
}

export function BlogsSkeleton() {
  return (
    <Section id="blogs" aria-busy="true" aria-label="Loading blogs">
      <SectionHeadingSkeleton />
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </Section>
  );
}
