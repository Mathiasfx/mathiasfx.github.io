"use client";

import React from "react";
import Link from "next/link";
import { I18nContextValue } from "../interfaces/i18nContextValue.interface";
import type { SerializedBlogPost } from "@/lib/firebaseAdmin";
import { formatPostPublishedAt } from "@/lib/postDate";
import BlogCard from "./BlogCard";

type BlogPreviewProps = {
  context: I18nContextValue;
  posts: SerializedBlogPost[];
};

export default function BlogPreview({ context, posts }: BlogPreviewProps) {
  const title = context.t.translate("blog.previewTitle");
  const seeMore = context.t.translate("blog.seeMore");
  const empty = context.t.translate("blog.empty");
  const categoryFallback = context.t.translate("blog.categoryFallback");
  const dateLocale = context.language === "es" ? "es-AR" : "en-US";

  return (
    <div className="blog-lab-section w-full max-w-screen-xl my-6 mb-10 px-2 md:px-0">
      <h2 className="text-center md:text-left text-2xl md:text-3xl font-bold font-[family-name:var(--font-montserrat)] mt-6 mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>

      {posts.length === 0 ? (
        <p className="text-center md:text-left text-sm text-gray-600 dark:text-gray-400">
          {empty}
        </p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post, index) => {
              const dateLabel = formatPostPublishedAt(
                post.publishedAt,
                dateLocale
              );
              const categoryDisplay =
                post.category?.trim() || categoryFallback;
              return (
                <BlogCard
                  key={post.id}
                  post={post}
                  featured={index === 0}
                  categoryDisplay={categoryDisplay}
                  dateLabel={dateLabel}
                />
              );
            })}
          </div>

          <div className="mt-8 mx-4 flex justify-start">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-800 px-5 py-2.5 font-[family-name:var(--font-roboto)] text-sm font-medium text-white no-underline transition-colors hover:bg-teal-700 dark:bg-teal-700/90 dark:hover:bg-teal-600"
            >
              {seeMore}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
