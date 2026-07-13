const required = (key: string, value: string | undefined): string => {
  if (!value && process.env.NODE_ENV === "production") {
    return "";
  }
  return value ?? "";
};

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  sanity: {
    projectId: required(
      "NEXT_PUBLIC_SANITY_PROJECT_ID",
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    ),
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
    token: process.env.SANITY_API_TOKEN,
  },
  emailjs: {
    serviceId: required(
      "NEXT_PUBLIC_EMAILJS_SERVICE_ID",
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    ),
    templateId: required(
      "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    ),
    publicKey: required(
      "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    ),
  },
} as const;

export const isSanityConfigured = (): boolean =>
  Boolean(env.sanity.projectId && env.sanity.dataset);

export const isEmailJsConfigured = (): boolean =>
  Boolean(
    env.emailjs.serviceId &&
      env.emailjs.templateId &&
      env.emailjs.publicKey,
  );
