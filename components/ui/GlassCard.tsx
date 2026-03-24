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
        "relative",
        "bg-white/[0.03] backdrop-blur-2xl",
        "border border-white/[0.06]",
        "rounded-2xl",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        "transition-all duration-500 ease-out",
        "hover:bg-white/[0.06] hover:border-gold/10 hover:shadow-[inset_0_1px_0_0_rgba(201,168,76,0.08),0_0_40px_-12px_rgba(201,168,76,0.1)]",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
