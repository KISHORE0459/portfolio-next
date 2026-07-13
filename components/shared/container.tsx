import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
}

export function Container({
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("container-max px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
