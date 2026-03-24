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

export function FloatingNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        "bg-canvas/70 backdrop-blur-2xl backdrop-saturate-150",
        "border border-white/[0.04]",
        "rounded-full px-8 py-3",
        "flex items-center gap-8",
        "shadow-[0_4px_30px_-4px_rgba(0,0,0,0.5)]"
      )}
    >
      {/* Logo mark */}
      <Link href="/" className="font-display text-gold text-base font-semibold tracking-[0.15em] uppercase hover:text-gold-bright transition-colors duration-300">
        JM
      </Link>

      {/* Thin separator */}
      <div className="hidden md:block w-px h-4 bg-white/[0.06]" />

      <ul className="hidden md:flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="relative text-muted text-xs font-sans font-medium uppercase tracking-[0.12em] hover:text-gold transition-colors duration-300"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
