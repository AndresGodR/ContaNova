"use client";
import { motion } from "framer-motion";

import {
  Briefcase,
  Scale,
  FileText,
  Users,
} from "lucide-react";

/* 👇 Variantes de animación */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any, // ← easing profesional
    },
  },
};

const services = [
  {
    title: "Servicios Contables",
    description:
      "Contabilidad general, estados financieros, declaraciones tributarias y cumplimiento fiscal.",
    icon: Briefcase,
  },
  {
    title: "Asesoría Jurídica",
    description:
      "Apoyo legal integral en materia civil, mercantil y laboral.",
    icon: Scale,
  },
  {
    title: "Constitución de Empresas",
    description:
      "Creamos y formalizamos su empresa cumpliendo la normativa costarricense.",
    icon: FileText,
  },
  {
    title: "Asesoría para Familias y PYMES",
    description:
      "Acompañamiento cercano para decisiones financieras y legales seguras.",
    icon: Users,
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Soluciones contables y jurídicas diseñadas para brindarle
            tranquilidad, respaldo y crecimiento.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                className="group relative rounded-2xl border bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Accent border */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

