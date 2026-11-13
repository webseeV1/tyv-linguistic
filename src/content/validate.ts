import { FIELDS_BY_ID, type Field, type Overrides } from "./schema";

/**
 * Contrôle des valeurs envoyées par l'espace d'administration.
 *
 * Principe : tout ce qui n'est pas explicitement autorisé est refusé.
 * Aucun HTML n'est accepté (les textes sont rendus par React, donc échappés),
 * et les visuels ne peuvent pointer que vers les images du site ou vers un
 * fichier déposé par TYV.
 */

/** Visuel livré avec le site, ou fichier déposé depuis l'administration. */
const BUILTIN_IMAGE = /^\/images\/[A-Za-z0-9/_-]+\.(jpg|jpeg|png|webp)$/;
export const MEDIA_KEY = /^img_[a-f0-9]{16}\.(jpg|png|webp)$/;
const MEDIA_URL = /^\/api\/media\/img_[a-f0-9]{16}\.(jpg|png|webp)$/;

const EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const DIGITS = /^\d{8,15}$/;

const MAX_GALLERY = 12;

/** Met le libellé en évidence sans doubler les guillemets déjà présents. */
const q = (label: string) => (label.includes("\u00ab") ? label : `\u00ab ${label} \u00bb`);

/** Supprime les caractères de contrôle (hors retour à la ligne et tabulation). */
const stripControl = (s: string) =>
  s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

export type ValidationResult =
  | { ok: true; values: Overrides }
  | { ok: false; error: string };

const checkImage = (value: string, label: string): string | null =>
  BUILTIN_IMAGE.test(value) || MEDIA_URL.test(value)
    ? null
    : `${q(label)} : visuel non reconnu.`;

function cleanText(field: Field, raw: string): ValidationResult | string {
  let value = stripControl(raw.replace(/\r\n/g, "\n"));
  if (field.type === "text") value = value.replace(/\n/g, " ").trim();
  else value = value.replace(/\n{4,}/g, "\n\n\n").trim();

  const max = field.maxLength ?? 300;
  if (value.length > max) {
    return { ok: false, error: `${q(field.label)} : ${max} caractères maximum.` };
  }
  if (field.pattern === "email" && value && !EMAIL.test(value)) {
    return { ok: false, error: `${q(field.label)} : adresse email invalide.` };
  }
  if (field.pattern === "digits" && value && !DIGITS.test(value)) {
    return {
      ok: false,
      error: `${q(field.label)} : chiffres uniquement (8 à 15), sans « + » ni espaces.`,
    };
  }
  return value;
}

/**
 * Valide un lot de modifications. Une valeur vide signifie « revenir au
 * contenu d'origine » : la clé est alors retirée de l'enregistrement.
 */
export function validateOverrides(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, error: "Format de données inattendu." };
  }

  const values: Overrides = {};

  for (const [id, raw] of Object.entries(input as Record<string, unknown>)) {
    const field = FIELDS_BY_ID.get(id);
    if (!field) return { ok: false, error: `Champ inconnu : ${id}.` };

    if (field.type === "gallery") {
      if (!Array.isArray(raw)) {
        return { ok: false, error: `${q(field.label)} : liste de visuels attendue.` };
      }
      if (raw.length > MAX_GALLERY) {
        return {
          ok: false,
          error: `${q(field.label)} : ${MAX_GALLERY} visuels maximum.`,
        };
      }
      const list: string[] = [];
      for (const item of raw) {
        if (typeof item !== "string") {
          return { ok: false, error: `${q(field.label)} : visuel invalide.` };
        }
        const err = checkImage(item, field.label);
        if (err) return { ok: false, error: err };
        list.push(item);
      }
      if (list.length > 0) values[id] = list;
      continue;
    }

    if (typeof raw !== "string") {
      return { ok: false, error: `${q(field.label)} : texte attendu.` };
    }

    if (field.type === "image") {
      const value = raw.trim();
      if (!value) continue; // retour au visuel d'origine
      const err = checkImage(value, field.label);
      if (err) return { ok: false, error: err };
      values[id] = value;
      continue;
    }

    const cleaned = cleanText(field, raw);
    if (typeof cleaned !== "string") return cleaned;
    if (cleaned) values[id] = cleaned;
  }

  return { ok: true, values };
}
