"use client";

import { useContext } from "react";
import Link from "next/link";
import type { SerializedBlogPost } from "@/lib/firebaseAdmin";
import { I18nContext } from "../providers/i18nProvider";
import BlogList from "./BlogList";

type BlogPageClientProps = {
  posts: SerializedBlogPost[];
};

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error(
      "I18n is not initialized; ensure the provider is set up correctly."
    );
  }

  const t = (key: string) => context.t.translate(key);
  const dateLocale = context.language === "es" ? "es-AR" : "en-US";
  const categoryFallback = t("blog.categoryFallback");

  if (!posts.length) {
    return (
      <div className="blog-lab-section w-full max-w-screen-xl px-4 py-8 md:py-10">
        <h1 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("blog.pageTitle")}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 md:text-left">
          {t("blog.empty")}
        </p>
      </div>
    );
  }

  const first = posts[0];
  const firstSlug = first.slug || first.id;
  const firstHref = `/blog/${encodeURIComponent(String(firstSlug))}`;

  return (
    <div className="blog-lab-section w-full max-w-screen-xl px-4 py-8 md:py-10">
      <h1 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        {t("blog.pageTitle")}
      </h1>
      <p className="mb-6 font-[family-name:var(--font-roboto)] text-sm font-medium uppercase tracking-wide text-slate-600 dark:text-slate-400">
        {t("blog.featuredLabel")}
      </p>

      <BlogList
        posts={posts}
        categoryFallback={categoryFallback}
        dateLocale={dateLocale}
      />

      <div className="mt-8 mx-4 flex flex-wrap gap-3">
        <Link
          href={firstHref}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-800 px-5 py-2.5 font-[family-name:var(--font-roboto)] text-sm font-medium text-white no-underline transition-colors hover:bg-teal-700 dark:bg-teal-700/90 dark:hover:bg-teal-600"
        >
          {t("blog.readFeatured")}
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
        <Link
          href="/"
          className="inline-flex items-center rounded-lg border border-slate-400/80 bg-transparent px-5 py-2.5 font-[family-name:var(--font-roboto)] text-sm font-medium text-gray-800 no-underline transition-colors hover:border-slate-500 hover:bg-slate-100/80 dark:border-slate-600 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800/50"
        >
          {t("blog.backHome")}
        </Link>
      </div>
    </div>
  );
}
