# Javier Milei Personal Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an ultra-premium cinematic dark-mode personal website for Argentine President Javier Milei with 8 routes, glassmorphism design system, and MDX content.

**Architecture:** Hybrid approach — cinematic 7-panel scroll-snap home page + dedicated deep-dive pages per section. Next.js 16 App Router with Server Components by default, `"use cache"` for all data, no external state library.

**Tech Stack:** Node 24 · Next.js 16 · React 19.2 · Tailwind CSS 4 · TypeScript 5 · next-mdx-remote · react-simple-maps · Vitest · Playwright

---

## File Map

```
/app
  layout.tsx                    ← Root layout: fonts, metadata, FloatingNav
  page.tsx                      ← Home: 7 scroll-snap panels
  globals.css                   ← Tailwind 4 @theme + base styles + animations
  /vision/page.tsx
  /logros/page.tsx
  /reformas/page.tsx
  /reformas/[slug]/page.tsx
  /mundo/page.tsx
  /futuro/page.tsx
  /archivo/page.tsx

/components
  /ui
    GlassCard.tsx               ← Reusable glass surface wrapper
    SectionHeading.tsx          ← Playfair Display heading with gold accent
    ScrollReveal.tsx            ← "use client" IntersectionObserver fade-in wrapper
  /nav
    FloatingNav.tsx             ← Glass pill nav with 7 dot anchors
    MobileNav.tsx               ← "use client" hamburger + slide drawer
  /home
    HeroPanel.tsx               ← Panel 1: full-bleed portrait + Ken Burns + title
    VisionPanel.tsx             ← Panel 2: pull quote
    LogrosHomePanel.tsx         ← Panel 3: 4 stat counters
    ReformasHomePanel.tsx       ← Panel 4: reform card preview
    MundoHomePanel.tsx          ← Panel 5: mini world map
    FuturoHomePanel.tsx         ← Panel 6: bold statement
    ArchivoHomePanel.tsx        ← Panel 7: latest content preview
  /logros
    StatCounter.tsx             ← "use client" animated number counter
    AchievementTimeline.tsx     ← Gold vertical-line timeline
    CategoryFilter.tsx          ← "use client" tab filter + URL param
  /reformas
    ReformaCard.tsx             ← Card with title, category pill, summary
    BeforeAfterPanel.tsx        ← Red/green glass before/after panels
    ImpactoChart.tsx            ← Inline SVG stat grid
  /mundo
    WorldMap.tsx                ← react-simple-maps with animated connection lines
    PressLogos.tsx              ← Grayscale → gold hover logo strip
    MilestoneTimeline.tsx       ← Horizontal event timeline
  /archivo
    ArchiveTabs.tsx             ← "use client" tab switcher (Discursos/Entrevistas/Libros)
    BookShelf.tsx               ← 12-book grid with next/image covers
    SpeechCard.tsx              ← Card: date, title, duration badge
    InterviewCard.tsx           ← Card: date, title, source badge

/lib
  /data
    logros.ts                   ← getLogros() with "use cache" + cacheLife('hours')
    reformas.ts                 ← getReformas(), getReforma(slug) with next-mdx-remote
    archivo.ts                  ← getDiscursos(), getEntrevistas() with "use cache"
    libros.ts                   ← getLibros() — static import, no cache needed
  /utils
    cn.ts                       ← clsx + tailwind-merge helper
    formatDate.ts               ← Spanish locale date formatter
  /types
    index.ts                    ← All TypeScript interfaces

/content
  /reformas/*.mdx
  /discursos/*.mdx
  /entrevistas/*.mdx
  logros.json
  mundo.json
  futuro.json
  libros.json

next.config.ts
proxy.ts
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json` (via create-next-app)
- Create: `app/globals.css`
- Create: `proxy.ts`

- [ ] **Step 1: Scaffold the project**

```bash
cd /Users/demianreidel/1-JM-site
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --yes
```

Expected: project created with App Router, TypeScript, Tailwind 4.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install next-mdx-remote remark-gfm react-simple-maps
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event jsdom
npm install -D playwright @playwright/test
npm install clsx tailwind-merge
```

- [ ] **Step 3: Replace `next.config.ts`**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/I/**",
      },
    ],
    minimumCacheTTL: 14400,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --color-gold: #C9A84C;
  --color-gold-bright: #E8C97A;
  --color-canvas: #080808;
  --color-surface: #111111;
  --color-text: #F0EDE6;
  --color-muted: #6B6B6B;
}

html {
  scroll-behavior: auto; /* controlled by View Transitions */
  background-color: #080808;
  color: #F0EDE6;
}

@keyframes kenBurns {
  0%   { transform: scale(1.0) translate(0%, 0%); }
  50%  { transform: scale(1.08) translate(-1%, -1%); }
  100% { transform: scale(1.0) translate(0%, 0%); }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes dashDraw {
  from { stroke-dashoffset: 1000; }
  to   { stroke-dashoffset: 0; }
}
```

- [ ] **Step 5: Create `proxy.ts` (Next.js 16 — replaces middleware.ts)**

```ts
// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  // Redirect /home to /
  if (request.nextUrl.pathname === "/home") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};
```

- [ ] **Step 6: Install React Compiler Babel plugin**

```bash
npm install babel-plugin-react-compiler@latest
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at `localhost:3000`, no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 project with Tailwind 4 and config"
```

---

## Task 2: Types & Utilities

**Files:**
- Create: `lib/types/index.ts`
- Create: `lib/utils/cn.ts`
- Create: `lib/utils/formatDate.ts`

- [ ] **Step 1: Write types**

```ts
// lib/types/index.ts

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
```

- [ ] **Step 2: Write cn utility**

```ts
// lib/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Write formatDate utility**

```ts
// lib/utils/formatDate.ts
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
}
```

- [ ] **Step 4: Write unit tests**

```ts
// lib/utils/__tests__/cn.test.ts
import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });
  it("deduplicates conflicting tailwind classes", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });
  it("handles conditional classes", () => {
    expect(cn("base", false && "skip", "end")).toBe("base end");
  });
});

