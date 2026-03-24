import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ReformaCard } from "@/components/reformas/ReformaCard";
import { getAllReformas } from "@/lib/data/reformas";

export const metadata: Metadata = {
  title: "Reformas — Javier Milei",
  description: "Las reformas históricas del gobierno de Javier Milei.",
};

export default async function ReformasPage() {
  const reformas = await getAllReformas();

  return (
    <article className="min-h-screen bg-canvas">
      <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <SectionHeading as="h1" className="text-5xl md:text-6xl font-black">
          Reformas Históricas
        </SectionHeading>
        <p className="text-muted font-sans text-lg mt-4">
          Las transformaciones estructurales que cambian la Argentina para siempre.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reformas.map((reforma, i) => (
            <ScrollReveal key={reforma.slug} delay={i * 80}>
              <ReformaCard reforma={reforma} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </article>
  );
}
