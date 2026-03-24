import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function VisionPanel() {
  return (
    <section
      id="vision"
      className="h-screen flex items-center justify-center bg-canvas px-6 relative"
      aria-label="Visión"
    >
      {/* Subtle radial warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <ScrollReveal className="max-w-4xl text-center relative">
        {/* Opening quotation mark — large decorative */}
        <ScrollReveal delay={100}>
          <span className="block font-display text-[8rem] md:text-[12rem] leading-none text-gold/10 select-none -mb-16 md:-mb-24" aria-hidden="true">
            &ldquo;
          </span>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl text-text font-light leading-[1.15] tracking-tight">
            La libertad no es solo una bandera política
            <span className="text-gold"> — </span>
            es el único camino moral hacia la prosperidad.
          </blockquote>
        </ScrollReveal>

        {/* Divider */}
        <ScrollReveal delay={400}>
          <div className="divider-diamond max-w-xs mx-auto mt-12 mb-10" />
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <Link
            href="/vision"
            className="inline-flex items-center gap-3 group text-gold/70 text-xs font-sans font-medium uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
          >
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
            Ver visión completa
            <span className="w-8 h-px bg-gold/30 group-hover:w-12 transition-all duration-500" />
          </Link>
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
