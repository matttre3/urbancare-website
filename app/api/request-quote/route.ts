import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { preventivoSchema } from "@/lib/preventivoSchema";
import { siteConfig } from "@/lib/site";

const htmlEscapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: unknown) {
  return String(value ?? "-").replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Servizio email non configurato" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const data = preventivoSchema.parse(body);
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from:
        process.env.RESEND_FROM ??
        "Preventivi <preventivi@urbancare-amministrazioni.com>",
      to: [process.env.QUOTE_REQUEST_TO ?? siteConfig.email],
      subject: "Nuova richiesta preventivo",
      replyTo: data.email,
      html: `
        <h2>Richiesta preventivo</h2>
        <p><strong>Nome:</strong> ${escapeHtml(data.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Zona:</strong> ${escapeHtml(data.area)}</p>
        <p><strong>Unità:</strong> ${escapeHtml(data.units)}</p>
        <p><strong>Box:</strong> ${escapeHtml(data.parking)}</p>
        <p><strong>Ascensore:</strong> ${data.elevator ? "Sì" : "No"}</p>
        <p><strong>Riscaldamento:</strong> ${
          data.centralHeating ? "Sì" : "No"
        }</p>
        <p><strong>Situazione:</strong> ${escapeHtml(data.situation)}</p>
        <p><strong>Messaggio:</strong><br/>${escapeHtml(data.message)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
    }

    console.error("Quote request email failed", error);
    return NextResponse.json({ error: "Errore invio" }, { status: 500 });
  }
}
