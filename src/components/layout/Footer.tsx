"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site, waLink } from "@/lib/site";
import { socialLinks } from "@/lib/socials";
import { useShared } from "@/content/ContentProvider";
import { useI18n } from "@/i18n/useI18n";

export function Footer() {
  const { t, href } = useI18n();
  const shared = useShared();
  const socials = socialLinks(t.whatsapp.message);

  return (
    <footer className="bg-tyv-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div>
            <Logo onDark variant="full" className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {t.footer.blurb}
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-tyv-sky"
                >
                  <SocialIcon name={s.key} className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label={t.footer.navAria}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-tyv-sky-light">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {t.nav.links.map((l) => (
                <li key={l.id}>
                  <Link
                    href={l.href ?? href(l.hash)}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Offres */}
          <nav aria-label={t.footer.offersAria}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-tyv-sky-light">
              {t.footer.offersTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {t.footer.offers.map((label) => (
                <li key={label}>
                  <Link
                    href={href("#offres")}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-tyv-sky-light">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a
                  href={`mailto:${shared.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {shared.contact.email}
                </a>
              </li>
              {shared.contact.phones.map((p) => (
                <li key={p.label}>
                  <a
                    href={waLink(p.number, t.whatsapp.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {p.label} : {p.display}
                  </a>
                </li>
              ))}
              <li className="text-white/60">{shared.contact.address}</li>
              <li>
                <a
                  href={site.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {t.footer.bookCall}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-white">
              {t.footer.legal}
            </Link>
            <Link href="/mentions-legales" className="hover:text-white">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
