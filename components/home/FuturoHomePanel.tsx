import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FuturoHomePanel() {
  return (
    <section
      id="futuro"
      className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      aria-label="El futuro de Argentina"
    >
      {/* Layered atmospheric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Warm radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Geometric rays emanating from center — futuristic feel */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="50" y1="50"
              x2={50 + 50 * Math.cos((i * 30 * Math.PI) / 180)}
              y2={50 + 50 * Math.sin((i * 30 * Math.PI) / 180)}
              stroke="#C9A84C"
              strokeWidth="0.15"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-gold/40 font-sans text-[10px] font-semibold uppercase tracking-[0.4em] mb-8">
            Visión 2027
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <h2 className="font-display text-5xl md:text-8xl font-light text-text tracking-tight leading-[0.9] mb-10">
            El 4° Hub de IA
            <br />
            <span className="text-shimmer">del Mundo</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-muted font-sans text-base max-w-lg mx-auto mb-12 leading-relaxed">
            Argentina como potencia tecnológica global, liderando la revolución de la inteligencia artificial.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={450}>
          <Link
            href="/futuro"
            className="inline-flex items-center gap-3 group text-gold/70 text-xs font-sans font-medium uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
          >
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
            Conocer el plan
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
