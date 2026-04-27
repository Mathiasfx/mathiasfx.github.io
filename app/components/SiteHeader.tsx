"use client";

import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import ThemeSwitch from "./themeSwitch";

export default function SiteHeader() {
  return (
    <header className="w-full shrink-0 border-b border-gray-300/30 dark:border-slate-700/80 py-3 sm:py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-2">
        <Link
          href="/"
          className="font-semibold font-[family-name:var(--font-montserrat)] hover:opacity-80 transition-opacity shrink-0 min-w-0"
        >
          Mathias Pereira
        </Link>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 sm:justify-end sm:ml-auto min-w-0">
          <LanguageSelector />
          <nav className="shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center p-2 border-2 border-gray-300 dark:border-slate-500 rounded-md text-sm text-gray-900 dark:text-white bg-white/90 dark:bg-slate-900/80 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800/90"
            >
              Blog
            </Link>
          </nav>
          <div className="shrink-0 inline-flex items-center justify-center">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
