import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Authentification de l'espace d'administration.
 *
 * Deux variables d'environnement, définies côté hébergeur (jamais dans Git,
 * jamais exposées au navigateur) :
 *   ADMIN_PASSWORD        mot de passe remis à TYV
 *   ADMIN_SESSION_SECRET  clé de signature du cookie de session
 *
 * Le cookie ne contient aucun secret : seulement une date d'expiration
 * signée en HMAC-SHA256.
 */

export const ADMIN_COOKIE = "tyv_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 jours

const sessionSecret = () => process.env.ADMIN_SESSION_SECRET ?? "";

/** L'administration n'est active que si les deux variables sont définies. */
export const adminConfigured = () =>
  Boolean(process.env.ADMIN_PASSWORD && sessionSecret());

const equals = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufB, bufB); // temps constant même en cas d'écart de taille
    return false;
  }
  return timingSafeEqual(bufA, bufB);
};

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !input) return false;
  return equals(input, expected);
}

const sign = (payload: string) =>
  createHmac("sha256", sessionSecret()).update(payload).digest("base64url");

export function createToken(): { value: string; maxAge: number } {
  const exp = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return { value: `${exp}.${sign(exp)}`, maxAge: MAX_AGE_SECONDS };
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !sessionSecret()) return false;
  const [exp, signature] = token.split(".");
  if (!exp || !signature) return false;
  if (!equals(sign(exp), signature)) return false;
  const expiry = Number(exp);
  return Number.isFinite(expiry) && expiry > Date.now();
}

/** Session valide ? (lecture du cookie HttpOnly) */
export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(ADMIN_COOKIE)?.value);
}

export const cookieOptions = (maxAge: number) =>
  ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  });
