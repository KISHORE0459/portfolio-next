import { defineField, defineType } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

import { orderField, visibilityField } from "./shared";

export const personalInfo = defineType({
  name: "personalInfo",
  title: "Personal Information",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Position / Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "experienceYears",
      title: "Experience",
      type: "string",
      description: "Example: 1.5+",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      description: "Short intro shown on the home hero section",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "string",
      description: "Full URL or path like /resume.pdf",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      description: "Shown in the contact section",
    }),
    visibilityField,
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "profileImage" },
  },
});

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About Me",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "highlights",
      title: "Highlight Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "aboutHighlight",
          title: "Highlight",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Globe", value: "globe" },
                  { title: "Palette", value: "palette" },
                  { title: "Server", value: "server" },
                  { title: "Zap", value: "zap" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
    visibilityField,
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
  },
});

export const experience = defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "string",
      description: "Format: YYYY-MM",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "string",
      description: "Format: YYYY-MM",
    }),
    defineField({
      name: "isCurrent",
      title: "Current Position",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    orderField,
    visibilityField,
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "role", subtitle: "company" },
  },
});

export const skillTag = defineType({
  name: "skillTag",
  title: "Skill Tag",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tag Name",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Example: Frontend, Backend, Database",
    }),
    orderRankField({ type: "skillTag" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title" },
  },
});

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Example: React.js",
    }),
    defineField({
      name: "icon",
      title: "SVG Icon",
      type: "file",
      options: {
        accept: ".svg,image/svg+xml",
      },
      description: "Upload an SVG icon for this skill",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "reference",
      to: [{ type: "skillTag" }],
      validation: (rule) => rule.required(),
      description: "Select a tag from Skills → Tags",
    }),
    orderRankField({ type: "skill" }),
    visibilityField,
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: "name",
      subtitle: "tag.title",
      media: "icon",
    },
  },
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "Code Link",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    orderField,
    visibilityField,
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});

export const schemaTypes = [
  personalInfo,
  aboutSection,
  experience,
  skillTag,
  skill,
  project,
];
