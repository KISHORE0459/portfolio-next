import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  containerClassName?: string;
}

export function Section({
  id,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section-padding scroll-mt-20 lg:scroll-mt-0", className)}
      {...props}
    >
      <div className={cn("container-max", containerClassName)}>{children}</div>
    </section>
  );
}
