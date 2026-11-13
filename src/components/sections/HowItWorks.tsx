"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, ClipboardList, PlaneTakeoff, Languages } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useI18n } from "@/i18n/useI18n";

const stepIcons = [MessageCircle, ClipboardList, PlaneTakeoff, Languages];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [mobile, setMobile] = useState(false);
  const { t } = useI18n();
  const steps = t.howItWorks.steps.map((s, i) => ({ ...s, icon: stepIcons[i] }));

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop : slide depuis la droite · Mobile : slide depuis le bas
  const item = {
    hidden: { opacity: 0, x: mobile ? 0 : 40, y: mobile ? 30 : 0 },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="comment" className="scroll-mt-20 bg-tyv-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
            {t.howItWorks.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-5xl">
            {t.howItWorks.title}
          </h2>
        </AnimatedSection>

        <motion.ol
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6"
        >
          {/* Connecteur animé qui se dessine de gauche à droite (desktop) */}
          <svg
            className="absolute left-0 top-7 hidden h-2 w-full lg:block"
            viewBox="0 0 1000 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.line
              x1="0"
              y1="4"
              x2="1000"
              y2="4"
              stroke="#5B9BD5"
              strokeWidth="2"
              strokeOpacity="0.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
            />
          </svg>

          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={item}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative flex flex-col items-center rounded-2xl p-4 text-center transition-shadow duration-300 hover:bg-white hover:shadow-lg hover:shadow-tyv-navy/5"
            >
              <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-tyv-navy text-white shadow-lg shadow-tyv-navy/20 ring-4 ring-tyv-bg">
                <step.icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-tyv-sky">
                {t.howItWorks.stepLabel} {i + 1}
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-tyv-navy">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-tyv-muted">
                {step.text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
