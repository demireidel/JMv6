import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import type { ReformaFrontmatter } from "@/lib/types";

interface ReformaCardProps {
  reforma: ReformaFrontmatter;
}

export function ReformaCard({ reforma }: ReformaCardProps) {
  return (
    <GlassCard as={Link} href={`/reformas/${reforma.slug}`} className="p-6 block hover:scale-[1.01]">
      <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gold">
        {reforma.categoria}
      </span>
      <h3 className="font-display text-xl text-text mt-2 mb-3">{reforma.title}</h3>
      <p className="text-muted text-sm font-sans leading-relaxed">{reforma.summary}</p>
      <p className="text-gold/60 text-xs font-sans mt-4">Ver reforma →</p>
    </GlassCard>
  );
}
