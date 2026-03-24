// components/home/VisionPanel.tsx
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function VisionPanel() {
  return (
    <section
      id="vision"
      className="h-screen flex items-center justify-center bg-canvas px-6"
      aria-label="Visión"
    >
      <ScrollReveal className="max-w-4xl text-center">
        <blockquote className="font-display text-3xl md:text-5xl text-text font-semibold leading-tight">
          <span className="block w-16 h-0.5 bg-gold mx-auto mb-8" aria-hidden="true" />
          &ldquo;La libertad no es solo una bandera política —
          es el único camino moral hacia la prosperidad.&rdquo;
          <span className="block w-16 h-0.5 bg-gold mx-auto mt-8" aria-hidden="true" />
        </blockquote>
        <Link
          href="/vision"
          className="inline-block mt-10 text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors"
        >
          Ver visión completa →
        </Link>
      </ScrollReveal>
    </section>
  );
}
