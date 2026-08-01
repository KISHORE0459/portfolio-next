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
    key: "about",
    label: "About",
    path: "/about",
    title: `About ${siteConfig.name} — Frontend Developer in Chennai`,
    description: `Learn about ${siteConfig.name}, a frontend developer working with React.js, Next.js, Node.js, Express, MongoDB, and Figma. Available for freelance web development in Chennai and worldwide.`,
    keywords: [
      "About Kishore",
      "Kishore Frontend Developer",
      "Frontend Developer Chennai",
      "React.js Developer",
      "Next.js Developer",
      "Node.js Developer",
      "Freelance Frontend Developer",
    ],
  },
  {
    key: "experience",
    label: "Experience",
    path: "/experience",
    title: `${siteConfig.name} Work Experience — Frontend Developer`,
    description: `Explore ${siteConfig.name}'s experience building web products with React.js, Next.js, Node.js, and modern full-stack tools for real users across enterprise platforms.`,
    keywords: [
      "Kishore Experience",
      "Frontend Developer Experience",
      "React.js Developer Experience",
      "Next.js Developer Jobs",
      "Node.js Developer Experience",
      "Frontend Engineer Career",
    ],
  },
  {
    key: "skills",
    label: "Skills",
    path: "/skills",
    title: `${siteConfig.name} Skills — React, Next.js, Node.js & More`,
    description: `Technical skills of ${siteConfig.name}: React.js, Next.js, TypeScript, JavaScript, Node.js, Express.js, MongoDB, Figma, Tailwind CSS, and modern web development tools.`,
    keywords: [
      "React.js Skills",
      "Next.js Skills",
      "Node.js Skills",
      "Express.js",
      "MongoDB Skills",
      "Figma Skills",
      "TypeScript Developer",
      "JavaScript Developer",
      "Frontend Skills",
      "Kishore Skills",
    ],
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
  {
    key: "contact",
    label: "Contact",
    path: "/contact",
    title: `Hire ${siteConfig.name} — Freelance Frontend Developer`,
    description: `Contact ${siteConfig.name} to hire a freelance developer for React.js, Next.js, Node.js, Express, MongoDB, and Figma-based web projects. Available for freelancing, contract, and full-time opportunities.`,
    keywords: [
      "Hire Kishore",
      "Hire Frontend Developer",
      "Freelance React Developer",
      "Freelance Next.js Developer",
      "Freelance Node.js Developer",
      "Contact Frontend Developer",
      "Freelancing",
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
