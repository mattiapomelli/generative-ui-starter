export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "RabbitHole",
  description: "",
  url: "http://localhost:3000",
  ogImage: "",
  links: {
    twitter: "",
  },
};
