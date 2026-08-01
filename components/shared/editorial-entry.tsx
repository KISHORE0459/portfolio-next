import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EditorialEntryProps {
  metaLeft?: string;
  metaRight?: string;
  title: string;
  description: ReactNode;
  tags?: string[];
  footer?: ReactNode;
  className?: string;
}

export function EditorialEntry({
  metaLeft,
  metaRight,
  title,
  description,
  tags = [],
  footer,
  className,
}: EditorialEntryProps) {
  return (
    <article
      className={cn(
        "group border-t border-foreground/10 py-8 first:border-t-0 sm:py-10",
        className,
      )}
    >
      {metaLeft || metaRight ? (
        <div className="flex items-baseline justify-between gap-4 font-mono text-xs tracking-wide text-foreground/45 sm:text-sm">
          {metaLeft ? <span>{metaLeft}</span> : null}
          {metaRight ? (
            <span className="shrink-0 text-right">{metaRight}</span>
          ) : null}
        </div>
      ) : null}

      <h3 className="mt-4 text-2xl font-normal leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl lg:text-[2rem]">
        {title}
      </h3>

      <div className="mt-4 max-w-5xl text-base leading-relaxed text-foreground/55 sm:text-[18px]">
        {description}
      </div>

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-foreground/80">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {footer ? (
        <div className="mt-5 flex flex-wrap gap-4">{footer}</div>
      ) : null}
    </article>
  );
}
