"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** balise de rendu (section, div, li…) */
  as?: "div" | "section" | "li" | "article";
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  as = "div",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* Variants partagés pour les listes en stagger */
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
