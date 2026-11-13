"use client";

import Image from "next/image";
import { GraduationCap, BriefcaseBusiness, Check, Info } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { FlyingPlane } from "@/components/ui/FlyingPlane";
import { useI18n } from "@/i18n/useI18n";
import { useShared } from "@/content/ContentProvider";
import { track } from "@/lib/analytics";

export function Offres() {
  const { t, href } = useI18n();
  const shared = useShared();
  const o = t.offres;

  return (
    <section
      id="offres"
      className="relative isolate overflow-hidden scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <FlyingPlane />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Blocs visuels : cours, formations, stages, logements, activités */}
        <div className="space-y-16 sm:space-y-24">
          {o.blocs.map((bloc, i) => {
            // Logements et activités : images agrandies (demande client)
            const wide = bloc.id === "logements" || bloc.id === "activites";
            return (
              <AnimatedSection
                key={bloc.id}
                className={`mx-auto ${wide ? "max-w-6xl" : "max-w-5xl"}`}
              >
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
                    {bloc.kicker}
                  </p>
                  <p className="mt-3 text-justify font-display text-lg font-semibold leading-relaxed text-tyv-navy sm:text-2xl sm:leading-snug">
                    {bloc.phrase}
                  </p>
                </div>
                <div className="mt-8 grid gap-6">
                  {/* Visuels : ceux choisis par TYV, sinon ceux du code. */}
                  {(shared.images.offres[bloc.id] ?? bloc.images.map((im) => im.src)).map(
                    (src, imgIndex) => (
                    <div
                      key={`${src}-${imgIndex}`}
                      className="relative overflow-hidden rounded-3xl shadow-lg shadow-tyv-navy/10 ring-1 ring-tyv-navy/5"
                    >
                      <Image
                        src={src}
                        alt={bloc.images[imgIndex]?.alt ?? bloc.images[0]?.alt ?? bloc.kicker}
                        width={1600}
                        height={1000}
                        sizes="(max-width: 1024px) 100vw, 1152px"
                        loading={i === 0 ? "eager" : "lazy"}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                    ),
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* NOS PROGRAMMES */}
        <AnimatedSection className="mx-auto mt-24 max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
              {o.programmesKicker}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-4xl">
              {o.programmesTitle}
            </h2>
            <p className="mt-5 text-justify leading-relaxed text-tyv-muted">
              {o.programmesIntro}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Cours d'anglais */}
            <div className="rounded-3xl border-2 border-tyv-navy/10 bg-tyv-bg p-8">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-tyv-sky/15 text-tyv-sky">
                <GraduationCap className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-tyv-navy">
                {o.coursTitle}
              </h3>
              <p className="mt-2 text-sm text-tyv-muted">{o.coursSub}</p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {o.coursDurees.map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-tyv-navy px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Formations professionnelles */}
            <div className="rounded-3xl border-2 border-tyv-sky/40 bg-white p-8">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-tyv-sky/15 text-tyv-sky">
                <BriefcaseBusiness className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-tyv-navy">
                {o.formationsTitle}
              </h3>
              <p className="mt-2 text-sm text-tyv-muted">{o.formationsSub}</p>
              <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                {o.formationsDomaines.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-tyv-text">
                    <Check className="mt-0.5 size-4 shrink-0 text-tyv-sky" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* L'inscription prend en compte */}
        <AnimatedSection className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-3xl bg-tyv-navy p-8 text-white sm:p-12">
            <h3 className="text-center font-display text-2xl font-bold sm:text-3xl">
              {o.inscriptionTitle}
            </h3>
            <ul className="mx-auto mt-8 grid max-w-4xl gap-x-8 gap-y-3 sm:grid-cols-2">
              {o.inscriptionInclut.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-white/90">
                  <Check className="mt-1 size-4 shrink-0 text-tyv-sky-light" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Button
                href={href("#contact")}
                variant="primary"
                size="lg"
                onClick={() => track({ event: "cta_devis_gratuit" })}
              >
                {o.ctaQuote}
              </Button>
            </div>

            {/* NB placé sous le CTA (demande client) */}
            <p className="mx-auto mt-8 flex max-w-3xl items-start gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/80">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {o.inscriptionNote}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
