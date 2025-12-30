import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, message: "Complete nombre, correo y mensaje." },
        { status: 400 }
      );
    }

    // ✅ Por ahora: guardamos/logueamos (gratis y suficiente para probar)
    console.log("📩 Nuevo contacto:", { name, email, message, date: new Date().toISOString() });

    // 🔜 Luego: aquí conectamos envío real (SMTP / Resend / etc.)
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Error procesando el mensaje." },
      { status: 500 }
    );
  }
}
