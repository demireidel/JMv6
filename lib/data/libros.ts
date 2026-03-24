import type { Libro } from "@/lib/types";
import librosData from "@/content/libros.json";

export function getLibros(): Libro[] {
  return librosData as Libro[];
}
