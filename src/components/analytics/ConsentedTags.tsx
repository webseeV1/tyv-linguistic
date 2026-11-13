"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONSENT_EVENT, getConsent, type Consent } from "./consent";

/**
 * GA4 et Meta Pixel ne sont chargés QUE si le visiteur a accepté les cookies.
 * Réagit en direct au choix fait dans le bandeau (sans rechargement).
 */
export function ConsentedTags() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const sync = () => setConsent(getConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (consent !== "accepted") return null;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}

      {pixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
