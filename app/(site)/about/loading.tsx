import { AboutSkeleton } from "@/components/sections/about";

export default function AboutLoading() {
  return (
    <main id="main-content" aria-label="Loading about">
      <AboutSkeleton />
    </main>
  );
}
