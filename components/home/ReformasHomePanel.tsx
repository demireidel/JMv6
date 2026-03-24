import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllReformas } from "@/lib/data/reformas";

export async function ReformasHomePanel() {
  const reformas = await getAllReformas();

  return (
    <section
      id="reformas"
      className="h-screen flex flex-col items-center justify-center px-6 relative"
      aria-label="Reformas"
    >
      <ScrollReveal className="w-full max-w-6xl relative z-10">
        <SectionHeading className="text-4xl md:text-6xl text-center mb-4 font-light tracking-tight">
          Reformas Históricas
        </SectionHeading>
        <p className="text-muted text-sm font-sans text-center mb-14 max-w-md mx-auto">
          Transformaciones estructurales que cambian la Argentina para siempre
        </p>

        {/* Desktop: 3-col grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-12">
          {reformas.map((reforma, i) => (
            <ScrollReveal key={reforma.slug} delay={i * 120}>
              <GlassCard as={Link} href={`/reformas/${reforma.slug}`} className="p-8 block group relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/10 group-hover:border-gold/30 transition-colors duration-500" aria-hidden="true" />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold/60">
                  {reforma.categoria}
                </span>
                <h3 className="font-display text-2xl text-text font-light mt-3 mb-4 tracking-tight">{reforma.title}</h3>
                <p className="text-muted text-sm font-sans leading-relaxed">{reforma.summary}</p>
                <div className="mt-6 flex items-center gap-2 text-gold/40 group-hover:text-gold/70 transition-colors duration-500">
                  <span className="w-6 h-px bg-current transition-all duration-500 group-hover:w-10" />
                  <span className="text-[10px] font-sans uppercase tracking-widest">Explorar</span>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 mb-12"
             style={{ WebkitOverflowScrolling: "touch" }}>
          {reformas.map((reforma) => (
            <GlassCard key={reforma.slug} as={Link} href={`/reformas/${reforma.slug}`}
              className="p-6 block min-w-[280px] flex-shrink-0 group">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold/60">
                {reforma.categoria}
              </span>
              <h3 className="font-display text-xl text-text font-light mt-3 mb-3 tracking-tight">{reforma.title}</h3>
              <p className="text-muted text-sm font-sans leading-relaxed">{reforma.summary}</p>
            </GlassCard>
          ))}
        </div>

        <ScrollReveal delay={400} className="text-center">
          <Link
            href="/reformas"
            className="inline-flex items-center gap-3 group text-gold/70 text-xs font-sans font-medium uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
          >
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
            Explorar todas las reformas
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
          </Link>
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
