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
    desc: "Procesos + plantillas para consistencia.",
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
    <section className="relative -mt-10">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/75 p-6 shadow-[0_30px_80px_-55px_rgba(0,0,0,0.55)] backdrop-blur"
        >
          {/* Accent line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/55 to-transparent" />

          {/* Subtle glow blobs */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ title, desc, Icon }) => (
              <div
                key={title}
                className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white/60 p-5 transition hover:bg-white hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-bold text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
