import { BlogsSkeleton } from "@/components/sections/blogs";

export default function BlogsLoading() {
  return (
    <main id="main-content" aria-label="Loading blogs">
      <BlogsSkeleton />
    </main>
  );
}
