import React from "react";
import { getPostBySlug } from "@/lib/firebaseAdmin";
import { markdownToHtml } from "@/lib/markdown";
import BlogPost from "../../components/BlogPost";

export const dynamic = "force-dynamic";

type PageParams = { slug: string };

export default async function PostPage({
  params,
}: {
  params: PageParams | Promise<PageParams>;
}) {
  const resolved = await Promise.resolve(params);
  const rawSlug = resolved.slug;
  const post = await getPostBySlug(rawSlug);
  if (!post) return <div className="w-full max-w-4xl mx-auto py-8">Post no encontrado</div>;
  const contentHtml = markdownToHtml(post.content || "");
  return (
    <main className="w-full max-w-4xl mx-auto py-8 px-4">
      <BlogPost post={{ ...post, contentHtml }} />
    </main>
  );
}


