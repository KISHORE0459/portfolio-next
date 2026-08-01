import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set(["personalInfo", "aboutSection"]);

const singletonItems = [
  { type: "personalInfo", title: "Personal Information", id: "personalInfo" },
  { type: "aboutSection", title: "About Me", id: "aboutSection" },
] as const;

export const deskStructure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      ...singletonItems.map((item) =>
        S.listItem()
          .title(item.title)
          .id(item.id)
          .child(
            S.document()
              .schemaType(item.type)
              .documentId(item.id)
              .title(item.title),
          ),
      ),
      S.divider(),
      S.documentTypeListItem("experience").title("Work Experience"),
      S.listItem()
        .title("Skills")
        .id("skills-section")
        .child(
          S.list()
            .title("Skills")
            .items([
              orderableDocumentListDeskItem({
                type: "skillTag",
                title: "Tags",
                id: "orderable-skill-tags",
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: "skill",
                title: "Skills",
                id: "orderable-skills",
                S,
                context,
              }),
            ]),
        ),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("blog").title("Blogs"),
    ]);

export { singletonTypes };
