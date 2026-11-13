import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de cookies — TYV",
  description:
    "Quels cookies utilise le site TYV (analytiques, marketing, fonctionnels) et comment les gérer ou les désactiver.",
  alternates: { canonical: `${site.url}/politique-cookies` },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-tyv-navy sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-tyv-muted">
        {children}
      </div>
    </section>
  );
}

export default function PolitiqueCookiesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
          Vie privée
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-5xl">
          Politique de cookies
        </h1>
        <p className="mt-4 text-sm text-tyv-muted">Dernière mise à jour : 2026</p>

        <Section title="1. Qu'est-ce qu'un cookie ?">
          <p>
            Un cookie est un petit fichier texte déposé sur votre appareil
            (ordinateur, tablette, smartphone) lors de la visite d&apos;un site
            web. Il permet au site de mémoriser certaines informations sur votre
            navigation afin d&apos;améliorer votre expérience et de mesurer
            l&apos;audience.
          </p>
        </Section>

        <Section title="2. Cookies utilisés sur ce site">
          <ul className="space-y-4">
            <li>
              <p className="font-semibold text-tyv-navy">
                Cookies analytiques — Google Analytics (GA4)
              </p>
              <p>
                Mesurent la fréquentation du site (pages vues, sessions, source
                de trafic) de façon agrégée.{" "}
                <span className="font-medium text-tyv-text">Désactivables</span>{" "}
                — ne sont déposés qu&apos;après votre acceptation.
              </p>
            </li>
            <li>
              <p className="font-semibold text-tyv-navy">
                Cookies marketing — Meta Pixel
              </p>
              <p>
                Permettent de mesurer l&apos;efficacité des campagnes
                publicitaires sur Meta (Facebook / Instagram).{" "}
                <span className="font-medium text-tyv-text">Désactivables</span>{" "}
                — ne sont déposés qu&apos;après votre acceptation.
              </p>
            </li>
            <li>
              <p className="font-semibold text-tyv-navy">
                Cookies fonctionnels — Calendly, formulaire de contact
              </p>
              <p>
                Nécessaires au bon fonctionnement de la prise de rendez-vous et
                de l&apos;envoi du formulaire.{" "}
                <span className="font-medium text-tyv-text">Nécessaires</span> —
                indispensables au service.
              </p>
            </li>
          </ul>
        </Section>

        <Section title="3. Comment désactiver les cookies ?">
          <p>
            Lors de votre première visite, un bandeau vous permet d&apos;accepter
            ou de refuser les cookies analytiques et marketing. Vous pouvez à
            tout moment modifier votre choix en vidant le stockage local de votre
            navigateur.
          </p>
          <p>
            Vous pouvez également configurer votre navigateur pour bloquer ou
            supprimer les cookies :
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Chrome : Paramètres → Confidentialité et sécurité → Cookies</li>
            <li>Safari : Préférences → Confidentialité</li>
            <li>Firefox : Paramètres → Vie privée et sécurité</li>
            <li>Edge : Paramètres → Cookies et autorisations de site</li>
          </ul>
        </Section>

        <Section title="4. En savoir plus">
          <p>
            Pour plus d&apos;informations sur le traitement de vos données,
            consultez nos{" "}
            <Link
              href="/mentions-legales"
              className="text-tyv-sky underline-offset-4 hover:underline"
            >
              mentions légales
            </Link>{" "}
            ou écrivez-nous à{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-tyv-sky underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
