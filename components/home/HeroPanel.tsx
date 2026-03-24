export function HeroPanel() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden frame-large"
      aria-label="Panel principal"
    >
      {/* Layered background atmosphere */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base dark with subtle warm tone */}
        <div className="absolute inset-0 bg-canvas" />

        {/* Ken Burns animated background field */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ animation: "kenBurns 25s ease-in-out infinite" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(201,168,76,0.12) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Vertical gold light streak — cinematic authority */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.25) 50%, rgba(201,168,76,0.15) 70%, transparent 100%)",
          }}
        />

        {/* Horizontal ruled lines — editorial grid feel */}
        <div className="absolute top-[20%] left-0 right-0 h-px bg-white/[0.02]" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-white/[0.02]" />

        {/* Dramatic vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(7,7,9,0.7) 100%)",
          }}
        />
      </div>

      {/* Content — staggered entrance */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Kicker — subtitle role */}
        <p
          className="text-gold/70 text-xs font-sans font-medium uppercase mb-10"
          style={{
            animation: "heroSubtitle 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both",
            letterSpacing: "0.3em",
          }}
        >
          Presidente de la Nación Argentina
        </p>

        {/* Main title — the monument */}
        <h1 className="font-display font-light tracking-tight leading-[0.85]">
          <span
            className="block text-8xl md:text-[11rem] text-shimmer"
            style={{
              animation: "heroTitle 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s both",
            }}
          >
            JAVIER
          </span>{" "}
          <span
            className="block text-8xl md:text-[11rem] text-shimmer"
            style={{
              animation: "heroTitle 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s both",
            }}
          >
            MILEI
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-text/50 font-sans text-lg md:text-xl font-light max-w-md mx-auto mt-10"
          style={{
            animation: "heroTagline 1.2s cubic-bezier(0.16,1,0.3,1) 1s both",
          }}
        >
          El camino hacia la Argentina más libre del mundo
        </p>
      </div>

      {/* Scroll indicator — elegant minimal */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ animation: "fadeIn 1s ease 1.6s both" }}
        aria-hidden="true"
      >
        <span className="text-gold/30 text-[10px] font-sans uppercase tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden">
          <div
            className="w-full h-full bg-gradient-to-b from-gold/60 to-transparent"
            style={{ animation: "fadeSlideUp 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
