"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.message || "No se pudo enviar el mensaje. Intente de nuevo.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Error de red. Revise su conexión e intente de nuevo.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Nombre</label>
        <input
          value={form.name}
          onChange={onChange("name")}
          required
          className="mt-2 w-full rounded-xl border px-4 py-3 outline-none ring-primary/20 focus:ring-4"
          placeholder="Su nombre"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Correo</label>
        <input
          type="email"
          value={form.email}
          onChange={onChange("email")}
          required
          className="mt-2 w-full rounded-xl border px-4 py-3 outline-none ring-primary/20 focus:ring-4"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Mensaje</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={onChange("message")}
          required
          className="mt-2 w-full rounded-xl border px-4 py-3 outline-none ring-primary/20 focus:ring-4"
          placeholder="Cuéntenos qué necesita..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-secondary disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-green-700">
          ✅ Mensaje enviado. ¡Gracias! Pronto le contactaremos.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm font-medium text-red-700">⚠️ {errorMsg}</p>
      )}

      <p className="text-xs text-gray-500">
        *En este momento se procesa internamente. Luego lo conectamos a email/CRM.
      </p>
    </form>
  );
}
