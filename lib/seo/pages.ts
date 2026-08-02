import { siteConfig } from "@/config";

export const portfolioPages = [
  {
    key: "home",
    label: "Home",
    path: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
  },
  {
    key: "projects",
    label: "Projects",
    path: "/projects",
    title: `${siteConfig.name} Projects — Web Development Portfolio`,
    description: `Featured projects by ${siteConfig.name}, including React.js, Next.js, Node.js, and MongoDB applications showcasing freelance and product engineering work.`,
    keywords: [
      "Kishore Projects",
      "React.js Projects",
      "Next.js Portfolio",
      "Node.js Projects",
      "MongoDB Projects",
      "Frontend Projects",
      "Freelance Web Projects",
    ],
  },
  {
    key: "blogs",
    label: "Blogs",
    path: "/blogs",
    title: `${siteConfig.name} Blogs — Medium Articles on Web Development`,
    description: `Read Medium blogs by ${siteConfig.name} on frontend development, React.js, Next.js, Node.js, and modern web engineering.`,
    keywords: [
      "Kishore Blog",
      "Kishore Medium",
      "Frontend Developer Blog",
      "React.js Blog",
      "Next.js Articles",
      "Web Development Blog",
      "Medium Blog",
    ],
  },
] as const;

export type PortfolioPageKey = (typeof portfolioPages)[number]["key"];

export function getPortfolioPage(key: PortfolioPageKey) {
  const page = portfolioPages.find((item) => item.key === key);
  if (!page) {
    throw new Error(`Unknown portfolio page: ${key}`);
  }
  return page;
}
