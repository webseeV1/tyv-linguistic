import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  email?: string;
  phone?: string;
  pack?: string;
  message?: string;
  // honeypot anti-spam (doit rester vide)
  company?: string;
};

const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);

export async function POST(request: NextRequest) {
  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un bot remplit ce champ → on fait comme si tout allait bien.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const firstName = data.firstName?.trim();
  const email = data.email?.trim();
  const phone = data.phone?.trim();

  if (!firstName || !email || !phone) {
    return NextResponse.json(
      { error: "Merci de renseigner ton prénom, ton email et ton téléphone." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "TYV <onboarding@resend.dev>";

  // Sans clé Resend (ex. dev local), on n'échoue pas : on loggue côté serveur.
  if (!apiKey || !to) {
    console.warn(
      "[contact] RESEND_API_KEY ou CONTACT_TO_EMAIL absent — message non envoyé par email.",
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Nouvelle demande TYV — ${esc(firstName)}${data.pack ? ` (${esc(data.pack)})` : ""}`,
    html: `
      <h2>Nouvelle demande de contact</h2>
      <p><strong>Prénom :</strong> ${esc(firstName)}</p>
      <p><strong>Email :</strong> ${esc(email)}</p>
      <p><strong>Téléphone :</strong> ${esc(phone)}</p>
      <p><strong>Pack :</strong> ${esc(data.pack ?? "—")}</p>
      <p><strong>Message :</strong><br>${esc(data.message ?? "—").replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessaie ou contacte-nous sur WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
