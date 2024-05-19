export type Release = {
  html_url: string;
  name: string;
  published_at: string;
  assets: { browser_download_url: string }[];
};

export type DevRelease = {
  title: string;
  number: number;
  github: string;
  released?: string;
  download?: string;
  url?: string;
  build?: number;
  avatar: string;
  user: string;
  commit: string;
  id: number;
};

export type RemoteDevRelease = {
  title: string;
  number: number;
  html_url: string;
  user: { login: string; avatar_url: string };
  head: { sha: string; ref: string };
  id: number;
};
