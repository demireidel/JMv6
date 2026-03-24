import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EVENTOS = [
  { label: "Davos 2024" },
  { label: "Bruselas" },
  { label: "Washington D.C." },
];

export function MundoHomePanel() {
  return (
    <section
      id="mundo"
      className="h-screen flex flex-col items-center justify-center px-6 relative"
      aria-label="Argentina en el mundo"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14,14,18,0.8) 0%, rgba(7,7,9,1) 80%)",
          }}
        />
        {/* Subtle grid lines — like a globe wireframe */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
          <defs>
            <pattern id="globe-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#globe-grid)" />
        </svg>
      </div>

      <ScrollReveal className="w-full max-w-4xl text-center relative z-10">
        <SectionHeading className="text-4xl md:text-6xl text-center mb-4 font-light tracking-tight">
          Argentina en el Mundo
        </SectionHeading>
        <p className="text-muted text-sm font-sans mb-14 max-w-md mx-auto">
          Reinserción global, defensa del capitalismo y alianzas estratégicas
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {EVENTOS.map((e, i) => (
            <ScrollReveal key={e.label} delay={i * 100}>
              <span className="px-5 py-2.5 bg-white/[0.03] border border-gold/10 rounded-full text-xs font-sans text-gold/70 uppercase tracking-wider font-medium hover:border-gold/25 hover:text-gold transition-all duration-500">
                {e.label}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <Link
            href="/mundo"
            className="inline-flex items-center gap-3 group text-gold/70 text-xs font-sans font-medium uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
          >
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
            Ver presencia global
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
          </Link>
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
