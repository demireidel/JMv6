# Javier Milei — Personal Website Design Spec

**Date:** 2026-03-24
**Project:** `1-JM-site`
**Stack:** Node 24 · Next.js 16 · React 19.2 · Tailwind CSS 4
**Language:** Spanish only
**Type:** Prestige informational — no CTA, no auth, no forms

---

## 1. Vision & Purpose

An ultra-premium personal website for Argentine President Javier Milei. The site is a cinematic digital manifesto — it communicates authority, economic conviction, and historical significance through a bespoke dark-mode design system with authoritative serif typography and elegant glassmorphism.

The site is purely informational (prestige). No newsletter, no donation, no login.

---

## 2. Architecture — Hybrid Cinematic Home + Deep Pages

### Route Map

```
/                           → Cinematic home — 7 full-viewport scroll-snap panels
/vision                     → Vision deep-dive page
/logros                     → Achievements: stat counters + chronological timeline
/reformas                   → Reforms index: card grid
/reformas/[slug]            → Individual reform: explainer + before/after/impact
/mundo                      → Global reinsertion page
/futuro                     → AI Hub vision page
/archivo                    → Archive: Discursos / Entrevistas / Libros tabs
```

### Rendering Strategy

With `cacheComponents: true` enabled, `"use cache"` + `cacheLife` profiles replace ISR's `export const revalidate`. Do **not** mix both — use `"use cache"` exclusively.

| Route | Strategy | `cacheLife` profile | Rationale |
|---|---|---|---|
| `/` | SSG + Cache Components | `'max'` | Cinematic, static, instant load |
| `/logros` | Cache Components | `'hours'` | Content updates occasionally |
| `/reformas` | SSG / Cache Components | `'max'` | Rarely changes |
| `/reformas/[slug]` | SSG via `generateStaticParams` | n/a (build-time static) | Pre-render all reform paths at build; data loaders use `"use cache"` with `cacheLife('max')` for any dynamic fallback |
| `/vision`, `/mundo`, `/futuro` | SSG / Cache Components | `'max'` | Near-static content |
| `/archivo` | Cache Components | `'days'` | Speeches/interviews added infrequently |

```ts
// Example data loader — lib/data/logros.ts
"use cache";
import { cacheLife } from "next/cache";

export async function getLogros() {
  cacheLife("hours");
  return import("@/content/logros.json");
}
```

