import { defineField, defineType } from "sanity";

const visibilityField = defineField({
  name: "isVisible",
  title: "Visible",
  type: "boolean",
  initialValue: true,
});

const orderField = defineField({
  name: "order",
  title: "Order",
  type: "number",
  initialValue: 0,
});

const seoFields = [
  defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
  defineField({
    name: "metaDescription",
    title: "Meta Description",
    type: "text",
    rows: 3,
  }),
  defineField({
    name: "keywords",
    title: "Keywords",
    type: "array",
    of: [{ type: "string" }],
  }),
  defineField({ name: "ogImage", title: "OG Image", type: "image" }),
];

export const personalInfo = defineType({
  name: "personalInfo",
  title: "Personal Information",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "experienceYears", title: "Experience Years", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "profileImage", title: "Profile Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "resumeUrl", title: "Resume URL", type: "url" }),
    visibilityField,
  ],
});

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({ name: "greeting", title: "Greeting", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "href", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "href", type: "string" }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", type: "string" }),
          defineField({ name: "value", type: "string" }),
          defineField({ name: "suffix", type: "string" }),
        ],
      }],
    }),
    visibilityField,
  ],
});

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About Me",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "content", title: "Content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    visibilityField,
  ],
});

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "proficiency", title: "Proficiency", type: "number", validation: (r) => r.min(0).max(100) }),
    defineField({ name: "icon", title: "Icon", type: "string" }),
    orderField,
    visibilityField,
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

export const technology = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "icon", title: "Icon", type: "string" }),
    orderField,
    visibilityField,
  ],
});

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "startDate", title: "Start Date", type: "string" }),
    defineField({ name: "endDate", title: "End Date", type: "string" }),
    defineField({ name: "isCurrent", title: "Current Position", type: "boolean" }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "responsibilities", title: "Responsibilities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "companyLogo", title: "Company Logo", type: "image" }),
    orderField,
    visibilityField,
  ],
});

export const projectCategory = defineType({
  name: "projectCategory",
  title: "Project Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    orderField,
  ],
});

export const projectTag = defineType({
  name: "projectTag",
  title: "Project Tag",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
  ],
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "longDescription", title: "Long Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "techStack", title: "Tech Stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "projectCategory" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "reference", to: [{ type: "projectTag" }] }] }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    orderField,
    defineField({ name: "seo", title: "SEO", type: "object", fields: seoFields }),
    visibilityField,
  ],
});

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "institution", title: "Institution", type: "string", validation: (r) => r.required() }),
    defineField({ name: "degree", title: "Degree", type: "string" }),
    defineField({ name: "field", title: "Field of Study", type: "string" }),
    defineField({ name: "startDate", title: "Start Date", type: "string" }),
    defineField({ name: "endDate", title: "End Date", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    orderField,
    visibilityField,
  ],
});

export const achievement = defineType({
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "date", title: "Date", type: "string" }),
    defineField({ name: "icon", title: "Icon", type: "string" }),
    orderField,
    visibilityField,
  ],
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "Icon", type: "string" }),
    orderField,
    visibilityField,
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "content", title: "Content", type: "text", rows: 4 }),
    defineField({ name: "avatar", title: "Avatar", type: "image" }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.min(1).max(5) }),
    orderField,
    visibilityField,
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({ name: "platform", title: "Platform", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Icon", type: "string" }),
    orderField,
    visibilityField,
  ],
});

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required() }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "availability", title: "Availability", type: "string" }),
    visibilityField,
  ],
});

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Href", type: "string", validation: (r) => r.required() }),
    orderField,
    visibilityField,
  ],
});

export const footerContent = defineType({
  name: "footerContent",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "copyright", title: "Copyright", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    visibilityField,
  ],
});

export const websiteSettings = defineType({
  name: "websiteSettings",
  title: "Website Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "siteUrl", title: "Site URL", type: "url" }),
    defineField({ name: "defaultOgImage", title: "Default OG Image", type: "image" }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    visibilityField,
  ],
});

export const seoSettings = defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({ name: "defaultTitle", title: "Default Title", type: "string" }),
    defineField({ name: "defaultDescription", title: "Default Description", type: "text", rows: 3 }),
    defineField({ name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "twitterHandle", title: "Twitter Handle", type: "string" }),
    defineField({ name: "googleSiteVerification", title: "Google Site Verification", type: "string" }),
  ],
});

export const schemaTypes = [
  personalInfo,
  heroSection,
  aboutSection,
  skill,
  technology,
  experience,
  projectCategory,
  projectTag,
  project,
  education,
  achievement,
  service,
  testimonial,
  socialLink,
  contactInfo,
  navItem,
  footerContent,
  websiteSettings,
  seoSettings,
];
