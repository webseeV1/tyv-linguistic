import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminConfigured,
  checkPassword,
  cookieOptions,
  createToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Ralentissement des tentatives répétées (meilleur effort, par instance). */
const attempts = new Map<string, { count: number; blockedUntil: number }>();
const MAX_ATTEMPTS = 8;
const BLOCK_MS = 10 * 60 * 1000;

const clientIp = (req: Request) =>
  req.headers.get("x-nf-client-connection-ip") ??
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "inconnu";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "L'espace d'administration n'est pas encore configuré." },
      { status: 503 },
    );
  }

  const ip = clientIp(req);
  const record = attempts.get(ip);
  if (record && record.blockedUntil > Date.now()) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const body = (await req.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  // Délai fixe : rend le test de mots de passe nettement plus coûteux.
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!checkPassword(password)) {
    const count = (record?.count ?? 0) + 1;
    attempts.set(ip, {
      count,
      blockedUntil: count >= MAX_ATTEMPTS ? Date.now() + BLOCK_MS : 0,
    });
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  attempts.delete(ip);
  const { value, maxAge } = createToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, value, cookieOptions(maxAge));
  return res;
}

/** Déconnexion. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", cookieOptions(0));
  return res;
}
