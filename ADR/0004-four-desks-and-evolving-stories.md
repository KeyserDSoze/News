# ADR 0004 — O, four editorial desks and long-form evolving stories
- Status: Accepted
- Date: 2026-10-24

## Context
The publication should use a universal single-letter identity, publish focused vertical briefings in addition to World, and make ongoing stories discoverable from both old and new editions while staying on static GitHub Pages.

## Decision
- Brand: **O**. Explanation in Italian **Oggettivizzatore**, in English **Objectivizer** (a coined term). O also visually signals **zero advertisements** and **zero sensational headlines**.
- Four editorial desks: **World — 10**; **Italy — 5**, **Technology — 5**, **Science — 5** sourced stories per daily edition. Dedicated verticals publish when editorial content is complete; no placeholder JSON, no misleading generated stories.
- Keep the original world date path for backward compatibility. Put each specialist issue at `news/YYYY-MM-DD/<section>/<locale>.json`.
- Individual stories use hash-based routes safe for GitHub Pages hosting. Front-page excerpts always open an in-depth article with summary first, body next, citations and objective questions at the end.
- A stable `threadId` groups updates to a meaningful developing issue. A manually authored, historically accurate `threadRecap` describes the issue as known on that day. The build creates a bilingual cross-edition story index that provides chronological **bidirectional** links (including updates to previously published articles) without rewriting older files.
- Use manually curated `related` references to connect adjacent coverage; the static index generates backlinks, too.

## Consequences
Editorial completeness takes priority over filling pages. Old editions remain accessible and get contextual follow-up links from the current build. The index remains small for now; split by year if it grows significantly. All links are read-only, client-side and require no service, ads or tracking.
