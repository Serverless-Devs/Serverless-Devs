import { IGlobalOptions } from '@/type';

export type IOptions = IGlobalOptions & {
  name: string;
  description?: string;
  type?: string;
  role?: string;
  overlays?: Record<string, any>;
};
