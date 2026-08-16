import { defineField, defineType } from "sanity";

// Field Notes — per §20/§21/§23A of the Master Migration doc. Public name is always
// "Field Notes", never "Blog". `status` is the explicit publish gate Danny (or Hermes, once
// §26 lands) flips from "draft" to "published" — the public site only ever queries for
// status == "published", so a document can sit here half-finished with zero risk of it
// appearing live.
export default defineType({
  name: "fieldNote",
  title: "Field Note",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & Social" },
    { name: "process", title: "Danny's process (internal)" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary — used on the Field Notes listing and homepage preview.",
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      description:
        "Freeform — initial subject areas are Retention, AI, Building, Markets, but this taxonomy is allowed to evolve.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "publishDate",
      title: "Publish date",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "updatedDate",
      title: "Updated date",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "content",
      initialValue: "Danny Rodriguez",
    }),
    defineField({
      name: "relatedProject",
      title: "Related project",
      type: "string",
      group: "content",
      options: {
        list: [
          "RetainOS",
          "Many Nickles",
          "AI Operations / Hermes",
          "ShelfScale",
          "Trading",
          "None",
        ],
      },
    }),
    defineField({
      name: "sources",
      title: "Sources / references",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    // SEO & social
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "socialDescription",
      title: "Social description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    // Danny's process — internal thinking scaffold per §21. Not rendered publicly by default.
    defineField({ name: "observation", title: "Observation", type: "text", group: "process" }),
    defineField({ name: "pattern", title: "Pattern", type: "text", group: "process" }),
    defineField({ name: "thesis", title: "Thesis", type: "text", group: "process" }),
    defineField({ name: "evidence", title: "Evidence", type: "text", group: "process" }),
    defineField({ name: "application", title: "Application", type: "text", group: "process" }),
    defineField({ name: "test", title: "Test", type: "text", group: "process" }),
    defineField({
      name: "contrarianCheck",
      title: "Contrarian check",
      type: "text",
      group: "process",
    }),
  ],
  preview: {
    select: { title: "title", status: "status", media: "coverImage" },
    prepare({ title, status, media }) {
      return { title, subtitle: status === "published" ? "Published" : "Draft", media };
    },
  },
});
