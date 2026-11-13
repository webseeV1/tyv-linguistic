/**
 * Configuration centrale du site TYV.
 */
export const site = {
  name: "TYV",
  fullName: "TYV — Tell Us Your Vision",
  tagline: "Linguistic Travel & Study Programs",
  url: "https://tyvlinguistic.com",

  // Contact
  email: "contact@tyvlinguistic.com",
  // Numéro principal (France) — utilisé par défaut (bulle WhatsApp, etc.)
  phone: "+33636268894",
  phoneDisplay: "+33 6 36 26 88 94",
  whatsapp: "33636268894", // format international sans "+" ni espaces
  // Numéros affichés (Contact + Footer) — France en premier (prioritaire).
  // `number` : format international sans "+" ni espaces (sert aux liens wa.me).
  phones: [
    {
      label: "France",
      display: "+33 6 36 26 88 94",
      number: "33636268894",
    },
    {
      label: "Côte d'Ivoire",
      display: "+225 07 08 48 76 91",
      number: "2250708487691",
    },
  ],
  address:
    "Abidjan Djorobité 1, Zone de la Cité SIR — à 500 m de la Pharmacie Bénédiction, au feu avant le rond-point de la Cité SIR en venant d'Angré. Abidjan, Côte d'Ivoire",

  // Calendly
  calendly: "https://calendly.com/tyvciv/30min",

  // Crédits
  author: "Eudess", // directeur de la publication
  builder: { name: "WebSeeVision", url: "https://webseevision.com" },

  // Réseaux sociaux. Une URL vide ("") masque le réseau partout sur le site
  // (pied de page + section communauté). À renseigner avec l'URL officielle
  // du compte, par exemple "https://www.instagram.com/<compte>/".
  // Vérifié le 2026-11-13 : les anciennes adresses Instagram (@tyv.off) et
  // TikTok (@tyv.off) renvoyaient « profil / compte introuvable ».
  social: {
    instagram: "",
    facebook: "https://www.facebook.com/profile.php?id=61590820102705",
    tiktok: "",
  },
} as const;

/**
 * Lien WhatsApp avec message prérempli.
 * `encodeURIComponent` gère accents, apostrophes, retours à la ligne et emoji.
 */
export const waLink = (number: string, message?: string) => {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
};

/** Lien WhatsApp vers le numéro principal (France). */
export const whatsappLink = (message?: string) => waLink(site.whatsapp, message);

// Les liens de navigation vivent désormais dans les dictionnaires i18n
// (src/i18n/fr.ts et en.ts, clé `nav.links`).
