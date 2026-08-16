import { defineField, defineType } from "sanity";

// The Lab — per §16/§23C. Deliberately minimal fields ("Do not overbuild The Lab CMS.").
// `status` reuses the site's existing project-status language (§13: ● Active, ◐ Building,
// ○ On hold, ∞ Ongoing/personal) so a Lab card looks consistent with the "What I'm Building"
// cards elsewhere on the homepage.
export default defineType({
  name: "labExperiment",
  title: "Lab Experiment",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "● Active", value: "active" },
          { title: "◐ Building", value: "building" },
          { title: "○ On hold", value: "on-hold" },
          { title: "∞ Ongoing / personal", value: "ongoing" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "relatedFieldNote",
      title: "Related Field Note",
      type: "reference",
      to: [{ type: "fieldNote" }],
      description: "Optional.",
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "Optional.",
    }),
  ],
  preview: {
    select: { title: "title", status: "status" },
    prepare({ title, status }) {
      return { title, subtitle: status };
    },
  },
});
