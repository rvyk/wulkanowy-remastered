type Release = {
  html_url: string;
  name: string;
  published_at: string;
  assets: { browser_download_url: string }[];
};

type DevRelease = {
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

type RemoteDevRelease = {
  title: string;
  number: number;
  html_url: string;
  user: { login: string; avatar_url: string };
  head: { sha: string; ref: string };
  id: number;
};

type Contributor = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
};
