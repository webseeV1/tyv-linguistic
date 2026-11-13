"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useI18n } from "@/i18n/useI18n";

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div className="border-b border-tyv-navy/10">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-semibold text-tyv-navy">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-tyv-sky/15 text-lg leading-none text-tyv-sky"
            aria-hidden="true"
          >
            +
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 text-justify leading-relaxed text-tyv-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
            {t.faq.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-5xl">
            {t.faq.title}
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-12">
          {t.faq.items.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
