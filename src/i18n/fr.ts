/**
 * Dictionnaire français — source de vérité pour la structure (`Dict`).
 * Toute clé ajoutée ici doit exister aussi dans `en.ts`.
 */
export const fr = {
  nav: {
    links: [
      { id: "offres", hash: "#offres", label: "Nos offres" },
      { id: "comment", hash: "#comment", label: "Comment ça marche" },
      { id: "ghana", hash: "#ghana", label: "Pourquoi le Ghana" },
      { id: "a-propos", hash: "#a-propos", label: "À propos" },
      { id: "contact", hash: "#contact", label: "Contact" },
      { id: "blog", href: "/blog", label: "Blog" },
    ] as { id: string; hash?: string; href?: string; label: string }[],
    bookCall: "Réserver un appel",
    bookCallFree: "Réserver un appel gratuit",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    homeAria: "TYV — Accueil",
    langSwitch: "Switch to English",
  },

  hero: {
    titleBefore: "Des séjours linguistiques immersifs, ",
    titleHighlight: "gérés de A à Z",
    titleAfter: ".",
    subtitle:
      "Cours d'anglais intensifs, formations professionnelles et stages d'immersion au Ghana.",
    ctaOffers: "Voir nos offres",
    ctaQuote: "Demander un devis personnalisé",
    scrollAria: "Faire défiler vers le bas",
  },

  stats: {
    aria: "Chiffres clés",
    items: [
      { to: 150, prefix: "+", label: "Personnes accompagnées" },
      { to: 100, suffix: "%", label: "Satisfaction client" },
      { text: "Sur mesure", label: "Des formules personnalisées" },
    ] as {
      to?: number;
      prefix?: string;
      suffix?: string;
      text?: string;
      label: string;
    }[],
  },

  valueProps: [
    {
      title: "Tout inclus",
      text: "Transport en car, billet aller-retour, logement, scolarité, activités mensuelles. Tu arrives, on s'occupe du reste.",
    },
    {
      title: "Sur mesure",
      text: "Chaque séjour est adapté à tes objectifs et ton budget.",
    },
    {
      title: "Accompagné",
      text: "Un suivi personnalisé avant, pendant et après ton séjour.",
    },
  ],

  offres: {
    blocs: [
      {
        id: "cours",
        kicker: "Nos cours",
        phrase:
          "Devenez bilingue rapidement grâce à nos cours d'anglais intensifs, conçus pour une maîtrise totale de la langue.",
        images: [
          {
            src: "/images/sections/cours.jpg",
            alt: "Étudiants en cours d'anglais intensif à Accra",
          },
        ],
      },
      {
        id: "formations",
        kicker: "Nos formations",
        phrase:
          "Développez des compétences professionnelles reconnues grâce à nos formations dispensées en anglais, et préparez-vous à une carrière internationale.",
        images: [
          {
            src: "/images/sections/formations.jpg",
            alt: "Remise de diplômes d'une formation professionnelle",
          },
        ],
      },
      {
        id: "stages",
        kicker: "Nos stages d'immersion",
        phrase:
          "Développez votre anglais en situation réelle grâce à nos stages d'immersion en entreprise, au cœur du monde professionnel ghanéen.",
        images: [
          {
            src: "/images/sections/stages.jpg",
            alt: "Stagiaire en immersion dans une entreprise ghanéenne",
          },
        ],
      },
      {
        id: "logements",
        kicker: "Nos logements",
        phrase:
          "Profitez d'un logement étudiant confortable, sécurisé et soigneusement sélectionné, pour vous offrir les meilleures conditions de vie pendant votre séjour au Ghana.",
        images: [
          {
            src: "/images/sections/logements-1.jpg",
            alt: "Chambre étudiante partagée, lumineuse, avec espace de travail",
          },
          {
            src: "/images/sections/logements-2.jpg",
            alt: "Chambre étudiante individuelle avec bureau et coin étude",
          },
        ],
      },
      {
        id: "activites",
        kicker: "Nos activités mensuelles",
        phrase:
          "Chaque mois, les étudiants TYV participent à des activités d'immersion culturelle et professionnelle au Ghana : pratiquer l'anglais dans des situations réelles, développer la confiance à l'oral et découvrir la culture locale dans un cadre encadré et sécurisé.",
        images: [
          {
            src: "/images/sections/activites.jpg",
            alt: "Activités mensuelles TYV : soirée rooftop, visite du centre historique d'Accra, Labadi Beach et Accra Mall",
          },
        ],
      },
    ] as {
      id: string;
      kicker: string;
      phrase: string;
      images: { src: string; alt: string }[];
    }[],
    programmesKicker: "Nos programmes",
    programmesTitle: "Choisis le programme qui correspond à tes ambitions",
    programmesIntro:
      "Choisissez le programme qui correspond à vos ambitions : des cours d'anglais intensifs de 3, 6 ou 12 mois, ou une formation professionnelle dispensée en anglais de 3 à 24 mois par nos écoles partenaires, pour développer vos compétences et accélérer votre carrière à l'international. À l'issue de votre programme d'anglais, un certificat de fin de formation vous sera délivré. Les apprenants inscrits à une formation professionnelle recevront également un certificat délivré par notre école partenaire, attestant des compétences acquises.",
    coursTitle: "Cours d'anglais",
    coursSub: "Intensifs, en école de langue partenaire à Accra.",
    coursDurees: ["3 mois", "6 mois", "12 mois"],
    formationsTitle: "Formations professionnelles en anglais",
    formationsSub: "De 3 à 24 mois, certifiantes.",
    formationsDomaines: [
      "Banque & Finance",
      "Comptabilité",
      "Gestion d'entreprise",
      "Marketing Digital",
      "Logistique & Supply Chain",
      "Gestion de Projet",
      "Entrepreneuriat",
      "Informatique",
      "Analyse de Données (Data Analytics)",
      "Cybersécurité",
      "Développement Web",
      "Intelligence Artificielle",
    ],
    inscriptionTitle: "L'inscription prend en compte",
    inscriptionInclut: [
      "Transport aller-retour (selon le programme choisi)",
      "Accueil et accompagnement à votre arrivée à Accra",
      "Logement sécurisé",
      "Scolarité en école de langue ou formation professionnelle",
      "Fournitures scolaires",
      "Activités mensuelles organisées par TYV",
      "Stage d'immersion dans une entreprise partenaire",
      "Kit d'accueil TYV (badge + t-shirt)",
      "Suivi et accompagnement tout au long du séjour",
      "Certificat de fin de formation en anglais ou diplôme délivré par notre école partenaire (selon le programme suivi)",
    ],
    inscriptionNote:
      "NB : le stage d'immersion ne concerne pas le séjour de 3 mois.",
    ctaQuote: "Demander un devis personnalisé",
  },

  howItWorks: {
    kicker: "Simple & encadré",
    title: "Comment ça marche",
    stepLabel: "Étape",
    steps: [
      {
        title: "Entretien gratuit",
        text: "On découvre ensemble ton projet et tes objectifs.",
      },
      {
        title: "Ton programme sur mesure",
        text: "On te prépare un séjour adapté à toi.",
      },
      {
        title: "Tu décolles serein",
        text: "Tout est organisé, tu n'as qu'à partir.",
      },
      {
        title: "L'immersion commence",
        text: "Anglais, culture, rencontres, expériences.",
      },
    ],
  },

  whyGhana: {
    kicker: "La destination",
    title: "Pourquoi le Ghana ?",
    lead: "Le Ghana, c'est l'Afrique qui parle anglais.",
    badge: "Proche, accessible et 100 % anglophone.",
    reasons: [
      {
        title: "Pays stable et accueillant",
        text: "Une démocratie reconnue, sûre et chaleureuse.",
      },
      {
        title: "Anglophone officiel",
        text: "L'anglais au quotidien, partout, tout le temps.",
      },
      {
        title: "Hub économique",
        text: "Au cœur de l'Afrique de l'Ouest et de ses opportunités.",
      },
      {
        title: "Écoles reconnues",
        text: "Universités et centres de formation de qualité.",
      },
    ],
  },

  aPropos: {
    kicker: "À propos de TYV",
    title: "Linguistic Travel & Study Program",
    intro:
      "Fondé en 2020, TYV est né d'une vision ambitieuse : transformer l'apprentissage des langues en une expérience de vie immersive et professionnalisante. Nous bâtissons des ponts entre les cultures et les opportunités internationales depuis le cœur dynamique d'Accra, au Ghana.",
    ecoTitle: "Notre écosystème partenaire",
    ecoText:
      "La force de TYV réside dans son réseau d'excellence. Nous avons structuré notre offre autour de partenariats stratégiques avec des institutions privées de premier plan à Accra.",
    ecoCol1Title: "Académies linguistiques",
    ecoCol1Text:
      "Nos écoles partenaires dédiées à l'apprentissage de l'anglais utilisent des méthodes intensives, interactives et éprouvées.",
    ecoCol2Title: "Centres de formation professionnelle",
    ecoCol2Text:
      "Nous collaborons avec des établissements spécialisés proposant des cursus certifiants dans des secteurs clés : finance, marketing digital, gestion de projet, entrepreneuriat…",
    whyTitle: "Pourquoi choisir TYV ?",
    valeurs: [
      {
        title: "Immersion totale",
        text: "Vivre, apprendre et réseauter au Ghana pour une maîtrise naturelle de l'anglais.",
      },
      {
        title: "Double expertise",
        text: "Combinez une remise à niveau linguistique avec des compétences techniques immédiatement applicables.",
      },
      {
        title: "Environnement premium",
        text: "Nous sélectionnons nos partenaires pour la qualité de leurs infrastructures et leur engagement envers la réussite.",
      },
      {
        title: "Cadre sécurisé",
        text: "La sérénité des parents et des étudiants est notre priorité absolue, avec un suivi constant.",
      },
    ],
    quote:
      "« Que vous soyez un étudiant cherchant à enrichir son CV ou un professionnel en quête d'une dimension internationale, TYV vous offre un tremplin pour votre carrière. »",
    since:
      "Depuis 2020, nous évoluons pour répondre aux exigences d'un marché mondial en perpétuelle mutation.",
  },

  testimonials: {
    kicker: "Ils l'ont vécu",
    title: "Les témoignages",
    ratingAria: "Note 5 sur 5",
    items: [
      {
        name: "Aminata",
        city: "Abidjan",
        pack: "Séjour 6 mois",
        text: "En quelques mois j'ai pris une confiance folle en anglais. Tout était organisé, je n'ai eu qu'à profiter de l'expérience.",
      },
      {
        name: "Yann",
        city: "Dakar",
        pack: "Séjour 12 mois",
        text: "Le suivi avant le départ m'a rassuré. Sur place, l'équipe était toujours joignable. Une année qui a changé ma vie.",
      },
      {
        name: "Fatou",
        city: "Lomé",
        pack: "Séjour 3 mois",
        text: "Trois mois intenses et inoubliables. Le logement et les activités étaient parfaits. Je recommande à 100 %.",
      },
      {
        name: "Moussa",
        city: "Bamako",
        pack: "Formation professionnelle",
        text: "La formation en marketing digital, entièrement en anglais, m'a ouvert des portes que je n'imaginais pas. Le certificat a fait la différence sur mon CV.",
      },
      {
        name: "Awa",
        city: "Ouagadougou",
        pack: "Séjour 6 mois",
        text: "Le stage d'immersion en entreprise a tout changé : parler anglais toute la journée en situation réelle, c'est ça qui fait progresser.",
      },
      {
        name: "Kevin",
        city: "Lyon",
        pack: "Séjour 3 mois",
        text: "Accueilli dès l'aéroport, logé dans une super résidence, encadré du début à la fin. Une organisation vraiment sérieuse, les parents peuvent être tranquilles.",
      },
    ],
  },

  faq: {
    kicker: "Questions fréquentes",
    title: "On répond à tout",
    items: [
      {
        q: "Les repas sont-ils inclus dans le logement ?",
        a: "Non, les repas ne sont pas inclus dans le logement. Certaines écoles disposent de cantines sur place ; sinon, des restaurants et des marchés sont facilement accessibles à proximité.",
      },
      {
        q: "Est-ce qu'il faut un visa pour le Ghana ?",
        a: "Pas de visa pour les ressortissants d'Afrique de l'Ouest (CEDEAO) uniquement. Pour les autres nationalités, un visa est requis — on t'accompagne dans les démarches.",
      },
      {
        q: "Que se passe-t-il si j'ai un problème sur place ?",
        a: "Tu bénéficies d'un suivi personnalisé et d'un contact local joignable pendant tout ton séjour. Tu n'es jamais seul·e.",
      },
      {
        q: "Puis-je personnaliser mon programme ?",
        a: "Absolument. Chaque séjour est construit sur mesure selon tes objectifs, ton niveau d'anglais et ton budget.",
      },
      {
        q: "Que comprend le kit d'accueil ?",
        a: "Un badge et un t-shirt TYV t'attendent à l'arrivée — offerts avec chaque séjour.",
      },
      {
        q: "Qu'est-ce qu'un titre de séjour et est-ce obligatoire ?",
        a: "Oui, selon la durée de votre séjour, un resident permit sera requis. Nous nous chargeons de l'intégralité des démarches administratives.",
      },
      {
        q: "Comment se déroule l'entretien gratuit ?",
        a: "Un échange simple (visio, téléphone ou en personne à notre bureau de Djorobité 1, Zone de la Cité SIR, à Abidjan) pour comprendre ton projet, répondre à tes questions et te proposer un programme adapté. Sans engagement.",
      },
    ],
  },

  contact: {
    kicker: "Parlons de ton projet",
    title: "Prêt à décoller ?",
    subtitle:
      "Réserve ton appel découverte gratuit ou écris-nous. On te répond sous 24h.",
    officeKicker: "Aussi en présentiel",
    officeTitle: "Rencontre-nous à notre bureau d'Abidjan",
    officeText:
      "L'entretien peut aussi se faire physiquement : notre équipe assure une permanence à notre bureau d'Abidjan Djorobité 1, dans la Zone de la Cité SIR, pour te recevoir et parler de ton projet en face à face.",
    officeCta: "Prendre rendez-vous",
    officeImageAlt: "L'équipe TYV vous accueille à son bureau de Djorobité 1, Abidjan",
    calendlyTitle: "Réserver un appel — Calendly",
    calendlyLoading: "Chargement du calendrier…",
    firstName: "Prénom",
    phone: "Téléphone (WhatsApp)",
    email: "Email",
    packLabel: "Séjour qui t'intéresse",
    packPlaceholder: "Choisis un séjour…",
    packOptions: ["Séjour – 3 mois", "Séjour – 6 mois", "Séjour – 12 mois et plus"],
    packUnknown: "Je ne sais pas encore",
    message: "Ton message",
    submit: "Envoyer ma demande",
    sending: "Envoi…",
    footnote: "Réponse sous 24h · Sans engagement",
    successTitle: "Message envoyé !",
    successText: "Merci, on te recontacte très vite.",
    successAgain: "Envoyer un autre message",
    errorFallback: "Une erreur est survenue.",
  },

  community: {
    title: "Rejoins la communauté TYV",
    subtitle:
      "Suis nos aventures, découvre le Ghana et inspire-toi avant ton grand départ",
    cards: [
      {
        key: "instagram",
        handle: "@tyv.off",
        text: "Nos moments du quotidien au Ghana, les coulisses et les sourires de nos voyageurs.",
        cta: "Nous suivre sur Instagram",
      },
      {
        key: "facebook",
        handle: "TYV",
        text: "Actualités, témoignages et toutes les infos sur nos prochains départs.",
        cta: "Nous suivre sur Facebook",
      },
      {
        key: "tiktok",
        handle: "@tyv.off",
        text: "La vraie vie au Ghana en vidéo. Laisse-toi convaincre.",
        cta: "Nous suivre sur TikTok",
      },
    ] as { key: "instagram" | "facebook" | "tiktok"; handle: string; text: string; cta: string }[],
  },

  footer: {
    blurb:
      "Séjours linguistiques immersifs au Ghana pour francophones. Tout inclus, gestion A à Z.",
    navTitle: "Navigation",
    navAria: "Navigation pied de page",
    offersTitle: "Nos offres",
    offersAria: "Nos offres",
    offers: [
      "Cours d'anglais intensifs",
      "Formations professionnelles",
      "Stages d'immersion",
      "Logements étudiants",
      "Activités mensuelles",
    ],
    contactTitle: "Contact",
    bookCall: "Réserver un appel gratuit",
    rights: "Tous droits réservés.",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
  },

  whatsapp: {
    aria: "Nous contacter sur WhatsApp",
    // Message d’accueil fourni par TYV (octobre 2026) — à conserver tel quel.
    // Modifiable par TYV depuis /admin (champ « Message WhatsApp »).
    message: `Bienvenue chez TYV Linguistic !
Merci de nous contacter. Vous souhaitez devenir bilingue en anglais grâce à une immersion totale à Accra ? Pour nous aider à bien vous orienter, indiquez-nous :

- Nom & Prénom
- Profil : Étudiant / Professionnel/ parent d’élève,
- Cours d’anglais ou formation professionnelle
- La durée envisagée : 3 mois / 6 mois / 12 mois.

📄 Un conseiller TYV prendra rapidement contact avec vous.`,
  },

  cookies: {
    aria: "Consentement aux cookies",
    text: "Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.",
    more: "En savoir plus",
    accept: "Tout accepter",
    refuse: "Refuser",
  },
};

/** Structure commune aux deux langues (le FR fait foi). */
export type Dict = typeof fr;