// lib/utils/__tests__/formatDate.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("formats ISO date to Spanish locale", () => {
    const result = formatDate("2024-01-15");
    expect(result).toContain("enero");
    expect(result).toContain("2024");
  });
});
```

- [ ] **Step 5: Configure Vitest**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 6: Run tests**

```bash
npx vitest run lib/utils
```

Expected: 5 tests pass.

- [ ] **Step 7: Commit**

```bash
git add lib/ vitest.config.ts
git commit -m "feat: add TypeScript types, cn utility, formatDate utility"
```

---

## Task 3: Content Seed Data

**Files:**
- Create: `content/logros.json`
- Create: `content/libros.json`
- Create: `content/mundo.json`
- Create: `content/futuro.json`
- Create: `content/reformas/desregulacion-economica.mdx`
- Create: `content/reformas/reforma-del-estado.mdx`
- Create: `content/discursos/davos-2025.mdx`
- Create: `content/entrevistas/tucker-carlson-2024.mdx`

- [ ] **Step 1: Create `content/libros.json`**

```json
[
  { "title": "Capitalismo, socialismo y la trampa neoclásica", "year": 2023, "coverUrl": "https://m.media-amazon.com/images/I/81+L6UZrd+L._AC_SX300_.jpg" },
  { "title": "El camino del libertario", "year": 2022, "coverUrl": "https://m.media-amazon.com/images/I/819yHRUhKjL._AC_SX300_.jpg" },
  { "title": "El fin de la inflación", "year": 2022, "coverUrl": "https://m.media-amazon.com/images/I/71acWh9bKVL._AC_SX300_.jpg" },
  { "title": "La economía en una lección", "year": 2021, "coverUrl": "https://m.media-amazon.com/images/I/715BZ10iz-L._AC_SX300_.jpg" },
  { "title": "Desenmascarando la mentira keynesiana", "year": 2021, "coverUrl": "https://m.media-amazon.com/images/I/611R2-0ViCL._AC_SX300_.jpg" },
  { "title": "Libertad, libertad, libertad", "year": 2020, "coverUrl": "https://m.media-amazon.com/images/I/81bEVnipzqL._AC_SX300_.jpg" },
  { "title": "Pandenomics", "year": 2020, "coverUrl": "https://m.media-amazon.com/images/I/91IE6TOp9+L._AC_SX300_.jpg" },
  { "title": "El retorno al sendero de la decadencia argentina", "year": 2020, "coverUrl": "https://m.media-amazon.com/images/I/51AHGxgqk1L._AC_SX300_.jpg" },
  { "title": "Relatos de un progre", "year": 2018, "coverUrl": "https://m.media-amazon.com/images/I/81KOH9ehxPL._AC_SX300_.jpg" },
  { "title": "Maquinita, Infleta y Devaluta", "year": 2017, "coverUrl": "https://m.media-amazon.com/images/I/71rAdWTGH4L._AC_SX300_.jpg" },
  { "title": "Política económica contra reloj", "year": 2015, "coverUrl": "https://m.media-amazon.com/images/I/61Th72vcKrL._AC_SX300_.jpg" },
  { "title": "Lecturas de economía en tiempos del kirchnerismo", "year": 2014, "coverUrl": "https://m.media-amazon.com/images/I/911gi22wzZL._AC_SX300_.jpg" }
]
```

- [ ] **Step 2: Create `content/logros.json`**

```json
{
  "stats": [
    { "label": "Reducción del déficit fiscal", "value": 100, "unit": "%", "description": "Primer superávit en 16 años" },
    { "label": "Inflación mensual", "value": 2.4, "unit": "%", "description": "Desde 25% en dic 2023" },
    { "label": "Riesgo país", "value": 700, "unit": "pb", "description": "Desde 2.800 pb en dic 2023" },
    { "label": "Reservas netas recuperadas", "value": 20, "unit": "B USD", "description": "Reconstrucción del BCRA" }
  ],
  "timeline": [
    { "date": "2023-12-10", "title": "Asunción presidencial", "description": "Javier Milei asume como 57° presidente de Argentina.", "categoria": "economia" },
    { "date": "2023-12-12", "title": "Devaluación ordenada del peso", "description": "Corrección cambiaria del 54% como primer paso de la normalización macro.", "categoria": "economia" },
    { "date": "2024-01-01", "title": "DNU 70/2023 — Desregulación masiva", "description": "Decreto de Necesidad y Urgencia desregula más de 800 normas económicas.", "categoria": "economia" },
    { "date": "2024-06-28", "title": "Ley Bases aprobada", "description": "El Congreso aprueba la Ley Bases y el paquete fiscal.", "categoria": "economia" },
    { "date": "2025-01-01", "title": "Superávit fiscal 2024", "description": "Argentina logra el primer superávit primario en 16 años.", "categoria": "economia" },
    { "date": "2025-03-01", "title": "Acuerdo con el FMI", "description": "Nuevo programa Stand-By por USD 20.000 millones.", "categoria": "economia" }
  ]
}
```

- [ ] **Step 3: Create `content/mundo.json`**

```json
{
  "eventos": [
    { "date": "2024-01-17", "title": "Discurso en Davos", "lugar": "Foro Económico Mundial, Davos", "descripcion": "Milei defiende el capitalismo y ataca al socialismo en el escenario global más importante del mundo." },
    { "date": "2024-12-06", "title": "Acuerdo Mercosur–UE", "lugar": "Montevideo", "descripcion": "Argentina apoya la firma del histórico acuerdo de libre comercio entre el Mercosur y la Unión Europea." },
    { "date": "2025-01-20", "title": "Invitado a la asunción de Trump", "lugar": "Washington D.C.", "descripcion": "Primer mandatario extranjero en reunirse con el presidente Trump en su nuevo mandato." },
    { "date": "2025-01-21", "title": "Reunión con Elon Musk", "lugar": "Washington D.C.", "descripcion": "Encuentro con el empresario y asesor presidencial de EE.UU. para explorar inversiones en IA." }
  ],
  "pressLogos": [
    { "name": "The Economist", "svgPath": "/images/press/economist.svg" },
    { "name": "Financial Times", "svgPath": "/images/press/ft.svg" },
    { "name": "Wall Street Journal", "svgPath": "/images/press/wsj.svg" },
    { "name": "Le Monde", "svgPath": "/images/press/lemonde.svg" }
  ]
}
```

- [ ] **Step 4: Create `content/futuro.json`**

```json
{
  "pilares": [
    { "title": "Infraestructura Digital", "descripcion": "Inversión en fibra óptica, data centers y conectividad para posicionar a Argentina como hub tecnológico regional.", "icon": "server" },
    { "title": "Capital Humano", "descripcion": "Universidades de excelencia, atracción de talento global y formación en IA para la nueva economía.", "icon": "brain" },
    { "title": "Regulación Inteligente", "descripcion": "Marco legal ágil y amigable para la innovación, sin burocracia que frene el desarrollo tecnológico.", "icon": "zap" }
  ],
  "roadmap": [
    { "year": 2024, "hito": "Desregulación del sector tecnológico" },
    { "year": 2025, "hito": "Primer Hub de IA del hemisferio sur" },
    { "year": 2026, "hito": "10.000 empresas tech registradas" },
    { "year": 2027, "hito": "4° Hub de IA del mundo" }
  ]
}
```

- [ ] **Step 5: Create sample reforma MDX**

```mdx
---
title: Desregulación Económica
slug: desregulacion-economica
categoria: Economía
summary: Eliminación de más de 800 regulaciones que frenaban la actividad privada.
antesTitle: "Un Estado que regulaba todo"
ahoraTitle: "Libertad para producir"
impactoStats:
  - label: "Normas eliminadas"
    value: "800+"
  - label: "Sectores liberados"
    value: "30+"
  - label: "Aumento inversión privada"
    value: "+18%"
---

## ¿De qué se trata?

El Decreto de Necesidad y Urgencia 70/2023 eliminó más de 800 regulaciones que restringían la actividad económica en Argentina. Desde precios máximos hasta restricciones de importación, el decreto marcó el inicio del plan de desregulación más ambicioso de la historia argentina.

## ¿Cómo era antes?

El Estado intervenía en cada aspecto de la economía: fijaba precios, limitaba importaciones, exigía permisos para exportar, controlaba alquileres y establecía restricciones cambiarias que distorsionaban todos los precios de la economía.

## ¿Cómo es ahora?

Los precios son libres. Las importaciones se realizan sin restricciones burocráticas. Los contratos de alquiler se acuerdan libremente entre las partes. El Estado se retiró de la intervención directa en los mercados.

## Impacto

La desregulación generó un inmediato aumento de la inversión privada y una normalización de los mercados que había sido imposible bajo el esquema anterior.
```

- [ ] **Step 6: Create sample reforma MDX (reform 2)**

```mdx
---
title: Reforma del Estado
slug: reforma-del-estado
categoria: Estado
summary: Reducción del gasto público en más de 30% en términos reales.
antesTitle: "Estado obeso e ineficiente"
ahoraTitle: "Estado subsidiario y eficiente"
impactoStats:
  - label: "Reducción del gasto"
    value: "30%"
  - label: "Ministerios eliminados"
    value: "9"
  - label: "Superávit fiscal"
    value: "Primer en 16 años"
