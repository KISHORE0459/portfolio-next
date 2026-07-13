import type { Metadata } from "next";

import { siteConfig } from "@/config";
import type { SeoSettings } from "@/types";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  ogImage?: string;
  seo?: SeoSettings;
}

export function buildMetadata({
  title,
  description,
  keywords,
  path = "",
  ogImage,
  seo,
}: BuildMetadataOptions = {}): Metadata {
  const resolvedTitle = title ?? seo?.defaultTitle ?? siteConfig.title;
  const resolvedDescription =
    description ?? seo?.defaultDescription ?? siteConfig.description;
  const resolvedKeywords = keywords ?? seo?.keywords ?? siteConfig.keywords;
  const url = `${siteConfig.url}${path}`;
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: [...resolvedKeywords],
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: resolvedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
      creator: seo?.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
