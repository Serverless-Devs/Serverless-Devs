/** @format */

export enum PackageType {
  application,
  component,
  plugin,
}

export interface CommandType {
  type: string;
  message: string;
  name: string;
  default?: string;
  choices?: any;
}

export interface InquirerCommand {
  [key: string]: CommandType;
}

export interface RepoTemplate {
  zipFile: string;
  subPath?: string;
  hasSubPath: boolean;
}

export interface GitRepoTemplate extends RepoTemplate {
  host: string | null;
  ownerName: string;
  branch: string;
  repoName: string;
}
