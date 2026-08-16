import type { Metadata } from "next";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Nav from "@/components/Nav";
import RevealObserver from "@/components/RevealObserver";
import { sanityFetch } from "@/sanity/lib/fetch";
import { fieldNoteBySlugQuery, fieldNoteSlugsQuery, rightNowQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

type Source = { label?: string; url?: string };

type FieldNote = {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: { alt?: string } | null;
  category: string | null;
  body: unknown;
  publishDate: string | null;
  updatedDate: string | null;
  author: string | null;
  relatedProject: string | null;
  sources: Source[] | null;
  seoTitle: string | null;
  metaDescription: string | null;
  socialDescription: string | null;
};

// generateStaticParams keeps these as static builds where possible; unknown/new slugs still
// resolve fine at request time since this isn't `dynamicParams = false`.
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(fieldNoteSlugsQuery);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await sanityFetch<FieldNote>(fieldNoteBySlugQuery, { slug });
  if (!note) return { title: "Field Notes" };

  const title = note.seoTitle || note.title;
  const description = note.metaDescription || note.excerpt || undefined;
  const socialDescription = note.socialDescription || description;

  return {
    title,
    description,
    alternates: { canonical: `/field-notes/${note.slug}` },
    openGraph: {
      title,
      description: socialDescription,
      url: `https://dannyrodriguez.online/field-notes/${note.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
    },
  };
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const portableTextComponents: PortableTextComponents = {
  types: {
    // Plain <img>, not next/image — matches the convention used across the rest of this site
    // (see README's "deliberate deviations"). Triggers the same expected no-img-element lint
    // warning as every other image on the site.
    image: ({ value }) => (
      <img src={urlForImage(value).width(1200).url()} alt={value.alt || ""} loading="lazy" />
    ),
  },
};

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [note, rightNow] = await Promise.all([
    sanityFetch<FieldNote>(fieldNoteBySlugQuery, { slug }),
    sanityFetch<{ navSummary?: string }>(rightNowQuery),
  ]);

  if (!note) {
    return (
      <>
        <Nav variant="contact" nowText={rightNow?.navSummary} />
        <main id="main-content" tabIndex={-1}>
          <section className="fieldnotes-page-hero">
            <div className="container">
              <Link href="/field-notes" className="fieldnote-detail-back">
                ← All Field Notes
              </Link>
              <h1 className="fieldnotes-page-headline">Not found.</h1>
              <p className="fieldnotes-page-sub">
                This note doesn&apos;t exist, or hasn&apos;t been published yet.
              </p>
            </div>
          </section>
        </main>
        <RevealObserver />
      </>
    );
  }

  const coverUrl = note.coverImage ? urlForImage(note.coverImage).width(1600).url() : null;
  const sources = (note.sources ?? []).filter((s) => s.url);

  return (
    <>
      <Nav variant="contact" nowText={rightNow?.navSummary} />

      <main id="main-content" tabIndex={-1}>
        <article className="fieldnote-detail-section">
          <div className="container">
            <Link href="/field-notes" className="fieldnote-detail-back reveal">
              ← All Field Notes
            </Link>

            <div className="fieldnote-detail-meta reveal delay-1">
              {note.category ? <span className="fieldnotes-list-category">{note.category}</span> : null}
              {formatDate(note.publishDate) ? (
                <span className="fieldnotes-list-date">{formatDate(note.publishDate)}</span>
              ) : null}
              {note.author ? <span className="fieldnotes-list-date">{note.author}</span> : null}
            </div>

            <h1 className="fieldnote-detail-title reveal delay-2">{note.title}</h1>
            {note.excerpt ? (
              <p className="fieldnote-detail-excerpt reveal delay-3">{note.excerpt}</p>
            ) : null}

            {coverUrl ? (
              <div className="fieldnote-detail-cover reveal delay-3">
                <img src={coverUrl} alt={note.coverImage?.alt || ""} loading="eager" />
              </div>
            ) : null}

            <div className="fieldnote-detail-body reveal delay-4">
              {note.body ? (
                <PortableText
                  value={note.body as never}
                  components={portableTextComponents}
                />
              ) : null}
            </div>

            {sources.length > 0 ? (
              <div className="fieldnote-detail-sources reveal">
                <h2>Sources &amp; references</h2>
                <ul>
                  {sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.label || source.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <RevealObserver />
    </>
  );
}
