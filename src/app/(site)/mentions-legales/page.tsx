import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales — TYV",
  description:
    "Mentions légales du site TYV (Tell Us Your Vision) : éditeur, hébergeur, propriété intellectuelle et protection des données personnelles.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${site.url}/mentions-legales` },
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

// TODO: compléter avec les informations légales réelles de la société.
export default function MentionsLegalesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
          Informations légales
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-5xl">
          Mentions légales
        </h1>
        <p className="mt-4 text-sm text-tyv-muted">
          Dernière mise à jour : 2026
        </p>

        <Section title="1. Éditeur du site">
          <p>
            Le présent site est édité par <strong>TYV — Tell Us Your Vision</strong>.
          </p>
          <p>
            Siège social : {site.address}
            <br />
            E-mail :{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-tyv-sky underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            <br />
            {site.phones.map((p) => (
              <span key={p.display}>
                Téléphone ({p.label}) : {p.display}
                <br />
              </span>
            ))}
            Directeur de la publication : <strong>{site.author}</strong>
          </p>
          <p>
            Conception et réalisation du site :{" "}
            <a
              href={site.builder.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tyv-sky underline-offset-4 hover:underline"
            >
              {site.builder.name}
            </a>
            .
          </p>
        </Section>

        <Section title="2. Hébergement">
          <p>
            Le site est hébergé par <strong>Hostinger International Ltd</strong> —
            61 Lordou Vironos Street, 6023 Larnaca, Chypre — {""}
            <a
              href="https://www.hostinger.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tyv-sky underline-offset-4 hover:underline"
            >
              hostinger.fr
            </a>
            .
          </p>
        </Section>

        <Section title="3. Propriété intellectuelle">
          <p>
            L&apos;ensemble des éléments du site (textes, logo TYV, visuels,
            graphismes, structure) est la propriété exclusive de TYV ou de ses
            partenaires, et est protégé par le droit de la propriété
            intellectuelle. Toute reproduction, représentation ou diffusion,
            totale ou partielle, sans autorisation écrite préalable, est
            interdite et constitue une contrefaçon.
          </p>
        </Section>

        <Section title="4. Données personnelles (RGPD)">
          <p>
            Les informations transmises via les formulaires de contact (prénom,
            e-mail, téléphone, message) sont collectées dans le seul but de
            répondre à votre demande et de vous accompagner dans votre projet de
            séjour. Elles ne sont jamais revendues ni cédées à des tiers à des
            fins commerciales, et sont conservées pendant une durée maximale de{" "}
            <strong>3 ans</strong> à compter du dernier contact.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD) et à la réglementation applicable, vous disposez d&apos;un
            droit d&apos;accès, de rectification, d&apos;opposition et de
            suppression des données vous concernant. Pour exercer ces droits,
            écrivez-nous à{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-tyv-sky underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </Section>

        <Section title="5. Cookies et mesure d'audience">
          <p>
            Le site utilise des outils de mesure d&apos;audience et de marketing
            (Google Analytics, Google Tag Manager, Meta Pixel, Microsoft
            Clarity) susceptibles de déposer des cookies. Vous pouvez configurer
            votre navigateur pour refuser les cookies ou être informé de leur
            dépôt. Pour en savoir plus, consultez notre{" "}
            <Link
              href="/politique-cookies"
              className="text-tyv-sky underline-offset-4 hover:underline"
            >
              politique de cookies
            </Link>
            .
          </p>
        </Section>

        <Section title="6. Responsabilité">
          <p>
            TYV s&apos;efforce d&apos;assurer l&apos;exactitude des informations
            diffusées sur le site, sans toutefois garantir qu&apos;elles soient
            exhaustives ou exemptes d&apos;erreurs. Les informations relatives
            aux packs et tarifs sont fournies à titre indicatif et font
            l&apos;objet d&apos;un devis personnalisé.
          </p>
        </Section>
      </div>
    </div>
  );
}
