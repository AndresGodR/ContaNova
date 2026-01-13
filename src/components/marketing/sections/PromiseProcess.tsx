"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, FileBarChart2, Workflow, Rocket } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Diagnóstico claro",
    desc: "Entendemos su caso y prioridades. Sin vueltas.",
    Icon: ClipboardCheck,
  },
  {
    title: "Ejecución + control",
    desc: "Procesos estandarizados, cumplimiento y trazabilidad.",
    Icon: Workflow,
  },
  {
    title: "Reportes útiles",
    desc: "Información que sirve para decidir, no solo para archivar.",
    Icon: FileBarChart2,
  },
  {
    title: "Mejora continua",
    desc: "Optimización constante con tecnología y automatización.",
    Icon: Rocket,
  },
];

export default function PromiseProcess() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      {/* Premium background accents */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container-max">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: promise */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm">
                Nuestra promesa
              </p>

              <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Una firma con ADN{" "}
                <span className="text-primary">contable</span>,{" "}
                <span className="text-primary">jurídico</span> y{" "}
                <span className="text-primary">tecnológico</span>
              </h2>

              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Diseñamos un acompañamiento completo: cumplimiento y control,
                pero también modernización para que su operación sea más simple,
                ordenada y escalable.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-secondary hover:shadow-lg"
                >
                  Ver servicios
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-7 py-4 text-base font-semibold text-gray-900 transition hover:border-primary/25 hover:text-primary"
                >
                  Contáctenos
                </Link>
              </div>

              <div className="mt-8 rounded-2xl border border-black/5 bg-gray-50 p-5">
                <p className="text-sm font-semibold text-gray-900">
                  Enfoque actual
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Hoy resolvemos necesidades contables y legales. Mañana
                  integramos automatización, reportes y módulos internos para
                  profesionalizar aún más el servicio.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: process cards */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {steps.map(({ title, desc, Icon }) => (
                <motion.div
                  key={title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{desc}</p>

                  {/* subtle glow */}
                  <div className="pointer-events-none absolute -bottom-14 -right-14 h-44 w-44 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
