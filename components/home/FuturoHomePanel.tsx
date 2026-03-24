import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FuturoHomePanel() {
  return (
    <section
      id="futuro"
      className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      aria-label="El futuro de Argentina"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <ScrollReveal className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-gold/60 font-sans text-sm font-semibold uppercase tracking-[0.3em] mb-6">
          Visión 2027
        </p>
        <h2 className="font-display text-5xl md:text-7xl font-black text-text leading-tight mb-8">
          El 4° Hub de IA<br />del Mundo
        </h2>
        <p className="text-muted font-sans text-lg max-w-xl mx-auto mb-10">
          Argentina como potencia tecnológica global, liderando la revolución de la inteligencia artificial.
        </p>
        <Link
          href="/futuro"
          className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors"
        >
          Conocer el plan →
        </Link>
      </ScrollReveal>
    </section>
  );
}
