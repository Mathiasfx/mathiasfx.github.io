"use client";

import React, { useContext } from "react";
import MyPresentation from "./myPresentation";
import Portfolio from "./portfolio";
import BlogPreview from "./BlogPreview";
import { Work } from "../interfaces/work.interface";
import { I18nContext } from "../providers/i18nProvider";
import type { SerializedBlogPost } from "@/lib/firebaseAdmin";

const works: Work[] = [
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
      en: "Web Gen3i",
      es: "Web Gen3i",
    },
    description: {
      en: "I developed this website for gen3i with a responsive design highlighting the good things about the organization.",
      es: "Desarrolle este sitio web para gen3i con diseño responsive resaltando lo bueno de la organizacion",
    },
    url: "https://www.gen3i.com.ar",
    github: "https://github.com/Mathiasfx/3geni-website",
    image: "images/gen3i.png",
    tec: ["angular"],
  },
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
    tec: ["react", "nextjs", "firebase"],
  },
  {
    name: {
      en: "App Chatbot IA La clase digital",
      es: "App Chatbot IA La clase digital",
    },
    description: {
      en: "I developed an AI chatbot application for La Clase Digital using React Native, to assist students and tutors with school help using AI.",
      es: "Desarrolle una aplicación de chatbot IA para La Clase Digital usando React Native, para la ayuda escolar de los estudiantes y tutores usando IA .",
    },
    url: "",
    github: "",
    image: "/images/laclasebot.png",
    tec: ["reactnative"],
  },
];

type HomeClientProps = {
  recentPosts: SerializedBlogPost[];
};

export default function HomeClient({ recentPosts }: HomeClientProps) {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error(
      "The I18n is not initialized, Make sure you have the provider set up correctly"
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-start max-w-full">
      <MyPresentation context={context} />
      <Portfolio context={context} works={works} />
      <BlogPreview context={context} posts={recentPosts} />
    </div>
  );
}
