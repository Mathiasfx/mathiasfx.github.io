export interface Work {
  slug: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  longDescription: { [key: string]: string };
  url: string;
  github: string;
  githubBackend?: string;
  image: string;
  tec: string[];
}

export type WorkWithContentHtml = Work & {
  contentHtml: { [key: string]: string };
};
