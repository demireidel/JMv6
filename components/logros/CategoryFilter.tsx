"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const CATEGORIAS = ["todas", "economia", "seguridad", "educacion", "infraestructura"] as const;

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("categoria") ?? "todas";

  const handleSelect = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "todas") {
      params.delete("categoria");
    } else {
      params.set("categoria", cat);
    }
    router.replace(`/logros?${params.toString()}`, { scroll: false });
  };

  return (
    <div role="tablist" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2 justify-center">
      {CATEGORIAS.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          onClick={() => handleSelect(cat)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-sans font-semibold transition-all duration-200 capitalize",
            active === cat
              ? "bg-gold text-canvas"
              : "bg-white/[0.04] border border-white/[0.08] text-muted hover:text-gold hover:border-gold/30"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
