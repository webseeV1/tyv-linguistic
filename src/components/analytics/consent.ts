export const CONSENT_KEY = "cookie_consent";
export const CONSENT_EVENT = "tyv-consent-change";

export type Consent = "accepted" | "refused" | null;

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "accepted" || v === "refused" ? v : null;
}

export function setConsent(value: "accepted" | "refused"): void {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
