import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Visión — Javier Milei",
  description: "La visión de Javier Milei: la Argentina más libre del mundo.",
};

const PILARES = [
  { title: "Libertad Económica", desc: "Mercados libres, precios libres, contratos libres. El Estado no debe intervenir en las decisiones voluntarias de los individuos." },
  { title: "Reducción del Estado", desc: "Un Estado mínimo, subsidiario y eficiente. Cada peso que gasta el Estado es un peso que le saca a los ciudadanos." },
  { title: "Moneda Sana", desc: "Fin de la inflación como política de Estado. Dinero honesto que preserve el valor del trabajo y el ahorro de los argentinos." },
  { title: "Seguridad Jurídica", desc: "Contratos que se respetan. Propiedad privada garantizada. Reglas claras para la inversión y el crecimiento." },
];

export default function VisionPage() {
  return (
    <article className="min-h-screen bg-canvas">
      {/* Hero */}
      <header className="h-[60vh] flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
          aria-hidden="true" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-gold/60 font-sans text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            La visión
          </p>
          <SectionHeading as="h1" className="text-5xl md:text-7xl font-black leading-tight" withAccent={false}>
            La Argentina más libre<br />del mundo
          </SectionHeading>
        </div>
      </header>

      {/* Manifiesto */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <ScrollReveal>
          <p className="font-sans text-lg text-text/80 leading-relaxed mb-6">
            La libertad no es una promesa vacía. Es el único sistema que, a lo largo de la historia, demostró ser capaz de sacar a los pueblos de la pobreza y generar prosperidad genuina.
          </p>
          <p className="font-sans text-lg text-text/80 leading-relaxed mb-6">
            Argentina desperdició décadas eligiendo el camino del estatismo, la inflación y la decadencia. La elección de 2023 fue un punto de inflexión: los argentinos eligieron la libertad.
          </p>
          <p className="font-sans text-lg text-text/80 leading-relaxed">
            El objetivo es claro: convertir a Argentina en el país más libre del mundo. No el más rico, aunque eso llegará. El más libre.
          </p>
        </ScrollReveal>
      </section>

      {/* 4 Pilares */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <SectionHeading className="text-3xl md:text-4xl text-center mb-12">
            Los 4 Pilares
          </SectionHeading>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {PILARES.map((pilar, i) => (
            <ScrollReveal key={pilar.title} delay={i * 100}>
              <GlassCard className="p-8">
                <h3 className="font-display text-xl text-gold mb-3">{pilar.title}</h3>
                <p className="font-sans text-muted leading-relaxed">{pilar.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <ScrollReveal>
          <SectionHeading className="text-3xl md:text-4xl text-center mb-12">
            La Línea del Tiempo
          </SectionHeading>
        </ScrollReveal>
        <div className="flex items-start gap-0 overflow-x-auto pb-4">
          {[
            { label: "Antes de 2023", desc: "Inflación crónica, déficit permanente, decadencia." },
            { label: "Transición 2024", desc: "Ajuste histórico, superávit, desinflación." },
            { label: "Visión 2027", desc: "Argentina libre, estable y próspera." },
          ].map((step, i) => (
            <div key={step.label} className="flex-1 min-w-[200px] text-center px-4">
              <div className="w-3 h-3 bg-gold rounded-full mx-auto mb-3" />
              {i < 2 && <div className="absolute w-full h-0.5 bg-gold/30 top-1.5 left-1/2" />}
              <p className="font-display text-sm text-gold mb-1">{step.label}</p>
              <p className="font-sans text-xs text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
