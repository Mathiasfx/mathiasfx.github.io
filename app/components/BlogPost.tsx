/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { formatPostPublishedAt } from "@/lib/postDate";

export default function BlogPost({ post }: { post: any }) {
  const dateLabel = formatPostPublishedAt(post.publishedAt);
  const categoryRaw =
    typeof post.category === "string" ? post.category.trim() : "";
  return (
    <article className="w-full max-w-3xl font-[family-name:var(--font-roboto)]">
      {categoryRaw && (
        <p className="mb-2 font-[family-name:var(--font-roboto)] text-xs font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300/95">
          {categoryRaw.toUpperCase()}
        </p>
      )}
      <h1 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {post.title}
      </h1>
      {dateLabel && (
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          {dateLabel}
        </p>
      )}
      <div
        className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-[family-name:var(--font-montserrat)] prose-p:font-[family-name:var(--font-roboto)] prose-li:font-[family-name:var(--font-roboto)] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-teal-800 prose-a:underline dark:prose-a:text-teal-300 prose-strong:text-gray-900 dark:prose-strong:text-white"
        dangerouslySetInnerHTML={{
          __html: post.contentHtml || post.content || "",
        }}
      />
    </article>
  );
}
