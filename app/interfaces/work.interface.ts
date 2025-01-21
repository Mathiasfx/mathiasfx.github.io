export interface Work {
  name: { [key: string]: string }; // { en: string, es: string, ... }
  description: { [key: string]: string }; // { en: string, es: string, ... }
  url: string;
  github: string;
  image: string;
  tec: string[];
}
