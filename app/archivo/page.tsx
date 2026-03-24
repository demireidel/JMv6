// app/archivo/page.tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchiveTabs } from "@/components/archivo/ArchiveTabs";
import { getDiscursos, getEntrevistas } from "@/lib/data/archivo";
import { getLibros } from "@/lib/data/libros";

export const metadata: Metadata = {
  title: "Archivo — Javier Milei",
  description: "Discursos, entrevistas y libros de Javier Milei.",
};

export default async function ArchivoPage() {
  const [discursos, entrevistas, libros] = await Promise.all([
    getDiscursos(),
    getEntrevistas(),
    Promise.resolve(getLibros()),
  ]);

  return (
    <article className="min-h-screen bg-canvas">
      <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <SectionHeading as="h1" className="text-5xl md:text-6xl font-black">
          Archivo
        </SectionHeading>
        <p className="text-muted font-sans text-lg mt-4">
          Discursos, entrevistas y obra intelectual
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <ArchiveTabs discursos={discursos} entrevistas={entrevistas} libros={libros} />
      </section>
    </article>
  );
}
