import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "@/sanity/schemas";
import { deskStructure, singletonTypes } from "@/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "portfolio",
  title: "Kishore B Portfolio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(
            ({ action }) =>
              action !== "duplicate" &&
              action !== "delete" &&
              action !== "unpublish",
          )
        : prev,
  },
});
