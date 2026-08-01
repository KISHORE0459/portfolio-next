import { unstable_cache } from "next/cache";
import { cache } from "react";

import { fallbackPortfolioData } from "@/constants";
import { getSanityClient } from "@/sanity/client";
import { portfolioQuery } from "@/sanity/queries";
import type { AboutSection, PersonalInfo, PortfolioData } from "@/types";

export const PORTFOLIO_CACHE_TAG = "portfolio";
export const PORTFOLIO_REVALIDATE_SECONDS = 3600;

type SanityPortfolioResponse = {
  [K in keyof PortfolioData]: PortfolioData[K] | null;
};

function mergePersonalInfo(
  data: PersonalInfo | null | undefined,
): PersonalInfo {
  const fallback = fallbackPortfolioData.personalInfo;

  return {
    ...fallback,
    ...data,
    _id: data?._id ?? fallback._id,
    name: data?.name || fallback.name,
    email: data?.email || fallback.email,
    role: data?.role || fallback.role,
    experienceYears: data?.experienceYears || fallback.experienceYears,
    location: data?.location || fallback.location,
    heroDescription: data?.heroDescription || fallback.heroDescription,
  };
}

function mergeAbout(data: AboutSection | null | undefined): AboutSection {
  const fallback = fallbackPortfolioData.about;

  return {
    ...fallback,
    ...data,
    _id: data?._id ?? fallback._id,
    title: data?.title || fallback.title,
    subtitle: data?.subtitle || fallback.subtitle,
    description: data?.description || fallback.description,
    highlights:
      data?.highlights && data.highlights.length > 0
        ? data.highlights
        : fallback.highlights,
  };
}

function mergeWithFallback(
  data: SanityPortfolioResponse | null,
): PortfolioData {
  if (!data) {
    return fallbackPortfolioData;
  }

  return {
    personalInfo: mergePersonalInfo(data.personalInfo),
    about: mergeAbout(data.about),
    experiences:
      data.experiences && data.experiences.length > 0
        ? data.experiences
        : fallbackPortfolioData.experiences,
    skills:
      data.skills && data.skills.length > 0
        ? data.skills
        : fallbackPortfolioData.skills,
    projects:
      data.projects && data.projects.length > 0
        ? data.projects
        : fallbackPortfolioData.projects,
    // Keep an empty list when Sanity has no blogs so the empty state can show.
    blogs: data.blogs ?? [],
  };
}

async function fetchPortfolioFromSanity(): Promise<SanityPortfolioResponse | null> {
  const client = getSanityClient();

  if (!client) {
    return null;
  }

  return client.fetch<SanityPortfolioResponse>(
    portfolioQuery,
    {},
    {
      next: {
        revalidate: PORTFOLIO_REVALIDATE_SECONDS,
        tags: [PORTFOLIO_CACHE_TAG],
      },
    },
  );
}

const getCachedPortfolioResponse = unstable_cache(
  async () => {
    try {
      return await fetchPortfolioFromSanity();
    } catch {
      return null;
    }
  },
  ["portfolio-data"],
  {
    revalidate: PORTFOLIO_REVALIDATE_SECONDS,
    tags: [PORTFOLIO_CACHE_TAG],
  },
);

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  if (!getSanityClient()) {
    return fallbackPortfolioData;
  }

  const data = await getCachedPortfolioResponse();
  return mergeWithFallback(data);
});
