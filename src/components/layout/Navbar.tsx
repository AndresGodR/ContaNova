"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";

type NavItem = { label: string; sectionId?: string; href?: string };

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

/** Scroll suave sin # en URL */
function scrollToSection(id: string) {
  // "top" lo tratamos como inicio real
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ C) Scroll progress bar (suave, sin jank)
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.2,
  });

  // ✅ A) Active state con IntersectionObserver (solo en "/")
  const [activeId, setActiveId] = useState<string>("top");

  const sectionIds = useMemo(
    () => NAV_ITEMS.filter((x) => x.sectionId).map((x) => x.sectionId!) as string[],
    []
  );

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId("");
      return;
    }

    const els = sectionIds
      .map((id) => (id === "top" ? null : document.getElementById(id)))
      .filter(Boolean) as HTMLElement[];

    // Si no existen aún (render lento), reintenta en 1 frame
    if (!els.length) {
      requestAnimationFrame(() => setActiveId("top"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        // Elegimos el que esté más visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
        else if (window.scrollY < 80) setActiveId("top");
      },
      {
        // Ajusta el “punto” en el que consideras activa una sección
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35, 0.5],
      }
    );

    els.forEach((el) => obs.observe(el));

    // fallback “top” cuando estás arriba
    const onScroll = () => {
      if (window.scrollY < 80) setActiveId("top");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, sectionIds]);

  // Scroll state (rAF) -> navbar compacto al bajar
  const ticking = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const next = y > 12;
        setIsScrolled((prev) => (prev === next ? prev : next));
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // consume scroll target cuando estás en /
  useEffect(() => {
    if (pathname !== "/") return;
    const id = consumeScrollTarget();
    if (!id) return;
    const t = window.setTimeout(() => scrollToSection(id), 60);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const handleNav = (item: NavItem) => {
    setMobileOpen(false);

    if (item.href) {
      router.push(item.href);
      return;
    }

    const id = item.sectionId ?? "top";
    if (pathname !== "/") {
      setScrollTarget(id);
      router.push("/");
      return;
    }
    scrollToSection(id);
  };

  const desktopLink = isScrolled ? "text-[15px]" : "text-[16px]";
  const brandText = isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl";

  // helper: activo solo si estás en "/" y el item tiene sectionId
  const isActive = (item: NavItem) =>
    pathname === "/" && item.sectionId && (item.sectionId === activeId || (activeId === "top" && item.sectionId === "top"));

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "h-20", // altura fija (sin reflow)
        "border-b backdrop-blur supports-[backdrop-filter]:bg-white/70",
        isScrolled
          ? "border-black/5 shadow-[0_14px_35px_-28px_rgba(0,0,0,0.55)]"
          : "border-transparent",
      ].join(" ")}
      style={{
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {/* ✅ C) Progress bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-black/5">
        <motion.div
          style={{ scaleX: progress, transformOrigin: "0% 50%" }}
          className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
        />
      </div>

      {/* línea premium sutil */}
      <div className="pointer-events-none absolute inset-x-0 top-[2px] h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

      <div className="container-max h-full flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNav({ label: "Inicio", sectionId: "top" })}
          className="group flex items-center gap-3 text-left"
          aria-label="Ir al inicio"
        >
          <div
            className={[
              "relative overflow-hidden rounded-full ring-2 ring-primary/20 transition-all duration-300",
              isScrolled ? "h-11 w-11" : "h-14 w-14", // ✅ h-14 existe -> no desaparece
              "group-hover:ring-primary/50",
            ].join(" ")}
          >
            <Image
              src="/images/branding/godinezyasociados-logo.jpg"
              alt="Godínez & Asociados"
              fill
              className="object-cover"
              priority
            />
            {/* brillo premium */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {/* glow sutil */}
            <div className="pointer-events-none absolute -inset-3 rounded-full bg-primary/15 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item)}
                className={[
                  "group relative rounded-2xl px-4 py-2 font-semibold",
                  desktopLink,
                  "transition-all",
                  active ? "text-primary" : "text-gray-700 hover:text-primary",
                ].join(" ")}
              >
                {/* ✅ B) glass hover */}
                <span
                  className={[
                    "pointer-events-none absolute inset-0 rounded-2xl",
                    "bg-gradient-to-tr from-primary/14 via-white/10 to-transparent",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-300",
                  ].join(" ")}
                />

                {/* ✅ B) borde animado “futurista” */}
                <span
                  className={[
                    "pointer-events-none absolute inset-0 rounded-2xl",
                    "ring-1 ring-inset",
                    active ? "ring-primary/25" : "ring-black/5 group-hover:ring-primary/20",
                    "transition duration-300",
                  ].join(" ")}
                />

                {/* underline neon */}
                <span
                  className={[
                    "pointer-events-none absolute inset-x-3 -bottom-[2px] h-[2px] origin-left rounded-full",
                    "bg-gradient-to-r from-primary via-secondary to-primary",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    "transition-transform duration-300",
                  ].join(" ")}
                />

                {/* glow activo */}
                <span
                  className={[
                    "pointer-events-none absolute -inset-2 rounded-2xl blur-xl",
                    "bg-gradient-to-r from-primary/25 via-secondary/15 to-primary/25",
                    active ? "opacity-55" : "opacity-0 group-hover:opacity-35",
                    "transition-opacity duration-300",
                  ].join(" ")}
                />

                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://maps.app.goo.gl/ZFWFKstm1z6tBsRx7"
            target="_blank"
            className="group inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-4 py-2 text-[15px] font-semibold text-gray-800 transition hover:border-primary/20 hover:text-primary hover:shadow-sm"
          >
            <MapPin className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[1px]" />
            Ubicación
          </a>

          <a
            href="https://wa.me/50622823145"
            target="_blank"
            className="relative inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 text-[15px] font-semibold text-white transition hover:bg-secondary"
          >
            <span className="pointer-events-none absolute -inset-2 rounded-2xl bg-primary/25 blur-xl opacity-0 transition-opacity duration-300 hover:opacity-100" />
            <span className="relative">WhatsApp</span>
          </a>
        </div>

        {/* Mobile */}
        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white/70 text-gray-900"
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
                  className="w-full rounded-2xl px-4 py-3 text-left text-[16px] font-semibold text-gray-800 hover:bg-primary/10 hover:text-primary transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
