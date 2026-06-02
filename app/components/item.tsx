import Link from "next/link";
import { ItemProps } from "../interfaces/item.interface";
import Image from "next/image";
import { getIcon } from "../utils/utils";
import { FaGithub, FaGlobeAmericas } from "react-icons/fa";

const Item = ({ work, context }: ItemProps) => {
  const href = `/projects/${encodeURIComponent(work.slug)}`;
  const title = work.name[context.language];
  const description = work.description[context.language];
  const hasExternalLinks = Boolean(work.github || work.url);

  return (
    <div className="group mx-4 flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl bg-gray-400 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl dark:bg-slate-800 dark:shadow-lg dark:hover:shadow-slate-800/50 md:hover:scale-105">
      <Link
        href={href}
        className="flex min-h-0 flex-1 flex-col text-inherit no-underline"
      >
        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-gray-200 dark:bg-slate-700">
          <Image
            width={600}
            height={374}
            src={work.image}
            alt={title}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 427px"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 pb-3 pt-4">
          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-snug text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      </Link>

      <div className="mt-auto shrink-0 border-t border-gray-500/25 px-4 py-3 dark:border-slate-600/60">
        <div className="flex min-h-[4.25rem] flex-wrap content-start gap-1.5">
          {work.tec.map((tec: string) => (
            <div
              key={tec}
              className="flex items-center justify-center rounded-lg bg-gray-100 p-1.5 transition-all duration-300 group-hover:bg-gray-200 dark:bg-slate-700 dark:group-hover:bg-slate-600"
            >
              {getIcon(tec)}
            </div>
          ))}
        </div>

        <div className="mt-3 flex min-h-8 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {work.github && (
              <a
                href={work.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-500 transition-colors duration-300 hover:scale-110 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <FaGithub size={18} />
              </a>
            )}
            {work.url && (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live site"
                className="text-gray-500 transition-colors duration-300 hover:scale-110 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <FaGlobeAmericas size={18} />
              </a>
            )}
            {!hasExternalLinks && <span className="inline-block w-px" aria-hidden="true" />}
          </div>

          <Link
            href={href}
            className="shrink-0 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 no-underline transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
          >
            {context.t.translate("works.viewMore")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
