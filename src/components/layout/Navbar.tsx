"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";

type NavItem = {
  label: string;
  sectionId?: string; // para scroll interno (sin #)
  href?: string; // para páginas
};

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", sectionId: "top" },
  { label: "Servicios", sectionId: "servicios" },
  { label: "Testimonios", sectionId: "testimonios" },
  { label: "Contacto", href: "/contact" },
];

const STORAGE_KEY = "gya:scrollTo";

function setScrollTarget(id: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, id);
  } catch {}
}

function consumeScrollTarget(): string | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    if (v) sessionStorage.removeItem(STORAGE_KEY);
    return v;
  } catch {
    return null;
  }
}

function scrollToSection(id: string) {
  const target = id === "top" ? document.body : document.getElementById(id);
  if (!target) return;

  // Con scroll-padding-top en CSS, scrollIntoView funciona bien
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Evita “pegones”: actualiza estado solo cuando cruza umbral y con rAF
  const ticking = useRef(false);
  useEffect(() => {
    const onScroll = () => {  
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const next = y > 10;
        setIsScrolled((prev) => (prev === next ? prev : next));
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cuando estás en Home, si hay target pendiente, scrollea al cargar
  useEffect(() => {
    if (pathname !== "/") return;

    const id = consumeScrollTarget();
    if (!id) return;

    // pequeño delay para asegurar render
    const t = window.setTimeout(() => scrollToSection(id), 50);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const shellClass = useMemo(() => {
    const base =
      "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60";
    const height = isScrolled ? "py-2" : "py-4";
    const border = isScrolled ? "border-black/5" : "border-transparent";
    const shadow = isScrolled ? "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]" : "";
    return `${base} ${height} ${border} ${shadow}`;
  }, [isScrolled]);

  const brandSize = isScrolled ? "h-10 w-10" : "h-12 w-12";
  const brandText = isScrolled ? "text-base md:text-lg" : "text-lg md:text-xl";
  const linkText = isScrolled ? "text-[13px]" : "text-sm";

  const handleNav = (item: NavItem) => {
    setMobileOpen(false);

    // Si es link a página
    if (item.href) {
      router.push(item.href);
      return;
    }

    // Scroll interno sin hash
    const id = item.sectionId ?? "top";
    if (pathname !== "/") {
      setScrollTarget(id);
      router.push("/");
      return;
    }
    scrollToSection(id);
  };

  return (
    <header className={shellClass}>
      {/* línea futurista sutil */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-max flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNav({ label: "Inicio", sectionId: "top" })}
          className="group flex items-center gap-3 text-left"
          aria-label="Ir al inicio"
        >
          <div className={`relative ${brandSize} overflow-hidden rounded-full ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40`}>
            <Image
              src="/images/branding/godinezyasociados-logo.jpg"
              alt="Godínez & Asociados"
              fill
              className="object-cover"
              priority
            />
            {/* brillo */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="leading-tight">
            <div className={`font-extrabold tracking-tight ${brandText}`}>
              <span className="text-primary">Godínez</span>{" "}
              <span className="text-gray-900">&amp; Asociados</span>
            </div>
            <div className="text-xs text-gray-500">
              Contabilidad • Jurídico • Tecnología
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNav(item)}
              className={`group relative rounded-xl px-4 py-2 font-semibold text-gray-700 transition-all ${linkText} hover:text-primary`}
            >
              {/* fondo glass en hover */}
              <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/10 via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* underline animado */}
              <span className="pointer-events-none absolute inset-x-3 -bottom-[2px] h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://maps.app.goo.gl/ZFWFKstm1z6tBsRx7"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-primary/20 hover:text-primary hover:shadow-sm"
          >
            <MapPin className="h-4 w-4" />
            Ubicación
          </a>

          <a
            href="https://wa.me/50622823145"
            target="_blank"
            className="relative inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
          >
            {/* glow */}
            <span className="pointer-events-none absolute -inset-1 rounded-xl bg-primary/25 blur-xl opacity-0 transition-opacity duration-300 hover:opacity-100" />
            <span className="relative">WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-gray-900"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-black/5 bg-white/85 backdrop-blur"
          >
            <div className="container-max py-4 grid gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNav(item)}
                  className="w-full rounded-xl px-4 py-3 text-left font-semibold text-gray-800 hover:bg-primary/10 hover:text-primary transition"
                >
                  {item.label}
                </button>
              ))}

              <div className="mt-2 grid gap-2">
                <a
                  href="https://maps.app.goo.gl/ZFWFKstm1z6tBsRx7"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 font-semibold text-gray-800 hover:text-primary transition"
                >
                  <MapPin className="h-4 w-4" />
                  Ubicación
                </a>

                <a
                  href="https://wa.me/50622823145"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 font-semibold text-white hover:bg-secondary transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
