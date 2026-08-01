"use client";

import Image from "next/image";
import Link from "next/link";
import { Code2, ExternalLink, ImageOff } from "lucide-react";
import { useState } from "react";

import { EditorialEntry } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/types";
import { stripMarkdown, truncateText } from "@/utils/text";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const DESCRIPTION_PREVIEW_LENGTH = 280;

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = src.startsWith("//") ? `https:${src}` : src;

  if (hasError) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-secondary text-foreground/50">
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-secondary">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        unoptimized
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 672px"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cleanDescription = stripMarkdown(project.description);
  const isLong = cleanDescription.length > DESCRIPTION_PREVIEW_LENGTH;
  const preview = isLong
    ? truncateText(cleanDescription, DESCRIPTION_PREVIEW_LENGTH)
    : cleanDescription;

  const links = (
    <>
      {project.githubUrl && (
        <Link
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-primary"
        >
          <Code2 className="h-4 w-4" aria-hidden="true" />
          Code
        </Link>
      )}
      {project.liveUrl && (
        <Link
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-primary"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Live Demo
        </Link>
      )}
    </>
  );

  return (
    <>
      <EditorialEntry
        title={project.title}
        description={
          <>
            {preview}
            {isLong && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  Read more
                </button>
              </>
            )}
          </>
        }
        tags={project.techStack}
        footer={project.githubUrl || project.liveUrl ? links : undefined}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
          </DialogHeader>
          <DialogBody className="space-y-6">
            {project.imageUrl && (
              <ProjectImage
                src={project.imageUrl}
                alt={`${project.title} — ${project.techStack.slice(0, 3).join(", ")} project`}
              />
            )}
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">
              {project.description}
            </p>
            {project.techStack.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-foreground/75"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-wrap gap-4 border-t border-border pt-4">
                {links}
              </div>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}
