import zh from './zh';
import en from './en';

const obj = { en, zh };

const i18n = (key: string) => {
  const val = obj['en'][key];
  return val || key;
};

export default i18n;
