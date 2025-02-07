"use client";
import React, { useContext } from "react";
import LanguageSelector from "./components/LanguageSelector";
import MyPresentation from "./components/myPresentation";
import Portfolio from "./components/portfolio";
import ThemeSwitch from "./components/themeSwitch";
import { Work } from "./interfaces/work.interface";
import { I18nContext } from "./providers/i18nProvider";

export default function Home() {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error(
      "The I18n is not initialized, Make sure you have the provider set up correctly"
    );
  }
  const works: Work[] = [
    {
      name: {
        en: "Web Fefe Filmaker",
        es: "Web Fefe Filmaker",
      },
      description: {
        en: "I created a modern website for a filmmaker, showcasing their portfolio, multimedia content, and services to connect with their audience.",
        es: "Desarrolle un sitio web moderno para un filmaker, mostrando su portafolio, contenido multimedia y servicios para conectar con su audiencia.",
      },
      url: "https://www.fefespinosa.com.ar",
      github: "",
      image: "/images/filmaker.png",
      tec: ["angular", "node"],
    },
    {
      name: {
        en: "Web Fiestas Interactivas",
        es: "Web Fiestas Interactivas",
      },
      description: {
        en: "I built a vibrant website for Fiestas Interactivas to showcase advergames, past projects, and connect with marketing agencies.",
        es: "Desarrolle un sitio web para Fiestas Interactivas para mostrar advergames, proyectos y conectar con agencias de marketing.",
      },
      url: "https://fiestasinteractivas.com.ar/",
      github: "",
      image: "/images/fiestas.png",
      tec: ["angular", "firebase", "tailwindcss"],
    },
    {
      name: {
        en: "Store WebApp",
        es: "Tienda WebApp",
      },
      description: {
        en: "A landing page project for small stores, displaying available products with stock information and offering direct WhatsApp contact.",
        es: "Un proyecto de página para pequeñas tiendas, mostrando productos disponibles con información de stock y ofreciendo contacto directo por WhatsApp.",
      },
      url: "https://perfumes-formosa.vercel.app/",
      github: "https://github.com/Mathiasfx/simple-store-app",
      image: "/images/simplewebappstore.png",
      tec: ["react", "nextjs", "tailwindcss"],
    },
    {
      name: {
        en: "Finance WebApp",
        es: "WebApp de Finanzas",
      },
      description: {
        en: "I'm developing a web app to manage personal finances: track salary, expenses by category, fixed costs, and investments.",
        es: "Estoy desarrollando una aplicación web para gestionar finanzas personales: manejar salarios, gastos por categoría, costos fijos e inversiones.",
      },
      url: "https://personal-financial-app.vercel.app/",
      github: "https://github.com/Mathiasfx/personal-financial-app",
      image: "/images/finance.png",
      tec: ["react", "nextjs", "firebase", "tailwindcss"],
    },
    {
      name: {
        en: "Super Party App",
        es: "Super Party App",
      },
      description: {
        en: "I designed the complete UX/UI for Super Party, a React Native application. The app development is currently in progress.",
        es: "Diseñé toda la UX/UI para Super Party, para una aplicación de React Native. El desarrollo de la app está en progreso.",
      },
      url: "https://www.behance.net/gallery/101038903/Super-Party-APP-UXUI",
      github: "",
      image: "/images/appsuperparty.png",
      tec: ["reactnative", "firebase", "tailwindcss"],
    },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <LanguageSelector />
      <ThemeSwitch />
      <MyPresentation context={context} />
      <Portfolio context={context} works={works} />
    </div>
  );
}
