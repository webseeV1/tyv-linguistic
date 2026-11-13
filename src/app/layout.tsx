import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title:
    "TYV — Séjours Linguistiques au Ghana | Linguistic Travel & Study Programs",
  description:
    "Séjours linguistiques immersifs au Ghana pour francophones. Billet, logement, activités — tout inclus. Packs 1, 3 et 12 mois. Sur mesure et accompagné.",
  keywords: [
    "séjour linguistique Ghana",
    "apprendre anglais Ghana",
    "voyage linguistique Afrique",
    "immersion anglais Accra",
    "TYV",
  ],
  authors: [{ name: "TYV" }],
  openGraph: {
    title: "TYV — Séjours linguistiques immersifs au Ghana",
    description:
      "Séjours linguistiques immersifs au Ghana. Tout inclus, gestion A à Z.",
    url: site.url,
    siteName: "TYV Linguistic Travel",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TYV — Séjours linguistiques immersifs au Ghana",
    description:
      "Séjours linguistiques immersifs au Ghana. Tout inclus, gestion A à Z.",
  },
  alternates: {
    canonical: site.url,
    languages: {
      fr: site.url,
      en: `${site.url}/en`,
      "x-default": site.url,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1B2E5E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
