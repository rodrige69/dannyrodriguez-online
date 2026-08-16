import { groq } from "next-sanity";

// Every Field Notes query filters on status == "published" — this is the entire publish gate
// described in §25 of the migration doc (Danny flips a document from draft to published in
// Studio; nothing else changes). Nothing unpublished can ever reach the public site through
// these queries, regardless of what exists in the dataset.

export const fieldNotesListQuery = groq`
  *[_type == "fieldNote" && status == "published"] | order(coalesce(publishDate, _createdAt) desc) {
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishDate,
    relatedProject
  }
`;

export const fieldNotesPreviewQuery = groq`
  *[_type == "fieldNote" && status == "published"] | order(coalesce(publishDate, _createdAt) desc) [0...3] {
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishDate
  }
`;

export const fieldNoteBySlugQuery = groq`
  *[_type == "fieldNote" && status == "published" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    body,
    publishDate,
    updatedDate,
    author,
    relatedProject,
    sources,
    seoTitle,
    metaDescription,
    socialDescription
  }
`;

export const fieldNoteSlugsQuery = groq`
  *[_type == "fieldNote" && status == "published" && defined(slug.current)][].slug.current
`;

export const rightNowQuery = groq`
  *[_type == "rightNow"][0] {
    navSummary,
    currentlyBuilding,
    currentlyThinkingAbout
  }
`;

export const labExperimentsQuery = groq`
  *[_type == "labExperiment"] | order(coalesce(date, _createdAt) desc) {
    title,
    shortDescription,
    status,
    date,
    externalUrl,
    "relatedFieldNoteSlug": relatedFieldNote->slug.current,
    "relatedFieldNoteTitle": relatedFieldNote->title
  }
`;
