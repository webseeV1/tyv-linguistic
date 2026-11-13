import type { Locale } from "@/i18n";

/**
 * Liste blanche des contenus modifiables par TYV depuis /admin.
 *
 * Rien d'autre n'est éditable : la surcouche de contenu n'applique QUE les
 * champs déclarés ici. Ajouter une ligne = ouvrir un contenu à l'édition ;
 * supprimer une ligne = le refermer. La structure du site, le code, les
 * balises SEO et les composants ne sont jamais exposés.
 */

export type FieldType = "text" | "textarea" | "image" | "gallery";
export type FieldPattern = "email" | "digits";

export type Group =
  | "whatsapp"
  | "accueil"
  | "offres"
  | "programmes"
  | "apropos"
  | "contact";

export const GROUPS: { id: Group; label: string; help?: string }[] = [
  {
    id: "whatsapp",
    label: "Message WhatsApp",
    help: "Le message déjà écrit quand un visiteur clique sur un bouton WhatsApp du site.",
  },
  { id: "accueil", label: "Accueil", help: "Le haut de la page d'accueil." },
  {
    id: "offres",
    label: "Nos offres",
    help: "Les cinq blocs de présentation et leurs photos.",
  },
  { id: "programmes", label: "Programmes" },
  { id: "apropos", label: "À propos" },
  {
    id: "contact",
    label: "Contact & coordonnées",
    help: "Les informations affichées dans la section Contact et en pied de page.",
  },
];

export type Field = {
  /** Clé stable enregistrée en base. */
  id: string;
  /** `i18n` = texte d'une langue · `shared` = commun aux deux langues. */
  scope: "i18n" | "shared";
  /** Chemin dans le dictionnaire (fr.ts / en.ts) ou dans sharedDefaults. */
  path: string;
  locale?: Locale;
  type: FieldType;
  label: string;
  help?: string;
  group: Group;
  maxLength?: number;
  pattern?: FieldPattern;
  /** Indication de cadrage affichée à côté du bouton « Remplacer ». */
  ratio?: string;
};

/** Textes traduits : une entrée par langue est générée automatiquement. */
const I18N_FIELDS: Omit<Field, "id" | "scope" | "locale">[] = [
  {
    path: "whatsapp.message",
    type: "textarea",
    group: "whatsapp",
    label: "Message prérempli WhatsApp",
    help: "Les retours à la ligne et les emoji sont conservés.",
    maxLength: 1200,
  },

  { path: "hero.titleBefore", type: "text", group: "accueil", label: "Titre — début" },
  {
    path: "hero.titleHighlight",
    type: "text",
    group: "accueil",
    label: "Titre — partie en bleu clair",
  },
  { path: "hero.subtitle", type: "textarea", group: "accueil", label: "Sous-titre", maxLength: 400 },
  { path: "hero.ctaOffers", type: "text", group: "accueil", label: "Bouton principal" },
  { path: "hero.ctaQuote", type: "text", group: "accueil", label: "Bouton secondaire" },

  {
    path: "offres.programmesTitle",
    type: "text",
    group: "programmes",
    label: "Titre de la section",
  },
  {
    path: "offres.programmesIntro",
    type: "textarea",
    group: "programmes",
    label: "Texte d'introduction",
    maxLength: 1500,
  },
  {
    path: "offres.inscriptionNote",
    type: "text",
    group: "programmes",
    label: "Note sous « L'inscription prend en compte »",
    maxLength: 400,
  },

  { path: "aPropos.intro", type: "textarea", group: "apropos", label: "Présentation", maxLength: 1200 },
  {
    path: "aPropos.ecoText",
    type: "textarea",
    group: "apropos",
    label: "Écosystème partenaire",
    maxLength: 1200,
  },

  { path: "contact.title", type: "text", group: "contact", label: "Titre de la section" },
  { path: "contact.subtitle", type: "textarea", group: "contact", label: "Sous-titre", maxLength: 400 },
  {
    path: "contact.officeText",
    type: "textarea",
    group: "contact",
    label: "Texte « Rencontre-nous au bureau »",
    maxLength: 900,
  },
];

