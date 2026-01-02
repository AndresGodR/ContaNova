import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  consent?: boolean;

  // honeypot anti-bots
  company?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalize(str: string | undefined) {
  return (str ?? "").toString().trim();
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Rate limit MUY simple (memoria).
 * En serverless puede reiniciarse, pero ayuda contra spam básico.
 */
const RATE_WINDOW_MS = 60_000; // 1 min
const RATE_MAX = 5; // 5 requests/min por IP
const hits = new Map<string, { count: number; ts: number }>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry) {
    hits.set(ip, { count: 1, ts: now });
    return { ok: true };
  }

  if (now - entry.ts > RATE_WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return { ok: true };
  }

  if (entry.count >= RATE_MAX) {
    return { ok: false };
  }

  entry.count += 1;
  hits.set(ip, entry);
  return { ok: true };
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, message: "Demasiadas solicitudes. Intente de nuevo en 1 minuto." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as ContactPayload;

    // Honeypot anti-bots: si viene lleno, "OK silencioso"
    if (normalize(body.company).length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = normalize(body.name);
    const email = normalize(body.email);
    const phone = normalize(body.phone);
    const topic = normalize(body.topic) || "Consulta";
    const message = normalize(body.message);
    const consent = Boolean(body.consent);

    if (!consent) {
      return NextResponse.json(
        { ok: false, message: "Debe aceptar el consentimiento para enviar el mensaje." },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { ok: false, message: "Ingrese un nombre válido." },
        { status: 400 }
      );
    }

    if (!isEmail(email) || email.length > 120) {
      return NextResponse.json(
        { ok: false, message: "Ingrese un correo válido." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 1200) {
      return NextResponse.json(
        { ok: false, message: "El mensaje debe tener entre 10 y 1200 caracteres." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json(
        { ok: false, message: "Faltan variables de entorno (.env.local)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "No indicado");
    const safeTopic = escapeHtml(topic);
    const safeMsg = escapeHtml(message);

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto (${topic}): ${name}`,
      text:
        `Nuevo mensaje de contacto\n\n` +
        `Nombre: ${name}\n` +
        `Correo: ${email}\n` +
        `Teléfono: ${phone || "No indicado"}\n` +
        `Tema: ${topic}\n\n` +
        `Mensaje:\n${message}\n`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
          <h2 style="margin:0 0 12px;">Nuevo mensaje de contacto</h2>
          <p style="margin:0 0 6px;"><b>Nombre:</b> ${safeName}</p>
          <p style="margin:0 0 6px;"><b>Correo:</b> ${safeEmail}</p>
          <p style="margin:0 0 6px;"><b>Teléfono:</b> ${safePhone}</p>
          <p style="margin:0 0 14px;"><b>Tema:</b> ${safeTopic}</p>

          <p style="margin:0 0 8px;"><b>Mensaje:</b></p>
          <pre style="
            white-space: pre-wrap;
            background:#f6f7f9;
            padding:12px;
            border-radius:12px;
            border:1px solid #e5e7eb;
            margin:0;
          ">${safeMsg}</pre>

          <p style="margin-top:14px; color:#6b7280; font-size:12px;">
            IP (referencia): ${escapeHtml(ip)}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", err);
    return NextResponse.json(
      { ok: false, message: "No se pudo procesar el formulario." },
      { status: 500 }
    );
  }
}
