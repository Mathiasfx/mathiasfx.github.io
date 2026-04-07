"use client";
import { useState, useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  /** Mismo tamaño que los iconos; evita el cuadrado del SVG placeholder anterior. */
  const iconClass =
    "inline-flex shrink-0 cursor-pointer rounded-md p-0.5 transition-all duration-300 ease-in-out hover:bg-white/10";

  if (!mounted) {
    return (
      <span className={`${iconClass} h-9 w-9`} aria-hidden />
    );
  }

  if (resolvedTheme === "dark") {
    return (
      <MdOutlineLightMode
        className={iconClass}
        size={32}
        color="white"
        onClick={() => setTheme("light")}
        aria-label="Cambiar a tema claro"
      />
    );
  }

  if (resolvedTheme === "light") {
    return (
      <MdOutlineDarkMode
        className={iconClass}
        size={32}
        color="black"
        onClick={() => setTheme("dark")}
        aria-label="Cambiar a tema oscuro"
      />
    );
  }

  return (
    <MdOutlineDarkMode
      className={iconClass}
      size={32}
      color="currentColor"
      onClick={() => setTheme("dark")}
      aria-label="Cambiar a tema oscuro"
    />
  );
}
