import { cn } from "@/lib/utils";

function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline" | "accent";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        variant === "default" &&
          "border-transparent bg-primary/15 text-primary",
        variant === "secondary" &&
          "border-transparent bg-card text-foreground",
        variant === "outline" && "border-border text-muted-foreground",
        variant === "accent" &&
          "border-transparent bg-primary/15 text-accent-light",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
