import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-foreground/10", className)}
      aria-hidden="true"
    />
  );
}

export function SectionHeadingSkeleton({
  withDescription = true,
}: {
  withDescription?: boolean;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <Skeleton className="mb-3 h-4 w-20" />
      <Skeleton className="h-10 w-64 sm:h-12 sm:w-80" />
      {withDescription && <Skeleton className="mt-4 h-5 w-full max-w-xl" />}
    </div>
  );
}

export function EditorialEntrySkeleton() {
  return (
    <div className="border-t border-foreground/10 py-8 first:border-t-0 sm:py-10">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="mt-4 h-8 w-3/4 sm:h-9" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-16 rounded-full" />
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>
    </div>
  );
}
