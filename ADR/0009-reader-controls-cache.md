# ADR 0009 — Content-first briefings, shared offline editions and one reader toolbar

- Status: Accepted
- Date: 2026-10-25
- App version: **0.0.3**

## Context
The large top promotional hero forced readers to scroll before encountering today's news. Language selection required a blind toggle. Every article section had separate Markdown and speech actions, creating repeated UI on long stories, and article entry re-fetched edition JSON despite cover listings and search already possessing the full data.

## Decision
1. Reduce the hero to a concise desk label, section name and one-line introduction. Keep editorial philosophy accessible in the site footer and methodology link.
2. Provide a dropdown to explicitly choose Italiano or English; expose selected language via `aria-checked`. The page's `lang` attribute and Web Speech voice follow the selection, including live changes.
3. Apply a seven-pixel, theme-aware scrollbar. Retain keyboard, touch, and native browser scrolling.
4. Replace the five stars with a five-segment rising impact meter plus an impact icon, preserving numeric half-step impact scores, rationale, and desk-relative semantics. The meter is editorial, not a computed fact.
5. Use one consolidated toolbar (back, share, copy permalink, full Markdown, full playback). On desktop place it in the sticky right rail where the marketing aside used to be. On mobile place the controls at the start of the article. Keep a single additional 'Listen to story only' action in the full article body; remove summary/fact/perspective/source/dossier Markdown and audio clutter. Full Markdown still includes all headings, sourced links and context. Full audio still reads the summary, body, verified facts, attributed perspectives, dossier, sources and assessment.
6. Reset the copy feedback after 2500 milliseconds, clearing any previous timeout and on unmount. Keep the copy button usable immediately after success.
7. Persist full editions for seven preloaded archive dates per desk in the shared versioned IndexedDB store, keyed by language, section and date. Search reuses the same cache. A story from visible cards opens from warmed memory synchronously; direct links first attempt IndexedDB, then the revisioned static endpoint. One in-flight request per edition avoids duplicate fetches. A failing download shows a clear retry and cached stories remain available offline.

## Tradeoffs
Prefetching full editions grows browser storage use but requires no extra JSON requests beyond the seven editions already downloaded for infinite scroll. Real storage persistence remains best effort, and users may clear site data. A sticky toolbar is intentionally not duplicated visually at desktop and mobile widths. Browsers choose installed TTS voices and may not provide voice synthesis or offline language voices. Scrollbar styling is not identical on all platforms because native scrolling is retained.

## Verification
Playwright checks language menu behaviour, five-step meter and half scores, preloading to IndexedDB, offline article entry and search reuse, speech language, one body-only audio action, Markdown success reset, sticky toolbar, mobile layout, and existing archive/back-navigation behaviour.
