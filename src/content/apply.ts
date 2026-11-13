import { dictionaries, type Dict, type Locale } from "@/i18n";
import { sharedDefaults, type SharedContent } from "./shared";
import { FIELDS_BY_ID, type Overrides } from "./schema";
import { setByPath } from "./paths";

/**
 * Fusionne les valeurs saisies par TYV avec les contenus par défaut du code.
 * Fonction pure, utilisable côté serveur comme côté client.
 *
 * Deux garde-fous :
 * 1. seuls les identifiants présents dans la liste blanche sont appliqués ;
 * 2. une valeur du mauvais type (ou un chemin inconnu) est ignorée —
 *    le contenu d'origine reste affiché.
 */

const valueFor = (id: string, raw: unknown): string | string[] | null => {
  const field = FIELDS_BY_ID.get(id);
  if (!field) return null;

  if (field.type === "gallery") {
    if (!Array.isArray(raw)) return null;
    const list = raw.filter((v): v is string => typeof v === "string" && v.length > 0);
    return list.length > 0 ? list : null;
  }

  if (typeof raw !== "string") return null;
  const trimmed = field.type === "textarea" ? raw : raw.trim();
  return trimmed.length > 0 ? trimmed : null;
};

/** Dictionnaire de la langue demandée, surchargé par les textes de TYV. */
export function dictFor(locale: Locale, overrides: Overrides | undefined): Dict {
  let dict = dictionaries[locale];
  if (!overrides) return dict;

  for (const [id, raw] of Object.entries(overrides)) {
    const field = FIELDS_BY_ID.get(id);
    if (!field || field.scope !== "i18n" || field.locale !== locale) continue;
    const value = valueFor(id, raw);
    if (value === null) continue;
    dict = setByPath(dict, field.path, value);
  }
  return dict;
}

/** Visuels et coordonnées communs, surchargés par les choix de TYV. */
export function sharedFor(overrides: Overrides | undefined): SharedContent {
  let shared = sharedDefaults;
  if (!overrides) return shared;

  for (const [id, raw] of Object.entries(overrides)) {
    const field = FIELDS_BY_ID.get(id);
    if (!field || field.scope !== "shared") continue;
    const value = valueFor(id, raw);
    if (value === null) continue;
    shared = setByPath(shared, field.path, value);
  }
  return shared;
}
