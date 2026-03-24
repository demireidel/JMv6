import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  withAccent?: boolean;
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  withAccent = true,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-text tracking-tight",
        className
      )}
    >
      {children}
      {withAccent && (
        <span className="block mt-4 mx-auto w-16 relative" aria-hidden="true">
          <span className="block w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gold rotate-45" />
        </span>
      )}
    </Tag>
  );
}
