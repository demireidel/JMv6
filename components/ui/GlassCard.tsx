import { cn } from "@/lib/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}

export function GlassCard({ children, className, as: Tag = "div", ...rest }: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl",
        "transition-all duration-300",
        "hover:bg-white/[0.06] hover:border-white/[0.14]",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
