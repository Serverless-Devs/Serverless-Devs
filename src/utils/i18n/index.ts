/** @format */
import zh from './zh';
import en from './en';

const obj = { en, zh };

const i18n = (key: string) => {
  return obj['en'][key];
};

export default i18n;
