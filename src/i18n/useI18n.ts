"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { homeHref, localeFromPathname, type Dict, type Locale } from "./index";
import { useOverrides } from "@/content/ContentProvider";
import { dictFor } from "@/content/apply";

/**
 * Hook i18n : la langue est déduite de l'URL (`/` = fr, `/en` = en),
 * donc le bon texte est rendu dès le SSR/prerender — pas de flash.
 *
 * Les textes modifiés par TYV depuis /admin sont appliqués par-dessus le
 * dictionnaire du code ; sans modification, le contenu d'origine est servi.
 */
export function useI18n(): {
  locale: Locale;
  t: Dict;
  /** Lien vers une ancre de la page d'accueil dans la langue courante. */
  href: (hash?: string) => string;
} {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const overrides = useOverrides();
  const t = useMemo(() => dictFor(locale, overrides), [locale, overrides]);

  return {
    locale,
    t,
    href: (hash = "") => homeHref(locale, hash),
  };
}
