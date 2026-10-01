import type { MetadataRoute } from "next";
import { orderedProjects } from "@/lib/projects";
import { productionUrl } from "@/lib/site";

// Sitemap only exists with a real domain. No domain => return an empty list
// (Next renders an empty sitemap) rather than indexing localhost.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!productionUrl) return [];
  const now = new Date();
  return [
    { url: `${productionUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${productionUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${productionUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${productionUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    ...orderedProjects().map((p) => ({
      url: `${productionUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.95 : 0.8,
    })),
  ];
}
