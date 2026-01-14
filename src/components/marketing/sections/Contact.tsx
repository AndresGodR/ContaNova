"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo principal */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/branding/acuerdo.jpg"
          alt="Godínez & Asociados"
          fill
          className="object-cover"
          priority
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#061a2e]/85 via-[#0b2f52]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(20,120,220,0.30),rgba(2,10,20,0.88))]" />
        <div className="absolute inset-0 noise-overlay opacity-25" />
      </div>

      <div className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 px-10 py-20 text-center text-white shadow-[0_80px_200px_-140px_rgba(0,0,0,0.9)] backdrop-blur-md md:px-20"
          >
            {/* Marca sutil superior */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-white/85 backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              EMPIEZA HOY
            </div>

            {/* Headline principal */}
            <h2 className="mt-7 text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Acompañamiento profesional
              <span className="block text-white/90">para crecer con seguridad</span>
            </h2>

            {/* Subtexto */}
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-white/85">
              Integramos contabilidad, derecho y tecnología para que usted tome
              decisiones con claridad, control y confianza.
            </p>

            {/* Acciones */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* CTA principal */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center rounded-2xl bg-white px-9 py-4 text-base font-semibold text-primary transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="absolute -inset-2 rounded-2xl bg-white/30 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2">
                  Contáctenos
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>

              {/* CTA secundario */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-9 py-4 text-base font-medium text-white transition hover:bg-white/10 hover:-translate-y-0.5"
              >
                Explorar servicios
              </Link>
            </div>

            {/* Eagle accents */}
            <div className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute right-[-260px] bottom-[-300px] h-[700px] w-[700px] rounded-full bg-secondary/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
