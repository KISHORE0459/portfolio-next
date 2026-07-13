import Link from "next/link";

import type { FooterContent, SocialLink } from "@/types";

interface FooterProps {
  footer: FooterContent;
  socialLinks: SocialLink[];
  name: string;
}

export function Footer({ footer, socialLinks, name }: FooterProps) {
  const visibleSocial = socialLinks.filter((link) => link.isVisible !== false);

  return (
    <footer className="border-t border-border/50 py-10">
      <div className="container-max flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-white">{name}</p>
          {footer.tagline && (
            <p className="mt-1 text-sm text-white/70">{footer.tagline}</p>
          )}
        </div>

        {visibleSocial.length > 0 && (
          <ul className="flex items-center gap-4" aria-label="Social links">
            {visibleSocial.map((link) => (
              <li key={link._id}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-primary"
                  aria-label={link.platform}
                >
                  {link.platform}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm text-white/60">{footer.copyright}</p>
      </div>
    </footer>
  );
}
