# ADR 0002 — Bilingual edition schema and prefetch window
- Status: Accepted
- Date: 2026-10-24

## Decision
Store `news/YYYY-MM-DD/it.json` and `en.json`, each containing one curated edition of exactly ten articles. Match IDs/ranks across translations. Require >=2 distinct outlets per story, structured facts/perspectives/unknowns and attributed cover media. An index of dates is built and deployed with the frontend. Initially fetch up to seven consecutive dates, render one, append a day as the viewport approaches the bottom, and start fetching the newly required oldest day.

## Rationale
One HTTP request per date/language is more efficient than fetching twenty individual story JSON files. Day JSON is small enough to cache aggressively and can be versioned in Git. Infinite scrolling is bounded by the actual archive. Images are loaded lazily by the browser.

## Alternative rejected
GitHub Releases or Actions artifact links for every day: harder browser delivery and unnecessary API coupling. Per-article JSON endpoints: many tiny requests with no clear advantage.
