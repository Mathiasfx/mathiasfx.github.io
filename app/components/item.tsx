import Link from "next/link";
import { ItemProps } from "../interfaces/item.interface";
import Image from "next/image";
import { getIcon } from "../utils/utils";
import { FaGithub, FaGlobeAmericas } from "react-icons/fa";

const Item = ({ work, context }: ItemProps) => {
  const href = `/projects/${encodeURIComponent(work.slug)}`;
  const title = work.name[context.language];
  const description = work.description[context.language];

  return (
    <div className="flex flex-col h-full mx-4 rounded-2xl bg-gray-400 dark:bg-slate-800 overflow-hidden transition-all duration-300 ease-in-out md:hover:scale-105 group shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-slate-800/50 min-h-[380px] max-h-[380px]">
      <div className="flex flex-col h-full justify-between">
        <Link
          href={href}
          className="flex flex-col text-inherit no-underline"
        >
          <div className="relative w-full h-44 shrink-0 overflow-hidden bg-gray-200 dark:bg-slate-700">
            <Image
              width={1308}
              height={816}
              src={work.image}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col p-4 space-y-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
              {title}
            </h3>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug line-clamp-2">
              {description}
            </p>
          </div>
        </Link>

        <div className="px-4 pb-4 space-y-2">
          <div className="flex flex-wrap gap-1 justify-center">
            {work.tec.map((tec: string) => (
              <div
                key={tec}
                className="flex items-center justify-center p-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg transition-all duration-300 group-hover:bg-gray-200 dark:group-hover:bg-slate-600"
              >
                {getIcon(tec)}
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-1">
            <Link
              href={href}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 no-underline transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
            >
              {context.t.translate("works.viewMore")}
            </Link>
          </div>

          {(work.github || work.url) && (
            <div className="flex gap-4 justify-center pt-1">
              {work.github && (
                <a
                  href={work.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 hover:scale-110"
                >
                  <FaGithub size={20} />
                </a>
              )}
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 hover:scale-110"
                >
                  <FaGlobeAmericas size={20} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
