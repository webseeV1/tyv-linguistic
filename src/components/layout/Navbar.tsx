"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/useI18n";
import { homeHref } from "@/i18n";
import { track } from "@/lib/analytics";
import { calendlyUrl, openCalendlyPopup } from "@/lib/calendly";

const NAVBAR_CALENDLY = calendlyUrl("navbar");

function bookCall(
  emplacement: "navbar" | "hero" | "menu_mobile",
  e: React.MouseEvent,
) {
  track({ event: "cta_reserver_appel", emplacement });
  // Ouvre le modal Calendly si le script est prêt, sinon laisse le lien (nouvel onglet).
  if (openCalendlyPopup(NAVBAR_CALENDLY)) e.preventDefault();
}

const navLinkClass =
  "group relative whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-white";
const underline =
  "pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-tyv-sky-light transition-transform duration-300 ease-out group-hover:scale-x-100";

/** Sélecteur de langue FR | EN — bascule entre `/` et `/en`. */
function LangSwitch({
  onNavigate,
  className = "",
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const { locale, t } = useI18n();

  return (
    <div
      className={`flex items-center overflow-hidden rounded-full border border-white/25 text-[11px] font-bold uppercase tracking-wider ${className}`}
      aria-label={t.nav.langSwitch}
    >
      {(["fr", "en"] as const).map((l) => (
        <Link
          key={l}
          href={homeHref(l)}
          onClick={onNavigate}
          aria-current={locale === l ? "true" : undefined}
          className={`px-2.5 py-1.5 transition-colors ${
            locale === l
              ? "bg-white text-tyv-navy"
              : "text-white/75 hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, href } = useI18n();
  const isHome = pathname === "/" || pathname === "/en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fond plein dès qu'on scrolle, que le menu est ouvert, ou hors page d'accueil
  // (les pages internes n'ont pas de hero sombre).
  const solid = scrolled || open || !isHome;

  const links = t.nav.links.map((link) => ({
    ...link,
    url: link.href ?? href(link.hash),
  }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-tyv-navy/95 backdrop-blur-md shadow-lg shadow-tyv-navy/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={href()} aria-label={t.nav.homeAria} className="flex min-w-0 items-center">
          {/* Logo original (fond blanc, globe + avion bleus) — la baseline est dans l'image */}
          <Logo onDark variant="full" priority className="h-9 w-auto sm:h-11" />
        </Link>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-5 xl:gap-7 xl:flex">
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.url} className={navLinkClass}>
                {link.label}
                <span className={underline} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <LangSwitch />
          <Button
            href={NAVBAR_CALENDLY}
            external
            size="md"
            className="whitespace-nowrap"
            onClick={(e) => bookCall("navbar", e)}
          >
            {t.nav.bookCall}
          </Button>
        </div>

        {/* Sélecteur de langue + burger mobile */}
        <div className="flex shrink-0 items-center gap-3 xl:hidden">
          <LangSwitch />
          <button
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex size-11 items-center justify-center rounded-lg text-white"
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-6 flex-col items-end gap-1.5">
              <motion.span
                animate={open ? { rotate: 45, y: 7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                className="block h-0.5 w-full rounded bg-current"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1, width: "75%" }}
                className="block h-0.5 w-3/4 rounded bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "50%" }}
                className="block h-0.5 w-1/2 rounded bg-current"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Panneau mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-tyv-navy xl:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pb-6 pt-2">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3.5 text-base font-medium uppercase tracking-wide text-white/90 transition-colors hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 px-1">
                <Button
                  href={NAVBAR_CALENDLY}
                  external
                  size="lg"
                  className="w-full"
                  onClick={(e) => {
                    bookCall("menu_mobile", e);
                    setOpen(false);
                  }}
                >
                  {t.nav.bookCallFree}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
