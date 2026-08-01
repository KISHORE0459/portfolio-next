import { ProjectsSkeleton } from "@/components/sections/projects";

export default function ProjectsLoading() {
  return (
    <main id="main-content" aria-label="Loading projects">
      <ProjectsSkeleton />
    </main>
  );
}
