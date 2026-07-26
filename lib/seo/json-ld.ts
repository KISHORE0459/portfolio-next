import { siteConfig } from "@/config";
import type { PersonalInfo } from "@/types";

interface JsonLdOptions {
  personalInfo: PersonalInfo;
}

export function buildJsonLd({ personalInfo }: JsonLdOptions) {
  const sameAs = [
    personalInfo.linkedinUrl,
    personalInfo.instagramUrl,
  ].filter((url): url is string => Boolean(url));

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.role,
      url: siteConfig.url,
      email: personalInfo.email,
      telephone: personalInfo.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: `${personalInfo.name} Portfolio`,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon-512.png`,
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: personalInfo.name,
      url: siteConfig.url,
      description: siteConfig.description,
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
