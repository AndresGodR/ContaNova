"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const bullets = [
  "Un diagnóstico claro antes de ejecutar (sin sorpresas).",
  "Procesos estandarizados + criterio profesional (calidad consistente).",
  "Acompañamiento cercano con visión de negocio (familia y PYME).",
  "Tecnología aplicada para ahorrar tiempo y reducir errores.",
];

export default function Promise() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* ✅ TOP FADE: evita el “corte” visual con el TrustBar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#eef3f8] via-white/70 to-white" />

      {/* fondo sutil premium */}
      <div className="pointer-events-none absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="container-max section-padding relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold tracking-[0.22em] text-gray-500"
            >
              NUESTRA FORMA DE TRABAJAR
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900"
            >
              Precisión y estrategia para que su empresa avance con seguridad
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600"
            >
              Combinamos experiencia contable y legal con herramientas digitales
              para entregar claridad, control y eficiencia. En cada paso, usted
              sabe qué se hace, por qué se hace y qué impacto tiene.
            </motion.p>

            <div className="mt-7 grid gap-3">
              {bullets.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.06 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <p className="text-gray-700">{b}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/services"
                className="group inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg"
              >
                Ver áreas de servicio
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>

              <a
                href="https://wa.me/50622823145"
                target="_blank"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-7 py-4 text-base font-semibold text-gray-900 transition hover:border-primary/20 hover:text-primary hover:-translate-y-0.5 hover:shadow-sm"
              >
                Hablar con un asesor
              </a>
            </motion.div>
          </div>

          {/* Video card (placeholder listo) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* marco premium */}
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-primary/25 via-sky-400/15 to-secondary/25" />
            <div className="relative overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_50px_130px_-90px_rgba(0,0,0,0.75)]">
              {/* header mini */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-white/70">
                <p className="text-sm font-semibold text-gray-900">
                  Cómo se vive la experiencia
                </p>
                <span className="text-xs font-semibold text-gray-500">
                  10–18s • Loop
                </span>
              </div>

              {/* ✅ Reemplazá src por tu video cuando lo tengas */}
              <div className="relative aspect-[16/10] w-full bg-gray-100">
                <video
                  className="h-full w-full object-cover"
                  src="/videos/promise.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                {/* overlay para look corporativo */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#071b2d]/25 via-transparent to-white/10" />
              </div>

              <div className="px-6 py-5">
                <p className="text-sm text-gray-600">
                  Un vistazo rápido a nuestro estilo de trabajo: orden, claridad y
                  enfoque en resultados.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
