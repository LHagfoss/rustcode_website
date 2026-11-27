import type { MetadataRoute } from "next";
import { docPages } from "./docs/docs";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/tui`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/docs`, changeFrequency: "weekly", priority: 0.8 },
    ...docPages.map((page) => ({
      url: `${siteUrl}/docs/${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/changelog`, changeFrequency: "weekly", priority: 0.5 },
  ];
}
