import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { articles } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const posts: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...posts];
}
