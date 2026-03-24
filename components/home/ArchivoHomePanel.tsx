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
      className="h-screen flex flex-col items-center justify-center px-6 relative"
      aria-label="Archivo"
    >
      {/* Subtle darkened atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(7,7,9,1) 0%, rgba(14,14,18,0.4) 50%, rgba(7,7,9,1) 100%)",
        }}
        aria-hidden="true"
      />

      <ScrollReveal className="w-full max-w-6xl relative z-10">
        <SectionHeading className="text-4xl md:text-6xl text-center mb-4 font-light tracking-tight">
          Archivo
        </SectionHeading>
        <p className="text-muted text-sm font-sans text-center mb-14 max-w-md mx-auto">
          Discursos, entrevistas y obra intelectual
        </p>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {featured.map((discurso, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <GlassCard className="p-6 md:p-8 relative overflow-hidden">
                {/* Category line accent */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold/20 via-transparent to-transparent" aria-hidden="true" />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold/50">
                  Discurso
                </span>
                <p className="font-display text-xl text-text font-light mt-3 mb-2 tracking-tight">{discurso.title}</p>
                <p className="text-muted text-xs font-sans">{formatDate(discurso.date)}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400} className="text-center">
          <Link
            href="/archivo"
            className="inline-flex items-center gap-3 group text-gold/70 text-xs font-sans font-medium uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
          >
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
            Ver archivo completo
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
          </Link>
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