/** Libellés français des blocs « Nos offres » (ordre du fichier i18n). */
const BLOCS: { index: number; id: string; label: string }[] = [
  { index: 0, id: "cours", label: "Nos cours" },
  { index: 1, id: "formations", label: "Nos formations" },
  { index: 2, id: "stages", label: "Nos stages d'immersion" },
  { index: 3, id: "logements", label: "Nos logements" },
  { index: 4, id: "activites", label: "Nos activités mensuelles" },
];

for (const b of BLOCS) {
  I18N_FIELDS.push(
    {
      path: `offres.blocs.${b.index}.kicker`,
      type: "text",
      group: "offres",
      label: `« ${b.label} » — titre`,
    },
    {
      path: `offres.blocs.${b.index}.phrase`,
      type: "textarea",
      group: "offres",
      label: `« ${b.label} » — texte`,
      maxLength: 900,
    },
  );
}

/** Contenus communs aux deux langues (visuels, coordonnées). */
const SHARED_FIELDS: Omit<Field, "scope">[] = [
  {
    id: "shared:images.hero",
    path: "images.hero",
    type: "image",
    group: "accueil",
    label: "Photo d'accueil",
    ratio: "format paysage, idéalement 1100 × 950 px",
  },
  ...BLOCS.map((b) => ({
    id: `shared:images.offres.${b.id}`,
    path: `images.offres.${b.id}`,
    type: "gallery" as FieldType,
    group: "offres" as Group,
    label: `« ${b.label} » — photos`,
    ratio: "format paysage, largeur conseillée 1600 px",
  })),
  {
    id: "shared:images.bureau",
    path: "images.bureau",
    type: "image",
    group: "contact",
    label: "Photo du bureau d'Abidjan",
    ratio: "format portrait ou carré",
  },
  {
    id: "shared:contact.email",
    path: "contact.email",
    type: "text",
    group: "contact",
    label: "Adresse email",
    pattern: "email",
    maxLength: 120,
  },
  {
    id: "shared:contact.address",
    path: "contact.address",
    type: "textarea",
    group: "contact",
    label: "Adresse postale",
    maxLength: 400,
  },
  {
    id: "shared:contact.phones.0.display",
    path: "contact.phones.0.display",
    type: "text",
    group: "contact",
    label: "Téléphone 1 — affichage",
    help: "Tel qu'il apparaît sur le site, ex. +33 6 36 26 88 94.",
    maxLength: 40,
  },
  {
    id: "shared:contact.phones.0.number",
    path: "contact.phones.0.number",
    type: "text",
    group: "contact",
    label: "Téléphone 1 — numéro WhatsApp",
    help: "Chiffres uniquement, indicatif pays compris, sans « + » ni espaces. Ex. 33636268894.",
    pattern: "digits",
    maxLength: 20,
  },
  {
    id: "shared:contact.phones.1.display",
    path: "contact.phones.1.display",
    type: "text",
    group: "contact",
    label: "Téléphone 2 — affichage",
    maxLength: 40,
  },
  {
    id: "shared:contact.phones.1.number",
    path: "contact.phones.1.number",
    type: "text",
    group: "contact",
    label: "Téléphone 2 — numéro WhatsApp",
    help: "Chiffres uniquement, sans « + » ni espaces. Ex. 2250708487691.",
    pattern: "digits",
    maxLength: 20,
  },
];

export const FIELDS: Field[] = [
  ...(["fr", "en"] as Locale[]).flatMap((locale) =>
    I18N_FIELDS.map((f) => ({
      ...f,
      scope: "i18n" as const,
      locale,
      id: `${locale}:${f.path}`,
    })),
  ),
  ...SHARED_FIELDS.map((f) => ({ ...f, scope: "shared" as const })),
];

export const FIELDS_BY_ID = new Map(FIELDS.map((f) => [f.id, f]));

/** Valeurs enregistrées par TYV, indexées par identifiant de champ. */
export type Overrides = Record<string, string | string[]>;

export type ContentDoc = {
  version: 1;
  updatedAt: string;
  values: Overrides;
};

export const EMPTY_DOC: ContentDoc = {
  version: 1,
  updatedAt: "",
  values: {},
};
