import type { Metadata } from "next";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import { markdownToHtml } from "@/lib/markdown";
import ProjectPost from "../../components/ProjectPost";

type PageParams = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PageParams | Promise<PageParams>;
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const work = getProjectBySlug(resolved.slug);
  if (!work) return { title: "Project not found" };
  return {
    title: `${work.name.en} | Mathias Pereira`,
    description: work.description.en,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: PageParams | Promise<PageParams>;
}) {
  const resolved = await Promise.resolve(params);
  const work = getProjectBySlug(resolved.slug);

  if (!work) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        <p className="text-gray-700 dark:text-gray-300">Proyecto no encontrado</p>
      </div>
    );
  }

  const contentHtml = {
    en: markdownToHtml(work.longDescription.en ?? ""),
    es: markdownToHtml(work.longDescription.es ?? ""),
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <ProjectPost work={{ ...work, contentHtml }} />
    </div>
  );
}
