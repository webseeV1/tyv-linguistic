import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — TYV | Conseils & témoignages séjours linguistiques au Ghana",
  description:
    "Conseils, témoignages et guides pratiques pour préparer ton séjour linguistique au Ghana. Le blog de TYV.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: "Blog TYV — Séjours linguistiques au Ghana",
    description:
      "Conseils, témoignages et guides pour réussir ton immersion en anglais au Ghana.",
    url: `${site.url}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-tyv-sky">
            Le blog
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-tyv-navy sm:text-5xl">
            Conseils & témoignages
          </h1>
          <p className="mt-4 text-lg text-tyv-muted">
            Tout ce qu&apos;il faut savoir pour préparer ton immersion en anglais
            au Ghana.
          </p>
        </header>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-tyv-navy/5 transition-shadow hover:shadow-xl hover:shadow-tyv-navy/5"
            >
              <Link
                href={`/blog/${article.slug}`}
                className="relative block aspect-[16/10] overflow-hidden"
              >
                <div
                  className={`size-full bg-gradient-to-br ${article.cover} transition-transform duration-500 group-hover:scale-105`}
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-tyv-navy backdrop-blur-sm">
                  {article.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-tyv-muted">
                  <time dateTime={article.date}>{article.dateLabel}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime} de lecture</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold leading-snug text-tyv-navy">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="transition-colors hover:text-tyv-sky"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-tyv-muted">
                  {article.excerpt}
                </p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-tyv-sky transition-colors hover:text-tyv-navy"
                >
                  Lire la suite
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
