"use client";

import { motion, cubicBezier } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Radar } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: d, ease: cubicBezier(0.16, 1, 0.3, 1) },
  }),
};

export default function PromiseSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Separación elegante (evita “corte” visual) */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-gradient-to-b from-white/0 via-white to-white" />

      <div className="container-max py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Copy (poco texto, alto impacto) */}
          <div className="lg:col-span-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-gray-600 backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              CÓMO TRABAJAMOS
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              custom={0.06}
              className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900"
            >
              Claridad, control y progreso.
              <span className="block text-primary">En cada entrega.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              custom={0.12}
              className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600"
            >
              Un enfoque profesional, humano y moderno: estandarizamos lo importante
              y personalizamos lo que realmente mueve su negocio.
            </motion.p>

            {/* Mini bullets premium */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              custom={0.18}
              className="mt-8 grid gap-3"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-gray-900">
                  Cumplimiento y respaldo real
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-sm">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-gray-900">
                  Estandarización sin rigidez
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-sm">
                <Radar className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-gray-900">
                  Visibilidad y seguimiento
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              custom={0.24}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg"
              >
                Contáctenos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>

              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-7 py-4 text-base font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                Ver servicios
              </a>
            </motion.div>
          </div>

          {/* Right: Cinematic video panel */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_35px_90px_-65px_rgba(0,0,0,0.65)]"
            >
              {/* Video */}
              <div className="relative aspect-[16/10] w-full">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/gyaideas.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />

                {/* Overlay “corporate cinematic” */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#071b2d]/78 via-[#0b2f52]/26 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),rgba(3,14,30,0.88))] opacity-70" />
                <div className="absolute inset-0 noise-overlay opacity-25" />

                {/* “Vuelo” suave: streak diagonal (no cuadrado) */}
                <div className="pointer-events-none absolute -right-40 -top-24 h-[520px] w-[520px] rotate-12 eagle-streak opacity-45" />
                <div className="pointer-events-none absolute left-1/2 -bottom-56 h-[620px] w-[620px] -translate-x-1/2 rounded-full eagle-halo opacity-35" />

                {/* Caption minimal premium */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.22em] text-white/85 backdrop-blur">
                      EXPERIENCIA GYA
                    </div>

                    <h3 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                      Un sistema de trabajo que se siente “en control”.
                    </h3>

                    <p className="mt-2 text-sm md:text-base text-white/80">
                      Orden visual, estándares claros y avance medible — sin fricción para usted.
                    </p>
                  </div>
                </div>
              </div>

              {/* Borde superior premium */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
