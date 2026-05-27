import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/projects";
import { getAllPosts } from "@/lib/firebaseAdmin";

const SITE_URL = "https://mathiaspereira.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = getAllSlugs();
  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${encodeURIComponent(slug)}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    blogEntries = posts
      .map((p) => ({
        url: `${SITE_URL}/blog/${encodeURIComponent(String(p.slug || p.id))}`,
        lastModified: p.publishedAt
          ? new Date(p.publishedAt as string)
          : undefined,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {
    // Firestore no disponible en build — los posts se añadirán en próxima revalidación
  }

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.9 },
    ...projectEntries,
    ...blogEntries,
  ];
}
