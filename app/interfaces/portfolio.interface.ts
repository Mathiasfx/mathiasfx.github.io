import { I18nContextValue } from "./i18nContextValue.interface";
import { Work } from "./work.interface";

export interface PortfolioProps {
  context: I18nContextValue
  works: Work[];

}