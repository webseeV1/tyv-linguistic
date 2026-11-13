/**
 * Couche de tracking via dataLayer (Google Tag Manager).
 * GTM relaie ensuite les events vers GA4 / Meta Pixel selon la config du conteneur.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type TrackPayload =
  | { event: "cta_reserver_appel"; emplacement: "navbar" | "hero" | "menu_mobile" }
  | { event: "cta_contacter_formule"; formule: string }
  | { event: "cta_devis_gratuit" }
  | { event: "cta_whatsapp" }
  | { event: "scroll_depth"; pourcentage: 25 | 50 | 75 | 100 };

export function track(payload: TrackPayload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}
