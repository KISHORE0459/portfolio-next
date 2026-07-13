import { createClient, type SanityClient } from "next-sanity";

import { env, isSanityConfigured } from "@/config";

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }

  if (!client) {
    client = createClient({
      projectId: env.sanity.projectId,
      dataset: env.sanity.dataset,
      apiVersion: env.sanity.apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: env.sanity.token,
    });
  }

  return client;
}
