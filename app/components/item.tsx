import { ItemProps } from "../interfaces/item.interface";
import Image from "next/image";
import { getIcon } from "../utils/utils";
import { FaGithub, FaGlobeAmericas } from "react-icons/fa";

const Item = ({ work }: ItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center  mx-4 min-h-[340px] max-h-[340px] rounded-lg bg-gray-400 dark:bg-slate-800 shadow-md  transition-transform duration-300 ease-in-out md:hover:scale-105 border-2 border-cyan-400 shadow-cyan-500/50 ">
      <div className="h-full min-h-[300px] flex flex-col items-center justify-start">
        <Image
          width={1308}
          height={816}
          src={work.image}
          alt={work.name}
          className="object-cover w-full h-[120px] rounded-lg"
        />
        <div className="p-6 w-100 h-100">
          <h3 className="text-center text-2xl  font-semibold  text-gray-800 dark:text-white">
            {work.name}
          </h3>
          <p className="text-left text-sm text-gray-600 dark:text-gray-300 mt-1">
            {work.description}
          </p>
          <div className="w-full flex justify-center items-center mt-1">
            {work.github && (
              <a href={work.github}>
                <FaGithub size={24} className="mr-2" />
              </a>
            )}
            {work.url && (
              <a href={work.url}>
                <FaGlobeAmericas size={24} className="mr-2" />
              </a>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center mb-2 space-x-2 flex-wrap">
          {work.tec.map((tec: string) => (
            <div key={tec} className="flex items-center space-x-2">
              {getIcon(tec)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Item;
