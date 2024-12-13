import { ItemProps } from "../interfaces/itemProps";
import Image from "next/image";
import { getIcon } from "../utils/utils";

const Item = ({ work }: ItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center  mx-4 min-h-[330px] max-h-[330px] rounded-lg bg-gray-400 dark:bg-slate-800 shadow-md cursor-pointer transition-transform duration-300 ease-in-out md:hover:scale-105 border-2 border-cyan-400 shadow-cyan-500/50 ">
      <div className="p-6 h-full min-h-[300px] flex flex-col items-center justify-start">
        <h3 className="text-center text-2xl mb-3 font-semibold  text-gray-800 dark:text-white">
          {work.name}
        </h3>
        <Image
          width={200}
          height={200}
          src={work.image}
          alt={work.name}
          className="object-cover w-full h-[100px] rounded-lg"
        />
        <p className="text-left text-sm text-gray-600 dark:text-gray-300 mt-2">
          {work.description}
        </p>
      </div>
      <div className="flex justify-center items-center mb-4 space-x-2 flex-wrap">
        {work.tec.map((tec: string) => (
          <div key={tec} className="flex items-center space-x-2">
            {getIcon(tec)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
