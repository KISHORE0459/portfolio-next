export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface PersonalInfo {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  experienceYears: string;
  location: string;
  heroDescription: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  resumeUrl?: string;
  profileImage?: SanityImage;
  availability?: string;
  isVisible?: boolean;
}

export interface AboutHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface AboutSection {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  highlights: AboutHighlight[];
  isVisible?: boolean;
}

export interface SkillTag {
  _id: string;
  title: string;
  orderRank?: string;
}

export interface Skill {
  _id: string;
  name: string;
  tag: SkillTag;
  iconUrl?: string;
  orderRank?: string;
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
  responsibilities: string[];
  technologies: string[];
  order: number;
  isVisible?: boolean;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: SanityImage;
  imageUrl?: string;
  order: number;
  isVisible?: boolean;
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  mediumUrl: string;
  image?: SanityImage;
  imageUrl?: string;
  order: number;
  isVisible?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  about: AboutSection;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  blogs: Blog[];
}
