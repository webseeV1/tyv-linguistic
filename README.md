# TYV Linguistic

Site vitrine bilingue (français / anglais) de **TYV — Tell Us Your Vision**, agence de séjours linguistiques et éducatifs au Ghana pour un public francophone : cours d'anglais, formations professionnelles, stages d'immersion, logement et activités.

- **Production** : <https://tyvlinguistic.com>
- **Hébergement actuel** : Netlify (voir [Production](#production))

## Technologies

| Technologie | Rôle |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router, Turbopack) | Framework : routage, rendu serveur/statique, routes API |
| [React 19](https://react.dev) + TypeScript | Interface et typage |
| [Tailwind CSS 4](https://tailwindcss.com) | Styles (couleurs de la marque dans `src/app/globals.css`, bloc `@theme`) |
| [Framer Motion](https://www.framer.com/motion/) | Animations d'apparition et transitions |
| [lucide-react](https://lucide.dev) | Icônes |
| [Resend](https://resend.com) | Envoi par e-mail des demandes du formulaire de contact |
| [Netlify Blobs](https://docs.netlify.com/blobs/overview/) (`@netlify/blobs`) | Stockage des contenus modifiés depuis l'espace `/admin` |
| [Calendly](https://calendly.com) (widget externe) | Prise de rendez-vous de 30 min |
| `@next/third-parties` | Google Tag Manager (optionnel) |

Il n'y a **pas de base de données** : le contenu vit dans le code (dictionnaires de traduction) et, pour les modifications faites depuis `/admin`, dans Netlify Blobs.

## Prérequis

- Node.js **20.9 ou plus** (version utilisée en production : 20, voir `.nvmrc` et `netlify.toml`)
- npm (le projet est verrouillé avec `package-lock.json`)

## Installation

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs utiles (voir ci-dessous)
```

## Lancement local

```bash
npm run dev
```

Le site est servi sur <http://localhost:3000>. Aucune variable d'environnement n'est obligatoire en local :

- sans `RESEND_API_KEY`, le formulaire de contact répond « OK » mais n'envoie aucun e-mail (un avertissement est écrit dans la console du serveur) ;
- sans `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`, `/admin` affiche « espace non activé » ;
- hors Netlify, les modifications de `/admin` sont écrites dans `.content-dev/` (ignoré par Git).

## Vérifications et build

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run build       # build de production (Next.js)
npm run start       # sert le build de production
```

Il n'y a pas de suite de tests automatisés : les contrôles sont le lint, le typage et le build.

## Variables d'environnement

Voir `.env.example` (noms uniquement, aucune valeur sensible dans Git).

| Variable | Usage | Obligatoire |
|---|---|---|
| `RESEND_API_KEY` | Clé API Resend du formulaire de contact | Pour l'envoi réel d'e-mails |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les demandes | Pour l'envoi réel d'e-mails |
| `CONTACT_FROM_EMAIL` | Expéditeur (domaine vérifié dans Resend) | Non (défaut : `TYV <onboarding@resend.dev>`) |
| `ADMIN_PASSWORD` | Mot de passe de l'espace `/admin` | Pour activer `/admin` |
| `ADMIN_SESSION_SECRET` | Clé de signature du cookie de session admin (32+ caractères) | Pour activer `/admin` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | Non |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (après consentement cookies) | Non |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (après consentement cookies) | Non |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity | Non |

## Structure du projet

```
src/
├── app/
│   ├── (site)/          Pages publiques : accueil (/), anglais (/en), blog, mentions légales, cookies
│   ├── admin/           Espace d'administration (/admin) : édition des textes et photos
│   ├── api/             Routes API : contact, admin (login, contenu, médias), service des médias
│   ├── layout.tsx       Métadonnées globales, polices
│   ├── robots.ts · sitemap.ts
│   └── globals.css      Styles globaux et couleurs de la marque
├── components/
│   ├── sections/        Sections de la page d'accueil (Hero, Offres, Contact, FAQ, Community…)
│   ├── layout/          Navbar, Footer
│   ├── ui/              Éléments réutilisables (Button, Logo, bannière cookies, bulle WhatsApp…)
│   └── analytics/       GTM, GA4, Meta Pixel, Clarity (soumis au consentement)
├── content/             Couche « contenu modifiable » alimentant /admin (liste blanche de champs)
├── data/blog.ts         Articles du blog
├── i18n/                Traductions : fr.ts (source du type) et en.ts
└── lib/                 site.ts (coordonnées, réseaux, WhatsApp), socials.ts, calendly.ts, analytics.ts, admin-auth.ts
public/images/           Logo et photos du site
```

## Où trouver quoi

| Besoin | Emplacement |
|---|---|
| Textes des pages (FR / EN) | `src/i18n/fr.ts` et `src/i18n/en.ts` |
| Coordonnées, WhatsApp, Calendly, réseaux sociaux | `src/lib/site.ts` |
| Images | `public/images/` (références dans `src/content/shared.ts`) |
| Formulaire de contact | `src/components/sections/Contact.tsx` + `src/app/api/contact/route.ts` |
| Articles du blog | `src/data/blog.ts` |
| Couleurs et polices | `src/app/globals.css` (`@theme`) et `src/app/layout.tsx` |

Détails : [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) et [docs/MAINTENANCE.md](docs/MAINTENANCE.md).

## Services externes

- **Resend** — e-mails du formulaire de contact.
- **Netlify** — hébergement et stockage Netlify Blobs.
- **Calendly** — widget de prise de rendez-vous.
- **WhatsApp** — simples liens `wa.me` (aucune API).
- **Google Tag Manager / GA4 / Meta Pixel / Microsoft Clarity** — optionnels, activés uniquement si l'identifiant est défini.

## Production

Le site est hébergé sur **Netlify** (`netlify.toml` : commande `npm run build`, Node 20, plugin `@netlify/plugin-nextjs`). Les variables d'environnement de production sont définies dans l'interface Netlify, jamais dans ce dépôt.

## Maintenance

Procédures courantes (changer un texte, une image, un numéro, un réseau social…) : [docs/MAINTENANCE.md](docs/MAINTENANCE.md).
