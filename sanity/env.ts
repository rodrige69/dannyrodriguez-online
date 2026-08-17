// Central place for the Sanity config. projectId/dataset are public, non-secret identifiers —
// hardcoded as the default here rather than required env vars, because this file gets bundled
// by two different tools that don't share an env-var convention: Next.js (the embedded /studio
// route, which only inlines NEXT_PUBLIC_* vars into client code) and the Sanity CLI's own
// bundler for `npx sanity deploy` (which only inlines SANITY_STUDIO_* vars). Requiring
// NEXT_PUBLIC_SANITY_DATASET worked for the Next.js build but threw "Missing environment
// variable" in the CLI-deployed hosted Studio, since that bundler never saw it. Env vars (either
// prefix) still override if set, so nothing about existing .env.local files breaks.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_STUDIO_API_VERSION ||
  "2024-01-01";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "bkxauu92";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";
