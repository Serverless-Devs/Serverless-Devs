import { startsWith } from 'lodash';

export const isFc3 = (name: string) => startsWith(name, 'fc3');
