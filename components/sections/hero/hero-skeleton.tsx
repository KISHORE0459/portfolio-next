import { Skeleton } from "@/components/shared";

export function HeroSkeleton() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-busy="true"
      aria-label="Loading home"
    >
      <div className="container-max relative z-10 px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Skeleton className="mb-3 h-4 w-28" />
          <Skeleton className="h-12 w-72 sm:h-16 sm:w-96 lg:h-20" />
          <div className="mt-5 flex items-center gap-3">
            <Skeleton className="h-px w-12" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="mt-8 space-y-2">
            <Skeleton className="h-5 w-full max-w-xl" />
            <Skeleton className="h-5 w-5/6 max-w-lg" />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-12 w-full rounded-xl sm:w-40" />
            <Skeleton className="h-12 w-full rounded-xl sm:w-36" />
            <Skeleton className="h-12 w-24" />
          </div>
        </div>
      </div>
    </section>
  );
}
