/** @format */
import { getLang } from '../common';
import zh from './zh';
import en from './en';

const obj = { en, zh };

const i18n = (key: string) => {
  const lang = getLang();
  return obj[lang][key];
};

export default i18n;
