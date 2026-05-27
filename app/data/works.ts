import type { Work } from "@/app/interfaces/work.interface";

export const works: Work[] = [
  {
    slug: "super-party-app",
    name: {
      en: "Super Party App",
      es: "Super Party App",
    },
    description: {
      en: "I designed and developed Super Party, a fully functional multiplayer trivia game. NestJS backend with WebSockets; React Native client with UI and real-time connection logic.",
      es: "Diseñé y desarrollé Super Party, una trivia multijugador ya funcional. Backend con NestJS y WebSockets; cliente en React Native con UI y lógica de conexión.",
    },
    longDescription: {
      en: `## Description

Super Party is a multiplayer trivia game to play in real time with friends. Players join rooms, answer questions, and compete against each other.

## My role

I designed the backend with NestJS and WebSockets to manage rooms, real-time synchronization, and game logic. On the client side, I built the React Native app: UI, connection logic, and components.

## Stack

- **NestJS** — backend and real-time API
- **WebSockets** — multiplayer communication
- **React Native** — cross-platform mobile app

## Result

The mobile client and NestJS API are fully functional. Source code is available on GitHub: [mobile client](https://github.com/Mathiasfx/trivia-client-mobile) and [backend API](https://github.com/Mathiasfx/nest-trivia-api). The UX/UI design case study is published on [Behance](https://www.behance.net/gallery/101038903/Super-Party-APP-UXUI).`,
      es: `## Descripción

Super Party es una trivia multijugador para jugar en tiempo real con amigos. Los jugadores se conectan a salas, responden preguntas y compiten entre sí.

## Mi rol

Diseñé el backend con NestJS y WebSockets para gestionar las salas, la sincronización en tiempo real y la lógica del juego. En el cliente, desarrollé la app en React Native: interfaz, lógica de conexión y componentes.

## Stack

- **NestJS** — backend y API en tiempo real
- **WebSockets** — comunicación multijugador
- **React Native** — app mobile multiplataforma

## Resultado

El cliente móvil y la API en NestJS ya están funcionales. El código fuente está disponible en GitHub: [cliente móvil](https://github.com/Mathiasfx/trivia-client-mobile) y [API backend](https://github.com/Mathiasfx/nest-trivia-api). El case study de diseño UX/UI está publicado en [Behance](https://www.behance.net/gallery/101038903/Super-Party-APP-UXUI).`,
    },
    url: "https://www.behance.net/gallery/101038903/Super-Party-APP-UXUI",
    github: "https://github.com/Mathiasfx/trivia-client-mobile",
    githubBackend: "https://github.com/Mathiasfx/nest-trivia-api",
    image: "/images/appsuperparty.png",
    tec: ["reactnative", "nestjs"],
  },
  {
    slug: "web-fiestas-interactivas",
    name: {
      en: "Web Fiestas Interactivas",
      es: "Web Fiestas Interactivas",
    },
    description: {
      en: "I built a vibrant website for Fiestas Interactivas to showcase advergames, past projects, and connect with marketing agencies.",
      es: "Desarrolle un sitio web para Fiestas Interactivas para mostrar advergames, proyectos y conectar con agencias de marketing.",
    },
    longDescription: {
      en: `## Description

Fiestas Interactivas is a company that creates advergames and interactive experiences for events and marketing campaigns. They needed a modern website to showcase their portfolio and attract new agency clients.

## My role

Full frontend development: responsive layout, animations, project gallery, and contact sections tailored to their brand identity.

## Stack

- **Angular** — SPA architecture and component structure
- **Firebase** — hosting and dynamic content
- **Tailwind CSS** — utility-first styling

## Result

The site is live at [fiestasinteractivas.com.ar](https://fiestasinteractivas.com.ar/), presenting advergames and past projects in a vibrant, engaging way.`,
      es: `## Descripción

Fiestas Interactivas es una empresa que crea advergames y experiencias interactivas para eventos y campañas de marketing. Necesitaban un sitio moderno para mostrar su portfolio y atraer nuevas agencias.

## Mi rol

Desarrollo frontend completo: diseño responsive, animaciones, galería de proyectos y secciones de contacto alineadas con su identidad de marca.

## Stack

- **Angular** — arquitectura SPA y estructura de componentes
- **Firebase** — hosting y contenido dinámico
- **Tailwind CSS** — estilos utility-first

## Resultado

El sitio está online en [fiestasinteractivas.com.ar](https://fiestasinteractivas.com.ar/), presentando advergames y proyectos anteriores de forma atractiva.`,
    },
    url: "https://fiestasinteractivas.com.ar/",
    github: "",
    image: "/images/fiestas.png",
    tec: ["angular", "firebase", "tailwindcss"],
  },
  {
    slug: "web-gen3i",
    name: {
      en: "Web Gen3i",
      es: "Web Gen3i",
    },
    description: {
      en: "I developed this website for gen3i with a responsive design highlighting the good things about the organization.",
      es: "Desarrolle este sitio web para gen3i con diseño responsive resaltando lo bueno de la organizacion",
    },
    longDescription: {
      en: `## Description

Gen3i is an organization that needed a clean, professional web presence to communicate its values and activities to a broader audience.

## My role

End-to-end frontend development: responsive design, content sections, and deployment. The site highlights the organization's strengths with a modern, accessible layout.

## Stack

- **Angular** — component-based architecture and routing

## Result

The website is live at [gen3i.com.ar](https://www.gen3i.com.ar). Source code is available on GitHub.`,
      es: `## Descripción

Gen3i es una organización que necesitaba una presencia web profesional para comunicar sus valores y actividades a un público más amplio.

## Mi rol

Desarrollo frontend de punta a punta: diseño responsive, secciones de contenido y despliegue. El sitio destaca los puntos fuertes de la organización con un layout moderno y accesible.

## Stack

- **Angular** — arquitectura basada en componentes y routing

## Resultado

El sitio está online en [gen3i.com.ar](https://www.gen3i.com.ar). El código fuente está disponible en GitHub.`,
    },
    url: "https://www.gen3i.com.ar",
    github: "https://github.com/Mathiasfx/3geni-website",
    image: "/images/gen3i.png",
    tec: ["angular"],
  },
  {
    slug: "web-fefe-filmaker",
    name: {
      en: "Web Fefe Filmaker",
      es: "Web Fefe Filmaker",
    },
    description: {
      en: "I created a modern website for a filmmaker, showcasing their portfolio, multimedia content, and services to connect with their audience.",
      es: "Desarrolle un sitio web moderno para un filmaker, mostrando su portafolio, contenido multimedia y servicios para conectar con su audiencia.",
    },
    longDescription: {
      en: `## Description

A filmmaker needed a personal website to showcase their portfolio, video work, and services — connecting with clients and audience through a polished online presence.

## My role

Designed and built the full site: portfolio gallery, multimedia sections, services page, and contact flow. Focus on visual storytelling that matches the creative industry.

## Stack

- **Angular** — frontend SPA
- **Node.js** — backend services and content delivery

## Result

The site is live at [fefespinosa.com.ar](https://www.fefespinosa.com.ar), presenting the filmmaker's work and services in a modern, cinematic style.`,
      es: `## Descripción

Un filmmaker necesitaba un sitio personal para mostrar su portfolio, trabajos en video y servicios — conectando con clientes y audiencia a través de una presencia online cuidada.

## Mi rol

Diseñé y desarrollé el sitio completo: galería de portfolio, secciones multimedia, página de servicios y flujo de contacto. Enfoque en narrativa visual acorde a la industria creativa.

## Stack

- **Angular** — SPA frontend
- **Node.js** — servicios backend y entrega de contenido

## Resultado

El sitio está online en [fefespinosa.com.ar](https://www.fefespinosa.com.ar), presentando el trabajo y servicios del filmmaker con un estilo moderno y cinematográfico.`,
    },
    url: "https://www.fefespinosa.com.ar",
    github: "",
    image: "/images/filmaker.png",
    tec: ["angular", "node"],
  },
  {
    slug: "finance-webapp",
    name: {
      en: "Finance WebApp",
      es: "WebApp de Finanzas",
    },
    description: {
      en: "I'm developing a web app to manage personal finances: track salary, expenses by category, fixed costs, and investments. In parallel, I'm building the React Native app with Firebase Cloud Functions as a microfrontend.",
      es: "Estoy desarrollando una aplicación web para gestionar finanzas personales: manejar salarios, gastos por categoría, costos fijos e inversiones. En paralelo, desarrollo la app en React Native con Cloud Functions de Firebase como microfrontend.",
    },
    longDescription: {
      en: `## Description

A personal side project to solve my own need: tracking income, categorizing expenses, managing fixed costs, and monitoring investments in one place. In parallel, I'm developing the mobile app in React Native, using Firebase Cloud Functions as a microfrontend for the app.

## My role

Sole developer — product design, frontend, backend integration, and deployment. Built iteratively with real daily use driving feature priorities. I'm also working on the React Native client and its integration with Cloud Functions.

## Stack

- **React** — UI components and state management
- **Next.js** — SSR, routing, and deployment on Vercel
- **Firebase** — authentication and Firestore for data persistence
- **React Native** — mobile app (in development)
- **Firebase Cloud Functions** — microfrontend for the mobile app

## Result

The app is deployed at [personal-financial-app.vercel.app](https://personal-financial-app.vercel.app/). Source code is on GitHub. Still actively developed with new features, including the React Native app.`,
      es: `## Descripción

Un proyecto personal para resolver una necesidad propia: registrar ingresos, categorizar gastos, manejar costos fijos y monitorear inversiones en un solo lugar. En paralelo, desarrollo la app mobile en React Native con Cloud Functions de Firebase como microfrontend.

## Mi rol

Desarrollador único — diseño de producto, frontend, integración backend y despliegue. Construido de forma iterativa, con el uso diario real como guía de prioridades. También trabajo en el cliente React Native y su integración con Cloud Functions.

## Stack

- **React** — componentes UI y gestión de estado
- **Next.js** — SSR, routing y despliegue en Vercel
- **Firebase** — autenticación y Firestore para persistencia de datos
- **React Native** — app mobile (en desarrollo)
- **Firebase Cloud Functions** — microfrontend para la app mobile

## Resultado

La app está desplegada en [personal-financial-app.vercel.app](https://personal-financial-app.vercel.app/). El código fuente está en GitHub. Sigue en desarrollo activo con nuevas funcionalidades, incluida la app en React Native.`,
    },
    url: "https://personal-financial-app.vercel.app/",
    github: "https://github.com/Mathiasfx/personal-financial-app",
    image: "/images/finance.png",
    tec: ["react", "nextjs", "firebase"],
  },
  {
    slug: "app-chatbot-ia-la-clase-digital",
    name: {
      en: "App Chatbot IA La clase digital",
      es: "App Chatbot IA La clase digital",
    },
    description: {
      en: "AI assistant for La Clase Digital: I built the N8N self-hosted workflow for the AI layer, deployed it with Docker on Azure, and developed the React Native chat client.",
      es: "Asistente con IA para La Clase Digital: diseñé el flujo de IA en n8n self-hosted, lo desplegué con Docker en Azure y desarrollé el cliente de chat en React Native.",
    },
    longDescription: {
      en: `## Description

La Clase Digital needed an AI assistant to help students and tutors with school questions and homework. The mobile app is a conversational interface; the core of the project is the AI orchestration built with N8N self-hosted, containerized with Docker and deployed on Azure.

## My role

I designed and implemented the AI flow in N8N: prompt handling, model integration, and response logic. I set up the self-hosted infrastructure with Docker on Azure for deployment and operations. On the client side, I built the React Native app as the chat entry point, connected to the workflow backend.

## Stack

- **N8N (self-hosted)** — AI workflow orchestration and business logic
- **Docker** — containerization and local/production environment
- **Azure** — cloud deployment and hosting
- **React Native** — cross-platform chat client (iOS and Android)

## Result

A functional AI assistant integrated into the La Clase Digital ecosystem. The project demonstrates end-to-end skills in automation, AI workflows, DevOps, and mobile development — not just a chat UI, but a complete pipeline from user message to AI response.`,
      es: `## Descripción

La Clase Digital necesitaba un asistente con IA para ayudar a estudiantes y tutores con consultas escolares y tareas. La app mobile funciona como interfaz conversacional; el núcleo del proyecto está en la orquestación de IA con n8n self-hosted, containerizado con Docker y desplegado en Azure.

## Mi rol

Diseñé e implementé el flujo de IA en n8n: manejo de prompts, integración con el modelo y lógica de respuestas. Monté la infraestructura self-hosted con Docker en Azure para el despliegue y la operación. En el cliente, desarrollé la app en React Native como punto de entrada del chat, conectada al backend del workflow.

## Stack

- **n8n (self-hosted)** — orquestación del flujo de IA y lógica de negocio
- **Docker** — containerización y entorno local/producción
- **Azure** — despliegue y hosting en la nube
- **React Native** — cliente de chat multiplataforma (iOS y Android)

## Resultado

Un asistente con IA funcional integrado al ecosistema de La Clase Digital. El proyecto muestra capacidades end-to-end en automatización, workflows de IA, DevOps y desarrollo mobile: no solo una UI de chat, sino un pipeline completo desde el mensaje del usuario hasta la respuesta de la IA.`,
    },
    url: "",
    github: "",
    image: "/images/laclasebot.png",
    tec: ["n8n", "docker", "azure", "reactnative"],
  },
];
