import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import futuroData from "@/content/futuro.json";

export const metadata: Metadata = {
  title: "El Futuro — Javier Milei",
  description: "Argentina como el 4° Hub de IA del mundo.",
};

export default function FuturoPage() {
  return (
    <article className="min-h-screen bg-canvas">
      <header className="h-[60vh] flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
          aria-hidden="true" />
        <div className="relative z-10 text-center">
          <p className="text-gold/60 font-sans text-sm font-semibold uppercase tracking-[0.3em] mb-4">Visión 2027</p>
          <SectionHeading as="h1" className="text-5xl md:text-7xl font-black" withAccent={false}>
            El 4° Hub de IA<br />del Mundo
          </SectionHeading>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading className="text-3xl md:text-4xl text-center mb-12">Los 3 Pilares</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {futuroData.pilares.map((pilar, i) => (
            <ScrollReveal key={pilar.title} delay={i * 100}>
              <GlassCard className="p-8 text-center">
                <h3 className="font-display text-xl text-gold mb-3">{pilar.title}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed">{pilar.descripcion}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <SectionHeading className="text-3xl md:text-4xl text-center mb-12">Hoja de Ruta</SectionHeading>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/20" aria-hidden="true" />
          <div className="space-y-8">
            {futuroData.roadmap.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 100}>
                <div className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="flex-1 text-right pr-8">
                    {i % 2 === 0 && (
                      <GlassCard className="p-4 inline-block">
                        <p className="text-gold font-display text-lg">{item.year}</p>
                        <p className="text-text font-sans text-sm">{item.hito}</p>
                      </GlassCard>
                    )}
                  </div>
                  <div className="w-4 h-4 bg-gold rounded-full flex-shrink-0 z-10" />
                  <div className="flex-1 pl-8">
                    {i % 2 !== 0 && (
                      <GlassCard className="p-4 inline-block">
                        <p className="text-gold font-display text-lg">{item.year}</p>
                        <p className="text-text font-sans text-sm">{item.hito}</p>
                      </GlassCard>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
