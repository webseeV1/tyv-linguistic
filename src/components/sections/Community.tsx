"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site } from "@/lib/site";
import { useI18n } from "@/i18n/useI18n";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Community() {
  const { t } = useI18n();
  // Un réseau dont l'URL n'est pas renseignée dans site.ts n'est pas affiché.
  const cards = t.community.cards
    .map((c) => ({ ...c, href: site.social[c.key] }))
    .filter((c) => c.href !== "");

  return (
    <section id="communaute" className="bg-tyv-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold sm:text-5xl">
            {t.community.title}
          </h2>
          <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-1.5 text-lg text-white/75">
            {t.community.subtitle}
            <Plane className="size-5 text-tyv-sky-light" aria-hidden="true" />
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 flex flex-wrap justify-center gap-6"
        >
          {cards.map((c) => (
            <motion.div
              key={c.key}
              variants={item}
              className="flex w-full flex-col rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 transition-colors hover:bg-white/10 sm:w-[calc((100%-3rem)/3)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-tyv-sky/20 text-tyv-sky-light">
                  <SocialIcon name={c.key} className="size-6" />
                </span>
                <span className="font-display text-xl font-bold">{c.handle}</span>
              </div>
              <p className="mt-5 flex-1 text-white/75">{c.text}</p>
              <Button
                href={c.href}
                external
                variant="outline-light"
                size="md"
                className="mt-6 w-full"
              >
                {c.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
