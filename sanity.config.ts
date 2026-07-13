import { defineConfig } from "sanity";

import { env } from "@/config";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "portfolio",
  title: "Kishore B Portfolio",
  projectId: env.sanity.projectId || "placeholder",
  dataset: env.sanity.dataset,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
});
