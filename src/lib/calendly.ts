import { site } from "./site";

type CalendlyApi = {
  initPopupWidget: (opts: { url: string }) => void;
  initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
};

/**
 * Construit l'URL Calendly avec une campagne UTM (source du clic) afin de
 * tracer quel pack / emplacement déclenche la prise de rendez-vous.
 */
export function calendlyUrl(campaign?: string): string {
  if (!campaign) return site.calendly;
  const sep = site.calendly.includes("?") ? "&" : "?";
  return `${site.calendly}${sep}utm_campaign=${encodeURIComponent(campaign)}`;
}

function getCalendly(): CalendlyApi | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { Calendly?: CalendlyApi }).Calendly;
}

/** Exécute `cb` dès que le script Calendly est prêt (poll court). */
export function onCalendlyReady(cb: (c: CalendlyApi) => void, tries = 40): void {
  const c = getCalendly();
  if (c) {
    cb(c);
    return;
  }
  if (tries <= 0) return;
  setTimeout(() => onCalendlyReady(cb, tries - 1), 150);
}

/**
 * Ouvre le calendrier Calendly en modal. Retourne false si le script n'est
 * pas encore chargé (l'appelant peut alors laisser l'ouverture en nouvel onglet).
 */
export function openCalendlyPopup(url: string): boolean {
  const c = getCalendly();
  if (c) {
    c.initPopupWidget({ url });
    return true;
  }
  return false;
}
