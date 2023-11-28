export enum EReportType {
  command = 'command',
  init = 'init',
}

export type TReportType = `${EReportType}`;

export interface IGlobalOptions {
  debug?: boolean;
  skipActions?: boolean;
  template?: string;
  access?: string;
  output?: string;
  help?: boolean;
  version?: boolean;
}

export interface IEnvArgs {
  props: any;
  command: string;
  args?: string[];
}
