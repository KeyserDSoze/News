# ADR 0010 — Minimal masthead and anchor-based return position

- Status: Accepted
- Date: 2026-10-25
- App release: **0.0.4**

## Context
A short intro (“World, in context”) and a redundant coloured section band still occupied the top of each desk. The four tabs already identify desk and volume; the banners duplicated content and reduced space for headlines. Readers also observed that leaving an article via the bottom “Back to the briefing” link could return several days down the list instead of to the card from which they opened it. This becomes more likely with very long articles and dynamically displayed historical issues.

## Decision
1. Keep only the compact O masthead, functional controls and four desk tabs. Remove the top strapline, hero and secondary band completely. Immediately render the latest edition after the tabs; reduce spacing around the masthead and lead edition. The logo and footer retain the project's identity and method.
2. Keep the user's `it` or `en` choice in `localStorage['og-language']` (the existing implementation already persisted it). Verify reload behaviour with Playwright; voice and documents follow the selected language.
3. Preserve return origins in **sessionStorage**, scoped to the full section/search URL. Store not only `window.scrollY` but also the clicked card/result's stable `section/date/id` identity and its viewport-relative vertical position. Support numeric positions from older versions.
4. When navigating to an article, reset its viewport to the start rather than inheriting the high scroll position from the listing. When returning to a section/search, locate the original card and restore its relative position, with a plain scrollY fallback if no anchor exists.
5. Perform restoration after React's route render and a handful of bounded follow-up passes for dynamic content, stopping if the user interacts with scrolling, clicking or typing. Do not continuously override intentional scrolling.
6. Keep previously loaded desk and search views mounted but hidden while reading; do not discard pagination, filters or downloaded articles. Native history Back and the in-article return links share the same navigation logic.

## Alternatives
One absolute scroll offset was insufficient as the source and destination pages have very different document heights. A `window.history.back()`-only button fails on deep links from external pages. Explicit dated anchors retain both UX behaviour and direct URL compatibility.

## Consequences
There is no additional server or tracking. Session snapshots expire with the browsing session, while language remains saved across sessions. When an article is opened from a deep link with no known origin, the existing desk fallback is used. Playwright validates first-card, historical-edition, result-list and long-article return, including mobile navigation.
