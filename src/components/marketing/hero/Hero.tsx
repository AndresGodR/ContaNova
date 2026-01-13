"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Altura cinematic */}
      <div className="relative h-[92vh] min-h-[720px] w-full">
        {/* Background image (águila) */}
        <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/eaglevideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      
        {/* Eagle motif layers (encima del video/imagen) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Halo */}
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full eagle-halo" />
        {/* Streak diagonal tipo ala */}
        <div className="absolute -right-40 top-16 h-[520px] w-[520px] rotate-12 eagle-streak" />
        {/* Noise (ya tenés utility) */}
        <div className="absolute inset-0 noise-overlay" />
      </div>


  
        {/* 1) Base dark overlay (para contraste sin matar la imagen) */}
        <div className="absolute inset-0 bg-[#071b2d]/55" />

        {/* 2) Cinematic diagonal gradient (más notorio pero elegante) */}
        {/*<div className="absolute inset-0 bg-gradient-to-tr from-[#071b2d]/85 via-[#0b2f52]/35 to-transparent" />*/}

        {/* 3) Vignette (look “film”) */}
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(14,70,140,0.35),rgba(3,14,30,0.85))] opacity-70" />

        {/* 4) Animated premium gradient layer (muy sutil, no tapa el águila) */}
        {/*<div className="absolute inset-0 opacity-55 animate-gradient-diagonal bg-[linear-gradient(135deg,rgba(0,163,255,0.18),rgba(4,25,45,0.0),rgba(0,255,194,0.12))]" />*/}

        {/* 5) Noise overlay (granito elegante) */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        {/* 6) Eagle shimmer (brillo que “respira” siguiendo el águila) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-[-8%] top-[18%] h-[520px] w-[520px] rounded-full eagle-shimmer" />
          <div className="absolute right-[10%] top-[40%] h-[280px] w-[280px] rounded-full eagle-shimmer opacity-40" />
        </div>

        {/* 7) Accents “premium blobs” (corporativo, no exagerado) */}
        <div className="absolute -left-24 top-16 h-[320px] w-[320px] rounded-full bg-primary/25 blur-3xl opacity-40" />
        <div className="absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full bg-secondary/25 blur-3xl opacity-35" />

        {/* Content */}
        <div className="relative z-10 container-max h-full">
          <div className="flex h-full items-center">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur"
              >
                <Sparkles className="h-4 w-4 text-white/90" />
                Confianza • Precisión • Acompañamiento
              </motion.div>

              <Reveal delay={0.05}>
              {/* Title (impacto premium) */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight text-white"
              >
                Soluciones
                <span className="block text-white/95">Empresariales</span>
                <span className="block mt-3 text-xl md:text-2xl font-semibold text-white/85">
                  para familias y PYMES
                </span>
              </motion.h1>
              </Reveal> 


              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/85"
              >
                En Godínez & Asociados integramos contabilidad, derecho y tecnología
                para crear soluciones empresariales modernas, eficientes y
                escalables, acompañando a nuestros clientes en cada etapa de su
                crecimiento en Costa Rica.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="https://wa.me/50622823145"
                  target="_blank"
                  className="group relative inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-semibold text-primary transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <span className="pointer-events-none absolute -inset-2 rounded-2xl bg-white/25 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  Contáctenos por WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>

                <button
                  type="button"
                  onClick={() => scrollToId("servicios")}
                  className="group inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Ver servicios
                  <ArrowRight className="ml-2 h-5 w-5 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </motion.div>

              {/* Trust strip (ultra corporate) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.28 }}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70"
              >
                <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                Estrategia empresarial
              </span>

              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                Transformación digital
              </span>

              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                Crecimiento sostenible
              </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom fade (para transición perfecta al siguiente bloque) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white/10" />
      </div>
    </section>
  );
}
