import { Newspaper } from "lucide-react";

export function BlogsEmpty() {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Newspaper className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">No blogs yet</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/70">
        Blog posts will appear here once they are added. Check back soon for new
        Medium articles.
      </p>
    </div>
  );
}
