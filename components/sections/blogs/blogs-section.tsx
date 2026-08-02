import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Blog } from "@/types";

import { BlogCard } from "./blog-card";
import { BlogsEmpty } from "./blogs-empty";

interface BlogsSectionProps {
  blogs: Blog[];
  limit?: number;
  showViewAll?: boolean;
}

export function BlogsSection({
  blogs,
  limit,
  showViewAll = false,
}: BlogsSectionProps) {
  const visible = blogs.filter((blog) => blog.isVisible !== false);
  const items = typeof limit === "number" ? visible.slice(0, limit) : visible;

  return (
    <Section id="blogs">
      <SectionHeading
        label="Writing"
        title="Blogs"
        description="Articles and notes I publish on Medium."
      />
      {visible.length === 0 ? (
        <BlogsEmpty />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {showViewAll && (
            <div className="mt-10 flex justify-start">
              <Link
                href="/blogs"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                View all blogs
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </>
      )}
    </Section>
  );
}
