import React from "react";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/firebaseAdmin";
import { markdownToHtml } from "@/lib/markdown";
import BlogPost from "../../components/BlogPost";

export const revalidate = 3600;

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: PageParams | Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post no encontrado" };
  return {
    title: post.title ?? slug,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title ?? slug,
      description: post.excerpt ?? undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title ?? slug,
      description: post.excerpt ?? undefined,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

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


