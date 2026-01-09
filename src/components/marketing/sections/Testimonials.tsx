"use client";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any, // ← easing profesional
    },
  },
};

const testimonials = [
  {
    name: "María Fernanda R.",
    role: "Emprendedora",
    content:
      "Desde el primer día sentí confianza. Me acompañaron en todo el proceso contable y legal de mi negocio.",
  },
  {
    name: "Carlos M.",
    role: "PYME – Sector Servicios",
    content:
      "Un equipo profesional, cercano y claro. Siempre dispuestos a explicar y acompañar.",
  },
  {
    name: "Ana Lucía G.",
    role: "Cliente Familiar",
    content:
      "Nos ayudaron a ordenar nuestras finanzas y resolver temas legales con total transparencia.",
  },
];
export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            La confianza se construye con resultados y relaciones duraderas.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group rounded-2xl border bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Quote */}
              <p className="text-gray-700 leading-relaxed italic">
                “{t.content}”
              </p>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-gray-200" />

              {/* Author */}
              <div>
                <p className="font-semibold text-primary">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
