import MyPresentation from "./components/myPresentation";
import Portfolio from "./components/portfolio";
import ThemeSwitch from "./components/themeSwitch";
import { Work } from "./interfaces/work.interface";

export default function Home() {
  const works: Work[] = [
    {
      name: "Simple Store WebApp",
      description:
        "Is a landing page project designed for small stores in a shopping mall. The application showcases available products along with their current stock and provides a direct WhatsApp contact option for inquiries or order",
      url: "https://mathiaspereira.dev",
      image: "/images/appreactnative.png",
      tec: ["react", "nextjs", "angular", "node"],
    },
    {
      name: "Mathias Pereira",
      description:
        "Mathias Pereira es un desarrollador Frontend con experiennado por resolver problemas y aprender nuevas tecnologías.",
      url: "https://mathiaspereira.dev",
      image: "/images/appreactnative.png",
      tec: ["react", "nextjs", "angular", "node"],
    },
    {
      name: "Simple Store App",
      description:
        "Simple Store App es un proyecto de ejemplo para el uso de Redux y React",
      url: "https://mathiaspereira.dev",
      image: "/images/appreactnative.png",
      tec: ["react", "nextjs", "angular", "tailwindcss"],
    },
  ];
  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <ThemeSwitch />
      <MyPresentation />
      <Portfolio works={works} />
    </div>
  );
}
