import { ISpec as IParseSpec } from '@serverless-devs/parse-spec';

export type ISpec = IParseSpec & { components: string[] };
