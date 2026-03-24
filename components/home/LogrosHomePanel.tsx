// components/home/LogrosHomePanel.tsx
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getLogros } from "@/lib/data/logros";

export async function LogrosHomePanel() {
  const { stats } = await getLogros();
  const featured = stats.slice(0, 4);

  return (
    <section
      id="logros"
      className="h-screen flex flex-col items-center justify-center bg-surface/50 px-6"
      aria-label="Logros"
    >
      <ScrollReveal className="w-full max-w-6xl">
        <SectionHeading className="text-4xl md:text-5xl text-center mb-12">
          Logros del Gobierno
        </SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {featured.map((stat, i) => (
            <GlassCard key={stat.label} className="p-6 text-center">
              <ScrollReveal delay={i * 100}>
                <p className="font-sans text-4xl font-black text-gold">
                  {stat.value}{stat.unit}
                </p>
                <p className="font-sans text-sm text-muted mt-2">{stat.label}</p>
                <p className="font-sans text-xs text-text/50 mt-1">{stat.description}</p>
              </ScrollReveal>
            </GlassCard>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/logros"
            className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors"
          >
            Ver todos los logros →
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
