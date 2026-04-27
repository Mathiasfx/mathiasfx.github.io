import Link from "next/link";
import Image from "next/image";
import type { SerializedBlogPost } from "@/lib/firebaseAdmin";

export type BlogCardProps = {
  post: SerializedBlogPost;
  featured: boolean;
  /** Categoría ya resuelta (Firestore o fallback i18n), se muestra en mayúsculas. */
  categoryDisplay: string;
  dateLabel?: string | null;
};

/** Estilo alineado a [`item.tsx`](item.tsx): mismo radio, sombra y `mx-4` que los works. */
export default function BlogCard({
  post,
  featured,
  categoryDisplay,
  dateLabel,
}: BlogCardProps) {
  const slug = post.slug || post.id;
  const href = `/blog/${encodeURIComponent(String(slug))}`;
  const label = categoryDisplay.toUpperCase();
  const cover =
    typeof post.coverImage === "string" && post.coverImage.trim()
      ? post.coverImage.trim()
      : null;

  return (
    <article
      className={[
        "group mx-4 flex min-h-[220px] flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-in-out",
        "shadow-md dark:shadow-lg",
        featured
          ? "border border-teal-600/35 bg-gray-400/95 ring-1 ring-teal-500/25 dark:border-teal-500/30 dark:bg-slate-800 dark:ring-teal-400/20 md:hover:scale-[1.02] md:hover:shadow-xl"
          : "border border-slate-400/55 bg-gray-400/90 dark:border-slate-600/75 dark:bg-slate-800 md:hover:scale-[1.02] md:hover:border-slate-500/70 md:hover:shadow-xl dark:md:hover:border-slate-500/55",
      ].join(" ")}
    >
      <Link
        href={href}
        className="text-inherit no-underline flex h-full min-h-0 flex-1 flex-col"
      >
        {cover && (
          <div className="relative h-36 w-full shrink-0 overflow-hidden border-b border-slate-300/40 dark:border-slate-600/50">
            <Image
              src={cover}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
          </div>
        )}
        <div className="flex min-h-0 flex-1 flex-col p-5">
        <p className="mb-2 font-[family-name:var(--font-roboto)] text-[11px] font-semibold uppercase tracking-wide text-teal-800/90 dark:text-teal-300/95 md:text-xs">
          {label}
        </p>
        <h2
          className={[
            "line-clamp-2 font-[family-name:var(--font-montserrat)] text-lg font-bold leading-snug md:text-xl",
            featured
              ? "text-teal-950 dark:text-teal-100"
              : "text-gray-900 dark:text-white",
          ].join(" ")}
        >
          {post.title || slug}
        </h2>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 flex-1 font-[family-name:var(--font-roboto)] text-sm leading-snug text-gray-700 dark:text-gray-300">
            {post.excerpt}
          </p>
        )}
        {dateLabel && (
          <p className="mt-3 font-[family-name:var(--font-roboto)] text-xs text-gray-500 dark:text-gray-400">
            {dateLabel}
          </p>
        )}
        </div>
      </Link>
    </article>
  );
}
