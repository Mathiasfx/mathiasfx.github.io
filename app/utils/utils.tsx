import { FaAngular, FaFire, FaMicrosoft, FaNodeJs, FaReact } from "react-icons/fa";
import { SiDocker, SiNestjs, SiNextdotjs, SiN8N, SiTailwindcss } from "react-icons/si";
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
    case "nestjs":
      return (
        <p className="flex text-sm items-center space-x-1">
          <SiNestjs size={24} style={{ marginRight: "4px" }} /> NestJS
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
    case "n8n":
      return (
        <p className="flex text-sm items-center space-x-1">
          <SiN8N size={24} style={{ marginRight: "4px" }} /> n8n
        </p>
      );
    case "docker":
      return (
        <p className="flex text-sm items-center space-x-1">
          <SiDocker size={24} style={{ marginRight: "4px" }} /> Docker
        </p>
      );
    case "azure":
      return (
        <p className="flex text-sm items-center space-x-1">
          <FaMicrosoft size={24} style={{ marginRight: "4px" }} /> Azure
        </p>
      );
    default:
      return <FaReact size={24} style={{ marginRight: "4px" }} />;
  }
};
