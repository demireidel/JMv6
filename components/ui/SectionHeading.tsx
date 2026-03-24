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
        "font-display text-text",
        withAccent && "after:block after:w-12 after:h-0.5 after:bg-gold after:mt-3",
        className
      )}
    >
      {children}
    </Tag>
  );
}
