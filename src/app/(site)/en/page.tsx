// Les contenus modifiés depuis /admin sont publiés immédiatement
// (régénération à la demande) ; ce délai n’est qu’un filet de sécurité.
export const revalidate = 60;

import type { Metadata } from "next";
import { HomeSections } from "@/components/HomeSections";
import { HtmlLang } from "@/components/i18n/HtmlLang";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "TYV — Language Stays in Ghana | Linguistic Travel & Study Programs",
  description:
    "Immersive language stays in Ghana: intensive English courses, professional training and internships. Flight, housing, activities — all inclusive, managed from A to Z.",
  keywords: [
    "language stay Ghana",
    "learn English Ghana",
    "study abroad West Africa",
    "English immersion Accra",
    "TYV",
  ],
  openGraph: {
    title: "TYV — Immersive language stays in Ghana",
    description:
      "Immersive language stays in Ghana. All inclusive, managed from A to Z.",
    url: `${site.url}/en`,
    siteName: "TYV Linguistic Travel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TYV — Immersive language stays in Ghana",
    description:
      "Immersive language stays in Ghana. All inclusive, managed from A to Z.",
  },
  alternates: {
    canonical: `${site.url}/en`,
    languages: {
      fr: site.url,
      en: `${site.url}/en`,
      "x-default": site.url,
    },
  },
};

export default function HomeEn() {
  return (
    <>
      <HtmlLang lang="en" />
      <HomeSections />
    </>
  );
}
