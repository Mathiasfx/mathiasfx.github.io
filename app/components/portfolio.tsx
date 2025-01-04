import { PortfolioProps } from "../interfaces/portfolioProps";
import { Work } from "../interfaces/work.interface";
import Item from "./item";

const Portfolio = ({ works }: PortfolioProps) => {
  return (
    <div className="w-full h-full max-w-screen-xl  my-6 mb-4">
      <h1 className="text-center md:text-left text-2xl md:text-3xl font-bold mt-3">
        Featured Work
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {works.map((work: Work) => (
          <Item work={work} key={work.name} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
