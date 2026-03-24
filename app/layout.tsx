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
