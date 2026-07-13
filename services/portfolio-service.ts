import { fallbackPortfolioData } from "@/constants";
import { getSanityClient } from "@/sanity/client";
import { portfolioQuery } from "@/sanity/queries";
import type { PortfolioData } from "@/types";

export async function getPortfolioData(): Promise<PortfolioData> {
  const client = getSanityClient();

  if (!client) {
    return fallbackPortfolioData;
  }

  try {
    const data = await client.fetch<PortfolioData>(portfolioQuery);
    return data ?? fallbackPortfolioData;
  } catch {
    return fallbackPortfolioData;
  }
}
