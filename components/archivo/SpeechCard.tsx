// components/archivo/SpeechCard.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils/formatDate";
import type { DiscursoFrontmatter } from "@/lib/types";

interface SpeechCardProps {
  discurso: DiscursoFrontmatter;
}

export function SpeechCard({ discurso }: SpeechCardProps) {
  return (
    <GlassCard className="p-6">
      <span className="text-gold text-xs font-sans font-semibold uppercase tracking-widest">Discurso</span>
      <h3 className="font-display text-lg text-text mt-2 mb-2">{discurso.title}</h3>
      <p className="text-muted text-sm font-sans">{formatDate(discurso.date)}</p>
      <p className="text-muted/70 text-sm font-sans">{discurso.lugar}</p>
      <p className="text-gold/60 text-xs font-sans mt-3">{discurso.duracion}</p>
    </GlassCard>
  );
}
