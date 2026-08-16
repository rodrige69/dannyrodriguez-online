import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { labExperimentsQuery } from "@/sanity/lib/queries";

type LabExperiment = {
  title: string;
  shortDescription: string;
  status: "active" | "building" | "on-hold" | "ongoing";
  date: string | null;
  externalUrl: string | null;
  relatedFieldNoteSlug: string | null;
  relatedFieldNoteTitle: string | null;
};

const STATUS_LABEL: Record<LabExperiment["status"], string> = {
  active: "Active",
  building: "Building",
  "on-hold": "On Hold",
  ongoing: "Ongoing / Personal",
};

// Cyan for active work, warm for everything else — same two-color status vocabulary Building
// and RetainOS already use (.status-rule-cyan / .status-rule-warm), so a Lab card doesn't
// introduce a third status color the rest of the page never uses.
const STATUS_RULE_CLASS: Record<LabExperiment["status"], string> = {
  active: "status-rule-cyan",
  building: "status-rule-warm",
  "on-hold": "status-rule-warm",
  ongoing: "status-rule-warm",
};

export default async function Lab() {
  const experiments = await sanityFetch<LabExperiment[]>(labExperimentsQuery);

  // No Sanity content yet (or Sanity unreachable) — render nothing rather than an empty
  // section. "Do not pad this section just to make Danny look busy" (§16) extends to: don't
  // show an empty shell either.
  if (!experiments || experiments.length === 0) return null;

  return (
    <section id="lab" className="lab-section">
      <div className="container">
        <div className="lab-intro reveal">
          <span className="eyebrow-label">The Lab</span>
          <h2 className="sr-only">The Lab</h2>
        </div>

        <div className="lab-grid">
          {experiments.map((exp, i) => (
            <div className="lab-item reveal" style={{ transitionDelay: `${i * 0.1}s` }} key={exp.title}>
              <div className="build-status">
                <span className={`status-rule ${STATUS_RULE_CLASS[exp.status]}`} />
                <span className="status-text">{STATUS_LABEL[exp.status]}</span>
              </div>
              <h3 className="lab-title">{exp.title}</h3>
              <p className="lab-desc">{exp.shortDescription}</p>
              {exp.externalUrl ? (
                <a
                  href={exp.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lab-link"
                >
                  Visit →
                </a>
              ) : exp.relatedFieldNoteSlug ? (
                <Link href={`/field-notes/${exp.relatedFieldNoteSlug}`} className="lab-link">
                  Read the Field Note →
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
