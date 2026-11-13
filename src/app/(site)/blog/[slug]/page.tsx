import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles, getArticle } from "@/data/blog";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article introuvable — TYV" };

  return {
    title: `${article.title} — Blog TYV`,
    description: article.excerpt,
    alternates: { canonical: `${site.url}/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${site.url}/blog/${article.slug}`,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.date,
    description: article.excerpt,
    author: { "@type": "Organization", name: "TYV" },
    publisher: { "@type": "Organization", name: "TYV" },
    url: `${site.url}/blog/${article.slug}`,
  };

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* En-tête */}
      <header className={`bg-gradient-to-br ${article.cover}`}>
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Retour au blog
          </Link>
          <span className="mt-6 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {article.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/75">
            <time dateTime={article.date}>{article.dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} de lecture</span>
          </div>
        </div>
      </header>

      {/* Corps */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-5 text-lg leading-relaxed text-tyv-text">
          {article.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* CTA de fin d'article */}
        <div className="mt-14 rounded-3xl bg-tyv-bg p-8 text-center ring-1 ring-tyv-navy/5">
          <h2 className="font-display text-2xl font-bold text-tyv-navy">
            Prêt à vivre l&apos;aventure ?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-tyv-muted">
            Réserve ton appel découverte gratuit et construis ton séjour sur
            mesure.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/#offres" size="lg">
              Voir nos packs
            </Button>
            <Button href={site.calendly} external variant="outline" size="lg">
              Réserver un appel gratuit
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
