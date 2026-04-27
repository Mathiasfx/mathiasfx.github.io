import { ItemProps } from "../interfaces/item.interface";
import Image from "next/image";
import { getIcon } from "../utils/utils";
import { FaGithub, FaGlobeAmericas } from "react-icons/fa";

const Item = ({ work, context }: ItemProps) => {
  return (
    <div className="flex flex-col h-full mx-4 rounded-2xl bg-gray-400 dark:bg-slate-800 overflow-hidden transition-all duration-300 ease-in-out md:hover:scale-105 group shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-slate-800/50 min-h-[380px] max-h-[380px]">
      
      <div className="flex flex-col h-full justify-between">
        {/* Image Section - More Prominent */}
        <div className="relative w-full h-44 overflow-hidden bg-gray-200 dark:bg-slate-700">
          <Image
            width={1308}
            height={816}
            src={work.image}
            alt={work.name[context.language]}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between p-4 space-y-2">
          {/* Title */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
              {work.name[context.language]}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug line-clamp-2">
            {work.description[context.language]}
          </p>

          {/* Technologies */}
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

          {/* Links Section */}
          <div className="flex gap-4 justify-center pt-2">
            {work.github && (
              <a 
                href={work.github}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 hover:scale-110"
              >
                <FaGithub size={20} />
              </a>
            )}
            {work.url && (
              <a 
                href={work.url}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 hover:scale-110"
              >
                <FaGlobeAmericas size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
