# Architecture

## Vue d'ensemble

Site **Next.js 16 (App Router)** quasi entièrement statique : la page d'accueil et sa version anglaise sont pré-rendues et re-générées au plus toutes les 60 secondes (`revalidate = 60`). Seules les routes `/admin*` et `/api/*` sont dynamiques.

Pas de base de données : le contenu de référence est dans le code ; les modifications faites par TYV depuis `/admin` sont stockées dans **Netlify Blobs** et appliquées par-dessus.

## Routes

| Route | Fichier | Rôle |
|---|---|---|
| `/` | `src/app/(site)/page.tsx` | Accueil en français |
| `/en` | `src/app/(site)/en/page.tsx` | Accueil en anglais |
| `/blog`, `/blog/[slug]` | `src/app/(site)/blog/…` | Blog (français uniquement), contenu dans `src/data/blog.ts` |
| `/mentions-legales`, `/politique-cookies` | `src/app/(site)/…` | Pages légales (français) |
| `/admin`, `/admin/login` | `src/app/admin/…` | Espace d'administration protégé par mot de passe |
| `/api/contact` | `src/app/api/contact/route.ts` | Formulaire de contact → e-mail (Resend) |
| `/api/admin/login`, `/api/admin/content`, `/api/admin/media` | `src/app/api/admin/…` | Connexion, enregistrement des textes, téléversement des photos |
| `/api/media/[key]` | `src/app/api/media/[key]/route.ts` | Sert les photos téléversées depuis `/admin` |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `robots.ts` | SEO (`/admin` et `/api/` exclus de l'indexation) |

Les pages publiques sont regroupées dans le groupe de routes `src/app/(site)/` : leurs URL ne changent pas, mais `/admin` n'hérite ainsi pas de la barre de navigation ni du pied de page.

## Page d'accueil

`src/components/HomeSections.tsx` assemble, dans l'ordre, les sections de `src/components/sections/` : Hero, Stats, ValueProps, Offres, HowItWorks, WhyGhana, APropos, Testimonials, FAQ, Contact, Community. Le gabarit commun (navigation, pied de page, bulle WhatsApp, bannière cookies, scripts) est dans `src/app/(site)/layout.tsx`.

## Langues (FR / EN)

Internationalisation maison, sans bibliothèque :

- `src/i18n/fr.ts` est la source du type `Dict` ; `src/i18n/en.ts` doit avoir exactement la même forme (TypeScript le vérifie) ;
- `useI18n()` (`src/i18n/useI18n.ts`) déduit la langue de l'URL : `/en` et `/en/…` = anglais, tout le reste = français ;
- un sélecteur FR / EN est dans la barre de navigation ; `HtmlLang` ajuste l'attribut `lang` de `<html>` côté client sur `/en` ;
- `hreflang` et `canonical` sont déclarés dans `src/app/layout.tsx` et dans les pages.

## Contenu modifiable (`/admin`)

`src/content/` implémente une surcouche de contenu :

1. `schema.ts` — **liste blanche** des champs éditables (textes de chaque langue, photos, coordonnées). Ce qui n'y figure pas n'est pas modifiable depuis `/admin`.
2. `store.ts` — lecture/écriture : Netlify Blobs en production (stores `tyv-content` et `tyv-media`), dossier `.content-dev/` en local.
3. `apply.ts` / `shared.ts` — applique les valeurs enregistrées par-dessus les dictionnaires i18n et les valeurs communes (`sharedDefaults`) ; sans valeur enregistrée, le site affiche le contenu du code.
4. `ContentProvider.tsx` — le gabarit `(site)/layout.tsx` lit les valeurs une fois et les diffuse aux sections.
5. À l'enregistrement, `revalidatePath` republie immédiatement `/` et `/en`.

Authentification (`src/lib/admin-auth.ts`) : `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET` ; cookie `HttpOnly` signé HMAC-SHA256, valable 7 jours. Sans ces variables, `/admin` est désactivé.

## Formulaire de contact

`Contact.tsx` envoie en `POST` JSON vers `/api/contact` les champs `firstName`, `email`, `phone`, `pack`, `message` (+ champ piège anti-spam `company`, qui doit rester vide). La route valide les champs obligatoires et le format de l'e-mail, puis envoie un e-mail via **Resend** à `CONTACT_TO_EMAIL` (expéditeur `CONTACT_FROM_EMAIL`, `replyTo` = e-mail du visiteur). Sans clé Resend, elle répond OK sans envoyer (journal serveur).

## Contact direct

- **WhatsApp** : liens `https://wa.me/<numéro>?text=<message>` construits par `waLink()` dans `src/lib/site.ts` ; le message d'accueil vient du dictionnaire (`whatsapp.message`).
- **Calendly** : widget externe chargé dans le gabarit ; `src/lib/calendly.ts` ajoute une campagne UTM selon l'emplacement du bouton.

## Analytics et cookies

`src/components/analytics/` : GTM et Clarity s'activent si leur identifiant est défini ; GA4 et Meta Pixel ne se chargent qu'après acceptation dans la bannière cookies (`consent.ts`, stocké en `localStorage`). Les événements (clics CTA, profondeur de scroll) passent par `track()` dans `src/lib/analytics.ts` (dataLayer GTM).

## Styles

Tailwind CSS 4, sans `tailwind.config` : les couleurs de la marque (`tyv-navy`, `tyv-sky`…) et les polices (Playfair Display pour les titres, DM Sans pour le texte) sont déclarées dans `src/app/globals.css` (`@theme`) et `src/app/layout.tsx`.

## Déploiement

`netlify.toml` : `npm run build`, Node 20, plugin `@netlify/plugin-nextjs`. En-têtes de sécurité HTTP définis dans `next.config.ts`.
