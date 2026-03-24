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
      {/* Hamburger */}
      <button
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden fixed top-5 right-5 z-[60] p-3 rounded-full bg-canvas/80 backdrop-blur-xl border border-white/[0.06] shadow-lg"
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span className={cn("block w-full h-px bg-gold transition-all duration-300 origin-center", open && "rotate-45 translate-y-[7px]")} />
          <span className={cn("block w-full h-px bg-gold transition-all duration-300", open && "opacity-0 scale-x-0")} />
          <span className={cn("block w-full h-px bg-gold transition-all duration-300 origin-center", open && "-rotate-45 -translate-y-[7px]")} />
        </div>
      </button>

      {/* Fullscreen drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-canvas/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          style={{ animation: "fadeIn 0.3s ease both" }}
        >
          {/* Decorative vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/[0.06]" aria-hidden="true" />

          <nav>
            <ul className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <li
                  key={item.href}
                  style={{
                    animation: `fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.06}s both`,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl md:text-5xl font-light text-text/80 hover:text-gold transition-colors duration-300 tracking-tight"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom ornament */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            style={{ animation: `fadeIn 0.6s ease 0.8s both` }}
            aria-hidden="true"
          >
            <span className="font-display text-gold/20 text-sm tracking-[0.3em] uppercase">JM</span>
          </div>
        </div>
      )}
    </>
  );
}
