

export interface RepoTemplate {
    zipFile : string;
    subPath ?: string;
    hasSubPath : boolean;
}

export interface GitRepoTemplate extends RepoTemplate {
    host : string | null;
    ownerName : string;
    branch : string;
    repoName : string;
}
