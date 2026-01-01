import { NextResponse } from "next/server";
import { Resend } from "resend";
import { preventivoSchema } from "@/lib/preventivoSchema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = preventivoSchema.parse(body);

    await resend.emails.send({
      from: "Preventivi <onboarding@resend.dev>",
      to: ["matt3clash@gmail.com"],
      subject: "Nuova richiesta preventivo",
      replyTo: data.email,
      html: `
        <h2>Richiesta preventivo</h2>
        <p><strong>Nome:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.phone}</p>
        <p><strong>Zona:</strong> ${data.area}</p>
        <p><strong>Unità:</strong> ${data.units ?? "-"}</p>
        <p><strong>Box:</strong> ${data.parking ?? "-"}</p>
        <p><strong>Ascensore:</strong> ${data.elevator ? "Sì" : "No"}</p>
        <p><strong>Riscaldamento:</strong> ${
          data.centralHeating ? "Sì" : "No"
        }</p>
        <p><strong>Situazione:</strong> ${data.situation}</p>
        <p><strong>Messaggio:</strong><br/>${data.message ?? "-"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Errore invio" }, { status: 400 });
  }
}
