"use client";

import { Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useI18n } from "@/i18n/useI18n";

const avatarColors = ["bg-tyv-navy", "bg-tyv-sky", "bg-tyv-navy-light"];

// Placeholders crédibles — à remplacer par de vrais témoignages (voir i18n/fr.ts).
export function Testimonials() {
  const { t } = useI18n();
  const testimonials = t.testimonials.items;

  return (
    <section className="bg-tyv-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
            {t.testimonials.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-5xl">
            {t.testimonials.title}
          </h2>
        </AnimatedSection>

        {/* Carousel mobile (scroll-snap) · Grille desktop */}
        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((item, i) => (
            <AnimatedSection
              key={item.name}
              delay={i * 0.1}
              className="min-w-[85%] snap-center sm:min-w-[60%] md:min-w-0"
            >
              <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-tyv-navy/5">
                <div className="mb-4 flex gap-0.5 text-tyv-sky" aria-label={t.testimonials.ratingAria}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-current" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="flex-1 leading-relaxed text-tyv-text">
                  “{item.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className={`flex size-11 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColors[i % avatarColors.length]}`}
                  >
                    {item.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block font-semibold text-tyv-navy">
                      {item.name}
                    </span>
                    <span className="block text-sm text-tyv-muted">
                      {item.city} · {item.pack}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
