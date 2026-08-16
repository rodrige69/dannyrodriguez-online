import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import RevealObserver from "@/components/RevealObserver";
import { sanityFetch } from "@/sanity/lib/fetch";
import { fieldNotesListQuery, rightNowQuery } from "@/sanity/lib/queries";

const description =
  "Opinionated, specific notes on retention, AI, building and markets — connected to real work, not a blog.";

export const metadata: Metadata = {
  title: "Field Notes",
  description,
  alternates: {
    canonical: "/field-notes",
  },
  openGraph: {
    title: "Field Notes — Danny Rodriguez",
    description,
    url: "https://dannyrodriguez.online/field-notes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes — Danny Rodriguez",
    description,
  },
};

type FieldNoteListItem = {
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  publishDate: string | null;
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function FieldNotesPage() {
  const [notes, rightNow] = await Promise.all([
    sanityFetch<FieldNoteListItem[]>(fieldNotesListQuery),
    sanityFetch<{ navSummary?: string }>(rightNowQuery),
  ]);

  return (
    <>
      <Nav variant="contact" nowText={rightNow?.navSummary} />

      <main id="main-content" tabIndex={-1}>
        <section className="fieldnotes-page-hero">
          <div className="container">
            <span className="eyebrow-label reveal">Field Notes</span>
            <h1 className="fieldnotes-page-headline reveal delay-1">
              Opinionated, specific, connected to real work.
            </h1>
            <p className="fieldnotes-page-sub reveal delay-2">{description}</p>
          </div>
        </section>

        <section className="fieldnotes-list-section">
          <div className="container">
            {notes && notes.length > 0 ? (
              <div className="fieldnotes-list">
                {notes.map((note, i) => (
                  <Link
                    href={`/field-notes/${note.slug}`}
                    className="fieldnotes-list-item reveal"
                    style={{ transitionDelay: `${Math.min(i, 5) * 0.08}s` }}
                    key={note.slug}
                  >
                    <div className="fieldnotes-list-meta">
                      {note.category ? (
                        <span className="fieldnotes-list-category">{note.category}</span>
                      ) : null}
                      {formatDate(note.publishDate) ? (
                        <span className="fieldnotes-list-date">{formatDate(note.publishDate)}</span>
                      ) : null}
                    </div>
                    <h2 className="fieldnotes-list-title">{note.title}</h2>
                    {note.excerpt ? (
                      <p className="fieldnotes-list-excerpt">{note.excerpt}</p>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="fieldnotes-empty reveal">
                Nothing published yet — first Field Notes are on the way.
              </p>
            )}
          </div>
        </section>
      </main>
      <RevealObserver />
    </>
  );
}
