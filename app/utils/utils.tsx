import { FaReact } from "react-icons/fa"; // React
import { SiNextdotjs } from "react-icons/si"; // Next.js
import { SiTailwindcss } from "react-icons/si"; // Tailwind CSS
import { FaAngular } from "react-icons/fa"; // Angular
import { FaNodeJs } from "react-icons/fa"; // Node.js

export const getIcon = (icon: string) => {
  switch (icon) {
    case "react":
      return <FaReact size={24} />;
    case "nextjs":
      return <SiNextdotjs size={24} />;
    case "tailwindcss":
      return <SiTailwindcss size={24} />;
    case "angular":
      return <FaAngular size={24} />;
    case "node":
      return <FaNodeJs size={24} />;
    default:
      return <FaReact size={24} />;
  }
};