---

## ¿De qué se trata?

La Ley Bases y el ajuste fiscal de 2024 redujeron el gasto público en más de 30% en términos reales, eliminaron 9 ministerios y convirtieron a Argentina en el primer país del mundo en lograr un ajuste fiscal de esa magnitud en un año.

## ¿Cómo era antes?

El Estado argentino gastaba más de lo que recaudaba desde 2009. El déficit fiscal crónico era financiado con emisión monetaria, lo que generaba la inflación estructural que devastó el poder adquisitivo de los argentinos.

## ¿Cómo es ahora?

Argentina tiene superávit fiscal primario por primera vez en 16 años. El Estado redujo su tamaño, eliminó organismos redundantes y dejó de emitir dinero para financiar el gasto.

## Impacto

El superávit fiscal fue la base para la desinflación. La inflación cayó de 25% mensual en diciembre 2023 a menos de 3% mensual en 2025.
```

- [ ] **Step 7: Create sample speech MDX**

```mdx
---
title: Discurso en el Foro Económico Mundial de Davos
date: 2024-01-17
lugar: Davos, Suiza
duracion: "25 min"
---

En el escenario más importante del mundo, el Presidente Milei defendió el capitalismo como el único sistema capaz de sacar a los pueblos de la pobreza, y advirtió sobre el peligro del socialismo cultural que avanza en Occidente.

> "El capitalismo de libre empresa es el único instrumento moral para terminar con la pobreza en el mundo."
```

- [ ] **Step 8: Create sample interview MDX**

```mdx
---
title: Entrevista con Tucker Carlson
date: 2024-09-20
medio: Tucker Carlson Network
duracion: "45 min"
---

En una extensa entrevista con el periodista Tucker Carlson, el Presidente Milei explicó las bases filosóficas del libertarismo, la situación económica de Argentina y su visión para el futuro del país.
```

- [ ] **Step 9: Commit**

```bash
git add content/
git commit -m "feat: add seed content data (JSON, MDX files)"
```

---

## Task 4: Data Loaders

**Files:**
- Create: `lib/data/libros.ts`
- Create: `lib/data/logros.ts`
- Create: `lib/data/reformas.ts`
- Create: `lib/data/archivo.ts`
- Create: `lib/data/__tests__/logros.test.ts`

- [ ] **Step 1: Write libros loader (static, no cache needed)**

```ts
// lib/data/libros.ts
import type { Libro } from "@/lib/types";
import librosData from "@/content/libros.json";

export function getLibros(): Libro[] {
  return librosData as Libro[];
}
```

- [ ] **Step 2: Write logros loader**

```ts
// lib/data/logros.ts
"use cache";
import { cacheLife } from "next/cache";
import type { LogrosData } from "@/lib/types";

export async function getLogros(): Promise<LogrosData> {
  cacheLife("hours");
  const data = await import("@/content/logros.json");
  return data.default as LogrosData;
}
```

- [ ] **Step 3: Write reformas loader**

```ts
// lib/data/reformas.ts
"use cache";
import { cacheLife } from "next/cache";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { promises as fs } from "fs";
import path from "path";
import type { ReformaFrontmatter } from "@/lib/types";

const REFORMAS_DIR = path.join(process.cwd(), "content/reformas");

