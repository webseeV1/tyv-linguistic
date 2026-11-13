"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Plane, Target, HeartHandshake } from "lucide-react";
import { staggerItem } from "@/components/ui/AnimatedSection";
import { useI18n } from "@/i18n/useI18n";

// Stagger 0.15 s entre chaque card (spécifique à cette section).
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const icons = [Plane, Target, HeartHandshake];

export function ValueProps() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useI18n();
  const props = t.valueProps.map((p, i) => ({ ...p, icon: icons[i] }));

  return (
    <section className="bg-tyv-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.ul
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-6 md:grid-cols-3"
        >
          {props.map((p) => (
            <motion.li
              key={p.title}
              variants={staggerItem}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group rounded-3xl border border-transparent bg-white p-8 shadow-sm ring-1 ring-tyv-navy/5 transition-colors duration-300 hover:border-tyv-sky/50 hover:bg-[#F0F6FF] hover:shadow-xl hover:shadow-tyv-navy/5"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-tyv-sky/15 text-tyv-sky transition-all duration-300 group-hover:rotate-[10deg] group-hover:bg-tyv-sky/25 group-hover:text-tyv-navy">
                <p.icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-tyv-navy">
                {p.title}
              </h3>
              <p className="mt-2 leading-relaxed text-tyv-muted">{p.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
