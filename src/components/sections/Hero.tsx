import Image from "next/image";

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center">
        {/* Background image */}
        <Image
          src="/images/branding/eagle-banner2.webp"
          alt="Godínez y Asociados"
          fill
          priority
          className="object-cover"
        />

       {/* Overlay degradado dinámico */}
        <div className="absolute inset-0 bg-gradient-to-tl 
        from-primary/90 
        via-secondary/75 
        via-primary/60 
        to-transparent 
        animate-gradient-diagonal" />


        {/* Content */}
        <div className="relative container-max text-white">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
              Servicios Contables
              <span className="block text-light">
                y Jurídicos
              </span>
            </h1>

            <p className="mt-4 text-xl md:text-2xl font-medium text-light">
              para familias y PYMES
            </p>

            <p className="mt-6 max-w-2xl text-lg text-white/90">
              En Godínez y Asociados brindamos asesoría contable y jurídica
              personalizada, con enfoque familiar, confianza y acompañamiento
              profesional en Costa Rica.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/50622823145"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 text-primary text-lg font-semibold transition hover:bg-light"
              >
                Contáctenos por WhatsApp
              </a>

              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-md border border-white px-8 py-4 text-lg font-semibold transition hover:bg-secondary"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
