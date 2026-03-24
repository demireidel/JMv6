import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterPanel } from "@/components/reformas/BeforeAfterPanel";
import { ImpactoChart } from "@/components/reformas/ImpactoChart";
import { getReforma, getReformasSlugs } from "@/lib/data/reformas";

export async function generateStaticParams() {
  const slugs = await getReformasSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await getReforma(slug);
    return {
      title: `${frontmatter.title} — Reformas`,
      description: frontmatter.summary,
    };
  } catch {
    return { title: "Reforma — Javier Milei" };
  }
}

export default async function ReformaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let reforma;
  try {
    reforma = await getReforma(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = reforma;

  return (
    <article className="min-h-screen bg-canvas">
      <header className="pt-32 pb-16 px-6 max-w-3xl mx-auto">
        <span className="text-gold text-xs font-sans font-semibold uppercase tracking-widest">
          {frontmatter.categoria}
        </span>
        <SectionHeading as="h1" className="text-4xl md:text-5xl font-black mt-2">
          {frontmatter.title}
        </SectionHeading>
        <p className="text-muted font-sans text-lg mt-4">{frontmatter.summary}</p>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-10 prose prose-invert prose-gold max-w-none">
        {content}
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <BeforeAfterPanel type="antes" title={frontmatter.antesTitle}>
            <p className="text-sm text-text/70">Ver contenido MDX para detalles completos.</p>
          </BeforeAfterPanel>
          <BeforeAfterPanel type="ahora" title={frontmatter.ahoraTitle}>
            <p className="text-sm text-text/70">Ver contenido MDX para detalles completos.</p>
          </BeforeAfterPanel>
        </div>

        <SectionHeading className="text-2xl mb-8">Impacto</SectionHeading>
        <ImpactoChart stats={frontmatter.impactoStats} />
      </section>
    </article>
  );
}
