"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { SpeechCard } from "./SpeechCard";
import { InterviewCard } from "./InterviewCard";
import { BookShelf } from "./BookShelf";
import type { DiscursoFrontmatter, EntrevistaFrontmatter, Libro } from "@/lib/types";

type Tab = "discursos" | "entrevistas" | "libros";

interface ArchiveTabsProps {
  discursos: DiscursoFrontmatter[];
  entrevistas: EntrevistaFrontmatter[];
  libros: Libro[];
}

export function ArchiveTabs({ discursos, entrevistas, libros }: ArchiveTabsProps) {
  const [active, setActive] = useState<Tab>("discursos");

  const TABS: { id: Tab; label: string }[] = [
    { id: "discursos", label: "Discursos" },
    { id: "entrevistas", label: "Entrevistas" },
    { id: "libros", label: "Libros" },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div role="tablist" aria-label="Archivo" className="flex gap-2 border-b border-white/[0.08] mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "pb-3 px-1 font-sans text-sm font-semibold transition-all duration-200",
              active === tab.id
                ? "text-gold border-b-2 border-gold"
                : "text-muted hover:text-text"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div id="tabpanel-discursos" role="tabpanel" hidden={active !== "discursos"}
           aria-label="Discursos">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discursos.map((d, i) => <SpeechCard key={i} discurso={d} />)}
        </div>
      </div>

      <div id="tabpanel-entrevistas" role="tabpanel" hidden={active !== "entrevistas"}
           aria-label="Entrevistas">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entrevistas.map((e, i) => <InterviewCard key={i} entrevista={e} />)}
        </div>
      </div>

      <div id="tabpanel-libros" role="tabpanel" hidden={active !== "libros"}
           aria-label="Libros">
        <BookShelf libros={libros} />
      </div>
    </div>
  );
}
