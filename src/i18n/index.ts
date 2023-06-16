import { getGlobalConfig } from '@serverless-devs/utils';
import zh from './zh';
import en from './en';

const obj = { en, zh };

const i18n = (key: string) => {
  const lang = getGlobalConfig('locale') || 'en';
  const val = obj[lang] ? obj[lang][key] : obj['en'][key];
  return val || key;
};

export default i18n;