export async function getReformasSlugs(): Promise<string[]> {
  cacheLife("max");
  const files = await fs.readdir(REFORMAS_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllReformas(): Promise<ReformaFrontmatter[]> {
  cacheLife("max");
  const slugs = await getReformasSlugs();
  const reformas = await Promise.all(
    slugs.map(async (slug) => {
      const source = await fs.readFile(
        path.join(REFORMAS_DIR, `${slug}.mdx`),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<ReformaFrontmatter>({
        source,
        options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
      });
      return { ...frontmatter, slug };
    })
  );
  return reformas;
}

export async function getReforma(slug: string): Promise<{
  frontmatter: ReformaFrontmatter;
  content: React.ReactElement;
}> {
  cacheLife("max");
  const source = await fs.readFile(
    path.join(REFORMAS_DIR, `${slug}.mdx`),
    "utf-8"
  );
  const { frontmatter, content } = await compileMDX<ReformaFrontmatter>({
    source,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return { frontmatter, content };
}
```

- [ ] **Step 4: Write archivo loader**

```ts
// lib/data/archivo.ts
"use cache";
import { cacheLife } from "next/cache";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { promises as fs } from "fs";
import path from "path";
import type { DiscursoFrontmatter, EntrevistaFrontmatter } from "@/lib/types";

async function loadMDXFrontmatter<T>(dir: string): Promise<T[]> {
  const files = await fs.readdir(dir);
  const results = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const source = await fs.readFile(path.join(dir, file), "utf-8");
        const { frontmatter } = await compileMDX<T>({
          source,
          options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
        });
        return frontmatter;
      })
  );
  return results.sort((a: any, b: any) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getDiscursos(): Promise<DiscursoFrontmatter[]> {
  cacheLife("days");
  return loadMDXFrontmatter<DiscursoFrontmatter>(
    path.join(process.cwd(), "content/discursos")
  );
}

export async function getEntrevistas(): Promise<EntrevistaFrontmatter[]> {
  cacheLife("days");
  return loadMDXFrontmatter<EntrevistaFrontmatter>(
    path.join(process.cwd(), "content/entrevistas")
  );
}
```

- [ ] **Step 5: Write unit tests for data loaders**

```ts
// lib/data/__tests__/libros.test.ts
import { describe, it, expect } from "vitest";
import { getLibros } from "../libros";

describe("getLibros", () => {
  it("returns 12 books", () => {
    const libros = getLibros();
    expect(libros).toHaveLength(12);
  });
  it("each book has title, year, coverUrl", () => {
    const libros = getLibros();
    libros.forEach((libro) => {
      expect(libro.title).toBeTruthy();
      expect(libro.year).toBeGreaterThan(2000);
      expect(libro.coverUrl).toMatch(/^https:\/\/m\.media-amazon\.com/);
    });
  });
  it("books are sorted newest first", () => {
    const libros = getLibros();
    expect(libros[0].year).toBeGreaterThanOrEqual(libros[1].year);
  });
});
```

- [ ] **Step 6: Run tests**

```bash
npx vitest run lib/data
```

Expected: 3 tests pass.

- [ ] **Step 7: Commit**

```bash
git add lib/data/ lib/utils/
git commit -m "feat: add data loaders with use-cache directives"
```

---

## Task 5: UI Primitives

**Files:**
- Create: `components/ui/GlassCard.tsx`
- Create: `components/ui/SectionHeading.tsx`
- Create: `components/ui/ScrollReveal.tsx`

- [ ] **Step 1: Create GlassCard**

```tsx
// components/ui/GlassCard.tsx
import { cn } from "@/lib/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function GlassCard({ children, className, as: Tag = "div" }: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl",
        "transition-all duration-300",
        "hover:bg-white/[0.06] hover:border-white/[0.14]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Create SectionHeading**

```tsx
// components/ui/SectionHeading.tsx
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  withAccent?: boolean;
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  withAccent = true,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-text",
        withAccent && "after:block after:w-12 after:h-0.5 after:bg-gold after:mt-3",
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Create ScrollReveal client component**

```tsx
// components/ui/ScrollReveal.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: add GlassCard, SectionHeading, ScrollReveal UI primitives"
```

---

## Task 6: Root Layout & Navigation

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/nav/FloatingNav.tsx`
- Create: `components/nav/MobileNav.tsx`

- [ ] **Step 1: Create FloatingNav**

```tsx
// components/nav/FloatingNav.tsx
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/", label: "Inicio", anchor: "#hero" },
  { href: "/vision", label: "Visión" },
  { href: "/logros", label: "Logros" },
  { href: "/reformas", label: "Reformas" },
  { href: "/mundo", label: "Mundo" },
  { href: "/futuro", label: "Futuro" },
  { href: "/archivo", label: "Archivo" },
];

export function FloatingNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        "bg-black/60 backdrop-blur-3xl border border-white/[0.06]",
        "rounded-full px-6 py-3",
        "flex items-center gap-6"
      )}
    >
      <span className="font-display text-gold text-sm font-semibold tracking-widest uppercase">
        JM
      </span>
      <ul className="hidden md:flex items-center gap-5">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "text-muted text-sm hover:text-text transition-colors duration-200",
                "hover:text-gold"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <MobileNavTrigger />
    </nav>
  );
}

// Placeholder — MobileNav renders the trigger button client-side
function MobileNavTrigger() {
  return (
    <div className="md:hidden" id="mobile-nav-trigger" />
  );
}
```

- [ ] **Step 2: Create MobileNav client component**

```tsx
// components/nav/MobileNav.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/vision", label: "Visión" },
  { href: "/logros", label: "Logros" },
  { href: "/reformas", label: "Reformas" },
  { href: "/mundo", label: "Mundo" },
  { href: "/futuro", label: "Futuro" },
  { href: "/archivo", label: "Archivo" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden fixed top-5 right-5 z-[60] p-2 rounded-full bg-black/60 backdrop-blur border border-white/10"
      >
        <span className={cn("block w-5 h-0.5 bg-gold mb-1 transition-all", open && "rotate-45 translate-y-1.5")} />
        <span className={cn("block w-5 h-0.5 bg-gold mb-1 transition-all", open && "opacity-0")} />
        <span className={cn("block w-5 h-0.5 bg-gold transition-all", open && "-rotate-45 -translate-y-1.5")} />
      </button>

      {/* Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-canvas/95 backdrop-blur-xl flex flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <nav>
            <ul className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-text hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Update root layout**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { FloatingNav } from "@/components/nav/FloatingNav";
import { MobileNav } from "@/components/nav/MobileNav";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Javier Milei — Presidente de la Nación Argentina",
  description:
    "Sitio oficial del Presidente Javier Milei. Logros, reformas, visión y el camino hacia la Argentina más libre del mundo.",
  openGraph: {
    title: "Javier Milei",
    description: "El camino hacia la Argentina más libre del mundo.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-canvas text-text font-sans antialiased">
        <FloatingNav />
        <MobileNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build compiles**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/nav/
git commit -m "feat: root layout with next/font and floating navigation"
```

---

## Task 7: Home Page — Panels 1–4

**Files:**
- Create: `components/home/HeroPanel.tsx`
- Create: `components/home/VisionPanel.tsx`
- Create: `components/home/LogrosHomePanel.tsx`
- Create: `components/home/ReformasHomePanel.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create HeroPanel**

```tsx
// components/home/HeroPanel.tsx
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HeroPanel() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Panel principal"
    >
      {/* Full-bleed background with Ken Burns */}
      <div
        className="absolute inset-0 bg-canvas"
        style={{ animation: "kenBurns 20s ease-in-out infinite" }}
        aria-hidden="true"
      >
        {/* Replace with next/image hero portrait once asset is available */}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/20 via-canvas/40 to-canvas" />
      </div>

      {/* Gold particle overlay — pure CSS radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-gold text-sm font-sans font-semibold uppercase tracking-[0.3em] mb-6">
          Presidente de la Nación Argentina
        </p>
        <SectionHeading
          as="h1"
          className="text-7xl md:text-9xl font-black leading-none mb-6"
          withAccent={false}
        >
          JAVIER<br />MILEI
        </SectionHeading>
        <p className="text-text/70 font-sans text-xl md:text-2xl font-light max-w-2xl mx-auto">
          El camino hacia la Argentina más libre del mundo
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-0.5 h-8 bg-gold/40 mx-auto" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create VisionPanel**

```tsx
// components/home/VisionPanel.tsx
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function VisionPanel() {
  return (
    <section
      id="vision"
      className="h-screen flex items-center justify-center bg-canvas px-6"
      aria-label="Visión"
    >
      <ScrollReveal className="max-w-4xl text-center">
        <blockquote className="font-display text-3xl md:text-5xl text-text font-semibold leading-tight">
          <span className="block w-16 h-0.5 bg-gold mx-auto mb-8" aria-hidden="true" />
          &ldquo;La libertad no es solo una bandera política —
          es el único camino moral hacia la prosperidad.&rdquo;
          <span className="block w-16 h-0.5 bg-gold mx-auto mt-8" aria-hidden="true" />
        </blockquote>
        <Link
          href="/vision"
          className="inline-block mt-10 text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors"
        >
          Ver visión completa →
        </Link>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 3: Create LogrosHomePanel (uses Server Component)**

```tsx
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
```

- [ ] **Step 4: Create ReformasHomePanel**

```tsx
// components/home/ReformasHomePanel.tsx
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllReformas } from "@/lib/data/reformas";

export async function ReformasHomePanel() {
  const reformas = await getAllReformas();

  return (
    <section
      id="reformas"
      className="h-screen flex flex-col items-center justify-center px-6"
      aria-label="Reformas"
    >
      <ScrollReveal className="w-full max-w-6xl">
        <SectionHeading className="text-4xl md:text-5xl text-center mb-12">
          Reformas Históricas
        </SectionHeading>

        {/* Desktop: 3-col grid. Mobile: horizontal scroll */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
          {reformas.map((reforma) => (
            <GlassCard key={reforma.slug} as={Link} href={`/reformas/${reforma.slug}`} className="p-6 block">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gold">
                {reforma.categoria}
              </span>
              <h3 className="font-display text-xl text-text mt-2 mb-3">{reforma.title}</h3>
              <p className="text-muted text-sm font-sans leading-relaxed">{reforma.summary}</p>
            </GlassCard>
          ))}
        </div>
        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6"
             style={{ WebkitOverflowScrolling: "touch" }}>
          {reformas.map((reforma) => (
            <GlassCard key={reforma.slug} as={Link} href={`/reformas/${reforma.slug}`}
              className="p-6 block min-w-[280px] flex-shrink-0">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gold">
                {reforma.categoria}
              </span>
              <h3 className="font-display text-xl text-text mt-2 mb-3">{reforma.title}</h3>
              <p className="text-muted text-sm font-sans leading-relaxed">{reforma.summary}</p>
            </GlassCard>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/reformas" className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors">
            Explorar todas las reformas →
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 5: Assemble home page (partial — panels 1-4)**

```tsx
// app/page.tsx
import { HeroPanel } from "@/components/home/HeroPanel";
import { VisionPanel } from "@/components/home/VisionPanel";
import { LogrosHomePanel } from "@/components/home/LogrosHomePanel";
import { ReformasHomePanel } from "@/components/home/ReformasHomePanel";

export default function HomePage() {
  return (
    <div
      className="h-screen overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {[HeroPanel, VisionPanel, LogrosHomePanel, ReformasHomePanel].map(
        (Panel, i) => (
          <div key={i} style={{ scrollSnapAlign: "start" }}>
            <Panel />
          </div>
        )
      )}
    </div>
  );
}
```

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```

Navigate to `localhost:3000`. Expected: 4 scroll-snap panels visible, gold design tokens applied.

- [ ] **Step 7: Commit**

```bash
git add components/home/ app/page.tsx
git commit -m "feat: home page panels 1-4 (Hero, Vision, Logros, Reformas)"
```

---

## Task 8: Home Page — Panels 5–7

**Files:**
- Create: `components/home/MundoHomePanel.tsx`
- Create: `components/home/FuturoHomePanel.tsx`
- Create: `components/home/ArchivoHomePanel.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create MundoHomePanel**

```tsx
// components/home/MundoHomePanel.tsx
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EVENTOS = [
  { label: "Davos 2024", lat: 46.8, lng: 9.8 },
  { label: "Bruselas", lat: 50.8, lng: 4.3 },
  { label: "Washington D.C.", lat: 38.9, lng: -77.0 },
];

export function MundoHomePanel() {
  return (
    <section
      id="mundo"
      className="h-screen flex flex-col items-center justify-center px-6 bg-surface/30"
      aria-label="Argentina en el mundo"
    >
      <ScrollReveal className="w-full max-w-4xl text-center">
        <SectionHeading className="text-4xl md:text-5xl text-center mb-6">
          Argentina en el Mundo
        </SectionHeading>
        <p className="text-muted font-sans mb-10 max-w-xl mx-auto">
          Reinserción global, defensa del capitalismo y alianzas estratégicas
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {EVENTOS.map((e) => (
            <span key={e.label}
              className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm font-sans text-gold">
              {e.label}
            </span>
          ))}
        </div>
        <Link href="/mundo" className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors">
          Ver presencia global →
        </Link>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Create FuturoHomePanel**

```tsx
// components/home/FuturoHomePanel.tsx
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FuturoHomePanel() {
  return (
    <section
      id="futuro"
      className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      aria-label="El futuro de Argentina"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <ScrollReveal className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-gold/60 font-sans text-sm font-semibold uppercase tracking-[0.3em] mb-6">
          Visión 2027
        </p>
        <h2 className="font-display text-5xl md:text-7xl font-black text-text leading-tight mb-8">
          El 4° Hub de IA<br />del Mundo
        </h2>
        <p className="text-muted font-sans text-lg max-w-xl mx-auto mb-10">
          Argentina como potencia tecnológica global, liderando la revolución de la inteligencia artificial.
        </p>
        <Link href="/futuro" className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors">
          Conocer el plan →
        </Link>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 3: Create ArchivoHomePanel**

```tsx
// components/home/ArchivoHomePanel.tsx
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDiscursos } from "@/lib/data/archivo";
import { formatDate } from "@/lib/utils/formatDate";

export async function ArchivoHomePanel() {
  const discursos = await getDiscursos();
  const featured = discursos.slice(0, 3);

  return (
    <section
      id="archivo"
      className="h-screen flex flex-col items-center justify-center px-6 bg-surface/20"
      aria-label="Archivo"
    >
      <ScrollReveal className="w-full max-w-6xl">
        <SectionHeading className="text-4xl md:text-5xl text-center mb-12">
          Archivo
        </SectionHeading>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {featured.map((discurso, i) => (
            <GlassCard key={i} className="p-6">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gold">
                Discurso
              </span>
              <p className="font-display text-lg text-text mt-2 mb-1">{discurso.title}</p>
              <p className="text-muted text-sm font-sans">{formatDate(discurso.date)}</p>
            </GlassCard>
          ))}
        </div>
        <div className="text-center">
          <Link href="/archivo" className="text-gold text-sm font-sans font-semibold uppercase tracking-widest hover:text-gold-bright transition-colors">
            Ver archivo completo →
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 4: Complete home page with all 7 panels**

```tsx
// app/page.tsx
import { HeroPanel } from "@/components/home/HeroPanel";
import { VisionPanel } from "@/components/home/VisionPanel";
import { LogrosHomePanel } from "@/components/home/LogrosHomePanel";
import { ReformasHomePanel } from "@/components/home/ReformasHomePanel";
import { MundoHomePanel } from "@/components/home/MundoHomePanel";
import { FuturoHomePanel } from "@/components/home/FuturoHomePanel";
import { ArchivoHomePanel } from "@/components/home/ArchivoHomePanel";

export default function HomePage() {
  return (
    <div
      className="h-screen overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Each panel fills the viewport and snaps into place */}
      <div style={{ scrollSnapAlign: "start" }}><HeroPanel /></div>
      <div style={{ scrollSnapAlign: "start" }}><VisionPanel /></div>
      <div style={{ scrollSnapAlign: "start" }}><LogrosHomePanel /></div>
      <div style={{ scrollSnapAlign: "start" }}><ReformasHomePanel /></div>
      <div style={{ scrollSnapAlign: "start" }}><MundoHomePanel /></div>
      <div style={{ scrollSnapAlign: "start" }}><FuturoHomePanel /></div>
      <div style={{ scrollSnapAlign: "start" }}><ArchivoHomePanel /></div>
    </div>
  );
}
```

- [ ] **Step 5: Verify full home page in browser**

```bash
npm run dev
```

Navigate to `localhost:3000`. Expected: 7 scroll-snap panels, correct typography and gold accents.

- [ ] **Step 6: Commit**

```bash
git add components/home/ app/page.tsx
git commit -m "feat: complete home page with all 7 cinematic panels"
```

---

## Task 9: /vision, /mundo, /futuro Pages

**Files:**
- Create: `app/vision/page.tsx`
- Create: `app/mundo/page.tsx`
- Create: `components/mundo/WorldMap.tsx`
- Create: `components/mundo/PressLogos.tsx`
- Create: `components/mundo/MilestoneTimeline.tsx`
- Create: `app/futuro/page.tsx`

- [ ] **Step 1: Create /vision page**

```tsx
// app/vision/page.tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Visión — Javier Milei",
  description: "La visión de Javier Milei: la Argentina más libre del mundo.",
};

const PILARES = [
  { title: "Libertad Económica", desc: "Mercados libres, precios libres, contratos libres. El Estado no debe intervenir en las decisiones voluntarias de los individuos." },
  { title: "Reducción del Estado", desc: "Un Estado mínimo, subsidiario y eficiente. Cada peso que gasta el Estado es un peso que le saca a los ciudadanos." },
  { title: "Moneda Sana", desc: "Fin de la inflación como política de Estado. Dinero honesto que preserve el valor del trabajo y el ahorro de los argentinos." },
  { title: "Seguridad Jurídica", desc: "Contratos que se respetan. Propiedad privada garantizada. Reglas claras para la inversión y el crecimiento." },
];

export default function VisionPage() {
  return (
    <article className="min-h-screen bg-canvas">
      {/* Hero */}
      <header className="h-[60vh] flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
          aria-hidden="true" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-gold/60 font-sans text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            La visión
          </p>
          <SectionHeading as="h1" className="text-5xl md:text-7xl font-black leading-tight" withAccent={false}>
            La Argentina más libre<br />del mundo
          </SectionHeading>
        </div>
      </header>

      {/* Manifiesto */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <ScrollReveal>
          <p className="font-sans text-lg text-text/80 leading-relaxed mb-6">
            La libertad no es una promesa vacía. Es el único sistema que, a lo largo de la historia, demostró ser capaz de sacar a los pueblos de la pobreza y generar prosperidad genuina.
          </p>
          <p className="font-sans text-lg text-text/80 leading-relaxed mb-6">
            Argentina desperdició décadas eligiendo el camino del estatismo, la inflación y la decadencia. La elección de 2023 fue un punto de inflexión: los argentinos eligieron la libertad.
          </p>
          <p className="font-sans text-lg text-text/80 leading-relaxed">
            El objetivo es claro: convertir a Argentina en el país más libre del mundo. No el más rico, aunque eso llegará. El más libre.
          </p>
        </ScrollReveal>
      </section>

      {/* 4 Pilares */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <SectionHeading className="text-3xl md:text-4xl text-center mb-12">
            Los 4 Pilares
          </SectionHeading>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {PILARES.map((pilar, i) => (
            <ScrollReveal key={pilar.title} delay={i * 100}>
              <GlassCard className="p-8">
                <h3 className="font-display text-xl text-gold mb-3">{pilar.title}</h3>
                <p className="font-sans text-muted leading-relaxed">{pilar.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <ScrollReveal>
          <SectionHeading className="text-3xl md:text-4xl text-center mb-12">
            La Línea del Tiempo
          </SectionHeading>
        </ScrollReveal>
        <div className="flex items-start gap-0 overflow-x-auto pb-4">
          {[
            { label: "Antes de 2023", desc: "Inflación crónica, déficit permanente, decadencia." },
            { label: "Transición 2024", desc: "Ajuste histórico, superávit, desinflación." },
            { label: "Visión 2027", desc: "Argentina libre, estable y próspera." },
          ].map((step, i) => (
            <div key={step.label} className="flex-1 min-w-[200px] text-center px-4">
              <div className="w-3 h-3 bg-gold rounded-full mx-auto mb-3" />
              {i < 2 && <div className="absolute w-full h-0.5 bg-gold/30 top-1.5 left-1/2" />}
              <p className="font-display text-sm text-gold mb-1">{step.label}</p>
              <p className="font-sans text-xs text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Create WorldMap component**

```tsx
// components/mundo/WorldMap.tsx
// Note: react-simple-maps requires "use client" for map interactivity
// This version is fully static (no interactivity) — Server Component compatible via inline SVG approach

export function WorldMap() {
  // Connection line coordinates [lng, lat] projected to SVG viewBox 0 0 800 400
  // Using simplified equirectangular projection: x = (lng + 180) * (800/360), y = (90 - lat) * (400/180)
  const project = (lng: number, lat: number) => ({
    x: ((lng + 180) * 800) / 360,
    y: ((90 - lat) * 400) / 180,
  });

  const BA = project(-58.4, -34.6);
  const Davos = project(9.8, 46.8);
  const Brussels = project(4.3, 50.8);
  const Washington = project(-77.0, 38.9);

  const connections = [
    { from: BA, to: Davos, label: "Davos" },
    { from: BA, to: Brussels, label: "Mercosur-UE" },
    { from: BA, to: Washington, label: "Washington" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto" aria-label="Mapa de presencia global">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* World background */}
        <rect width="800" height="400" fill="transparent" />

        {/* Connection lines with animation */}
        {connections.map((conn, i) => (
          <g key={conn.label}>
            <line
              x1={conn.from.x} y1={conn.from.y}
              x2={conn.to.x} y2={conn.to.y}
              stroke="#C9A84C"
              strokeWidth="1"
              strokeOpacity="0.6"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{
                animation: `dashDraw 2s ease-out ${i * 0.4}s forwards`,
              }}
            />
            {/* Destination dot */}
            <circle cx={conn.to.x} cy={conn.to.y} r="4" fill="#C9A84C" />
            <text
              x={conn.to.x + 6}
              y={conn.to.y + 4}
              fill="#E8C97A"
              fontSize="10"
              fontFamily="Inter, sans-serif"
            >
              {conn.label}
            </text>
          </g>
        ))}

        {/* Buenos Aires — origin dot */}
        <circle cx={BA.x} cy={BA.y} r="6" fill="#C9A84C" />
        <circle cx={BA.x} cy={BA.y} r="12" fill="none" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.4" />
        <text x={BA.x + 8} y={BA.y + 4} fill="#F0EDE6" fontSize="10" fontFamily="Inter, sans-serif">
          Buenos Aires
        </text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: Create PressLogos component**

```tsx
// components/mundo/PressLogos.tsx
// Static logos strip: grayscale by default, gold tint on hover
const LOGOS = [
  { name: "Financial Times", abbr: "FT" },
  { name: "The Wall Street Journal", abbr: "WSJ" },
  { name: "Le Monde", abbr: "LM" },
  { name: "El País", abbr: "EP" },
  { name: "Bloomberg", abbr: "BLB" },
  { name: "The Economist", abbr: "ECO" },
];

export function PressLogos() {
  return (
    <section aria-label="Cobertura internacional">
      <p className="text-center text-xs text-muted font-sans uppercase tracking-widest mb-6">
        Cobertura internacional
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {LOGOS.map((logo) => (
          <span
            key={logo.name}
            title={logo.name}
            className="font-display text-lg font-bold text-muted/40 hover:text-gold transition-colors duration-300 grayscale hover:grayscale-0 cursor-default select-none"
          >
            {logo.abbr}
          </span>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create /mundo page**

```tsx
// app/mundo/page.tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WorldMap } from "@/components/mundo/WorldMap";
import { PressLogos } from "@/components/mundo/PressLogos";
import { formatDate } from "@/lib/utils/formatDate";
import mundoData from "@/content/mundo.json";

export const metadata: Metadata = {
  title: "Argentina en el Mundo — Javier Milei",
  description: "La reinserción global de Argentina bajo la presidencia de Javier Milei.",
};

export default function MundoPage() {
  return (
    <article className="min-h-screen bg-canvas">
      <header className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <SectionHeading as="h1" className="text-5xl md:text-6xl font-black">
          Argentina en el Mundo
        </SectionHeading>
        <p className="text-muted font-sans text-lg mt-4 max-w-xl mx-auto">
          Reinserción global, defensa del capitalismo y alianzas estratégicas
        </p>
      </header>

      {/* World Map */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <ScrollReveal>
          <WorldMap />
        </ScrollReveal>
      </section>

      {/* Press logos strip */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <PressLogos />
      </section>

      {/* Eventos */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <SectionHeading className="text-3xl mb-10">Hitos Internacionales</SectionHeading>
        <div className="space-y-4">
          {mundoData.eventos.map((evento, i) => (
            <ScrollReveal key={evento.title} delay={i * 80}>
              <GlassCard className="p-6 flex gap-6 items-start">
                <div className="text-center min-w-[80px]">
                  <p className="font-sans text-xs text-gold uppercase tracking-wider">
                    {new Date(evento.date).getFullYear()}
                  </p>
                  <p className="font-sans text-sm text-muted">
                    {new Date(evento.date).toLocaleDateString("es-AR", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-text mb-1">{evento.title}</h3>
                  <p className="text-gold/70 text-xs font-sans mb-2">{evento.lugar}</p>
                  <p className="text-muted text-sm font-sans leading-relaxed">{evento.descripcion}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 5: Create /futuro page**

```tsx
// app/futuro/page.tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import futuroData from "@/content/futuro.json";

export const metadata: Metadata = {
  title: "El Futuro — Javier Milei",
  description: "Argentina como el 4° Hub de IA del mundo.",
};

export default function FuturoPage() {
  return (
    <article className="min-h-screen bg-canvas">
      <header className="h-[60vh] flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
          aria-hidden="true" />
        <div className="relative z-10 text-center">
          <p className="text-gold/60 font-sans text-sm font-semibold uppercase tracking-[0.3em] mb-4">Visión 2027</p>
          <SectionHeading as="h1" className="text-5xl md:text-7xl font-black" withAccent={false}>
            El 4° Hub de IA<br />del Mundo
          </SectionHeading>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading className="text-3xl md:text-4xl text-center mb-12">Los 3 Pilares</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {futuroData.pilares.map((pilar, i) => (
            <ScrollReveal key={pilar.title} delay={i * 100}>
              <GlassCard className="p-8 text-center">
                <h3 className="font-display text-xl text-gold mb-3">{pilar.title}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed">{pilar.descripcion}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <SectionHeading className="text-3xl md:text-4xl text-center mb-12">Hoja de Ruta</SectionHeading>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/20" aria-hidden="true" />
          <div className="space-y-8">
            {futuroData.roadmap.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 100}>
                <div className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="flex-1 text-right pr-8">
                    {i % 2 === 0 && (
                      <GlassCard className="p-4 inline-block">
                        <p className="text-gold font-display text-lg">{item.year}</p>
                        <p className="text-text font-sans text-sm">{item.hito}</p>
                      </GlassCard>
                    )}
                  </div>
                  <div className="w-4 h-4 bg-gold rounded-full flex-shrink-0 z-10" />
                  <div className="flex-1 pl-8">
                    {i % 2 !== 0 && (
                      <GlassCard className="p-4 inline-block">
                        <p className="text-gold font-display text-lg">{item.year}</p>
                        <p className="text-text font-sans text-sm">{item.hito}</p>
                      </GlassCard>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 5: Build check**

```bash
npm run build
```

Expected: build succeeds with 3 new static pages.

- [ ] **Step 6: Commit**

```bash
git add app/vision/ app/mundo/ app/futuro/ components/mundo/
git commit -m "feat: add /vision, /mundo, /futuro pages"
```

---

## Task 10: /logros Page

**Files:**
- Create: `app/logros/page.tsx`
- Create: `components/logros/StatCounter.tsx`
- Create: `components/logros/AchievementTimeline.tsx`
- Create: `components/logros/CategoryFilter.tsx`

- [ ] **Step 1: Create StatCounter client component**

```tsx
// components/logros/StatCounter.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import type { LogroStat } from "@/lib/types";

interface StatCounterProps {
  stat: LogroStat;
}

export function StatCounter({ stat }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = stat.value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              setCount(stat.value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current * 10) / 10);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl">
      <p className="font-sans text-5xl font-black text-gold">
        {count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)}{stat.unit}
      </p>
      <p className="font-display text-lg text-text mt-2">{stat.label}</p>
      <p className="font-sans text-sm text-muted mt-1">{stat.description}</p>
    </div>
  );
}
```

- [ ] **Step 2: Create AchievementTimeline**

```tsx
// components/logros/AchievementTimeline.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatDate } from "@/lib/utils/formatDate";
import type { LogroTimeline } from "@/lib/types";

interface AchievementTimelineProps {
  items: LogroTimeline[];
  /** Active category slug, e.g. "economia". Omit or "todas" to show all. */
  activeCategory?: string;
}

export function AchievementTimeline({ items, activeCategory }: AchievementTimelineProps) {
  return (
    <div className="relative">
      {/* Gold vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/20 -translate-x-1/2" aria-hidden="true" />

      <div className="space-y-12">
        {items.map((item, i) => {
          const visible = !activeCategory || activeCategory === "todas" || item.categoria === activeCategory;
          return (
            // CSS display:none keeps items in DOM so layout shift on reveal is avoided
            <ScrollReveal key={item.title} delay={i * 80} style={{ display: visible ? undefined : "none" }}>
              <div className={`flex items-center gap-8 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <div className="flex-1">
                  <GlassCard className={`p-6 ${i % 2 === 0 ? "mr-8" : "ml-8"}`}>
                    <p className="text-gold text-xs font-sans font-semibold uppercase tracking-wider mb-1">
                      {formatDate(item.date)}
                    </p>
                    <h3 className="font-display text-lg text-text mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">{item.description}</p>
                  </GlassCard>
                </div>
                {/* Center dot */}
                <div className="w-3 h-3 bg-gold rounded-full flex-shrink-0 z-10" aria-hidden="true" />
                <div className="flex-1" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create CategoryFilter client component**

```tsx
// components/logros/CategoryFilter.tsx
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
```

- [ ] **Step 4: Create /logros page**

```tsx
// app/logros/page.tsx
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

export default async function LogrosPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const { stats, timeline } = await getLogros();

  return (
    <article className="min-h-screen bg-canvas">
      <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <SectionHeading as="h1" className="text-5xl md:text-6xl font-black">
          Logros del Gobierno
        </SectionHeading>
      </header>

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
        <AchievementTimeline items={timeline} activeCategory={params?.categoria ?? "todas"} />
      </section>
    </article>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/logros/ components/logros/
git commit -m "feat: /logros page with animated stat counters and timeline"
```

---

## Task 11: /reformas Pages

**Files:**
- Create: `app/reformas/page.tsx`
- Create: `app/reformas/[slug]/page.tsx`
- Create: `components/reformas/ReformaCard.tsx`
- Create: `components/reformas/BeforeAfterPanel.tsx`
- Create: `components/reformas/ImpactoChart.tsx`

- [ ] **Step 1: Create ReformaCard**

```tsx
// components/reformas/ReformaCard.tsx
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import type { ReformaFrontmatter } from "@/lib/types";

interface ReformaCardProps {
  reforma: ReformaFrontmatter;
}

export function ReformaCard({ reforma }: ReformaCardProps) {
  return (
    <GlassCard as={Link} href={`/reformas/${reforma.slug}`} className="p-6 block hover:scale-[1.01]">
      <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gold">
        {reforma.categoria}
      </span>
      <h3 className="font-display text-xl text-text mt-2 mb-3">{reforma.title}</h3>
      <p className="text-muted text-sm font-sans leading-relaxed">{reforma.summary}</p>
      <p className="text-gold/60 text-xs font-sans mt-4">Ver reforma →</p>
    </GlassCard>
  );
}
```

- [ ] **Step 2: Create BeforeAfterPanel**

```tsx
// components/reformas/BeforeAfterPanel.tsx
interface BeforeAfterPanelProps {
  type: "antes" | "ahora";
  title: string;
  children: React.ReactNode;
}

export function BeforeAfterPanel({ type, title, children }: BeforeAfterPanelProps) {
  const isAntes = type === "antes";
  return (
    <div
      className={`p-8 rounded-xl backdrop-blur-xl border ${
        isAntes
          ? "bg-red-950/20 border-red-900/20"
          : "bg-emerald-950/20 border-emerald-900/20"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${isAntes ? "bg-red-500" : "bg-emerald-500"}`} aria-hidden="true" />
        <h3 className={`font-display text-xl ${isAntes ? "text-red-300" : "text-emerald-300"}`}>
          {title}
        </h3>
      </div>
      <div className="font-sans text-text/80 leading-relaxed">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create ImpactoChart**

```tsx
// components/reformas/ImpactoChart.tsx
interface ImpactoChartProps {
  stats: Array<{ label: string; value: string }>;
}

export function ImpactoChart({ stats }: ImpactoChartProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl"
        >
          <p className="font-sans text-3xl font-black text-gold">{stat.value}</p>
          <p className="font-sans text-sm text-muted mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create /reformas index page**

```tsx
// app/reformas/page.tsx
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
```

- [ ] **Step 5: Create /reformas/[slug] page**

```tsx
// app/reformas/[slug]/page.tsx
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
```

- [ ] **Step 6: Build to verify static params generation**

```bash
npm run build
```

Expected: `/reformas/desregulacion-economica` and `/reformas/reforma-del-estado` are pre-rendered as static pages.

- [ ] **Step 7: Commit**

```bash
git add app/reformas/ components/reformas/
git commit -m "feat: /reformas index and individual reform pages with before/after/impacto"
```

---

## Task 12: /archivo Page

**Files:**
- Create: `app/archivo/page.tsx`
- Create: `components/archivo/ArchiveTabs.tsx`
- Create: `components/archivo/BookShelf.tsx`
- Create: `components/archivo/SpeechCard.tsx`
- Create: `components/archivo/InterviewCard.tsx`

- [ ] **Step 1: Create SpeechCard**

```tsx
// components/archivo/SpeechCard.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils/formatDate";
import type { DiscursoFrontmatter } from "@/lib/types";

interface SpeechCardProps {
  discurso: DiscursoFrontmatter;
}

export function SpeechCard({ discurso }: SpeechCardProps) {
  return (
    <GlassCard className="p-6">
      <span className="text-gold text-xs font-sans font-semibold uppercase tracking-widest">Discurso</span>
      <h3 className="font-display text-lg text-text mt-2 mb-2">{discurso.title}</h3>
      <p className="text-muted text-sm font-sans">{formatDate(discurso.date)}</p>
      <p className="text-muted/70 text-sm font-sans">{discurso.lugar}</p>
      <p className="text-gold/60 text-xs font-sans mt-3">{discurso.duracion}</p>
    </GlassCard>
  );
}
```

- [ ] **Step 2: Create InterviewCard**

```tsx
// components/archivo/InterviewCard.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils/formatDate";
import type { EntrevistaFrontmatter } from "@/lib/types";

interface InterviewCardProps {
  entrevista: EntrevistaFrontmatter;
}

export function InterviewCard({ entrevista }: InterviewCardProps) {
  return (
    <GlassCard className="p-6">
      <span className="text-gold text-xs font-sans font-semibold uppercase tracking-widest">Entrevista</span>
      <h3 className="font-display text-lg text-text mt-2 mb-2">{entrevista.title}</h3>
      <p className="text-muted text-sm font-sans">{formatDate(entrevista.date)}</p>
      <p className="text-muted/70 text-sm font-sans">{entrevista.medio}</p>
      <p className="text-gold/60 text-xs font-sans mt-3">{entrevista.duracion}</p>
    </GlassCard>
  );
}
```

- [ ] **Step 3: Create BookShelf**

```tsx
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
```

- [ ] **Step 4: Create ArchiveTabs client component**

```tsx
// components/archivo/ArchiveTabs.tsx
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
```

- [ ] **Step 5: Create /archivo page**

```tsx
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
```

- [ ] **Step 6: Build check**

```bash
npm run build
```

Expected: `/archivo` pre-renders successfully with ISR (`cacheLife('days')`).

- [ ] **Step 7: Commit**

```bash
git add app/archivo/ components/archivo/
git commit -m "feat: /archivo page with tabs for discursos, entrevistas, libros with book covers"
```

---

## Task 13: E2E Tests

**Files:**
- Create: `e2e/home.spec.ts`
- Create: `e2e/reformas.spec.ts`
- Create: `e2e/archivo.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Configure Playwright**

```ts
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 14"] } },
  ],
});
```

- [ ] **Step 2: Write home page E2E tests**

```ts
// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and displays hero panel", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("JAVIER MILEI");
  });

  test("floating nav is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();
  });

  test("scroll snap panels exist", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Panel principal" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Logros" })).toBeInViewport({ ratio: 0 });
  });
});
```

- [ ] **Step 3: Write reforma E2E test**

```ts
// e2e/reformas.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Reformas", () => {
  test("index page lists reforms", async ({ page }) => {
    await page.goto("/reformas");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Reformas");
    await expect(page.getByText("Desregulación Económica")).toBeVisible();
  });

  test("individual reform page renders", async ({ page }) => {
    await page.goto("/reformas/desregulacion-economica");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Desregulación");
    await expect(page.getByText("¿De qué se trata?")).toBeVisible();
  });
});
```

- [ ] **Step 4: Write archivo E2E test**

```ts
// e2e/archivo.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Archivo", () => {
  test("shows discursos tab by default", async ({ page }) => {
    await page.goto("/archivo");
    await expect(page.getByRole("tab", { name: "Discursos", selected: true })).toBeVisible();
  });

  test("switching to Libros tab shows book covers", async ({ page }) => {
    await page.goto("/archivo");
    await page.getByRole("tab", { name: "Libros" }).click();
    const images = page.locator('img[alt*="Tapa de"]');
    await expect(images.first()).toBeVisible();
    const count = await images.count();
    expect(count).toBe(12);
  });

  test("mobile nav opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const btn = page.getByRole("button", { name: "Abrir menú" });
    await btn.click();
    await expect(page.getByRole("dialog", { name: "Menú de navegación" })).toBeVisible();
    await page.getByRole("link", { name: "Logros" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
```

- [ ] **Step 5: Install browsers and run E2E tests**

```bash
npx playwright install chromium
npm run dev &
npx playwright test
```

Expected: all E2E tests pass.

- [ ] **Step 6: Add test scripts to package.json**

```json
{
  "scripts": {
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "test": "vitest run && playwright test"
  }
}
```

- [ ] **Step 7: Commit**

```bash
git add e2e/ playwright.config.ts package.json
git commit -m "test: add Playwright E2E tests for home, reformas, archivo"
```

---

## Task 14: Deploy to Vercel

**Files:**
- Create: `vercel.json` (optional — Vercel auto-detects Next.js)

- [ ] **Step 1: Final production build check**

```bash
npm run build
```

Expected: build succeeds. Check output for any warnings about missing images or hydration errors.

- [ ] **Step 2: Deploy via Vercel MCP**

Use the Vercel MCP tool to deploy:

```
Deploy to Vercel with:
- Framework: Next.js
- Build command: npm run build
- Node.js version: 24
```

Expected: deployment URL returned.

- [ ] **Step 3: Verify deployed site**

Visit the deployment URL. Check:
- Home page 7 panels load
- `/reformas/desregulacion-economica` renders
- `/archivo` Libros tab shows 12 book covers
- Floating nav visible on all pages

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete Javier Milei personal website — all pages, content, tests"
```

---

## Summary

| Task | Deliverable |
|---|---|
| 1 | Next.js 16 scaffold, Tailwind 4, next.config.ts, proxy.ts |
| 2 | TypeScript types, cn(), formatDate() + Vitest |
| 3 | All seed content: JSON files + MDX samples |
| 4 | Data loaders with "use cache" + next-mdx-remote |
| 5 | UI primitives: GlassCard, SectionHeading, ScrollReveal |
| 6 | Root layout with next/font + FloatingNav + MobileNav |
| 7 | Home panels 1–4 |
| 8 | Home panels 5–7 — complete 7-panel cinematic home |
| 9 | /vision, /mundo, /futuro pages |
| 10 | /logros page with StatCounter, timeline, CategoryFilter |
| 11 | /reformas index + /reformas/[slug] with SSG |
| 12 | /archivo page with tabs, BookShelf (12 covers), SpeechCard |
| 13 | Playwright E2E tests |
| 14 | Vercel deployment |
