import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { Analytics } from "@/components/analytics/Analytics";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { ContentProvider } from "@/content/ContentProvider";
import { readOverrides } from "@/content/store";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "TYV Linguistic Travel & Study Programs",
  description: "Agence de voyages linguistiques immersifs au Ghana",
  url: site.url,
  areaServed: "Afrique de l'Ouest",
  serviceType: "Séjours linguistiques immersifs",
};

/**
 * Habillage du site public (navigation, pied de page, scripts marketing).
 * Les contenus éditables sont lus ici une seule fois puis diffusés aux
 * sections via le contexte.
 */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const overrides = await readOverrides();

  return (
    <ContentProvider overrides={overrides}>
      {/* Widget Calendly officiel (modal + embed inline) — CSS hoisté par React 19 */}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
      <ScrollDepthTracker />
    </ContentProvider>
  );
}