### Next.js 16 Specifics
- **Turbopack** as default bundler (2–5× faster builds, 10× faster Fast Refresh)
- **`"use cache"` directive** on all data-fetching functions — opt-in caching
- **`proxy.ts`** replaces `middleware.ts` for any redirect/rewrite logic (Next.js 16 feature — see [official announcement](https://nextjs.org/blog/next-16#proxyts-formerly-middlewarets); runs on Node.js runtime, export function named `proxy`)
- **React Compiler** enabled — automatic memoization, no manual `useMemo`/`useCallback`
- **View Transitions API** (`<ViewTransition>`) for cinematic page-to-page navigation
- **Layout deduplication + incremental prefetching** — automatic via Next.js 16
- **Turbopack file system caching** enabled for dev (`turbopackFileSystemCacheForDev: true`)

```ts
// next.config.ts
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};
export default nextConfig;
```

### Component Boundary Rule
Every component is a **Server Component** by default. Client Components (`"use client"`) only for:
- Mobile nav toggle
- Scroll-entrance animations (IntersectionObserver)
- Glassmorphism hover effects
- Active tab state in `/archivo`

---

## 3. Design System

### Color Palette — Cinematic Dark Gold

```css
@theme {
  --color-canvas:       #080808;   /* Near-black canvas */
  --color-surface:      #111111;   /* Card/panel surfaces */
  --color-glass:        rgba(255,255,255,0.04);  /* Glassmorphism fill */
  --color-border:       rgba(255,255,255,0.08);  /* Glass borders */
  --color-gold:         #C9A84C;   /* Primary accent — authority */
  --color-gold-bright:  #E8C97A;   /* Hover/active gold */
  --color-text:         #F0EDE6;   /* Primary text — warm white */
  --color-muted:        #6B6B6B;   /* Secondary/caption text */
}
```

### Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Hero | Playfair Display | 700–900 | Cinematic serif authority |
| Section headings | Playfair Display | 600 | Consistent prestige |
| Body / UI | Inter | 400, 500 | Clean, highly readable |
| Impact numbers | Inter | 800 | Bold stat figures |
| Labels / caps | Inter | 600 | Uppercase letter-spacing |

Loaded via `next/font` — self-hosted, zero layout shift, no external requests.

### Glassmorphism System (Tailwind 4)

```css
/* Standard glass card */
bg-white/4 backdrop-blur-2xl border border-white/8 rounded-2xl

/* Navigation bar */
bg-black/60 backdrop-blur-3xl border-b border-white/6

/* Hover state lift */
hover:bg-white/6 hover:border-white/14 transition-all duration-300

/* Before panel (reform) */
bg-red-950/20 backdrop-blur-xl border border-red-900/20 rounded-xl

/* After panel (reform) */
bg-emerald-950/20 backdrop-blur-xl border border-emerald-900/20 rounded-xl
```

### Tailwind 4 Configuration (CSS-first, no tailwind.config.js)

```css
/* app/globals.css */
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
```

### Motion & Cinematic Language
- **Hero:** Slow Ken Burns on full-bleed photography (CSS `animation: kenBurns 20s ease-in-out infinite`)
- **Page transitions:** View Transitions API (`<ViewTransition>`) — native, zero JS cost
- **Scroll entrance:** `IntersectionObserver` → `opacity-0 translate-y-4` → `opacity-100 translate-y-0` — no GSAP, no Framer Motion
- **Cards:** subtle `scale-[1.01]` + gold border-glow on hover
- **Tone:** `ease-out` everywhere — authoritative, measured, never bouncy

---

## 4. Page Specifications

### `/` — Home (Cinematic Manifesto)

7 full-viewport panels with CSS `scroll-snap-type: y mandatory`:

| Panel | Content | Key Element |
|---|---|---|
| 1. Hero | Full-bleed Milei portrait, gold particle overlay | `"JAVIER MILEI"` Playfair 900, tagline in Inter |
| 2. Visión | Dark panel, large serif pull quote | Gold underline accent, fade-in entrance |
| 3. Logros | 4 animated stat counters | Glass cards, `"Ver todos los logros →"` link |
| 4. Reformas | Horizontal scroll of reform cards | Glassmorphism cards, `"Explorar reformas →"` |
| 5. Mundo | SVG world map with glowing connection lines | Davos / Mercosur-UE / Washington callouts |
| 6. Futuro | Bold full-width statement | `"El 4° Hub de IA del mundo."` dark cinematic |
| 7. Archivo | Preview grid of latest content | Speech + interview cards, `"Ver archivo →"` |

**Sticky floating nav:** glassmorphism pill, 7 dot anchors + section labels on hover.

**Panel 4 scroll conflict resolution:** Panel 4 (Reformas) uses horizontal card scrolling inside a vertical `scroll-snap-type: y mandatory` container. To avoid scroll interception:
- Desktop (≥1024px): render reform cards as a 3-column CSS grid — no horizontal scroll needed, no conflict.
- Mobile (<1024px): horizontal scroll via `overflow-x: auto; -webkit-overflow-scrolling: touch` inside the panel. The `scroll-snap` on the y-axis snaps between full-viewport panels; within a panel, touch-horizontal scrolling is a separate scroll axis and does not conflict.

---

### `/vision` — Visión

- **Hero:** Full-bleed dark cinematic panel, Playfair Display 800 title: *"La Argentina más libre del mundo"*
- **Manifiesto:** 3–4 paragraph statement of Milei's governing philosophy — liberty, minimal state, sound money
- **4 Pilares:** glassmorphism cards — Libertad Económica / Reducción del Estado / Moneda Sana / Seguridad Jurídica
- **Línea de tiempo:** Before 2023 → Transición → Visión 2027 — horizontal timeline with gold milestones
- Rendering: SSG / Cache Components (`cacheLife('max')`)

---

### `/logros` — Achievements

- **Hero stat bar:** 4 headline numbers with animated counters (IntersectionObserver trigger)
- **Timeline:** chronological milestones, gold vertical line, alternating left/right cards
- **Category filter tabs:** Economía / Seguridad / Educación / Infraestructura — client component. Filtering is purely client-side (no server re-render). URL search param (`?categoria=economia`) is written client-side via `useSearchParams` + `router.replace` for shareability. The page pre-renders all items; the client reads the param on mount and applies filtering. **Known trade-off:** users arriving via a filtered URL will see an unfiltered flash before hydration. This is accepted — the flash is ~100ms and the page is informational. To minimise it, all items should be rendered in the DOM but non-matching items hidden via CSS `display: none` (not unmounted), so there is no layout shift on reveal.
- Rendering: Cache Components — `cacheLife('hours')`

---

### `/reformas` — Reforms Index

- Grid of reform cards: title, category pill, 1-line summary
- Each links to `/reformas/[slug]`
- Rendering: SSG

### `/reformas/[slug]` — Individual Reform

Structure per page:

1. **¿De qué se trata?** — Plain-language explainer
2. **¿Cómo era antes?** — Red-tinted glass panel
3. **¿Cómo es ahora?** — Green-tinted glass panel
4. **Impacto** — Data visualization (stat grid or bar chart via inline SVG)

All pre-rendered via `generateStaticParams` from `/content/reformas/*.mdx`.

---

### `/mundo` — Global Reinsertion

- **Davos section:** pull quote + photo
- **Mercosur-UE:** milestone timeline
- **Alianza EEUU:** key highlights
- **International press:** logo strip (SVG logos, grayscale → gold on hover)
- **World map:** Use `react-simple-maps` with a GeoJSON world file. Connection lines from Buenos Aires to Davos, Brussels, Washington DC rendered as `<Line>` elements with CSS `stroke-dasharray` + `stroke-dashoffset` animation (glow effect via SVG `filter: blur`). Coordinates: BA `[-58.4, -34.6]`, Davos `[9.8, 46.8]`, Brussels `[4.3, 50.8]`, Washington `[-77.0, 38.9]`. Map is a static Server Component (no interactivity needed).
- Rendering: SSG

---

### `/futuro` — AI Hub

- Cinematic dark hero with bold vision statement
- 3 pillars of Argentina's AI strategy as glassmorphism cards
- Roadmap timeline
- Rendering: SSG

---

### `/archivo` — Archive

Three tabs: **Discursos** / **Entrevistas** / **Libros**

**Discursos & Entrevistas:** card grid — date, title, duration/source badge. Content from `/content/discursos/*.mdx` and `/content/entrevistas/*.mdx`.

**Libros tab — Milei's 12 published books (Spanish originals):**

Amazon cover URL pattern: `https://m.media-amazon.com/images/I/{id}._AC_SX300_.jpg`

| # | Título | Año | Cover URL |
|---|---|---|---|
| 1 | Capitalismo, socialismo y la trampa neoclásica | 2023 | `https://m.media-amazon.com/images/I/81+L6UZrd+L._AC_SX300_.jpg` |
| 2 | El camino del libertario | 2022 | `https://m.media-amazon.com/images/I/819yHRUhKjL._AC_SX300_.jpg` |
| 3 | El fin de la inflación | 2022 | `https://m.media-amazon.com/images/I/71acWh9bKVL._AC_SX300_.jpg` |
| 4 | La economía en una lección | 2021 | `https://m.media-amazon.com/images/I/715BZ10iz-L._AC_SX300_.jpg` |
| 5 | Desenmascarando la mentira keynesiana | 2021 | `https://m.media-amazon.com/images/I/611R2-0ViCL._AC_SX300_.jpg` |
| 6 | Libertad, libertad, libertad | 2020 | `https://m.media-amazon.com/images/I/81bEVnipzqL._AC_SX300_.jpg` |
| 7 | Pandenomics | 2020 | `https://m.media-amazon.com/images/I/91IE6TOp9+L._AC_SX300_.jpg` |
| 8 | El retorno al sendero de la decadencia argentina | 2020 | `https://m.media-amazon.com/images/I/51AHGxgqk1L._AC_SX300_.jpg` |
| 9 | Relatos de un progre | 2018 | `https://m.media-amazon.com/images/I/81KOH9ehxPL._AC_SX300_.jpg` |
| 10 | Maquinita, Infleta y Devaluta | 2017 | `https://m.media-amazon.com/images/I/71rAdWTGH4L._AC_SX300_.jpg` |
| 11 | Política económica contra reloj | 2015 | `https://m.media-amazon.com/images/I/61Th72vcKrL._AC_SX300_.jpg` |
| 12 | Lecturas de economía en tiempos del kirchnerismo | 2014 | `https://m.media-amazon.com/images/I/911gi22wzZL._AC_SX300_.jpg` |

`libros.json` stores each entry with `title`, `year`, and `coverUrl` (full URL). `next.config.ts` includes `m.media-amazon.com` in `images.remotePatterns`.

Layout: horizontal scroll strip on mobile, 4-column grid on desktop. Each card: `next/image` cover + glassmorphism title overlay on hover + year badge.

Rendering: Cache Components — `cacheLife('days')`

---

## 5. Data Architecture

No database or CMS. All content as local files in the repo.

```
/content
  /reformas/            ← one .mdx per reform
  /discursos/           ← one .mdx per speech
  /entrevistas/         ← one .mdx per interview
  logros.json           ← stats array + timeline items
  mundo.json            ← events, press logo list
  futuro.json           ← AI pillars, roadmap items
  libros.json           ← 12 books: `{ title: string, year: number, coverUrl: string }[]`
```

All data-fetching functions use the `"use cache"` directive with `cacheLife` profiles (Next.js 16 Cache Components). No `export const revalidate` — use `"use cache"` exclusively.

**MDX processing:** Use `next-mdx-remote` with the App Router (`next-mdx-remote/rsc`). Add `remark-gfm` for tables/strikethrough. No `@next/mdx` (limited to static imports) — `next-mdx-remote` supports dynamic loading from the filesystem, required for `generateStaticParams`.

```ts
// lib/data/reformas.ts
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
```

---

## 6. State Management

React 19 built-ins only — no external state library needed:

- `useState`: mobile nav open/close, active tab in `/archivo`
- No `useContext`, no Zustand, no Redux — YAGNI for a prestige informational site
- React Compiler handles all memoization automatically

---

## 7. Performance Targets

| Metric | Target | Implementation |
|---|---|---|
| LCP | < 1.5s | Hero image preloaded (`priority` prop), SSG, Vercel CDN |
| INP | < 100ms | Minimal client JS, React Compiler, Server Components |
| CLS | 0 | All images with explicit dimensions, `next/font` |
| JS Bundle | < 80kb | Server Components for all data, no client libraries |

Additional optimizations:
- `next/image`: lazy load, auto WebP/AVIF conversion, prevents CLS
- `next/font`: self-hosted Playfair Display + Inter, `display: swap`
- No GSAP, no Framer Motion — native CSS + IntersectionObserver only
- Amazon cover images: `images.remotePatterns` in `next.config.ts`

---

## 8. Project Structure

```
/app
  layout.tsx              ← Root layout: fonts, metadata, nav
  page.tsx                ← Home — 7 cinematic panels
  /vision/page.tsx
  /logros/page.tsx
  /reformas/page.tsx
  /reformas/[slug]/page.tsx
  /mundo/page.tsx
  /futuro/page.tsx
  /archivo/page.tsx
  globals.css             ← Tailwind 4 @theme tokens

/components
  /ui                     ← GlassCard, GoldButton, SectionHeading (shared primitives)
  /nav                    ← FloatingNav, MobileNav
  /home                   ← HeroPanel, LogrosPanel, ReformasPanel, etc.
  /reformas               ← ReformaCard, BeforeAfterPanel, ImpactoChart
  /archivo                ← BookShelf, SpeechCard, InterviewCard, ArchiveTabs
  /mundo                  ← WorldMap, PressLogos, MilestoneTimeline
  /logros                 ← AchievementTimeline, StatCounter, CategoryFilter

/content
  /reformas/*.mdx
  /discursos/*.mdx
  /entrevistas/*.mdx
  logros.json
  mundo.json
  futuro.json
  libros.json

/public
  /images                 ← Optimized static assets (hero portrait, etc.)

/lib
  /data                   ← Type-safe data loaders with "use cache"
  /utils                  ← cn(), formatDate(), etc.
  /types                  ← TypeScript interfaces

next.config.ts
proxy.ts                  ← Next.js 16 (replaces middleware.ts)
```

---

## 9. Testing Strategy

- **Vitest** — unit tests for data loaders, utility functions
- **Playwright** — E2E: home scroll panels, reform before/after detail, archivo tabs, mobile nav
- **Coverage target:** 80%+
- **Accessibility:** axe-playwright for WCAG AA compliance

---

## 10. Deployment

- **Platform:** Vercel (MCP connected)
- **Node.js:** 24 (runtime)
- **Build:** `next build` with Turbopack
- **Environment:** No secrets required (all content is local, no external APIs except Amazon image CDN)

---

## Best Practices Summary (from research)

### Next.js 16
- Use `"use cache"` over implicit caching — explicit, opt-in
- `proxy.ts` over `middleware.ts`
- Enable React Compiler — eliminates manual `useMemo`/`useCallback`
- Enable Turbopack file system caching for dev
- Use `updateTag()` in Server Actions for read-your-writes semantics
- Use `revalidateTag(tag, 'max')` for stale-while-revalidate

### React 19
- Server Components first — only `"use client"` when truly needed
- Hybrid rendering: SSG for static, ISR for semi-dynamic, streaming Suspense for dynamic
- State close to components, granular (not one big object)
- React Compiler replaces manual memoization

### Tailwind 4
- CSS-first config (`@theme` in globals.css, no JS config file)
- All design tokens as CSS custom properties
- JIT engine scans all source files — keep `content` paths accurate
- Use `backdrop-blur` utilities for glassmorphism (hardware-accelerated)

### Web Design
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1 (targeting stricter)
- `next/image` for all images — prevents CLS, auto-optimizes
- `next/font` — self-hosted, eliminates FOUT
- Semantic HTML + ARIA roles — accessible to all
- Mobile-first responsive design throughout
