import { IGlobalOptions } from '@/type';

export type IOptions = IGlobalOptions & {
  project?: string;
  name?: string;
  description?: string;
  type?: string;
};
