# Maintenance — actions courantes

Après toute modification : `npm run lint && npm run typecheck && npm run build`, puis vérifier en local avec `npm run dev` (FR **et** EN).

## Changer un texte

- **Sans développeur** : l'espace `/admin` permet de modifier les textes principaux (FR et EN), le message WhatsApp, les coordonnées et les photos.
- **Dans le code** : modifier `src/i18n/fr.ts` **et** `src/i18n/en.ts` (mêmes clés dans les deux fichiers ; le typage signale tout oubli).

> Un texte modifié dans `/admin` prend le pas sur celui du code. Si une modification du code « ne s'affiche pas », vérifier qu'elle n'est pas masquée par une valeur enregistrée dans `/admin`.

## Remplacer une image

1. Déposer la nouvelle image dans `public/images/sections/` (JPG ou PNG optimisé, idéalement < 500 Ko), en gardant le nom du fichier remplacé pour ne rien avoir d'autre à changer ;
2. ou, pour un nouveau nom, mettre à jour la référence dans `src/content/shared.ts` (`sharedDefaults.images`).

Le logo est dans `public/images/` (`tyv-logo.png`, version complète ; `tyv-logo-mark.png`, sans baseline). Sur fond sombre, le logo conserve ses couleurs d'origine sur un cartouche blanc (`src/components/ui/Logo.tsx`).

## Modifier un contact (e-mail, téléphone, adresse)

Dans `src/lib/site.ts` : `email`, `phones` (affichage + `number` au format international sans « + »), `address`. La page Mentions légales et le pied de page reprennent ces valeurs automatiquement.

## Modifier WhatsApp

- Numéros : `src/lib/site.ts` (`whatsapp` pour le numéro principal, `phones[].number` pour chaque numéro affiché).
- Message prérempli : `whatsapp.message` dans `src/i18n/fr.ts` et `en.ts` (ou le champ « Message WhatsApp » de `/admin`).

## Modifier un réseau social

Dans `src/lib/site.ts`, objet `social` : `instagram`, `facebook`, `tiktok`. Une valeur vide (`""`) masque le réseau dans le pied de page et dans la section « Communauté ». Le libellé affiché de chaque carte (`@compte`) se règle dans `community.cards` de `fr.ts` / `en.ts`.

## Modifier un programme, une offre, la FAQ

Textes dans `src/i18n/fr.ts` / `en.ts` (clés `offres` — cours, formations, stages, logements, activités —, `faq`, `howItWorks`…), structure dans `src/components/sections/Offres.tsx` et `FAQ.tsx`.

## Ajouter ou modifier un article de blog

Éditer le tableau `articles` dans `src/data/blog.ts` (un `slug` unique par article). Les articles et témoignages actuellement présents sont des **contenus d'exemple** à remplacer par du contenu réel. Le sitemap est mis à jour automatiquement.

## Modifier l'adresse qui reçoit les demandes du formulaire

Variable d'environnement `CONTACT_TO_EMAIL` dans l'hébergeur (voir `.env.example`). Aucun changement de code.

## Activer les statistiques

Renseigner `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` ou `NEXT_PUBLIC_CLARITY_ID` dans l'hébergeur puis redéployer (ces variables sont lues au build).

## Tester

- `npm run dev` : développement local (<http://localhost:3000>) ;
- `npm run build && npm run start` : rendu identique à la production ;
- parcours à contrôler : accueil FR et EN, sélecteur de langue, formulaire de contact, boutons WhatsApp et Calendly, liens réseaux sociaux, blog, mentions légales, bannière cookies, mobile (≈ 375 px) et bureau.

## Déployer

Le déploiement dépend de l'hébergeur (Netlify actuellement, voir `netlify.toml`) : `npm run build` est la commande de build. Ne jamais committer de fichier `.env*` (hors `.env.example`).
