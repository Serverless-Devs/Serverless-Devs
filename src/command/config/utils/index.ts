import { fieldEncryption } from '@serverless-devs/utils';

export const handleSecret = (credential: Record<string, string>) => {
  const show = {};
  for (const key in credential) {
    const value = credential[key];
    if (key.startsWith('__')) {
      show[key] = value;
    } else {
      show[key] = fieldEncryption(value);
    }
  }
  return show;
};
