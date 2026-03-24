// components/archivo/BookShelf.tsx
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { Libro } from "@/lib/types";

interface BookShelfProps {
  libros: Libro[];
}

export function BookShelf({ libros }: BookShelfProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {libros.map((libro) => (
        <div key={libro.title} className="group relative">
          {/* Book cover */}
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-surface border border-white/[0.06]">
            <Image
              src={libro.coverUrl}
              alt={`Tapa de ${libro.title}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Glass overlay on hover */}
            <div className={cn(
              "absolute inset-0 bg-canvas/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}>
              <p className="font-display text-sm text-text leading-tight">{libro.title}</p>
              <p className="font-sans text-xs text-gold mt-2">{libro.year}</p>
            </div>
          </div>
          {/* Year badge */}
          <p className="font-sans text-xs text-muted text-center mt-2">{libro.year}</p>
        </div>
      ))}
    </div>
  );
}
