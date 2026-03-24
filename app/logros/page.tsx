import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/logros/StatCounter";
import { AchievementTimeline } from "@/components/logros/AchievementTimeline";
import { CategoryFilter } from "@/components/logros/CategoryFilter";
import { getLogros } from "@/lib/data/logros";

export const metadata: Metadata = {
  title: "Logros del Gobierno — Javier Milei",
  description: "Los principales logros del gobierno de Javier Milei.",
};

async function LogrosContent({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const categoria = params?.categoria ?? "todas";
  const { stats, timeline } = await getLogros();

  return (
    <>
      {/* Stat Counters */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* Timeline with filter */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <SectionHeading className="text-3xl md:text-4xl text-center mb-10">
          Línea de Tiempo
        </SectionHeading>
        <div className="mb-10">
          <Suspense>
            <CategoryFilter />
          </Suspense>
        </div>
        {/* All items in DOM; filtering via CSS display:none avoids remount layout shift */}
        <AchievementTimeline items={timeline} activeCategory={categoria} />
      </section>
    </>
  );
}

export default function LogrosPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  return (
    <article className="min-h-screen bg-canvas">
      <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <SectionHeading as="h1" className="text-5xl md:text-6xl font-black">
          Logros del Gobierno
        </SectionHeading>
      </header>

      <Suspense>
        <LogrosContent searchParams={searchParams} />
      </Suspense>
    </article>
  );
}
