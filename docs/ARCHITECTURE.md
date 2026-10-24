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
