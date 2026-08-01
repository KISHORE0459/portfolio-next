import { siteConfig } from "@/config";
import type { Blog, Experience, PersonalInfo, Project, Skill } from "@/types";

import { portfolioPages, type PortfolioPageKey } from "./pages";

interface JsonLdOptions {
  personalInfo: PersonalInfo;
  skills?: Skill[];
  projects?: Project[];
  experiences?: Experience[];
  blogs?: Blog[];
}

interface PageJsonLdOptions {
  personalInfo: PersonalInfo;
  page: PortfolioPageKey;
}

export function buildJsonLd({
  personalInfo,
  skills = [],
  projects = [],
  experiences = [],
  blogs = [],
}: JsonLdOptions) {
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;
  const serviceId = `${siteConfig.url}/#service`;

  const sameAs = [
    personalInfo.linkedinUrl,
    personalInfo.instagramUrl,
  ].filter((url): url is string => Boolean(url));

  const visibleSkills = skills
    .filter((skill) => skill.isVisible !== false)
    .map((skill) => skill.name);

  const knowsAbout = [
    ...new Set([...siteConfig.knowsAbout, ...visibleSkills]),
  ];

  const currentRole = experiences.find((exp) => exp.isCurrent);
  const visibleProjects = projects.filter(
    (project) => project.isVisible !== false,
  );
  const visibleBlogs = blogs.filter((blog) => blog.isVisible !== false);

  const pageUrls = portfolioPages.map((page) => ({
    "@type": "SiteNavigationElement",
    name: page.label,
    url: `${siteConfig.url}${page.path === "/" ? "" : page.path}`,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: personalInfo.name,
        alternateName: [...siteConfig.author.alternateName],
        jobTitle: [
          personalInfo.role,
          "React.js Developer",
          "Next.js Developer",
          "Node.js Developer",
          "Freelance Frontend Developer",
        ],
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        email: personalInfo.email,
        telephone: personalInfo.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        nationality: { "@type": "Country", name: "India" },
        knowsAbout,
        knowsLanguage: ["English", "Tamil"],
        sameAs,
        ...(currentRole
          ? {
              worksFor: {
                "@type": "Organization",
                name: currentRole.company,
              },
            }
          : {}),
        hasOccupation: {
          "@type": "Occupation",
          name: personalInfo.role,
          occupationLocation: {
            "@type": "City",
            name: "Chennai",
          },
          skills: knowsAbout.join(", "),
        },
        makesOffer: {
          "@id": serviceId,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: `${personalInfo.name} — Freelance Frontend Development`,
        url: `${siteConfig.url}/contact`,
        image: `${siteConfig.url}/opengraph-image`,
        description:
          "Freelance web development services specializing in React.js, Next.js, Node.js, Express, MongoDB, Figma, TypeScript, and modern full-stack engineering.",
        serviceType: [
          "Frontend Development",
          "Full Stack Development",
          "React.js Development",
          "Next.js Development",
          "Node.js Development",
          "Freelance Web Development",
        ],
        areaServed: [
          { "@type": "City", name: "Chennai" },
          { "@type": "Country", name: "India" },
          "Worldwide",
        ],
        provider: { "@id": personId },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${siteConfig.url}/contact`,
          availableLanguage: ["English", "Tamil"],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: `${personalInfo.name} — ${personalInfo.role}`,
        alternateName: [
          `${personalInfo.name} Portfolio`,
          "Kishore Frontend Developer",
        ],
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en-IN",
        publisher: { "@id": personId },
        author: { "@id": personId },
        hasPart: pageUrls,
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile`,
        url: siteConfig.url,
        name: `${personalInfo.name} — ${personalInfo.role}`,
        description: siteConfig.description,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        about: { "@id": personId },
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#site-navigation`,
        name: "Site Navigation",
        itemListElement: portfolioPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.label,
          item: `${siteConfig.url}${page.path === "/" ? "" : page.path}`,
        })),
      },
      ...(visibleProjects.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${siteConfig.url}/projects#list`,
              name: `${personalInfo.name} Featured Projects`,
              url: `${siteConfig.url}/projects`,
              itemListElement: visibleProjects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "CreativeWork",
                  name: project.title,
                  description: project.description,
                  url: project.liveUrl || project.githubUrl || `${siteConfig.url}/projects`,
                  keywords: project.techStack.join(", "),
                  author: { "@id": personId },
                },
              })),
            },
          ]
        : []),
      ...(visibleBlogs.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${siteConfig.url}/blogs#list`,
              name: `${personalInfo.name} Medium Blogs`,
              url: `${siteConfig.url}/blogs`,
              itemListElement: visibleBlogs.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "BlogPosting",
                  headline: blog.title,
                  description: blog.description,
                  url: blog.mediumUrl,
                  image: blog.imageUrl,
                  author: { "@id": personId },
                },
              })),
            },
          ]
        : []),
    ],
  };
}

export function buildPageJsonLd({ personalInfo, page }: PageJsonLdOptions) {
  const pageConfig = portfolioPages.find((item) => item.key === page);
  if (!pageConfig) return null;

  const pageUrl = `${siteConfig.url}${pageConfig.path === "/" ? "" : pageConfig.path}`;
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageConfig.title,
        description: pageConfig.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: "en-IN",
        author: { "@id": personId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          ...(page !== "home"
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: pageConfig.label,
                  item: pageUrl,
                },
              ]
            : []),
        ],
      },
    ],
  };
}
