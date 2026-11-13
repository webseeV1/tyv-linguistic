import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ValueProps } from "@/components/sections/ValueProps";
import { Offres } from "@/components/sections/Offres";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyGhana } from "@/components/sections/WhyGhana";
import { APropos } from "@/components/sections/APropos";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Community } from "@/components/sections/Community";
import { SectionTransition } from "@/components/ui/SectionTransition";

/**
 * Contenu de la page d'accueil, partagé entre `/` (fr) et `/en`.
 * Les sections lisent la langue depuis l'URL via `useI18n()`.
 */
export function HomeSections() {
  return (
    <>
      <Hero />
      {/* Hero (navy) → ValueProps (bleu pâle) : bande de stats + vague */}
      <Stats />
      <ValueProps />
      <SectionTransition from="bg" to="white" height={72} />
      <Offres />
      <SectionTransition from="white" to="bg" height={72} />
      <HowItWorks />
      <SectionTransition from="bg" to="navy" height={112} />
      <WhyGhana />
      <SectionTransition from="navy" to="white" height={112} />
      <APropos />
      <SectionTransition from="white" to="bg" height={72} />
      <Testimonials />
      <SectionTransition from="bg" to="white" height={72} />
      <FAQ />
      <SectionTransition from="white" to="bg" height={72} />
      <Contact />
      <SectionTransition from="bg" to="navy" height={112} />
      <Community />
    </>
  );
}
