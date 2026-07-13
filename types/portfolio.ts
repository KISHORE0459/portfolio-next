export interface PortableTextBlock {
  _type: string;
  children?: Array<{ _type: string; text?: string }>;
  [key: string]: unknown;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: SanityImage;
}

export interface PersonalInfo {
  _id: string;
  name: string;
  role: string;
  location: string;
  experienceYears: string;
  bio?: PortableTextBlock[];
  profileImage?: SanityImage;
  resumeUrl?: string;
  isVisible?: boolean;
}

export interface HeroSection {
  _id: string;
  greeting: string;
  headline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  stats: HeroStat[];
  isVisible?: boolean;
}

export interface HeroStat {
  label: string;
  value: string;
  suffix?: string;
}

export interface AboutSection {
  _id: string;
  title: string;
  subtitle?: string;
  content: PortableTextBlock[];
  highlights: string[];
  image?: SanityImage;
  isVisible?: boolean;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  order: number;
  isVisible?: boolean;
}

export interface Technology {
  _id: string;
  name: string;
  icon?: string;
  category: string;
  order: number;
  isVisible?: boolean;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: PortableTextBlock[];
  responsibilities: string[];
  technologies: string[];
  companyLogo?: SanityImage;
  order: number;
  isVisible?: boolean;
}

export interface ProjectCategory {
  _id: string;
  title: string;
  slug: string;
  order: number;
}

export interface ProjectTag {
  _id: string;
  title: string;
  slug: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: PortableTextBlock[];
  techStack: string[];
  thumbnail?: SanityImage;
  gallery?: SanityImage[];
  githubUrl?: string;
  liveUrl?: string;
  category?: ProjectCategory;
  tags?: ProjectTag[];
  featured: boolean;
  order: number;
  seo?: SeoFields;
  isVisible?: boolean;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  order: number;
  isVisible?: boolean;
}

export interface Achievement {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: string;
  order: number;
  isVisible?: boolean;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  isVisible?: boolean;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: SanityImage;
  rating?: number;
  order: number;
  isVisible?: boolean;
}

export interface SocialLink {
  _id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
  isVisible?: boolean;
}

export interface ContactInfo {
  _id: string;
  email: string;
  phone?: string;
  location: string;
  availability: string;
  isVisible?: boolean;
}

export interface NavItem {
  _id: string;
  label: string;
  href: string;
  order: number;
  isVisible?: boolean;
}

export interface FooterContent {
  _id: string;
  copyright: string;
  tagline?: string;
  isVisible?: boolean;
}

export interface WebsiteSettings {
  _id: string;
  siteName: string;
  siteUrl: string;
  defaultOgImage?: SanityImage;
  favicon?: SanityImage;
  isVisible?: boolean;
}

export interface SeoSettings {
  _id: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  twitterHandle?: string;
  googleSiteVerification?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  hero: HeroSection;
  about: AboutSection;
  skills: Skill[];
  technologies: Technology[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  services: Service[];
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  contact: ContactInfo;
  navigation: NavItem[];
  footer: FooterContent;
  seo: SeoSettings;
}
