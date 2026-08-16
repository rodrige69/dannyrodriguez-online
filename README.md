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
- ✅ Phase 2 — this repo: Next.js migration, same appearance/content/interactions
- ⏳ Phase 3 — Sanity (Field Notes, Right Now, The Lab) — not started
- ⏳ Phase 4 — Hostinger VPS production deployment — not started
- ⏳ Phase 5 — manual Field Notes publishing proof — not started
- ⏳ Phase 6 — n8n + Hermes automation — not started

Don't add Sanity content management or Vercel hosting to this repo without checking with Danny
first — both are explicitly out of scope per the migration doc's DO-NOT list.

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
  page.tsx           — homepage, assembles the section components below
  globals.css         — all site CSS, ported from the approved HTML
  robots.ts            — generates /robots.txt
  sitemap.ts            — generates /sitemap.xml
  contact/
    page.tsx            — /contact route + its own metadata

components/
  Preloader.tsx           — fade-out on load (client)
  Nav.tsx                  — shared nav, "home" vs "contact" variant (client, scroll state)
  RevealObserver.tsx        — generic .reveal-on-scroll IntersectionObserver (client, mounted
                               once per page — NOT in layout, since layout doesn't remount on
                               client-side navigation and each page needs it to see its own
                               .reveal elements)
  HowIThink.tsx               — the interactive Observe→Recognize→Frame→Build→Test rail (client)
  HermesTrace.tsx               — the one-time execution-trace animation (client)
  ContactForm.tsx                 — Web3Forms-backed contact form (client)
  Hero.tsx, EvidenceStrip.tsx, LookFor.tsx, GhostTax.tsx, RetainOS.tsx, Building.tsx,
  Experience.tsx, About.tsx, CTA.tsx — static sections (server components)

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

## Environment variables

None yet. `.env.example` is a placeholder for the Sanity API credentials that Phase 3 will add
(`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`) — do not
commit real values to this file or anywhere else in the repo.

## Deploying

Not yet documented — that's Phase 4 (Hostinger VPS production deployment) in the migration doc.
This README will get a "Production deployment" section once that phase happens, covering build
process, runtime process, env vars, port, reverse-proxy target, restart process, and rollback,
so Danny (or Hermes) can update the deployment later without rediscovering how it works.
