"use client";

import { motion } from "framer-motion";
import { Eye, Target, Repeat2 } from "lucide-react";

const pillars = [
  {
    title: "Visión",
    desc: "Ver el panorama completo: negocio, riesgos y oportunidades.",
    Icon: Eye,
  },
  {
    title: "Precisión",
    desc: "Control, criterio y cumplimiento con enfoque profesional.",
    Icon: Target,
  },
  {
    title: "Mejora continua",
    desc: "Evolución constante con procesos, tecnología y automatización.",
    Icon: Repeat2,
  },
];

export default function WhyEagle() {
  return (
    <section className="section-padding relative overflow-hidden bg-gray-50">
      {/* Subtle premium background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(0,0,0,0.06),transparent)]" />
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

      <div className="container-max relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm">
            Nuestra filosofía
          </p>

          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            ¿Por qué el{" "}
            <span className="text-primary">águila</span>?
          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Representa la disciplina de ver más lejos, actuar con precisión y
            mejorar constantemente. Esa es la base de cómo trabajamos:
            cumplimiento impecable, criterio profesional y evolución con
            tecnología.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {pillars.map(({ title, desc, Icon }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{desc}</p>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
