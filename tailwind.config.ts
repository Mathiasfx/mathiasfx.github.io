import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /** Teal apagado (misma familia cromática, menos “neon”) */
        "blog-accent": "#3d9b91",
        "blog-accent-soft": "#5cbfb4",
        "blog-surface": {
          light: "#eef0f2",
          dark: "#1e293b",
        },
        "blog-muted": "#7a8a8f",
        "blog-border": {
          subtle: "rgba(100, 116, 139, 0.4)",
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
