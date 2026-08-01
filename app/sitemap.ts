import type { MetadataRoute } from "next";

import { siteConfig } from "@/config";
import { portfolioPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return portfolioPages.map((page) => ({
    url: `${siteConfig.url}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.key === "home" ? "weekly" : "monthly",
    priority: page.key === "home" ? 1 : 0.8,
  }));
}
