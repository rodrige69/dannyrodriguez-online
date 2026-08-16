import { defineField, defineType } from "sanity";

// Right Now — per §10/§23B. Singleton: there is only ever one of these documents (enforced in
// the Studio structure, see sanity/structure.ts). `navSummary` is the exact short string the
// nav pill already shows ("NOW — RetainOS + AI Operations") — kept as its own field, separate
// from the two lists below, so editing Right Now can never accidentally change that already-
// approved piece of homepage UI. The two lists are for a future, more detailed Right Now
// surface; nothing on the live site renders them yet.
export default defineType({
  name: "rightNow",
  title: "Right Now",
  type: "document",
  fields: [
    defineField({
      name: "navSummary",
      title: "Nav status line",
      type: "string",
      description:
        'The exact text shown in the nav pill after "NOW — " (e.g. "RetainOS + AI Operations"). Keep it short — this is the one piece of Right Now that\'s already live on the site.',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "currentlyBuilding",
      title: "Currently building",
      type: "array",
      of: [{ type: "string" }],
      description: "Short items, not paragraphs.",
    }),
    defineField({
      name: "currentlyThinkingAbout",
      title: "Currently thinking about",
      type: "array",
      of: [{ type: "string" }],
      description: "Short items, not paragraphs.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Right Now" };
    },
  },
});
