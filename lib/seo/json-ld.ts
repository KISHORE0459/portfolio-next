import { siteConfig } from "@/config";
import type { PersonalInfo, SeoSettings } from "@/types";

interface JsonLdOptions {
  personalInfo: PersonalInfo;
  seo?: SeoSettings;
}

export function buildJsonLd({ personalInfo, seo }: JsonLdOptions) {
  const description = seo?.defaultDescription ?? siteConfig.description;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.role,
      url: siteConfig.url,
      email: siteConfig.author.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      sameAs: Object.values(siteConfig.social),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: `${personalInfo.name} Portfolio`,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon-512.png`,
      description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description,
      author: { "@type": "Person", name: personalInfo.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
      ],
    },
  ];
}
