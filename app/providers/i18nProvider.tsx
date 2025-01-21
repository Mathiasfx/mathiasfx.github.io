/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Asegúrate de que este marcador de "use client" esté al inicio

import React, { createContext, useEffect, useState } from "react";

// Archivos de Traducción
import es from "../locale/es";
import en from "../locale/en";
// Interfaces
import { I18nContextValue } from "../interfaces/i18nContextValue.interface";
import { Translation } from "../interfaces/translation.interface";

export const I18nContext = createContext<I18nContextValue | null>(null);

const supportedLanguages = ["en", "es"];
const defaultLanguage = "en";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>(defaultLanguage);

  // Usamos useEffect para acceder a localStorage solo cuando el componente se renderiza en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Accedemos a localStorage solo en el cliente
      const storedLang = localStorage.getItem("language");
      const browserLang = navigator.language.split("-")[0];

      if (storedLang && supportedLanguages.includes(storedLang)) {
        setLanguage(storedLang);
      } else if (supportedLanguages.includes(browserLang)) {
        setLanguage(browserLang);
      } else {
        setLanguage(defaultLanguage);
      }
    }
  }, []); // Esto asegura que solo se ejecute en el cliente después de la primera renderización

  const changeLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lang);
      }
    }
  };

  const translations: { [key in string]: Translation } = {
    en,
    es,
  };

  const t = {
    translate: (key: string): string => {
      const keys = key.split(".");
      let value: any = translations[language];

      for (let i = 0; i < keys.length; i++) {
        if (value && value.hasOwnProperty(keys[i])) {
          value = value[keys[i]];
        } else {
          return ""; // Retorna vacío si no se encuentra la clave
        }
      }

      return value; // Devuelve el valor final encontrado
    },
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
