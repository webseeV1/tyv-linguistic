"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Languages, TrendingUp, GraduationCap, MapPin } from "lucide-react";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/ui/AnimatedSection";
import { useI18n } from "@/i18n/useI18n";

const reasonIcons = [ShieldCheck, Languages, TrendingUp, GraduationCap];

export function WhyGhana() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useI18n();
  const reasons = t.whyGhana.reasons.map((r, i) => ({ ...r, icon: reasonIcons[i] }));

  return (
    <section id="ghana" className="scroll-mt-20 bg-tyv-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky-light">
              {t.whyGhana.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
              {t.whyGhana.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {t.whyGhana.lead}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
              <MapPin className="size-7 shrink-0 text-tyv-sky-light" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-sm text-white/80">{t.whyGhana.badge}</span>
            </div>
          </AnimatedSection>

          <motion.ul
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid gap-5 sm:grid-cols-2"
          >
            {reasons.map((r) => (
              <motion.li
                key={r.title}
                variants={staggerItem}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-tyv-sky/20 text-tyv-sky-light">
                  <r.icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {r.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
