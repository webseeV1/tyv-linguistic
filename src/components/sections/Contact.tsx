"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { PartyPopper, Phone, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { onCalendlyReady } from "@/lib/calendly";
import { useI18n } from "@/i18n/useI18n";
import { site, waLink } from "@/lib/site";
import { useShared } from "@/content/ContentProvider";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const { t } = useI18n();
  const shared = useShared();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  // Le widget Calendly (lourd) n'est chargé que lorsque la section entre dans
  // le viewport (Intersection Observer via useInView) — pas au chargement initial.
  const calendlyRef = useRef<HTMLDivElement>(null);
  const calendlyInView = useInView(calendlyRef, { once: true, margin: "200px" });
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Initialise l'embed inline officiel une fois visible et le script prêt.
  useEffect(() => {
    if (!calendlyInView) return;
    const el = calendlyRef.current;
    if (!el) return;
    let cancelled = false;
    onCalendlyReady((cal) => {
      if (cancelled || el.childElementCount > 0) return;
      cal.initInlineWidget({ url: site.calendly, parentElement: el });
    });
    return () => {
      cancelled = true;
    };
  }, [calendlyInView]);

  // Masque le skeleton dès que le calendrier Calendly est réellement affiché.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data as { event?: string };
      if (typeof data?.event === "string" && data.event.startsWith("calendly")) {
        setCalendlyLoaded(true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || c.errorFallback);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : c.errorFallback);
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-tyv-navy/15 bg-tyv-bg px-4 py-3 text-tyv-text placeholder:text-tyv-muted/70 transition-colors focus:border-tyv-sky focus:bg-white";

  return (
    <section id="contact" className="scroll-mt-20 bg-tyv-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
            {c.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-5xl">
            {c.title}
          </h2>
          <p className="mt-4 text-lg text-tyv-muted">{c.subtitle}</p>

          <div className="mt-7 flex flex-col items-center gap-3 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7">
            {shared.contact.phones.map((p) => (
              <a
                key={p.label}
                href={waLink(p.number, t.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-tyv-navy transition-colors hover:text-tyv-sky"
              >
                <Phone className="size-4 text-tyv-sky" aria-hidden="true" />
                {p.label} : {p.display}
              </a>
            ))}
            <span className="inline-flex items-center gap-2 text-center text-tyv-muted">
              <MapPin className="size-4 shrink-0 text-tyv-sky" aria-hidden="true" />
              {shared.contact.address}
            </span>
          </div>
        </AnimatedSection>

        {/* Permanence physique au bureau de Djorobité 1, Cité SIR (Abidjan) */}
        <AnimatedSection className="mx-auto mt-14 max-w-5xl">
          <div className="grid overflow-hidden rounded-3xl bg-tyv-navy shadow-lg shadow-tyv-navy/15 lg:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-64 lg:min-h-full">
              <Image
                src={shared.images.bureau}
                alt={c.officeImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 text-white sm:p-10">
              <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky-light">
                {c.officeKicker}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                {c.officeTitle}
              </h3>
              <p className="mt-4 text-justify leading-relaxed text-white/85">
                {c.officeText}
              </p>
              <p className="mt-5 flex items-start gap-2 text-sm text-white/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-tyv-sky-light" aria-hidden="true" />
                {shared.contact.address}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Calendly — en premier sur mobile (priorité conversion) */}
          <AnimatedSection className="order-1 lg:order-2">
            <div className="relative h-full overflow-hidden rounded-3xl bg-white p-2 shadow-sm ring-1 ring-tyv-navy/5">
              {/* Skeleton loader affiché tant que le calendrier n'est pas rendu */}
              {!calendlyLoaded && (
                <div className="pointer-events-none absolute inset-2 flex flex-col gap-4 rounded-2xl bg-tyv-bg p-6">
                  <div className="h-6 w-2/3 animate-pulse rounded-lg bg-tyv-navy/10" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-tyv-navy/10" />
                  <div className="mt-2 grid grid-cols-7 gap-2">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square animate-pulse rounded bg-tyv-navy/10"
                      />
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-center gap-2 text-sm text-tyv-muted">
                    <span className="size-2 animate-pulse rounded-full bg-tyv-sky" />
                    {c.calendlyLoading}
                  </div>
                </div>
              )}
              <div
                ref={calendlyRef}
                title={c.calendlyTitle}
                className="relative h-[680px] w-full overflow-hidden rounded-2xl"
                style={{ minWidth: 0 }}
              />
            </div>
          </AnimatedSection>

          {/* Formulaire */}
          <AnimatedSection className="order-2 lg:order-1">
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-tyv-navy/5 sm:p-8">
              {status === "success" ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-tyv-sky/15 text-tyv-sky">
                    <PartyPopper className="size-8" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-tyv-navy">
                    {c.successTitle}
                  </h3>
                  <p className="mt-2 text-tyv-muted">{c.successText}</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-tyv-sky hover:underline"
                  >
                    {c.successAgain}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot anti-spam — invisible pour les humains */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-tyv-navy">
                        {c.firstName}
                      </label>
                      <input id="firstName" name="firstName" required autoComplete="given-name" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-tyv-navy">
                        {c.phone}
                      </label>
                      <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-tyv-navy">
                      {c.email}
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
                  </div>

                  <div>
                    <label htmlFor="pack" className="mb-1.5 block text-sm font-medium text-tyv-navy">
                      {c.packLabel}
                    </label>
                    <select id="pack" name="pack" defaultValue="" className={fieldClass}>
                      <option value="" disabled>
                        {c.packPlaceholder}
                      </option>
                      {c.packOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                      <option value={c.packUnknown}>{c.packUnknown}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-tyv-navy">
                      {c.message}
                    </label>
                    <textarea id="message" name="message" rows={4} className={fieldClass} />
                  </div>

                  {status === "error" && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                      {error}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? c.sending : c.submit}
                  </Button>
                  <p className="text-center text-xs text-tyv-muted">{c.footnote}</p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
