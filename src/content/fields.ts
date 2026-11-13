import { dictionaries } from "@/i18n";
import { sharedDefaults } from "./shared";
import { getByPath } from "./paths";
import { FIELDS, type Field, type Overrides } from "./schema";

/** Un champ tel qu'il est présenté dans l'espace d'administration. */
export type EditableItem = Field & {
  /** Contenu d'origine, livré avec le site. */
  defaultValue: string | string[];
  /** Contenu actuellement enregistré par TYV (sinon identique au défaut). */
  value: string | string[];
};

const defaultFor = (field: Field): string | string[] => {
  const root =
    field.scope === "i18n" ? dictionaries[field.locale ?? "fr"] : sharedDefaults;
  const raw = getByPath(root, field.path);
  if (field.type === "gallery") {
    return Array.isArray(raw) ? (raw as string[]) : [];
  }
  return typeof raw === "string" ? raw : "";
};

/** Liste complète des contenus éditables, défauts et valeurs enregistrées. */
export function buildItems(values: Overrides): EditableItem[] {
  return FIELDS.map((field) => {
    const defaultValue = defaultFor(field);
    const saved = values[field.id];
    const valid =
      field.type === "gallery"
        ? Array.isArray(saved) && saved.length > 0
        : typeof saved === "string" && saved.length > 0;
    return { ...field, defaultValue, value: valid ? saved! : defaultValue };
  });
}
