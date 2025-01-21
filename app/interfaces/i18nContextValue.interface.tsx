export interface I18nContextValue {
  language: string;
  changeLanguage: (lang: string) => void;
  t: {
    translate: (key: string) => string;
  };
}
