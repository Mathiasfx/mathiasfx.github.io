"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { FaGithub, FaGlobeAmericas } from "react-icons/fa";
import { I18nContext } from "../providers/i18nProvider";
import { getIcon } from "../utils/utils";
import type { WorkWithContentHtml } from "../interfaces/work.interface";

type ProjectPostProps = {
  work: WorkWithContentHtml;
};

function BackHomeLink({ label }: { label: string }) {
  return (
    <a
      href="/"
      className="relative z-10 inline-flex items-center rounded-lg border border-slate-400/80 bg-transparent px-4 py-2 font-[family-name:var(--font-roboto)] text-sm font-medium text-gray-800 no-underline transition-colors hover:border-slate-500 hover:bg-slate-100/80 dark:border-slate-600 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800/50"
    >
      ← {label}
    </a>
  );
}

export default function ProjectPost({ work }: ProjectPostProps) {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error(
      "The I18n is not initialized, Make sure you have the provider set up correctly"
    );
  }

  const lang = context.language;
  const title = work.name[lang] ?? work.name.en;
  const html =
    work.contentHtml[lang] ?? work.contentHtml.en ?? "";
  const backHomeLabel = context.t.translate("works.backHome");

  return (
    <article className="relative w-full max-w-3xl font-[family-name:var(--font-roboto)]">
      <div className="mb-6">
        <BackHomeLink label={backHomeLabel} />
      </div>

      <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 dark:border-slate-700/80 dark:bg-slate-900">
        <Image
          src={work.image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority
        />
      </div>

      <h1 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {work.tec.map((tec) => (
          <div
            key={tec}
            className="flex items-center justify-center rounded-lg bg-gray-100 p-2 dark:bg-slate-700"
          >
            {getIcon(tec)}
          </div>
        ))}
      </div>

      {(work.url || work.github || work.githubBackend) && (
        <div className="mb-8 flex flex-wrap gap-3">
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              <FaGlobeAmericas size={16} />
              {context.t.translate("works.liveSite")}
            </a>
          )}
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-800"
            >
              <FaGithub size={16} />
              {context.t.translate(
                work.githubBackend ? "works.sourceCodeClient" : "works.sourceCode"
              )}
            </a>
          )}
          {work.githubBackend && (
            <a
              href={work.githubBackend}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-800"
            >
              <FaGithub size={16} />
              {context.t.translate("works.sourceCodeApi")}
            </a>
          )}
        </div>
      )}

      <div
        className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-[family-name:var(--font-montserrat)] prose-p:font-[family-name:var(--font-roboto)] prose-li:font-[family-name:var(--font-roboto)] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-teal-800 prose-a:underline dark:prose-a:text-teal-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-figure:my-6 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="relative z-10 mt-10 border-t border-slate-200 pt-6 dark:border-slate-700">
        <BackHomeLink label={backHomeLabel} />
      </div>
    </article>
  );
}
