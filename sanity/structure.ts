import type { StructureResolver } from "sanity/structure";

// Custom desk structure so "Right Now" appears as a single editable document (singleton),
// not a list you could accidentally create duplicates of.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Right Now")
        .child(S.document().schemaType("rightNow").documentId("rightNow")),
      S.divider(),
      S.listItem()
        .title("Field Notes")
        .child(S.documentTypeList("fieldNote").title("Field Notes")),
      S.listItem()
        .title("The Lab")
        .child(S.documentTypeList("labExperiment").title("The Lab")),
    ]);
