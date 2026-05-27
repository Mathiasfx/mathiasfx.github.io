import { works } from "@/app/data/works";
import type { Work } from "@/app/interfaces/work.interface";

export function getAllProjects(): Work[] {
  return works;
}

export function getProjectBySlug(slug: string): Work | null {
  const normalized = decodeURIComponent(slug.trim());
  return works.find((w) => w.slug === normalized) ?? null;
}

export function getAllSlugs(): string[] {
  return works.map((w) => w.slug);
}
