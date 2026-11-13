"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/i18n/useI18n";

type Stat = {
  to?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  label: string;
};

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || stat.to === undefined) return;
    const target = stat.to;
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.to]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col items-center"
    >
      {/* Les stats texte (« Sur mesure ») sont réduites pour rester sur une ligne,
          à la même hauteur visuelle que les chiffres (demande client). */}
      <span
        className={`flex items-center whitespace-nowrap font-display font-bold text-tyv-sky ${
          stat.text
            ? "min-h-10 text-2xl sm:min-h-12 sm:text-3xl"
            : "text-4xl sm:text-5xl"
        }`}
      >
        {stat.text ?? (
          <>
            {stat.prefix}
            {val}
            {stat.suffix}
          </>
        )}
      </span>
      <span className="mt-1 text-sm font-medium text-white/90">{stat.label}</span>
    </motion.div>
  );
}

export function Stats() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t.stats.aria}
      className="relative isolate overflow-hidden bg-tyv-navy"
    >
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 px-4 pb-28 pt-14 text-center sm:grid-cols-3 sm:px-6 sm:pb-32">
        {t.stats.items.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} />
        ))}
      </div>

      {/* Vague organique → transition douce vers la section claire (#F8FAFF) */}
      <div className="pointer-events-none absolute bottom-0 left-[-5%] w-[110%] leading-[0]">
        <svg
          className="tyv-wave block h-[52px] w-full sm:h-[90px]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#F8FAFF"
            d="M0,52 C180,100 360,12 540,46 C720,80 900,18 1080,54 C1260,88 1380,42 1440,56 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
}
