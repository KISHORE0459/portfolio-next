import { Section, SectionHeading } from "@/components/shared";
import type { Blog } from "@/types";

import { BlogCard } from "./blog-card";
import { BlogsEmpty } from "./blogs-empty";

interface BlogsSectionProps {
  blogs: Blog[];
}

export function BlogsSection({ blogs }: BlogsSectionProps) {
  const visible = blogs.filter((blog) => blog.isVisible !== false);

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
        <div className="grid gap-6 sm:grid-cols-2">
          {visible.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </Section>
  );
}
