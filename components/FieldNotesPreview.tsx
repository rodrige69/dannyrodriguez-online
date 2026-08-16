import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { fieldNotesPreviewQuery } from "@/sanity/lib/queries";

type FieldNotePreview = {
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
};

export default async function FieldNotesPreview() {
  const notes = await sanityFetch<FieldNotePreview[]>(fieldNotesPreviewQuery);

  // No published Field Notes yet — render nothing. This is the section most likely to be empty
  // for a while (Phase 5 is "publish several real Field Notes manually"), so it has to disappear
  // cleanly rather than showing three blank columns.
  if (!notes || notes.length === 0) return null;

  return (
    <section id="field-notes-preview" className="fieldnotes-preview-section">
      <div className="container">
        <div className="fieldnotes-preview-intro reveal">
          <span className="eyebrow-label">Field Notes</span>
          <h2 className="sr-only">Field Notes</h2>
        </div>

        <div className="fieldnotes-preview-grid">
          {notes.map((note, i) => (
            <Link
              href={`/field-notes/${note.slug}`}
              className="fieldnote-preview-item reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              key={note.slug}
            >
              {note.category ? (
                <span className="fieldnote-preview-category">{note.category}</span>
              ) : null}
              <h3 className="fieldnote-preview-title">{note.title}</h3>
              {note.excerpt ? <p className="fieldnote-preview-excerpt">{note.excerpt}</p> : null}
            </Link>
          ))}
        </div>

        <Link href="/field-notes" className="fieldnotes-preview-exit reveal delay-3">
          Read all Field Notes <span className="build-exit-arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
