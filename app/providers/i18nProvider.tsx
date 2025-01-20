import React, { createContext, useEffect, useState } from "react";

//Archivos de Traduccion.
import es from "../locale/es";
import en from "../locale/en";
import { I18nContextValue } from "../interfaces/i18nContextValue.interface";
import { Translation } from "../interfaces/translation.interface";

export const I18nContext = createContext<I18nContextValue | null>(null);

const supportedLanguages = ["en", "es"];
const defaultLanguage = "en";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || navigator.language.split("-")[0]
  );

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    const storedLang = localStorage.getItem("language");

    if (storedLang && supportedLanguages.includes(storedLang)) {
      setLanguage(browserLang);
    } else if (supportedLanguages.includes(browserLang)) {
      setLanguage(browserLang);
    } else {
      setLanguage(defaultLanguage);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  const translations: { [key in string]: Translation } = {
    en,
    es,
  };
  const t = {
    translate: (key: string | number) => {
      return translations[language][key] || key;
    },
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
