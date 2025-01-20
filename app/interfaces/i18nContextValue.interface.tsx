import { Translation } from "./translation.interface";

export interface I18nContextValue {
  language: string;
  changeLanguage: (lang: string) => void;
  t: Translation;
}
