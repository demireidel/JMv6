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
