import type { Dict } from "./fr";

/**
 * English dictionary — same structure as `fr.ts` (enforced by `Dict`).
 */
export const en: Dict = {
  nav: {
    links: [
      { id: "offres", hash: "#offres", label: "Our offers" },
      { id: "comment", hash: "#comment", label: "How it works" },
      { id: "ghana", hash: "#ghana", label: "Why Ghana" },
      { id: "a-propos", hash: "#a-propos", label: "About" },
      { id: "contact", hash: "#contact", label: "Contact" },
      { id: "blog", href: "/blog", label: "Blog" },
    ],
    bookCall: "Book a call",
    bookCallFree: "Book a free call",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "TYV — Home",
    langSwitch: "Passer en français",
  },

  hero: {
    titleBefore: "Immersive language stays, ",
    titleHighlight: "managed from A to Z",
    titleAfter: ".",
    subtitle:
      "Intensive English courses, professional training programs and immersive internships in Ghana.",
    ctaOffers: "See our offers",
    ctaQuote: "Request a personalized quote",
    scrollAria: "Scroll down",
  },

  stats: {
    aria: "Key figures",
    items: [
      { to: 150, prefix: "+", label: "People supported" },
      { to: 100, suffix: "%", label: "Client satisfaction" },
      { text: "Tailor-made", label: "Personalized programs" },
    ],
  },

  valueProps: [
    {
      title: "All inclusive",
      text: "Coach transport, round-trip ticket, housing, tuition, monthly activities. You arrive, we take care of the rest.",
    },
    {
      title: "Tailor-made",
      text: "Every stay is adapted to your goals and your budget.",
    },
    {
      title: "Fully supported",
      text: "Personalized follow-up before, during and after your stay.",
    },
  ],

  offres: {
    blocs: [
      {
        id: "cours",
        kicker: "Our courses",
        phrase:
          "Become bilingual fast with our intensive English courses, designed for complete mastery of the language.",
        images: [
          {
            src: "/images/sections/cours.jpg",
            alt: "Students in an intensive English class in Accra",
          },
        ],
      },
      {
        id: "formations",
        kicker: "Our training programs",
        phrase:
          "Build recognized professional skills through our training programs taught in English, and get ready for an international career.",
        images: [
          {
            src: "/images/sections/formations.jpg",
            alt: "Graduation ceremony of a professional training program",
          },
        ],
      },
      {
        id: "stages",
        kicker: "Our immersive internships",
        phrase:
          "Sharpen your English in real-life situations through our company internships, at the heart of Ghana's professional world.",
        images: [
          {
            src: "/images/sections/stages.jpg",
            alt: "Intern immersed in a Ghanaian company",
          },
        ],
      },
      {
        id: "logements",
        kicker: "Our housing",
        phrase:
          "Enjoy comfortable, secure, carefully selected student housing, giving you the best living conditions throughout your stay in Ghana.",
        images: [
          {
            src: "/images/sections/logements-1.jpg",
            alt: "Bright shared student room with study space",
          },
          {
            src: "/images/sections/logements-2.jpg",
            alt: "Private student room with desk and study corner",
          },
        ],
      },
      {
        id: "activites",
        kicker: "Our monthly activities",
        phrase:
          "Every month, TYV students take part in cultural and professional immersion activities in Ghana: practicing English in real situations, building confidence when speaking and discovering the local culture in a supervised, safe environment.",
        images: [
          {
            src: "/images/sections/activites.jpg",
            alt: "TYV monthly activities: rooftop evening, historic Accra tour, Labadi Beach and Accra Mall",
          },
        ],
      },
    ],
    programmesKicker: "Our programs",
    programmesTitle: "Choose the program that matches your ambitions",
    programmesIntro:
      "Choose the program that matches your ambitions: intensive English courses of 3, 6 or 12 months, or a professional training program taught in English over 3 to 24 months by our partner schools, to build your skills and accelerate your international career. At the end of your English program, you will receive a course completion certificate. Learners enrolled in a professional training program will also receive a certificate issued by our partner school, attesting to the skills acquired.",
    coursTitle: "English courses",
    coursSub: "Intensive, at a partner language school in Accra.",
    coursDurees: ["3 months", "6 months", "12 months"],
    formationsTitle: "Professional training in English",
    formationsSub: "From 3 to 24 months, with certification.",
    formationsDomaines: [
      "Banking & Finance",
      "Accounting",
      "Business Management",
      "Digital Marketing",
      "Logistics & Supply Chain",
      "Project Management",
      "Entrepreneurship",
      "Computer Science",
      "Data Analytics",
      "Cybersecurity",
      "Web Development",
      "Artificial Intelligence",
    ],
    inscriptionTitle: "Your enrollment includes",
    inscriptionInclut: [
      "Round-trip transport (depending on the chosen program)",
      "Welcome and support upon your arrival in Accra",
      "Secure housing",
      "Tuition at a language school or professional training center",
      "School supplies",
      "Monthly activities organized by TYV",
      "Immersive internship in a partner company",
      "TYV welcome kit (badge + t-shirt)",
      "Follow-up and support throughout your stay",
      "English course completion certificate or diploma issued by our partner school (depending on the program)",
    ],
    inscriptionNote:
      "Note: the immersive internship does not apply to the 3-month stay.",
    ctaQuote: "Request a personalized quote",
  },

  howItWorks: {
    kicker: "Simple & supervised",
    title: "How it works",
    stepLabel: "Step",
    steps: [
      {
        title: "Free consultation",
        text: "Together we explore your project and your goals.",
      },
      {
        title: "Your tailor-made program",
        text: "We build a stay adapted to you.",
      },
      {
        title: "You take off worry-free",
        text: "Everything is organized — all you have to do is go.",
      },
      {
        title: "Immersion begins",
        text: "English, culture, encounters, experiences.",
      },
    ],
  },

  whyGhana: {
    kicker: "The destination",
    title: "Why Ghana?",
    lead: "Ghana is English-speaking Africa.",
    badge: "Close, accessible and 100% English-speaking.",
    reasons: [
      {
        title: "Stable, welcoming country",
        text: "A recognized democracy, safe and warm.",
      },
      {
        title: "Officially English-speaking",
        text: "English in daily life, everywhere, all the time.",
      },
      {
        title: "Economic hub",
        text: "At the heart of West Africa and its opportunities.",
      },
      {
        title: "Recognized schools",
        text: "Quality universities and training centers.",
      },
    ],
  },

  aPropos: {
    kicker: "About TYV",
    title: "Linguistic Travel & Study Program",
    intro:
      "Founded in 2020, TYV was born from an ambitious vision: turning language learning into an immersive, career-building life experience. We build bridges between cultures and international opportunities from the dynamic heart of Accra, Ghana.",
    ecoTitle: "Our partner ecosystem",
    ecoText:
      "TYV's strength lies in its network of excellence. We have structured our offer around strategic partnerships with leading private institutions in Accra.",
    ecoCol1Title: "Language academies",
    ecoCol1Text:
      "Our partner schools dedicated to learning English use intensive, interactive, proven methods.",
    ecoCol2Title: "Professional training centers",
    ecoCol2Text:
      "We collaborate with specialized institutions offering certifying programs in key sectors: finance, digital marketing, project management, entrepreneurship…",
    whyTitle: "Why choose TYV?",
    valeurs: [
      {
        title: "Total immersion",
        text: "Live, learn and network in Ghana for a natural command of English.",
      },
      {
        title: "Dual expertise",
        text: "Combine a language upgrade with technical skills you can apply immediately.",
      },
      {
        title: "Premium environment",
        text: "We select our partners for the quality of their facilities and their commitment to student success.",
      },
      {
        title: "Safe setting",
        text: "The peace of mind of parents and students is our absolute priority, with constant follow-up.",
      },
    ],
    quote:
      "“Whether you are a student looking to enrich your CV or a professional seeking an international dimension, TYV offers you a springboard for your career.”",
    since:
      "Since 2020, we have been evolving to meet the demands of a constantly changing global market.",
  },

  testimonials: {
    kicker: "They lived it",
    title: "Testimonials",
    ratingAria: "Rated 5 out of 5",
    items: [
      {
        name: "Aminata",
        city: "Abidjan",
        pack: "6-month stay",
        text: "In just a few months my confidence in English skyrocketed. Everything was organized — all I had to do was enjoy the experience.",
      },
      {
        name: "Yann",
        city: "Dakar",
        pack: "12-month stay",
        text: "The follow-up before departure reassured me. On site, the team was always reachable. A year that changed my life.",
      },
      {
        name: "Fatou",
        city: "Lomé",
        pack: "3-month stay",
        text: "Three intense, unforgettable months. The housing and activities were perfect. I recommend it 100%.",
      },
      {
        name: "Moussa",
        city: "Bamako",
        pack: "Professional training",
        text: "The digital marketing program, entirely in English, opened doors I never imagined. The certificate made all the difference on my CV.",
      },
      {
        name: "Awa",
        city: "Ouagadougou",
        pack: "6-month stay",
        text: "The company internship changed everything: speaking English all day in real situations is what truly makes you progress.",
      },
      {
        name: "Kevin",
        city: "Lyon",
        pack: "3-month stay",
        text: "Welcomed right at the airport, housed in a great residence, supported from start to finish. A truly professional organization — parents can rest easy.",
      },
    ],
  },

  faq: {
    kicker: "Frequently asked questions",
    title: "We answer everything",
    items: [
      {
        q: "Are meals included in the housing?",
        a: "No, meals are not included in the housing. Some schools have canteens on site; otherwise, restaurants and markets are easily accessible nearby.",
      },
      {
        q: "Do I need a visa for Ghana?",
        a: "No visa is required for West African (ECOWAS) nationals only. For other nationalities, a visa is required — we guide you through the process.",
      },
      {
        q: "What happens if I have a problem on site?",
        a: "You benefit from personalized follow-up and a local contact reachable throughout your stay. You are never alone.",
      },
      {
        q: "Can I customize my program?",
        a: "Absolutely. Every stay is built to measure according to your goals, your level of English and your budget.",
      },
      {
        q: "What does the welcome kit include?",
        a: "A TYV badge and t-shirt await you on arrival — included with every stay.",
      },
      {
        q: "What is a residence permit and is it mandatory?",
        a: "Yes, depending on the length of your stay, a resident permit will be required. We handle all the administrative procedures for you.",
      },
      {
        q: "How does the free consultation work?",
        a: "A simple conversation (video, phone or in person at our office in Djorobité 1, Cité SIR area, Abidjan) to understand your project, answer your questions and suggest a suitable program. No commitment.",
      },
    ],
  },

  contact: {
    kicker: "Let's talk about your project",
    title: "Ready for takeoff?",
    subtitle:
      "Book your free discovery call or write to us. We reply within 24 hours.",
    officeKicker: "Also in person",
    officeTitle: "Meet us at our Abidjan office",
    officeText:
      "Your consultation can also take place face to face: our team holds office hours at our Abidjan office in Djorobité 1, Cité SIR area, to welcome you and discuss your project in person.",
    officeCta: "Book an appointment",
    officeImageAlt: "The TYV team welcomes you at its Djorobité 1 office in Abidjan",
    calendlyTitle: "Book a call — Calendly",
    calendlyLoading: "Loading the calendar…",
    firstName: "First name",
    phone: "Phone (WhatsApp)",
    email: "Email",
    packLabel: "Stay you're interested in",
    packPlaceholder: "Choose a stay…",
    packOptions: ["Stay – 3 months", "Stay – 6 months", "Stay – 12 months and more"],
    packUnknown: "I don't know yet",
    message: "Your message",
    submit: "Send my request",
    sending: "Sending…",
    footnote: "Reply within 24h · No commitment",
    successTitle: "Message sent!",
    successText: "Thank you, we'll get back to you very soon.",
    successAgain: "Send another message",
    errorFallback: "Something went wrong.",
  },

  community: {
    title: "Join the TYV community",
    subtitle:
      "Follow our adventures, discover Ghana and get inspired before your big departure",
    cards: [
      {
        key: "instagram",
        handle: "@tyv.off",
        text: "Our everyday moments in Ghana, behind the scenes and the smiles of our travelers.",
        cta: "Follow us on Instagram",
      },
      {
        key: "facebook",
        handle: "TYV",
        text: "News, testimonials and everything about our upcoming departures.",
        cta: "Follow us on Facebook",
      },
      {
        key: "tiktok",
        handle: "@tyv.off",
        text: "Real life in Ghana on video. Let yourself be convinced.",
        cta: "Follow us on TikTok",
      },
    ],
  },

  footer: {
    blurb:
      "Immersive language stays in Ghana for French speakers. All inclusive, managed from A to Z.",
    navTitle: "Navigation",
    navAria: "Footer navigation",
    offersTitle: "Our offers",
    offersAria: "Our offers",
    offers: [
      "Intensive English courses",
      "Professional training",
      "Immersive internships",
      "Student housing",
      "Monthly activities",
    ],
    contactTitle: "Contact",
    bookCall: "Book a free call",
    rights: "All rights reserved.",
    legal: "Legal notice",
    privacy: "Privacy policy",
  },

  whatsapp: {
    aria: "Contact us on WhatsApp",
    // Version anglaise du message d’accueil TYV — modifiable depuis /admin.
    message: `Welcome to TYV Linguistic!
Thank you for contacting us. Would you like to become fluent in English through full immersion in Accra? To guide you properly, please tell us:

- Last name & First name
- Profile: Student / Professional / parent of a pupil
- English course or professional training
- Planned duration: 3 months / 6 months / 12 months.

📄 A TYV advisor will get back to you shortly.`,
  },

  cookies: {
    aria: "Cookie consent",
    text: "We use cookies to improve your experience and analyze our traffic.",
    more: "Learn more",
    accept: "Accept all",
    refuse: "Decline",
  },
};
