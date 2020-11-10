import * as URL from "url";
import { GitRepoTemplate } from "./repo-template-entity";
import * as path from "path";
import { InitError } from "../error/init-error";

export function parse(url: string): URL.Url {
  return URL.parse(url);
}

export function getProjectNameFromUrl(url: string) {
  const slash = url.lastIndexOf("/");
  if (slash && slash >= 0) {
    url = url.substr(slash + 1);
  }

  if (url.endsWith(".git")) {
    return url.substr(0, url.length - 4);
  }
  return url;
}

export function isUrlFormat(url: string) {
  return url.includes(":") || url.includes("/");
}

export function extractTemplateInfo(url: URL.Url): GitRepoTemplate {
  let pathname = url.pathname || "";
  if (pathname.endsWith(".git")) {
    pathname = pathname.substr(0, pathname.length - 4);
  }
  const pathArr = pathname.split("/");
  if (pathArr.length < 3) {
    throw new InitError("Git repo url not correct.");
  }
  const ownerName = pathArr[1];
  const repoName = pathArr[2];
  const branch = pathArr.length < 5 ? "master" : pathArr[4];
  const hasSubPath = pathArr.length > 5;
  let subPath = "";
  if (hasSubPath) {
    subPath = path.join.apply(null, pathArr.slice(5));
  }

  let zipFile = "";
  if (url.hostname && url.hostname.includes("github")) {
    zipFile = `${url.protocol}//${url.host}/${ownerName}/${repoName}/archive/${branch}.zip`;
  }

  return {
    host: url.host,
    ownerName,
    repoName,
    branch,
    hasSubPath,
    subPath,
    zipFile,
  };
}
