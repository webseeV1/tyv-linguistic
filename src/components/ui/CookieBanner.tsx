"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getConsent, setConsent } from "@/components/analytics/consent";
import { useI18n } from "@/i18n/useI18n";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    // Affiché uniquement si aucun choix n'a encore été enregistré. Le choix
    // vit dans localStorage (inaccessible au rendu serveur) : on ne peut le lire
    // qu'après le montage, d'où le setState dans l'effet.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (getConsent() === null) setVisible(true);
  }, []);

  const choose = (value: "accepted" | "refused") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label={t.cookies.aria}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-white p-5 shadow-2xl shadow-black/20 ring-1 ring-tyv-navy/10 sm:right-auto sm:max-w-md"
        >
          <p className="text-sm leading-relaxed text-tyv-text">
            {t.cookies.text}{" "}
            <Link
              href="/politique-cookies"
              className="font-medium text-tyv-sky underline-offset-4 hover:underline"
            >
              {t.cookies.more}
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="flex-1 rounded-full bg-tyv-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tyv-navy-light"
            >
              {t.cookies.accept}
            </button>
            <button
              type="button"
              onClick={() => choose("refused")}
              className="flex-1 rounded-full border-2 border-tyv-navy px-4 py-2.5 text-sm font-semibold text-tyv-navy transition-colors hover:bg-tyv-navy hover:text-white"
            >
              {t.cookies.refuse}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
