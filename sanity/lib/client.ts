import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// No token here on purpose: this client only ever reads *published* content on a public
// dataset, which Sanity's API allows unauthenticated. Drafts stay invisible to the site simply
// because their `status` field is "draft" — see sanity/lib/queries.ts. If Danny later wants a
// private dataset or draft previews, this client would need a read token added via
// SANITY_API_READ_TOKEN (server-only env var, never NEXT_PUBLIC_*).
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
