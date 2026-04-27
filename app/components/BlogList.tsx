import React from "react";
import type { SerializedBlogPost } from "@/lib/firebaseAdmin";
import { formatPostPublishedAt } from "@/lib/postDate";
import BlogCard from "./BlogCard";

export type BlogListProps = {
  posts: SerializedBlogPost[];
  /** Texto si el post no trae `category` desde Firestore. */
  categoryFallback: string;
  /** Locale para fechas, p. ej. `es-AR` o `en-US`. */
  dateLocale: string;
};

export default function BlogList({
  posts,
  categoryFallback,
  dateLocale,
}: BlogListProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div
      id="blog-grid"
      className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3"
    >
      {posts.map((p, index) => {
        const dateLabel = formatPostPublishedAt(p.publishedAt, dateLocale);
        const categoryDisplay = p.category?.trim() || categoryFallback;
        return (
          <BlogCard
            key={p.id}
            post={p}
            featured={index === 0}
            categoryDisplay={categoryDisplay}
            dateLabel={dateLabel}
          />
        );
      })}
    </div>
  );
}
