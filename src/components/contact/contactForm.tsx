"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Topic =
  | "Servicios contables"
  | "Asesoría jurídica"
  | "Constitución de empresa"
  | "Familias y PYMES"
  | "Otro";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: Topic;
  message: string;
  consent: boolean;

  // honeypot anti-bots (NO mostrar)
  company: string;
};

type ApiResponse =
  | { ok: true }
  | { ok: false; message: string; field?: keyof Omit<FormState, "company"> };

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "Servicios contables",
  message: "",
  consent: true,
  company: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldError, setFieldError] = useState<string>("");

  const messageLen = form.message.trim().length;

  const canSubmit = useMemo(() => {
    const nameOk = form.name.trim().length >= 2;
    const emailOk = isEmail(form.email.trim());
    const msgOk = messageLen >= 10 && messageLen <= 1200;
    const consentOk = form.consent === true;
    return nameOk && emailOk && msgOk && consentOk && status !== "loading";
  }, [form.name, form.email, messageLen, form.consent, status]);

  const setValue =
    <K extends keyof FormState>(key: K) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const value =
        key === "consent"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setForm((prev) => ({ ...prev, [key]: value as FormState[K] }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldError("");

    // Validación rápida client-side (igual se valida en server)
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) {
      setStatus("error");
      setFieldError("Revise el campo: Nombre");
      setErrorMsg("Por favor ingrese su nombre.");
      return;
    }
    if (!isEmail(email)) {
      setStatus("error");
      setFieldError("Revise el campo: Correo");
      setErrorMsg("Ingrese un correo válido.");
      return;
    }
    if (message.length < 10) {
      setStatus("error");
      setFieldError("Revise el campo: Mensaje");
      setErrorMsg("El mensaje es muy corto.");
      return;
    }
    if (!form.consent) {
      setStatus("error");
      setFieldError("Revise el consentimiento");
      setErrorMsg("Debe aceptar el consentimiento para enviar el mensaje.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      let data: ApiResponse | null = null;
      try {
        data = text ? (JSON.parse(text) as ApiResponse) : null;
      } catch {
        data = null;
      }

      if (!res.ok || !data || data.ok === false) {
        setStatus("error");
        setErrorMsg(
          (data && "message" in data && data.message) ||
            `Error (${res.status}). Intente de nuevo.`
        );
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
      setErrorMsg("Error de red. Revise su conexión e intente de nuevo.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-5">
      {/* Honeypot anti-bots (oculto) */}
      <div className="hidden">
        <label>Company</label>
        <input value={form.company} onChange={setValue("company")} />
      </div>

      {/* Nombre + Correo */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700">Nombre</label>
          <input
            value={form.name}
            onChange={setValue("name")}
            required
            autoComplete="name"
            className="mt-2 w-full rounded-xl border px-4 py-3 outline-none ring-primary/20 focus:ring-4"
            placeholder="Su nombre"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Correo</label>
          <input
            type="email"
            value={form.email}
            onChange={setValue("email")}
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border px-4 py-3 outline-none ring-primary/20 focus:ring-4"
            placeholder="correo@ejemplo.com"
          />
        </div>
      </div>

      {/* Teléfono + Tema */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Teléfono <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            value={form.phone}
            onChange={setValue("phone")}
            autoComplete="tel"
            className="mt-2 w-full rounded-xl border px-4 py-3 outline-none ring-primary/20 focus:ring-4"
            placeholder="Ej: 8888 8888"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Tipo de consulta
          </label>
          <select
            value={form.topic}
            onChange={setValue("topic")}
            className="mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none ring-primary/20 focus:ring-4"
          >
            <option>Servicios contables</option>
            <option>Asesoría jurídica</option>
            <option>Constitución de empresa</option>
            <option>Familias y PYMES</option>
            <option>Otro</option>
          </select>
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <div className="flex items-end justify-between gap-3">
          <label className="text-sm font-medium text-gray-700">Mensaje</label>
          <span className="text-xs text-gray-500">{messageLen}/1200</span>
        </div>

        <textarea
          rows={6}
          value={form.message}
          onChange={setValue("message")}
          required
          className="mt-2 w-full rounded-xl border px-4 py-3 outline-none ring-primary/20 focus:ring-4"
          placeholder="Cuéntenos qué necesita..."
        />
        <p className="mt-2 text-xs text-gray-500">
          Recomendado: incluya el servicio, urgencia y cualquier detalle relevante.
        </p>
      </div>

      {/* Consentimiento */}
      <label className="flex items-start gap-3 rounded-xl border bg-gray-50 p-4">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={setValue("consent")}
          className="mt-1 h-4 w-4 accent-[color:var(--color-primary)]"
        />
        <span className="text-sm text-gray-700">
          Acepto que mis datos sean usados únicamente para responder esta solicitud.
        </span>
      </label>

      {/* Botón */}
      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileTap={{ scale: 0.98 }}
        className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </motion.button>

      {/* Mensajes */}
      {status === "success" && (
        <p className="text-sm font-medium text-green-700">
          ✅ Mensaje enviado. ¡Gracias! Pronto le contactaremos.
        </p>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">⚠️ No se pudo enviar</p>
          {fieldError && <p className="mt-1 text-red-700">{fieldError}</p>}
          <p className="mt-2">{errorMsg}</p>
        </div>
      )}
    </form>
  );
}