"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink =
    "text-base font-semibold text-gray-800 transition-colors hover:text-primary";

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="border-b bg-primary text-white">
        <div className="container-max flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 opacity-95">
              <MapPin className="h-4 w-4" />
              San José, Costa Rica
            </span>

            <a
              href="tel:+50622823145"
              className="inline-flex items-center gap-2 opacity-95 hover:opacity-100"
            >
              <Phone className="h-4 w-4" />
              2282 3145
            </a>
          </div>

          <a
            href="mailto:godinezdh@gmail.com"
            className="opacity-95 hover:opacity-100"
          >
            godinezdh@gmail.com
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={[
          "border-b bg-white/80 backdrop-blur",
          "transition-all duration-300",
          scrolled ? "py-2 shadow-sm" : "py-4",
        ].join(" ")}
      >
        <div className="container-max flex items-center justify-between">
          {/* Brand */}
          <Link href="/#top" className="flex items-center gap-3">
            <div
              className={[
                "relative overflow-hidden rounded-full ring-2 ring-primary/15",
                "transition-all duration-300",
                scrolled ? "h-10 w-10" : "h-12 w-12",
              ].join(" ")}
            >
              <Image
                src="/images/branding/godinezyasociados-logo.jpg"
                alt="Godínez & Asociados"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="leading-tight">
              <span
                className={[
                  "block font-extrabold text-primary",
                  "transition-all duration-300",
                  scrolled ? "text-lg" : "text-xl",
                ].join(" ")}
              >
                Godínez & Asociados
              </span>
              <span className="hidden sm:block text-sm text-gray-500">
                Contable • Jurídico • Familiar
              </span>
            </div>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#top" className={navLink}>
              Inicio
            </Link>
            <Link href="/#servicios" className={navLink}>
              Servicios
            </Link>
            <Link href="/#testimonios" className={navLink}>
              Testimonios
            </Link>
            <Link href="/contacto" className={navLink}>
              Contacto
            </Link>
          </nav>

          {/* CTA */}
          <a
            href="https://wa.me/50622823145"
            target="_blank"
            className={[
              "rounded-xl bg-primary px-5 py-3 text-base font-semibold text-white",
              "transition hover:bg-secondary",
            ].join(" ")}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
