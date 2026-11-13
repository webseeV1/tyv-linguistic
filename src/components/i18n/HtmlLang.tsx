"use client";

import { useEffect } from "react";

/**
 * Force l'attribut `lang` du document sur les pages non-françaises
 * (le layout racine, partagé, rend `<html lang="fr">`).
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "fr";
    };
  }, [lang]);

  return null;
}
