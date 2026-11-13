import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { ConsentedTags } from "./ConsentedTags";

/**
 * Tags marketing & analytics, activés uniquement si l'ID correspondant est
 * présent dans l'environnement (.env.local).
 *
 *   NEXT_PUBLIC_GTM_ID        → Google Tag Manager (conteneur central)
 *   NEXT_PUBLIC_GA_ID         → Google Analytics 4   (soumis au consentement)
 *   NEXT_PUBLIC_META_PIXEL_ID → Meta Pixel           (soumis au consentement)
 *   NEXT_PUBLIC_CLARITY_ID    → Microsoft Clarity
 *
 * GA4 et Meta Pixel ne sont chargés qu'après acceptation des cookies
 * (voir ConsentedTags + CookieBanner).
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}

      {clarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      )}

      {/* GA4 + Meta Pixel — chargés après consentement uniquement */}
      <ConsentedTags />
    </>
  );
}
