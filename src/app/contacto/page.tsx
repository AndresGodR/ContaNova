import Image from "next/image";
import ContactForm from "@/components/contact/contactForm";

export const metadata = {
  title: "Contacto | Godínez & Asociados",
  description:
    "Contáctenos para asesoría contable y jurídica en Costa Rica. Atención por WhatsApp, teléfono y correo.",
};

export default function ContactPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/branding/acuerdo.jpg"
            alt="Contacto - Godínez y Asociados"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-primary/35 to-black/25" />
        </div>

        <div className="relative container-max section-padding text-white">
          <h1 className="max-w-3xl text-4xl md:text-6xl font-extrabold leading-tight">
            Contáctenos
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Con gusto le orientamos. Escríbanos por WhatsApp o envíenos un
            mensaje y le respondemos lo antes posible.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/50622823145"
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary transition hover:bg-gray-100"
            >
              WhatsApp
            </a>

            <a
              href="#form"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-8 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              Enviar mensaje
            </a>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section id="form" className="section-padding bg-white">
        <div className="container-max grid gap-10 lg:grid-cols-2">
          {/* Formulario con lógica real */}
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-primary">Envíenos un mensaje</h2>
            <p className="mt-3 text-gray-600">
              Este formulario ya envía la información a una ruta interna (API).
              Luego lo conectamos a email o WhatsApp sin romper el diseño.
            </p>

            <ContactForm />
          </div>

          {/* Datos + mapa */}
          <div className="space-y-6">
            <div className="rounded-3xl border bg-gray-50 p-8">
              <h3 className="text-xl font-bold text-gray-900">
                Información de contacto
              </h3>

              <div className="mt-6 space-y-3 text-gray-700">
                <p>
                  <span className="font-semibold text-primary">Ubicación:</span>{" "}
                  San José, Costa Rica
                </p>
                <p>
                  <span className="font-semibold text-primary">Teléfono:</span>{" "}
                  2282 3145
                </p>
                <p>
                  <span className="font-semibold text-primary">Correo:</span>{" "}
                  godinezdh@gmail.com
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/50622823145"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-primary transition hover:bg-gray-100"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:godinezdh@gmail.com"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-800 transition hover:bg-white"
                >
                  Enviar correo
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white">
              <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">Ubicación</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Podemos cambiar este mapa al enlace exacto de Google Business cuando lo tengas.
                </p>
              </div>

              <div className="aspect-[16/10] w-full bg-gray-100">
                <iframe
                  title="Mapa"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=San%20Jos%C3%A9%2C%20Costa%20Rica&output=embed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
