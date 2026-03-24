import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EVENTOS = [
  { label: "Davos 2024", lat: 46.8, lng: 9.8 },
  { label: "Bruselas", lat: 50.8, lng: 4.3 },
  { label: "Washington D.C.", lat: 38.9, lng: -77.0 },
];

export function MundoHomePanel() {
  return (
    <section
      id="mundo"
      className="h-screen flex flex-col items-center justify-center px-6 bg-surface/30"
      aria-label="Argentina en el mundo"
    >
      <ScrollReveal className="w-full max-w-4xl text-center">
        <SectionHeading className="text-4xl md:text-5xl text-center mb-6">
          Argentina en el Mundo
        </SectionHeading>
        <p className="text-muted font-sans mb-10 max-w-xl mx-auto">
          Reinserción global, defensa del capitalismo y alianzas estratégicas
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {EVENTOS.map((e) => (
            <span
              key={e.label}
              className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm font-sans text-gold"
            >
              {e.label}
            </span>
          ))}
        </div>
        <Link
          href="/mundo"
          className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors"
        >
          Ver presencia global →
        </Link>
      </ScrollReveal>
    </section>
  );
}
