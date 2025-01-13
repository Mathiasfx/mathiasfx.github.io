import MyPresentation from "./components/myPresentation";
import Portfolio from "./components/portfolio";
import ThemeSwitch from "./components/themeSwitch";
import { Work } from "./interfaces/work.interface";

export default function Home() {
  const works: Work[] = [
    {
      name: "Web Fefe Filmaker",
      description:
        "I created a modern website for a filmmaker, showcasing their portfolio, multimedia content, and services to connect with their audience.",
      url: "https://www.fefespinosa.com.ar",
      github: "",
      image: "/images/filmaker.png",
      tec: ["angular", "node"],
    },
    {
      name: "Web Fiestas Interactivas",
      description:
        "I built a vibrant website for Fiestas Interactivas to showcase advergames, past projects, and connect with marketing agencies.",
      url: "https://fiestasinteractivas.com.ar/",
      github: "",
      image: "/images/fiestas.png",
      tec: ["angular", "firebase", "tailwindcss"],
    },
    {
      name: "Store WebApp",
      description:
        "A landing page project for small stores, displaying available products with stock information and offering direct WhatsApp contact.",
      url: "https://perfumes-formosa.vercel.app/",
      github: "https://github.com/Mathiasfx/simple-store-app",
      image: "/images/simplewebappstore.png",
      tec: ["react", "nextjs", "tailwindcss"],
    },
    {
      name: "Finance WebApp",
      description:
        "I'm developing a web app to manage personal finances: track salary, expenses by category, fixed costs, and investments. ",
      url: "https://vercel.com/mathiasfxs-projects/personal-financial-app",
      github: "https://github.com/Mathiasfx/personal-financial-app",
      image: "/images/finance.png",
      tec: ["react", "nextjs", "firebase", "tailwindcss"],
    },
    {
      name: "Super Party App",
      description:
        "I designed the complete UX/UI for Super Party, a React Native application. The app development is currently in progress.",
      url: "https://www.behance.net/gallery/101038903/Super-Party-APP-UXUI",
      github: "",
      image: "/images/appsuperparty.png",
      tec: ["reactnative", "firebase", "tailwindcss"],
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
