import { fr, type Dict } from "./fr";
import { en } from "./en";

export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export const dictionaries: Record<Locale, Dict> = { fr, en };

/** Déduit la langue depuis le chemin : `/en` et `/en/...` → anglais. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

/**
 * Construit un lien vers la page d'accueil localisée.
 * `homeHref("en", "#offres")` → `/en#offres` · `homeHref("fr", "#offres")` → `/#offres`
 */
export function homeHref(locale: Locale, hash = ""): string {
  return locale === "en" ? `/en${hash}` : `/${hash}`;
}

export type { Dict };
