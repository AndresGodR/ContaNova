"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: d, ease },
  }),
};

export default function EaglePrinciple() {
  return (
    <section id="aguila" className="relative overflow-hidden bg-white">
      {/* Background system (corporate, limpio) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft grid-ish light */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.45)_1px,transparent_0)] [background-size:22px_22px]" />
        {/* Big premium blobs */}
        <div className="absolute -left-56 -top-56 h-[820px] w-[820px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-320px] bottom-[-340px] h-[900px] w-[900px] rounded-full bg-secondary/10 blur-3xl" />
        {/* Divider line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      <div className="container-max relative py-24">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* COPY (menos texto, más impacto) */}
          <div className="lg:col-span-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-140px" }}
              custom={0}
              className="max-w-xl"
            >
              {/* Chip: mismo estilo tipográfico */}
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-gray-600 backdrop-blur">
                <Sparkles className="h-4 w-4 text-primary" />
                PRINCIPIO DEL ÁGUILA
              </div>

              <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.06]">
                Volar alto.
                <span className="block text-primary">Bajar con precisión.</span>
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Elegimos visión, criterio y ejecución impecable. La tecnología
                amplifica el orden; la cercanía sostiene la confianza.
              </p>

              {/* 3 líneas ultra clean */}
              <div className="mt-8 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <b className="text-gray-900">Visión:</b> decisiones con perspectiva.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <b className="text-gray-900">Precisión:</b> control sin fricción.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <b className="text-gray-900">Evolución:</b> mejora continua con propósito.
                  </span>
                </div>
              </div>

              {/* CTA minimal */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Explorar servicios
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-7 py-4 text-base font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:border-primary/20 hover:text-primary hover:shadow-sm"
                >
                  Contáctenos
                </Link>
              </div>
            </motion.div>
          </div>

          {/* VIDEO HERO (más protagonista) */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-140px" }}
              custom={0.08}
              className="relative"
            >
              {/* Frame premium */}
              <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-black shadow-[0_70px_170px_-130px_rgba(0,0,0,0.90)]">
                {/* Video más grande */}
                <div className="relative h-[560px] md:h-[640px] w-full">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/eagledirect.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />

                  {/* Cinematic overlays (no tapan el águila) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#061a2e]/72 via-[#0b2f52]/20 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(20,120,220,0.22),rgba(2,10,20,0.88))] opacity-90" />

                  {/* Marca “ala” (vuelo diagonal sutil) */}
                  <div className="pointer-events-none absolute inset-0">
                    {/* Streak diagonal como “ala” */}
                    <div className="absolute -right-52 -top-40 h-[720px] w-[720px] rotate-12 eagle-streak opacity-55" />
                    {/* Halo que “respira” lento */}
                    <div className="absolute left-1/2 -bottom-72 h-[780px] w-[780px] -translate-x-1/2 rounded-full eagle-halo opacity-35" />
                    {/* Noise elegante */}
                    <div className="absolute inset-0 noise-overlay opacity-20" />
                  </div>

                  {/* Caption ultra premium, mínimo */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.22em] text-white/85 backdrop-blur">
                        ESTÁNDAR GYA
                      </div>
                      <p className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                        Altura en criterio. Precisión en ejecución.
                      </p>
                      <p className="mt-2 text-sm md:text-base text-white/80">
                        Un estilo de trabajo moderno, confiable y medible.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Premium top line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              </div>

              {/* Subline externa */}
              <div className="pointer-events-none absolute -bottom-7 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
