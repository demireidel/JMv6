import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WorldMap } from "@/components/mundo/WorldMap";
import { PressLogos } from "@/components/mundo/PressLogos";
import mundoData from "@/content/mundo.json";

export const metadata: Metadata = {
  title: "Argentina en el Mundo — Javier Milei",
  description: "La reinserción global de Argentina bajo la presidencia de Javier Milei.",
};

export default function MundoPage() {
  return (
    <article className="min-h-screen bg-canvas">
      <header className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <SectionHeading as="h1" className="text-5xl md:text-6xl font-black">
          Argentina en el Mundo
        </SectionHeading>
        <p className="text-muted font-sans text-lg mt-4 max-w-xl mx-auto">
          Reinserción global, defensa del capitalismo y alianzas estratégicas
        </p>
      </header>

      {/* World Map */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <ScrollReveal>
          <WorldMap />
        </ScrollReveal>
      </section>

      {/* Press logos strip */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <PressLogos />
      </section>

      {/* Eventos */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <SectionHeading className="text-3xl mb-10">Hitos Internacionales</SectionHeading>
        <div className="space-y-4">
          {mundoData.eventos.map((evento, i) => (
            <ScrollReveal key={evento.title} delay={i * 80}>
              <GlassCard className="p-6 flex gap-6 items-start">
                <div className="text-center min-w-[80px]">
                  <p className="font-sans text-xs text-gold uppercase tracking-wider">
                    {new Date(evento.date).getFullYear()}
                  </p>
                  <p className="font-sans text-sm text-muted">
                    {new Date(evento.date).toLocaleDateString("es-AR", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-text mb-1">{evento.title}</h3>
                  <p className="text-gold/70 text-xs font-sans mb-2">{evento.lugar}</p>
                  <p className="text-muted text-sm font-sans leading-relaxed">{evento.descripcion}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </article>
  );
}
