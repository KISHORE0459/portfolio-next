import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono } from "next/font/google";

import { JsonLdScript } from "@/components/shared";
import { ThemeProvider, ToastProvider } from "@/providers";
import { getPortfolioData } from "@/services";
import { buildJsonLd, buildMetadata } from "@/lib/seo";

import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return buildMetadata({
    page: "home",
    personalInfo: data.personalInfo,
  });
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0F" },
    { media: "(prefers-color-scheme: light)", color: "#F7F4EF" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();
  const jsonLd = buildJsonLd({
    personalInfo: data.personalInfo,
    skills: data.skills,
    projects: data.projects,
    experiences: data.experiences,
    blogs: data.blogs,
  });

  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <JsonLdScript data={jsonLd} />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
