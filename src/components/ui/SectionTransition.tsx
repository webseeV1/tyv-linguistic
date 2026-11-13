"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const COLORS = {
  navy: "#1B2E5E",
  white: "#FFFFFF",
  bg: "#F8FAFF",
} as const;

type Tone = keyof typeof COLORS;

/**
 * Bande de dégradé entre deux sections de couleurs différentes.
 * Parallax léger (transform uniquement) → désactivé si `prefers-reduced-motion`.
 */
export function SectionTransition({
  from,
  to,
  height = 96,
}: {
  from: Tone;
  to: Tone;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative overflow-hidden"
      style={{ height }}
    >
      <motion.div
        style={{
          y,
          background: `linear-gradient(to bottom, ${COLORS[from]}, ${COLORS[from]} 12%, ${COLORS[to]} 88%, ${COLORS[to]})`,
          willChange: "transform",
        }}
        className="absolute inset-x-0 -top-[16%] -bottom-[16%] motion-reduce:!translate-y-0"
      />
    </div>
  );
}
