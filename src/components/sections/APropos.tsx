"use client";

import { Globe2, Layers, Building2, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useI18n } from "@/i18n/useI18n";

const valeurIcons = [Globe2, Layers, Building2, ShieldCheck];

export function APropos() {
  const { t } = useI18n();
  const a = t.aPropos;
  const valeurs = a.valeurs.map((v, i) => ({ ...v, icon: valeurIcons[i] }));

  return (
    <section id="a-propos" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
            {a.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-5xl">
            {a.title}
          </h2>
          <p className="mt-6 text-justify leading-relaxed text-tyv-muted">{a.intro}</p>
        </AnimatedSection>

        {/* Écosystème partenaire */}
        <AnimatedSection className="mx-auto mt-14 max-w-4xl">
          <div className="rounded-3xl bg-tyv-bg p-8 sm:p-10">
            <h3 className="font-display text-2xl font-bold text-tyv-navy">
              {a.ecoTitle}
            </h3>
            <p className="mt-3 text-justify leading-relaxed text-tyv-muted">{a.ecoText}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-tyv-navy">{a.ecoCol1Title}</p>
                <p className="mt-1.5 text-justify text-sm leading-relaxed text-tyv-muted">
                  {a.ecoCol1Text}
                </p>
              </div>
              <div>
                <p className="font-semibold text-tyv-navy">{a.ecoCol2Title}</p>
                <p className="mt-1.5 text-justify text-sm leading-relaxed text-tyv-muted">
                  {a.ecoCol2Text}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Pourquoi choisir TYV */}
        <AnimatedSection className="mx-auto mt-14 max-w-5xl">
          <h3 className="text-center font-display text-2xl font-bold text-tyv-navy sm:text-3xl">
            {a.whyTitle}
          </h3>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {valeurs.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 rounded-3xl border border-tyv-navy/10 bg-white p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-tyv-sky/15 text-tyv-sky">
                  <v.icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold text-tyv-navy">
                    {v.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-tyv-muted">
                    {v.text}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Engagement */}
        <AnimatedSection className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-justify font-display text-xl font-semibold leading-relaxed text-tyv-navy sm:text-2xl">
            {a.quote}
          </p>
          <p className="mt-4 text-sm text-tyv-muted">{a.since}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
