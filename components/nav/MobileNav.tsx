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
