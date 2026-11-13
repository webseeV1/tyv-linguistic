import { site } from "@/lib/site";

/**
 * Contenus communs aux deux langues (visuels et coordonnées).
 * Ces valeurs sont les valeurs par défaut : elles restent affichées tant que
 * TYV n'a rien modifié depuis l'espace d'administration.
 */
export const sharedDefaults = {
  images: {
    hero: "/images/sections/hero.jpg",
    bureau: "/images/sections/bureau-cocody.jpg",
    /** Visuels des blocs « Nos offres », par identifiant de bloc. */
    offres: {
      cours: ["/images/sections/cours.jpg"],
      formations: ["/images/sections/formations.jpg"],
      stages: ["/images/sections/stages.jpg"],
      logements: [
        "/images/sections/logements-1.jpg",
        "/images/sections/logements-2.jpg",
      ],
      activites: ["/images/sections/activites.jpg"],
    } as Record<string, string[]>,
  },
  contact: {
    email: site.email,
    address: site.address,
    /** `number` = format international sans « + » ni espaces (lien wa.me). */
    phones: site.phones.map((p) => ({
      label: p.label,
      display: p.display,
      number: p.number,
    })),
  },
};

export type SharedContent = typeof sharedDefaults;
