# Architecture — Oggettivizzatore
## Decision summary
The browser application is a statically built React + TypeScript single-page publication hosted on GitHub Pages at `/News/`. There is no production backend, database, API secret or client-side GitHub token.

## Data flow
1. Editors research original reporting and official primary documents, compose ten bilingual articles, and commit `news/YYYY-MM-DD/{it,en}.json` plus properly licensed image files.
2. `scripts/build-news.mjs` rejects invalid edition counts, duplicate article IDs/ranks, missing source information, non-HTTPS citations, mismatched translations, and missing images.
3. CI runs the same validator, TypeScript/Vite build, and Playwright E2E tests.
4. Pages Action publishes the compiled static site. The build copies immutable daily editions and creates `news/index.json` with available dates, sorted descending.
5. The browser fetches the manifest and initially preloads 7 daily JSON files for the selected language. It renders the latest edition first and appends older editions as a sentinel intersects the viewport. As the cursor advances, it preloads the next oldest day. Content remains accessible through Pages; no GitHub REST rate limits or CORS are needed.

## Why not Actions artifacts or GitHub Releases as the canonical archive?
Actions artifacts have retention policies and are not guaranteed eternal. GitHub Releases can hold edition snapshots, but downloading assets from GitHub from the browser introduces redirect, API, cache and CORS concerns and is unnecessary for public, small JSON documents. The versioned `news/` directory in Git history is the canonical archive. The Pages artifact is only a deployable output. An optional release/export mechanism could be added later without affecting readers.

## Scope and operational details
- Language switching loads an edition in the chosen language, using a shared immutable story ID and ranking.
- Image paths are relative to the deployed base path; external HTTPS images are possible with attribution and explicit rights review.
- Dates are editorial dates in ISO format; publication times use UTC offsets.
- A date can be corrected through a new commit with a clear revision note in commit history. Do not silently rewrite historical facts.
- Initial one-week preload is a maximum, not fake empty days. When fewer than 7 days exist, only existing days are loaded.
- Static hosting is not a search index or a backend. Large archives may later need yearly manifests to avoid a large top-level manifest.
- Custom domain, news alerts, scheduled editorial automation and RSS are optional later improvements.


## Four desks, article routes and longitudinal reporting (ADR 0004)
- The masthead is **O**, interpreted as Oggettivizzatore (Italian), Objectivizer (English), and *zero advertisements / zero sensational headlines*.
- Each date can have a World edition of exactly ten stories in `news/YYYY-MM-DD/{it,en}.json` (backwards-compatible legacy path), and independently curated Italy, Technology and Science editions of exactly five each in `news/YYYY-MM-DD/{italy,technology,science}/{it,en}.json`.
- Unpublished specialist editions are **not** synthesized from World content; they show an honest editorial placeholder until five fully sourced stories exist.
- The compiler builds a section-aware `news/index.json` and compact `news/story-index/{it,en}.json`. The index includes dates, bilingual previews, dossier IDs and explicit connections; each link can open an article directly without downloading the entire archive.
- Hash routes `#/article/{section}/{date}/{id}` are shareable and refresh-safe on GitHub Pages; navigation never requires an SPA backend fallback.
- `threadId` attaches updates to the *same developing topic*. `threadRecap` is an editor-reviewed concise recap **as of that day's edition**, which must never include future developments. The runtime joins all articles with the same thread and displays a chronological timeline with links to earlier/later reporting on *both* older and newer articles.
- `related` references point to useful contextual articles on a separate topic. Reverse links are generated from the static story index; they must not be confused with the same-story chronology.
- `body` provides longer reporting beyond the overview, while `questions` contains explicit fact-focused questions/answers at the end of the article. Historical editions can be enhanced with these fields without rewriting existing source claims.

## Editorial impact
Impact (required integer 1–5) and localized impactReason are versioned with each story. The builder rejects missing or out-of-range values. A five-star maximum is exceptional and desk-relative, never a cross-desk ranking of human suffering or an automatic measure. See EDITORIAL_POLICY.md for the public scoring rubric.

## Editorial content state, 24 October
All four independent desks contain validated bilingual issues dated 2026-10-24. The World section also has the 2026-10-23 issue; the three specialist desks have five stories per language and original editorial SVG images. Existing cross-edition dossiers can span desks, with automatic forward/back links from the static story index.
