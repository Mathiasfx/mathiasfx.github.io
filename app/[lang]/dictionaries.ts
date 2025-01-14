import 'server-only'
import {Dict, Lang, _t} from '~/utils/i18n'

interface Dictionary {
    en : () => Promise<Dict>
    es : () => Promise<Dict>
}

const dictionaries : Dictionary = {
    en : () => import('./dictionaries/en.json').then(m => m.default),
    es : () => import('./dictionaries/es.json').then(m => m.default)
}

export const getDictionary = async (lang: keyof Dictionary) => dictionaries[lang]();
export type Translator = (key:string) => string;
export const getTranslations = async (lang:Lang):Promise<Translator> => {
    const dict = await getDictionary(lang);
    return (key:string) => _t(key,dict);
}
