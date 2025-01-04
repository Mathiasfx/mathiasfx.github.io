import { FaReact } from "react-icons/fa"; // React
import { SiNextdotjs } from "react-icons/si"; // Next.js
import { SiTailwindcss } from "react-icons/si"; // Tailwind CSS
import { FaAngular } from "react-icons/fa"; // Angular
import { FaNodeJs } from "react-icons/fa"; // Node.js
import { FaFire } from "react-icons/fa";

export const getIcon = (icon: string) => {
  switch (icon) {
    case "react":
      return (
        <p className="flex text-sm items-center space-x-1">
          <FaReact size={24} style={{ marginRight: "4px" }} /> React
        </p>
      );
    case "nextjs":
      return (
        <p className="flex text-sm items-center space-x-1">
          <SiNextdotjs size={24} style={{ marginRight: "4px" }} /> Next.js
        </p>
      );
    case "tailwindcss":
      return (
        <p className="flex text-sm items-center space-x-1">
          <SiTailwindcss size={24} style={{ marginRight: "4px" }} /> Tailwind
        </p>
      );
    case "angular":
      return (
        <p className="flex text-sm items-center space-x-1">
          <FaAngular size={24} style={{ marginRight: "4px" }} /> Angular
        </p>
      );
    case "node":
      return (
        <p className="flex text-sm items-center space-x-1">
          <FaNodeJs size={24} style={{ marginRight: "4px" }} /> Node
        </p>
      );
    case "firebase":
      return (
        <p className="flex text-sm items-center space-x-1">
          <FaFire size={24} style={{ marginRight: "4px" }} /> Firebase
        </p>
      );
    case "reactnative":
      return (
        <p className="flex text-sm items-center space-x-1">
          <FaReact size={24} style={{ marginRight: "4px" }} /> React Native
        </p>
      );
    default:
      return <FaReact size={24} style={{ marginRight: "4px" }} />;
  }
};
