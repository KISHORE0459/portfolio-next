import type { Metadata } from "next";

import { siteConfig } from "@/config";
import type { PersonalInfo } from "@/types";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  ogImage?: string;
  personalInfo?: PersonalInfo;
}

export function buildMetadata({
  title,
  description,
  keywords,
  path = "",
  ogImage,
  personalInfo,
}: BuildMetadataOptions = {}): Metadata {
  const resolvedTitle =
    title ??
    (personalInfo
      ? `${personalInfo.name} — ${personalInfo.role}`
      : siteConfig.title);
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedKeywords = keywords ?? siteConfig.keywords;
  const url = `${siteConfig.url}${path}`;
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: [...resolvedKeywords],
    authors: [
      {
        name: personalInfo?.name ?? siteConfig.author.name,
        url: siteConfig.author.url,
      },
    ],
    creator: personalInfo?.name ?? siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: personalInfo?.name ?? siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: resolvedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
