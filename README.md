# dannyrodriguez.online

Danny Rodriguez's personal site — "I read patterns. Then I build around them."

This is the **Phase 2 Next.js migration** of the site, per
`dannyrodriguez.online — MASTER TECHNICAL MIGRATION + SANITY HANDOFF.md`. It reproduces the
approved static HTML build (frozen at `/legacy-reference/dannyrodriguez-approved.html` and
`/legacy-reference/dannyrodriguez-approved-contact.html` in the project folder) pixel-for-pixel —
verified with a Playwright screenshot diff across desktop and mobile, homepage and `/contact`.

## What's here vs. what's next

This repo is the **baseline** — Next.js + the existing design, content, and interactions, with
no CMS yet. Per the migration doc's phased plan:

- ✅ Phase 0 — finish the approved HTML (done, this is what's frozen in `/legacy-reference`)
- ✅ Phase 1 — freeze the visual source of truth
- ✅ Phase 2 — Next.js migration, same appearance/content/interactions
- ✅ Phase 3 — Sanity (Field Notes, Right Now, The Lab) — schema, Studio, and the three new
  content surfaces are built and wired up (see below). **No content exists in Sanity yet** —
  Danny still needs to log into Studio and add the first Right Now doc / Field Notes / Lab
  experiments before any of this becomes visible on the live site.
- ⏳ Phase 4 — Hostinger VPS production deployment — not started
- ⏳ Phase 5 — manual Field Notes publishing proof — blocked on Phase 4 + real content
- ⏳ Phase 6 — n8n + Hermes automation — not started

Don't add Vercel hosting to this repo without checking with Danny first — out of scope per the
migration doc's DO-NOT list (VPS is the hosting target, see Phase 4).

## Stack

- Next.js 16 (App Router, TypeScript)
- Plain global CSS (`app/globals.css`, ported verbatim from the approved HTML's `<style>` block)
  — intentionally not Tailwind/CSS Modules, to keep the port a faithful 1:1 translation
- No external UI/animation libraries — the existing effects (preloader, scroll reveal, the
  How I Think interaction, the Hermes trace animation) are hand-ported client components

## Structure

```text
app/
  layout.tsx        — <html>/<body> shell, fonts, metadata, JSON-LD, Preloader
  page.tsx           — homepage, assembles the section components below (now async — fetches
                       the Right Now nav text from Sanity)
  globals.css         — all site CSS, ported from the approved HTML + Phase 3 additions
  robots.ts            — generates /robots.txt
  sitemap.ts            — generates /sitemap.xml
  contact/
    page.tsx            — /contact route + its own metadata
  field-notes/
    page.tsx             — Field Notes listing (Sanity-backed, Phase 3)
    [slug]/page.tsx        — individual Field Note (Sanity-backed, Phase 3)
  studio/[[...tool]]/page.tsx — embedded Sanity Studio, served at /studio (Phase 3)

components/
  Preloader.tsx           — fade-out on load (client)
  Nav.tsx                  — shared nav, "home" vs "contact" variant (client, scroll state) —
                             now accepts an optional `nowText` prop (Right Now, Sanity-backed)
  RevealObserver.tsx        — generic .reveal-on-scroll IntersectionObserver (client, mounted
                               once per page — NOT in layout, since layout doesn't remount on
                               client-side navigation and each page needs it to see its own
                               .reveal elements)
  HowIThink.tsx               — the interactive Observe→Recognize→Frame→Build→Test rail (client)
  HermesTrace.tsx               — the one-time execution-trace animation (client)
  ContactForm.tsx                 — Web3Forms-backed contact form (client)
  Lab.tsx                          — The Lab homepage section, Sanity-backed (Phase 3) — renders
                                     nothing until Danny adds at least one experiment in Studio
  FieldNotesPreview.tsx             — homepage Field Notes preview, Sanity-backed (Phase 3) —
                                     renders nothing until at least one Field Note is published
  Hero.tsx, EvidenceStrip.tsx, LookFor.tsx, GhostTax.tsx, RetainOS.tsx, Building.tsx,
  Experience.tsx, About.tsx, CTA.tsx — static sections (server components)

sanity/                — Phase 3
  env.ts                  — reads the NEXT_PUBLIC_SANITY_* env vars
  structure.ts             — custom Studio desk structure (makes Right Now a singleton)
  schemaTypes/               — fieldNote.ts, rightNow.ts, labExperiment.ts
  lib/
    client.ts                 — unauthenticated Sanity client (public dataset, published-only
                                 reads — see "Sanity" section below)
    fetch.ts                   — sanityFetch() wrapper that never throws; returns null on any
                                  failure so a Sanity outage degrades sections gracefully
                                  instead of breaking the page
    queries.ts                  — all GROQ queries, every one filtered to status == "published"
    image.ts                     — Sanity image URL builder

sanity.config.ts        — Studio config (schema + plugins), mounted at /studio

public/assets/    — photography, dashboard screenshot, favicons, OG image
```

## Known flag — not silently resolved

`components/GhostTax.tsx` keeps the trademark glyph in "Ghost Tax™", carried over verbatim from
the currently-approved live HTML (whose own comment calls the ™ on first use a deliberate
approved copy rule). That directly conflicts with the migration doc's own locked terminology
rule (§5 / §41 of the Master Handoff): "never use any ™ symbol on any framework name." Left as-is
for Phase 2 parity rather than silently changed, since it's visible copy — flagged in a code
comment at the point of use. Danny should say which one is actually current.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

`npm run build` and `npm run lint` both pass clean (lint shows only expected warnings: plain
`<img>` instead of `next/image` — a deliberate choice for now, see below — and the classic
`<link>` Google Fonts tags instead of `next/font/google`).

## Deliberate deviations from "ideal" Next.js, and why

- **Plain `<img>`, not `next/image`.** Swapping in `next/image` is a safe follow-up (real
  perf win, no visual change expected) but wasn't done in this pass to keep the diff minimal
  and easy to verify pixel-for-pixel against the frozen legacy HTML first.
- **Classic Google Fonts `<link>` tags, not `next/font/google`.** `next/font` fetches and
  self-hosts fonts at *build time*. The sandbox this was built in blocks build-time network
  access to `fonts.googleapis.com`, so this couldn't be verified there. It's untested whether
  Danny's real build machine / CI / VPS has the same restriction — the classic `<link>` approach
  has zero build-time network dependency and matches the original site exactly, so it was kept
  as the safe default. Try switching to `next/font/google` once a build environment with normal
  internet access is confirmed; it's a small, low-risk change if it works.
- **Interactive components use refs + imperative DOM logic, not declarative React state**, for
  `HowIThink.tsx` and `HermesTrace.tsx` specifically. Both depend on live `:hover`/`:focus-visible`
  checks and precisely-timed `setTimeout` sequences that don't have a clean declarative
  equivalent — the imperative approach is a closer, lower-risk port of the original inline
  script than reimplementing the same behavior with `useState`/`useEffect` from scratch.

## Sanity (Phase 3)

Project ID `bkxauu92`, dataset `production` (both are public, non-secret identifiers — see
`.env.example`). Three document types, matching §23 of the migration doc exactly:

- **Field Note** (`sanity/schemaTypes/fieldNote.ts`) — title, slug, excerpt, cover image,
  category (freeform), body (rich text + inline images), publish/updated dates, author,
  related project, sources, SEO/social fields, plus an "internal thinking" field group
  (observation/pattern/thesis/evidence/application/test/contrarian check) that's never rendered
  publicly. Publish gate is a `status` field (`draft` / `published`) — every query on the site
  filters to `status == "published"`, so nothing in Studio ever leaks to the live site before
  Danny flips that switch. This is deliberately simpler than relying on Sanity's own
  draft-document mechanism, and matches §25's "Danny is the final publisher" model directly.
- **Right Now** (`sanity/schemaTypes/rightNow.ts`) — a singleton (Studio only lets one exist).
  Has a `navSummary` field that is *exactly* the short string the nav pill already shows
  ("RetainOS + AI Operations") — kept separate from the fuller `currentlyBuilding` /
  `currentlyThinkingAbout` lists so editing Right Now can never accidentally change that already
  -approved piece of homepage UI. If Sanity has no Right Now doc yet (or is unreachable), the nav
  falls back to the exact same hardcoded string it always showed — this is a content upgrade,
  not a visual change.
- **Lab Experiment** (`sanity/schemaTypes/labExperiment.ts`) — title, short description, status
  (reusing the site's own ● Active / ◐ Building / ○ On hold / ∞ Ongoing status language), date,
  optional related Field Note, optional external link. Deliberately minimal per §16's "do not
  overbuild The Lab CMS."

**Studio** is embedded at `/studio` on the site itself (`app/studio/[[...tool]]/page.tsx` +
`sanity.config.ts`) rather than a separate deployment — one fewer thing to host. Danny logs in
with his own Sanity account.

**What's verified vs. what isn't yet:** `npm run build`, `npm run lint`, and `tsc --noEmit` all
pass clean. The homepage and `/contact` are still pixel-identical to the frozen legacy HTML
(reverified with the same Playwright screenshot diff used in Phase 2). The new Lab and Field
Notes Preview homepage sections, and the `/field-notes` routes, all render correctly in their
*empty* state (no Sanity content yet → they either render nothing or a plain "nothing published
yet" message, never a broken-looking gap). **What's not verified: an actual round-trip against
live Sanity data.** This sandbox's network egress blocks `api.sanity.io` / `apicdn.sanity.io`
outright (`Host not in allowlist`) — the same class of restriction that blocked GitHub and
Google Fonts earlier in this build — so nothing here has been tested against real Field Notes,
a real Right Now doc, or real Lab experiments. `sanityFetch()` (`sanity/lib/fetch.ts`) catches
and logs any fetch failure and returns `null` rather than throwing, specifically so this kind of
network gap fails soft instead of breaking the build or the page — but Danny (or whoever builds
this next) should run `npm run dev`, open `/studio`, add one real item of each type, and confirm
it shows up before trusting this fully.

**Two things Danny needs to do that only he can do, from his own Sanity account:**

1. **CORS.** In [sanity.io/manage](https://sanity.io/manage) → project `bkxauu92` → API → CORS
   Origins, add `http://localhost:3000` (local dev) and the eventual production domain
   (`https://dannyrodriguez.online`), with credentials allowed if Studio prompts for it. Without
   this, `/studio` will load but fail to talk to the API from the browser.
2. **Log into Studio.** Visit `/studio` (locally first, then in production once deployed) and
   sign in with the Sanity account tied to this project. First-time setup: create the one Right
   Now document, then add Field Notes / Lab experiments as they're ready.

No API token is wired in anywhere, on purpose — the dataset is public and every read query is
already scoped to published-only content, so the site doesn't need one. `SANITY_API_READ_TOKEN`
in `.env.example` is left as a commented-out placeholder for later, only if the dataset ever
becomes private or the site needs draft previews.

## Environment variables

`.env.example` has the real (non-secret) Sanity project ID and dataset filled in — copy it to
`.env.local` to run locally. Do not commit `.env.local` or add any real secret value anywhere in
the repo — `.gitignore` already excludes `.env*`.

## Deploying

Not yet documented — that's Phase 4 (Hostinger VPS production deployment) in the migration doc.
This README will get a "Production deployment" section once that phase happens, covering build
process, runtime process, env vars, port, reverse-proxy target, restart process, and rollback,
so Danny (or Hermes) can update the deployment later without rediscovering how it works.
