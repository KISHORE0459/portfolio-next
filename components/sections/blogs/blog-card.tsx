"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageOff, Newspaper } from "lucide-react";
import { useState } from "react";

import type { Blog } from "@/types";
import { stripMarkdown, truncateText } from "@/utils/text";

interface BlogCardProps {
  blog: Blog;
}

const DESCRIPTION_PREVIEW_LENGTH = 140;

function BlogImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = src.startsWith("//") ? `https:${src}` : src;

  if (hasError) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center bg-secondary text-foreground/50">
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        unoptimized
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export function BlogCard({ blog }: BlogCardProps) {
  const cleanDescription = stripMarkdown(blog.description);
  const preview = truncateText(cleanDescription, DESCRIPTION_PREVIEW_LENGTH);

  return (
    <Link
      href={blog.mediumUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      aria-label={`Read ${blog.title} on Medium`}
    >
      <article className="glass flex h-full flex-col overflow-hidden rounded-2xl transition-all hover:border-primary/30">
        {blog.imageUrl ? (
          <BlogImage src={blog.imageUrl} alt={blog.title} />
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center bg-secondary text-primary/70">
            <Newspaper className="h-8 w-8" aria-hidden="true" />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {blog.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">
            {preview}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Read on Medium
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
