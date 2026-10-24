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
- Canonical History API routes are `/News/article/{section}/{date}/{id}/` (see ADR 0006), with static HTML entry points produced during build for direct requests and social link previews. Old hash links are redirected client-side.
- `threadId` attaches updates to the *same developing topic*. `threadRecap` is an editor-reviewed concise recap **as of that day's edition**, which must never include future developments. The runtime joins all articles with the same thread and displays a chronological timeline with links to earlier/later reporting on *both* older and newer articles.
- `related` references point to useful contextual articles on a separate topic. Reverse links are generated from the static story index; they must not be confused with the same-story chronology.
- `body` provides longer reporting beyond the overview, while `questions` contains explicit fact-focused questions/answers at the end of the article. Historical editions can be enhanced with these fields without rewriting existing source claims.

## Editorial impact
Each story has a numeric `impact` value **0.5–5.0 in 0.5 increments** and a localized `impactReason`. The content validator rejects missing, out-of-range or non-half-step values. The frontend uses **five graduated segments**, each supporting a half-fill. This is a conservative editorial score relative to each desk, never a mathematical measure or cross-desk ranking of human suffering. The maximum 5.0 is reserved for genuinely era-defining consequences. See `docs/EDITORIAL_POLICY.md` for the current bilingual rubric.

## Editorial content state, 24 October
All four independent desks contain validated bilingual issues dated 2026-10-24. The World section also has the 2026-10-23 issue; the three specialist desks have five stories per language and original editorial SVG images. Existing cross-edition dossiers can span desks, with automatic forward/back links from the static story index.

## Full-text research, offline archive cache and navigation restoration (ADR 0005)
A reader-initiated search uses the same-versioned static `news/index.json` on GitHub Pages to discover available section/date pairs. With no date range, the client downloads all available editions from the **last 365 days** (up to the current date), four concurrent requests, and stores each edition in IndexedDB using the revision from the manifest. A specific date or date range triggers retrieval of editions for those dates and sections; already cached matching editions avoid repeated network downloads. Search operates over localized title, summary, full body, facts, perspectives, uncertainties, source metadata, and three editor-assigned tags, with case/diacritic normalisation. It works without a backend, tracking service, or account; IndexedDB unavailability degrades to in-memory search.

The SPA retains previously visited section pages and the search page as hidden **mounted** components, so infinite-scroll progress, active query, and search results stay intact while articles are opened. Per-path pixel positions are stored in sessionStorage; History API navigation and mobile/browser history traversal restore the prior list position. 'Back to the briefing' points to the latest listing origin (World, a specialist desk, or search), not a hard-coded home path. Direct-link articles fall back to their desk. Search tags use clean, shareable slash routes.

Every cover first loads its attributed licensed source, then an article-provided licensed fallback if present, otherwise an original per-desk editorial illustration stored under `src/frontend/public/fallback/`. The caption and provenance link change when a fallback is used, so archive illustrations cannot be mistaken for photos of an event.

## Canonical URLs and share previews (ADR 0006)
The frontend uses clean slash URLs via `pushState`/`popstate`, keeping scroll and previous-list state. `postbuild` generates prerendered HTML entry points for every article, topic tag and desk, containing canonical Open Graph title/description/image and the same compiled SPA assets. Known article links can be opened directly and refreshed on GitHub Pages without returning its generic 404 page. `dist/404.html` remains a fallback for ungenerated paths and may return an HTTP 404 status. Legacy `#/...` URLs migrate on first load. Web Share API invokes native mobile sharing; the independent copy action and clipboard fallback work without external services.

## PWA, versioning and editorial reader tools (ADR 0007)
The PWA manifest sets `id`, `scope`, `start_url` to `/News/`, with local PNG icons and standalone display. The build generates a commit-aware `sw.js` with network-first HTML/news JSON and cached hashed assets. SW activation removes earlier shell caches while preserving a bounded-by-reader-activity content cache; no background sync and no telemetry are added. It checks for updates on first load, visibility regain, connectivity restoration and a periodic interval. Installing on iOS requires Safari Share → Add to Home Screen; installability is browser-dependent, and Web Speech synthesis availability depends on browser/device voices.

