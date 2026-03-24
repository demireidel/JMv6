// components/home/ReformasHomePanel.tsx
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllReformas } from "@/lib/data/reformas";

export async function ReformasHomePanel() {
  const reformas = await getAllReformas();

  return (
    <section
      id="reformas"
      className="h-screen flex flex-col items-center justify-center px-6"
      aria-label="Reformas"
    >
      <ScrollReveal className="w-full max-w-6xl">
        <SectionHeading className="text-4xl md:text-5xl text-center mb-12">
          Reformas Históricas
        </SectionHeading>

        {/* Desktop: 3-col grid. Mobile: horizontal scroll */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
          {reformas.map((reforma) => (
            <GlassCard key={reforma.slug} as={Link} href={`/reformas/${reforma.slug}`} className="p-6 block">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gold">
                {reforma.categoria}
              </span>
              <h3 className="font-display text-xl text-text mt-2 mb-3">{reforma.title}</h3>
              <p className="text-muted text-sm font-sans leading-relaxed">{reforma.summary}</p>
            </GlassCard>
          ))}
        </div>
        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6"
             style={{ WebkitOverflowScrolling: "touch" }}>
          {reformas.map((reforma) => (
            <GlassCard key={reforma.slug} as={Link} href={`/reformas/${reforma.slug}`}
              className="p-6 block min-w-[280px] flex-shrink-0">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gold">
                {reforma.categoria}
              </span>
              <h3 className="font-display text-xl text-text mt-2 mb-3">{reforma.title}</h3>
              <p className="text-muted text-sm font-sans leading-relaxed">{reforma.summary}</p>
            </GlassCard>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/reformas" className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors">
            Explorar todas las reformas →
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
