"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Sparkles, Handshake } from "lucide-react";

const items = [
  {
    title: "Confidencialidad",
    desc: "Información protegida y manejo responsable.",
    Icon: ShieldCheck,
  },
  {
    title: "Respuesta ágil",
    desc: "Atención clara y seguimiento constante.",
    Icon: Clock,
  },
  {
    title: "Estandarización",
    desc: "Procesos y plantillas para consistencia y control.",
    Icon: Sparkles,
  },
  {
    title: "Acompañamiento real",
    desc: "Cercanía, criterio y decisiones informadas.",
    Icon: Handshake,
  },
];

export default function TrustBar() {
  return (
    <section className="relative -mt-14 sm:-mt-16">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Marco premium (borde gradiente + glow suave) */}
          <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-primary/20 via-sky-400/15 to-secondary/20 blur-[0.5px]" />
          <div className="absolute -inset-3 rounded-[34px] bg-primary/10 blur-2xl opacity-35" />

          {/* Card principal */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/75 backdrop-blur-xl shadow-[0_40px_120px_-70px_rgba(0,0,0,0.65)]">
            {/* Línea superior elegante */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/55 to-transparent" />

            {/* Sheen (movimiento diagonal ultra sutil) */}
            <div className="pointer-events-none absolute -left-40 top-0 h-full w-[420px] rotate-12 opacity-30">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/55 to-transparent blur-md animate-[trustSheen_7s_ease-in-out_infinite]" />
            </div>

            {/* Blobs corporativos suaves */}
            <div className="pointer-events-none absolute -left-28 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-28 -bottom-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="px-6 py-7 sm:px-8 sm:py-9">
              {/* Header pequeño */}
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-gray-500">
                    NUESTRA PROMESA
                  </p>
                  <h3 className="mt-2 text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
                    Confianza corporativa, trato humano
                  </h3>
                </div>

                <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-700">
                  <span className="text-primary">Godínez</span> &amp; Asociados
                </div>
              </div>

              {/* Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map(({ title, desc, Icon }, idx) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{
                      duration: 0.55,
                      delay: 0.06 * idx,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white/65 p-5 transition hover:bg-white hover:shadow-[0_20px_55px_-40px_rgba(0,0,0,0.55)]"
                  >
                    {/* Hover border “premium” */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-primary/20" />

                    <div className="flex items-start gap-4">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-5 w-5" />
                        {/* glow */}
                        <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-primary/25 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>

                      <div>
                        <p className="text-[15px] font-extrabold text-gray-900">
                          {title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* keyframes inline (sin tocar globals.css) */}
      <style jsx global>{`
        @keyframes trustSheen {
          0% {
            transform: translateX(-30%);
            opacity: 0.15;
          }
          50% {
            transform: translateX(55%);
            opacity: 0.35;
          }
          100% {
            transform: translateX(120%);
            opacity: 0.15;
          }
        }
      `}</style>
    </section>
  );
}
