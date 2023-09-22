import { startsWith } from 'lodash';

export const isFc3 = (name: string) => {
  // only test
  if (process.env.v3test) return true;
  return startsWith(name, 'fc3');
};
