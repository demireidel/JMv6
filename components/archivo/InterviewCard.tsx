// components/archivo/InterviewCard.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils/formatDate";
import type { EntrevistaFrontmatter } from "@/lib/types";

interface InterviewCardProps {
  entrevista: EntrevistaFrontmatter;
}

export function InterviewCard({ entrevista }: InterviewCardProps) {
  return (
    <GlassCard className="p-6">
      <span className="text-gold text-xs font-sans font-semibold uppercase tracking-widest">Entrevista</span>
      <h3 className="font-display text-lg text-text mt-2 mb-2">{entrevista.title}</h3>
      <p className="text-muted text-sm font-sans">{formatDate(entrevista.date)}</p>
      <p className="text-muted/70 text-sm font-sans">{entrevista.medio}</p>
      <p className="text-gold/60 text-xs font-sans mt-3">{entrevista.duracion}</p>
    </GlassCard>
  );
}
