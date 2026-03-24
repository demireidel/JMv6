export interface Libro {
  title: string;
  year: number;
  coverUrl: string;
}

export interface LogroStat {
  label: string;
  value: number;
  unit: string;
  description: string;
}

export interface LogroTimeline {
  date: string; // ISO date string
  title: string;
  description: string;
  categoria: "economia" | "seguridad" | "educacion" | "infraestructura";
}

export interface LogrosData {
  stats: LogroStat[];
  timeline: LogroTimeline[];
}

export interface ReformaFrontmatter {
  title: string;
  slug: string;
  categoria: string;
  summary: string;
  antesTitle: string;
  ahoraTitle: string;
  impactoStats: Array<{ label: string; value: string }>;
}

export interface MundoEvento {
  date: string;
  title: string;
  lugar: string;
  descripcion: string;
}

export interface MundoData {
  eventos: MundoEvento[];
  pressLogos: Array<{ name: string; svgPath: string }>;
}

export interface FuturoPilar {
  title: string;
  descripcion: string;
  icon: string;
}

export interface FuturoData {
  pilares: FuturoPilar[];
  roadmap: Array<{ year: number; hito: string }>;
}

export interface DiscursoFrontmatter {
  title: string;
  date: string;
  lugar: string;
  duracion: string;
}

export interface EntrevistaFrontmatter {
  title: string;
  date: string;
  medio: string;
  duracion: string;
}
