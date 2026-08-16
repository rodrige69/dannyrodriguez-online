import { client } from "./client";

// Thin wrapper around client.fetch that never throws. If Sanity is unreachable (wrong env vars,
// network issue, project not deployed yet) the affected section should quietly render its
// fallback/empty state instead of taking the whole page down — this matters most for the Right
// Now nav line, which sits on every single page.
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error("Sanity fetch failed:", err);
    return null;
  }
}
