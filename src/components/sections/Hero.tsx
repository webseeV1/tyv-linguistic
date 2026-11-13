"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/useI18n";
import { useShared } from "@/content/ContentProvider";
import { track } from "@/lib/analytics";

export function Hero() {
  const { t, href } = useI18n();
  const shared = useShared();

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-tyv-navy"
    >
      {/* Fond navy + halos bleus discrets — la photo reste pleinement visible à droite */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-[-15%] size-[520px] rounded-full bg-tyv-sky/10 blur-3xl" />
        <div className="absolute bottom-[-25%] right-[-10%] size-[560px] rounded-full bg-tyv-sky/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pt-32">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-3xl font-bold leading-[1.2] text-white sm:text-4xl lg:text-5xl"
          >
            {t.hero.titleBefore}
            {/* « gérés de A à Z » sur sa propre ligne, sous « immersifs » (demande client) */}
            <span className="block text-tyv-sky-light">
              {t.hero.titleHighlight}
              <span className="text-white">{t.hero.titleAfter}</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Button href={href("#offres")} variant="primary" size="lg">
              {t.hero.ctaOffers}
            </Button>
            <Button
              href={href("#contact")}
              variant="outline-light"
              size="lg"
              onClick={() => track({ event: "cta_devis_gratuit" })}
            >
              {t.hero.ctaQuote}
            </Button>
          </motion.div>
        </div>

        {/* Photo des étudiants TYV — entière, sans voile sombre, légèrement éclaircie */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ring-1 ring-white/15">
            <Image
              src={shared.images.hero}
              alt="Étudiants TYV sur un campus à Accra"
              width={1068}
              height={937}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-auto w-full brightness-110 saturate-[1.05]"
            />
          </div>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.a
        href="#offres"
        aria-label={t.hero.scrollAria}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5"
        >
          <span className="block size-1.5 rounded-full bg-white/80" />
        </motion.span>
      </motion.a>
    </section>
  );
}
