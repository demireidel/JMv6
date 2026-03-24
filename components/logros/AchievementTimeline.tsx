import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatDate } from "@/lib/utils/formatDate";
import type { LogroTimeline } from "@/lib/types";

interface AchievementTimelineProps {
  items: LogroTimeline[];
  /** Active category slug, e.g. "economia". Omit or "todas" to show all. */
  activeCategory?: string;
}

export function AchievementTimeline({ items, activeCategory }: AchievementTimelineProps) {
  return (
    <div className="relative">
      {/* Gold vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/20 -translate-x-1/2" aria-hidden="true" />

      <div className="space-y-12">
        {items.map((item, i) => {
          const visible = !activeCategory || activeCategory === "todas" || item.categoria === activeCategory;
          return (
            // CSS display:none keeps items in DOM so layout shift on reveal is avoided
            <ScrollReveal key={item.title} delay={i * 80} style={{ display: visible ? undefined : "none" }}>
              <div className={`flex items-center gap-8 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <div className="flex-1">
                  <GlassCard className={`p-6 ${i % 2 === 0 ? "mr-8" : "ml-8"}`}>
                    <p className="text-gold text-xs font-sans font-semibold uppercase tracking-wider mb-1">
                      {formatDate(item.date)}
                    </p>
                    <h3 className="font-display text-lg text-text mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">{item.description}</p>
                  </GlassCard>
                </div>
                {/* Center dot */}
                <div className="w-3 h-3 bg-gold rounded-full flex-shrink-0 z-10" aria-hidden="true" />
                <div className="flex-1" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
