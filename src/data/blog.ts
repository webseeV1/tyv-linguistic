export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  dateLabel: string;
  readingTime: string;
  excerpt: string;
  /** dégradé de couverture (placeholder en attendant les vraies images) */
  cover: string;
  /** contenu en paragraphes — sera remplacé par le vrai contenu ultérieurement */
  content: string[];
};

// NOTE: Contenu placeholder — à remplacer par les vrais articles.
export const articles: Article[] = [
  {
    slug: "pourquoi-choisir-le-ghana-pour-apprendre-anglais",
    title: "Pourquoi choisir le Ghana pour apprendre l'anglais ?",
    category: "Destination",
    date: "2026-05-12",
    dateLabel: "12 mai 2026",
    readingTime: "4 min",
    excerpt:
      "Stable, anglophone et à 45 minutes de vol d'Abidjan : le Ghana s'impose comme la destination idéale pour une immersion linguistique réussie. On t'explique pourquoi.",
    cover: "from-tyv-navy via-tyv-navy-light to-tyv-sky",
    content: [
      "Quand on pense immersion en anglais, on imagine souvent Londres ou New York. Pourtant, pour un francophone, le Ghana offre un équilibre rare entre proximité, sécurité et qualité d'apprentissage.",
      "Pays anglophone officiel, le Ghana baigne dans la langue de Shakespeare au quotidien : à l'école, dans les commerces, dans la rue. Cette exposition permanente accélère considérablement la progression, bien plus qu'un cours en salle isolé.",
      "À environ 45 minutes de vol d'Abidjan, le Ghana reste culturellement proche : mêmes repères ouest-africains, accueil chaleureux, coût de la vie maîtrisé. De quoi vivre une vraie rupture linguistique sans choc culturel brutal.",
      "Enfin, le Ghana dispose d'universités et de centres de formation reconnus, ouvrant la porte à des séjours combinant apprentissage de l'anglais et montée en compétences professionnelles.",
    ],
  },
  {
    slug: "temoignage-3-mois-a-accra",
    title: "Témoignage : 3 mois à Accra",
    category: "Témoignage",
    date: "2026-04-28",
    dateLabel: "28 avril 2026",
    readingTime: "5 min",
    excerpt:
      "Aminata, 23 ans, est partie d'Abidjan pour un séjour Explorer. Trois mois plus tard, elle raconte comment l'immersion a transformé son rapport à l'anglais — et à elle-même.",
    cover: "from-tyv-sky via-tyv-navy-light to-tyv-navy",
    content: [
      "« Avant de partir, je comprenais l'anglais écrit mais je n'osais jamais parler. La peur de me tromper me bloquait complètement. »",
      "Dès la première semaine à Accra, Aminata est plongée dans le bain : logement en résidence, activités hebdomadaires, rencontres avec d'autres étudiants. « On n'a pas le choix, il faut parler. Et au bout de quelques jours, ça devient naturel. »",
      "Le suivi de l'équipe TYV a fait la différence dans les moments de doute. « Savoir qu'il y avait toujours quelqu'un de joignable, ça enlève énormément de stress quand on est loin de chez soi. »",
      "Trois mois plus tard, Aminata est rentrée bilingue, plus confiante, et avec un réseau international. « Ce n'est pas juste un séjour linguistique. C'est une expérience qui change la trajectoire. »",
    ],
  },
  {
    slug: "comment-financer-son-sejour-linguistique",
    title: "Comment financer son séjour linguistique ?",
    category: "Conseils",
    date: "2026-04-10",
    dateLabel: "10 avril 2026",
    readingTime: "6 min",
    excerpt:
      "Un séjour à l'étranger représente un investissement. Bonne nouvelle : il existe plusieurs leviers pour le financer sereinement. Tour d'horizon des solutions concrètes.",
    cover: "from-tyv-navy-light via-tyv-sky to-tyv-navy",
    content: [
      "Le coût d'un séjour linguistique peut sembler élevé au premier abord, mais il se planifie. La première étape consiste à définir un budget global clair — c'est précisément ce que TYV prépare avec toi lors de l'entretien gratuit.",
      "L'épargne progressive reste la base : en anticipant six à douze mois à l'avance, l'effort mensuel devient tout à fait raisonnable. Un plan d'épargne dédié aide à rester régulier.",
      "Pense aussi aux dispositifs d'aide : bourses d'études, soutien familial, financement participatif auprès de tes proches, ou encore prise en charge partielle par un employeur dans le cadre d'une formation professionnelle.",
      "Enfin, certains de nos packs intègrent une dimension stage ou formation, qui peut ouvrir droit à des financements spécifiques. Parles-en lors de ton appel découverte : on t'oriente vers les solutions les plus adaptées à ta situation.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
