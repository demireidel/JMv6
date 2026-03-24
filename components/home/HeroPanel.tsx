// components/home/HeroPanel.tsx
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HeroPanel() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Panel principal"
    >
      {/* Full-bleed background with Ken Burns */}
      <div
        className="absolute inset-0 bg-canvas"
        style={{ animation: "kenBurns 20s ease-in-out infinite" }}
        aria-hidden="true"
      >
        {/* Replace with next/image hero portrait once asset is available */}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/20 via-canvas/40 to-canvas" />
      </div>

      {/* Gold particle overlay — pure CSS radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-gold text-sm font-sans font-semibold uppercase tracking-[0.3em] mb-6">
          Presidente de la Nación Argentina
        </p>
        <SectionHeading
          as="h1"
          className="text-7xl md:text-9xl font-black leading-none mb-6"
          withAccent={false}
        >
          JAVIER{" "}<br />MILEI
        </SectionHeading>
        <p className="text-text/70 font-sans text-xl md:text-2xl font-light max-w-2xl mx-auto">
          El camino hacia la Argentina más libre del mundo
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-0.5 h-8 bg-gold/40 mx-auto" />
      </div>
    </section>
  );
}
