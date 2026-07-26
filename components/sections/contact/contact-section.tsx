import { Mail, MapPin, Phone } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared";
import type { PersonalInfo } from "@/types";

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}

export function ContactSection({ personalInfo }: ContactSectionProps) {
  return (
    <Section id="contact">
      <SectionHeading
        label="Let's connect"
        title="Get In Touch"
        description="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
      />
      <div className="glass max-w-xl rounded-2xl p-8">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">
                Email
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-white transition-colors hover:text-primary"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>

          {personalInfo.phone && (
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Phone
                </p>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                  className="text-white transition-colors hover:text-primary"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">
                Location
              </p>
              <p className="text-white">{personalInfo.location}</p>
            </div>
          </div>

          {personalInfo.availability && (
            <p className="rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
              {personalInfo.availability}
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
