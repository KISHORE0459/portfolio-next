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
          "border-transparent bg-secondary text-secondary-foreground",
        variant === "outline" && "border-white/20 text-white/85",
        variant === "accent" &&
          "border-transparent bg-accent/15 text-accent",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
