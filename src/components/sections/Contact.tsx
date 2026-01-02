"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/branding/acuerdo.jpg"
          alt="Godínez y Asociados"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay con degradado */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/80 to-secondary/70" />
      </div>

      <div className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative rounded-3xl border border-white/10 bg-white/5 px-8 py-16 text-center text-white backdrop-blur-md md:px-16"
          >
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Acompañamiento profesional  
              que le da tranquilidad
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
              En Godínez & Asociados combinamos experiencia contable y respaldo
              legal para que usted pueda enfocarse en lo que realmente importa.
            </p>

            {/* Actions */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl"
              >
                Contáctenos
              </Link>

              {/* Secondary CTA */}
              <Link
                href="#servicios"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                Ver servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
