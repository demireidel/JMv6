// components/mundo/PressLogos.tsx
// Static logos strip: grayscale by default, gold tint on hover
const LOGOS = [
  { name: "Financial Times", abbr: "FT" },
  { name: "The Wall Street Journal", abbr: "WSJ" },
  { name: "Le Monde", abbr: "LM" },
  { name: "El País", abbr: "EP" },
  { name: "Bloomberg", abbr: "BLB" },
  { name: "The Economist", abbr: "ECO" },
];

export function PressLogos() {
  return (
    <section aria-label="Cobertura internacional">
      <p className="text-center text-xs text-muted font-sans uppercase tracking-widest mb-6">
        Cobertura internacional
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {LOGOS.map((logo) => (
          <span
            key={logo.name}
            title={logo.name}
            className="font-display text-lg font-bold text-muted/40 hover:text-gold transition-colors duration-300 grayscale hover:grayscale-0 cursor-default select-none"
          >
            {logo.abbr}
          </span>
        ))}
      </div>
    </section>
  );
}
