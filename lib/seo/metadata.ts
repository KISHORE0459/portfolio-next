import type { Metadata } from "next";

import { siteConfig } from "@/config";
import type { PersonalInfo } from "@/types";

import { getPortfolioPage, type PortfolioPageKey } from "./pages";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  personalInfo?: PersonalInfo;
  noIndex?: boolean;
  page?: PortfolioPageKey;
}

export function buildMetadata({
  title,
  description,
  keywords,
  path,
  personalInfo,
  noIndex = false,
  page,
}: BuildMetadataOptions = {}): Metadata {
  const name = personalInfo?.name ?? siteConfig.author.name;
  const role = personalInfo?.role ?? siteConfig.author.jobTitle;
  const location = personalInfo?.location ?? siteConfig.author.location;
  const pageConfig = page ? getPortfolioPage(page) : null;

  const resolvedPath = path ?? pageConfig?.path ?? "";
  const resolvedTitle = title ?? pageConfig?.title ?? `${name} — ${role}`;
  const resolvedDescription =
    description ??
    pageConfig?.description ??
    (personalInfo
      ? `${name} is a ${role} specializing in React.js, Next.js, Node.js, Express, MongoDB, and Figma. Freelance web developer based in ${location}. Hire ${name.split(" ")[0]} for modern, scalable web applications.`
      : siteConfig.description);
  const resolvedKeywords = keywords ?? [
    ...(pageConfig?.keywords ?? siteConfig.keywords),
    name,
    role,
    `${name} ${role}`,
    `Freelance ${role}`,
  ];
  const url = `${siteConfig.url}${resolvedPath === "/" ? "" : resolvedPath}`;
  const isHome = resolvedPath === "/" || resolvedPath === "";

  return {
    title: isHome
      ? {
          default: resolvedTitle,
          template: `%s | ${name}`,
        }
      : {
          absolute: resolvedTitle,
        },
    description: resolvedDescription,
    keywords: [...new Set(resolvedKeywords)],
    applicationName: `${name} Portfolio`,
    authors: [{ name, url: siteConfig.author.url }],
    creator: name,
    publisher: name,
    category: "technology",
    classification: "Portfolio",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: isHome ? "profile" : "website",
      locale: siteConfig.locale,
      url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: `${name} — ${role}`,
      ...(isHome
        ? {
            firstName: name.split(" ")[0],
            lastName: name.split(" ").slice(1).join(" ") || undefined,
            username: name.replace(/\s+/g, "").toLowerCase(),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      creator: `@${name.replace(/\s+/g, "").toLowerCase()}`,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    other: {
      "og:email": personalInfo?.email ?? siteConfig.author.email,
    },
  };
}
