import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDiscursos } from "@/lib/data/archivo";
import { formatDate } from "@/lib/utils/formatDate";

export async function ArchivoHomePanel() {
  const discursos = await getDiscursos();
  const featured = discursos.slice(0, 3);

  return (
    <section
      id="archivo"
      className="h-screen flex flex-col items-center justify-center px-6 bg-surface/20"
      aria-label="Archivo"
    >
      <ScrollReveal className="w-full max-w-6xl">
        <SectionHeading className="text-4xl md:text-5xl text-center mb-12">
          Archivo
        </SectionHeading>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {featured.map((discurso, i) => (
            <GlassCard key={i} className="p-6">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gold">
                Discurso
              </span>
              <p className="font-display text-lg text-text mt-2 mb-1">{discurso.title}</p>
              <p className="text-muted text-sm font-sans">{formatDate(discurso.date)}</p>
            </GlassCard>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/archivo"
            className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors"
          >
            Ver archivo completo →
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
