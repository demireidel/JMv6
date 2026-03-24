import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getLogros } from "@/lib/data/logros";

export async function LogrosHomePanel() {
  const { stats } = await getLogros();
  const featured = stats.slice(0, 4);

  return (
    <section
      id="logros"
      className="h-screen flex flex-col items-center justify-center px-6 relative"
      aria-label="Logros"
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(14,14,18,0.5) 0%, rgba(7,7,9,1) 100%)",
        }}
        aria-hidden="true"
      />

      <ScrollReveal className="w-full max-w-6xl relative z-10">
        <SectionHeading className="text-4xl md:text-6xl text-center mb-4 font-light tracking-tight">
          Logros del Gobierno
        </SectionHeading>
        <p className="text-muted text-sm font-sans text-center mb-14 max-w-md mx-auto">
          Resultados concretos que transforman la economía argentina
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {featured.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 120}>
              <GlassCard className="p-6 md:p-8 text-center relative overflow-hidden">
                {/* Gold top edge accent */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden="true" />
                <p className="font-display text-4xl md:text-5xl font-light text-gold tracking-tight">
                  {stat.value}
                  <span className="text-gold/60 text-2xl md:text-3xl">{stat.unit}</span>
                </p>
                <p className="font-sans text-xs text-text/70 mt-3 uppercase tracking-wider font-medium">{stat.label}</p>
                <p className="font-sans text-[11px] text-muted mt-1">{stat.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500} className="text-center">
          <Link
            href="/logros"
            className="inline-flex items-center gap-3 group text-gold/70 text-xs font-sans font-medium uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
          >
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
            Ver todos los logros
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
          </Link>
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
