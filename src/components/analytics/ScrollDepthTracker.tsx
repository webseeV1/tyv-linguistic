"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

/**
 * Pousse un event `scroll_depth` dans le dataLayer à 25 / 50 / 75 / 100 %
 * de profondeur de page, une seule fois chacun.
 */
export function ScrollDepthTracker() {
  useEffect(() => {
    const fired = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;

      for (const t of THRESHOLDS) {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          track({ event: "scroll_depth", pourcentage: t });
        }
      }
      if (fired.size === THRESHOLDS.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