The article includes separate Markdown-copy and local speech controls for summary, body, facts, perspectives, dossier (when present), linked sources and objective assessment, plus whole-article export/playback. Text originates from bilingual stored JSON; Markdown contains source URLs and original media attribution. The reader uses small speech chunks and one active speech stream per article with explicit pause/resume/stop, cancelled on language or article changes. No text is uploaded to a third-party service by the application.

App versions are SemVer beginning at `0.0.1`. Single-source bilingual `releases.json` drives the release history UI and matches both workspace packages; `CHANGELOG.md` and CI validation enforce documentation for every version. The SW's build revision changes on every Pages deployment even when daily news changes without a new software version. See ADR 0007.

## Custom domain root (ADR 0008)
The canonical origin is **https://onews.app**, and the Vite base, browser routing, published JSON/image paths, PWA scope, manifest URLs and prerendered article metadata all use `/` instead of `/News/`. The Pages artifact includes `CNAME` and a static redirect for each previously generated `/News/...` URL, including earlier hash-form URLs. GitHub Pages still requires the custom-domain configuration and valid DNS/HTTPS in repository settings. The CI e2e suite serves the project at root and exercises root deep links, redirect compatibility and PWA registration.

## Reader redesign and shared IndexedDB editions (ADR 0009)
The section hero is a concise, content-led intro; the app menu retains the methodology. All section cards are already full articles in each edition JSON. The reader, section listing and search call the same IndexedDB loader (`editionCache.ts`), keyed by locale/desk/date and invalidated by `news/index.json` revision. The listing fetches the first seven dates for each desk in advance and persists them before displaying cards, while search reuses cached data. A direct article deep link immediately reads the local copy if available, then revalidates the revision; offline cached content remains available without a backend. Missing content has a retry state rather than an empty page.

The article has one complete Markdown action and two speech scopes: full story and article body only. Native Web Speech uses the selected `it-IT` or `en-GB` language, cancels on language/article changes, and has pause/resume/stop controls. A single toolbar contains share, permalink copy, Markdown and speech; it is sticky to the right on desktop and placed above the article on mobile. Copy success messages reset after 2.5 seconds. Impact is expressed as five rising segments supporting half steps, retaining its exact numeric score and desk-specific explanation. A dropdown replaces immediate language switching. Scrollbars use theme-driven native Firefox and WebKit styles. See ADR 0009.

## Minimal desk and stable return (ADR 0010)
There is no introductory hero, promotional information strip or top strapline between masthead, four-desk navigation and news. Return navigation saves an origin snapshot in `sessionStorage['o-scroll-positions']`: scrollY, story/result key (desk/date/ID) and the originating card's viewport position. Restoring prefers the anchor to absolute scroll offsets, compensates for layout changes over several frames, and cancels on user input; the same flow runs for the bottom “Back to briefing”, history Back and searches. Locale remains in `localStorage['og-language']`; browsing snapshots use sessionStorage, never localStorage, to prevent unwanted cross-session scroll reuse. See `ADR/0010-minimal-header-precise-scroll.md`.

## Daily briefing narration (ADR 0011)
Every current edition header has a compact native text-to-speech control. `useBriefingSpeech` sorts the loaded full-edition articles by editorial rank and narrates title, dek and summary (not full text) in order, in `it-IT` or `en-GB`. Speech is chunked for long mobile playback and the active utterance is held by reference. Users can pause/resume/stop; the UI shows story index only while playing. Hidden mounted sections explicitly stop playback. No server/audio files are needed. Number counters and the repeated first-day blurb have been removed; historical edition notes remain intact.

## App-wide native speech engine and dock (ADR 0013)
A single React `AudioProvider` is placed above `App` and owns the exclusive Web Speech queue. It is not unmounted during client-side route changes, language selection or back navigation. Both `useArticleSpeech` and `useBriefingSpeech` are scoped views of that common session, no longer separate speech engines. Starting a different request increments a generation token and cancels the old utterance; stale native `onend` callbacks cannot revive the previous session. Strong references to each active utterance remain until it finishes. A fixed bottom now-playing dock presents context, title, briefing item index, pause/resume/stop and a link back to the origin. End or stop clears the session and removes the dock. Localized UI controls use the current app locale while the active speech retains the language of its original text. The implementation cannot override background restrictions imposed by an OS/browser; it does not persist audio across reloads, tab closures or app restarts.
