# O — Editorial status, 2026-10-26

**STATUS: 25/25 EDITION FILES PREPARED ON PR #6; NOT PUBLISHED UNTIL ALL GATES PASS.**

The publication branch now contains eight complete `news/2026-10-26/` JSON files and 25 original SVG illustrations. The 50 localized article texts cover World 10, Italy 5, Technology 5 and Science 5. Existing editions remain untouched.

## Verified structure

- World: 10 original bilingual articles (`news/2026-10-26/it.json`, `en.json`).
- Italy: 5 (`news/2026-10-26/italy/{it,en}.json`).
- Technology: 5 (`news/2026-10-26/technology/{it,en}.json`).
- Science: 5 (`news/2026-10-26/science/{it,en}.json`).
- Assets: 25 original, symbolic SVGs with distinct labels and image credits; illustrations are **not photographs**.
- Bilingual Q&A: **100** written Q&As total (two per article and language), checked for repeated prompts and obvious empty content across the issue.

The branch also retains the underlying 50 per-article JSON research drafts and 25 draft illustrations for review/audit.

## Research and editorial precautions

- Prior editions and current schema/README/policy/Q&A guidance have been read. A Jordan security update links the 24 October Karak report; other developing events use distinct dated stories.
- Each new article has at least two attributed, separately owned news-reporting publishers, supplemented by relevant primary material where available. Original scientific records and vendors' press releases are not treated as independently verified clinical outcomes.
- Original event dates and subsequent reporting dates are distinguished. In particular, PHP patches were released 21 October; the Tor relay attack occurred 2–5 October but was detailed in later reporting; the first PM577a administration was announced 5 October and newly examined by Nature on 22 October.
- Claims about the **planned**, not yet observed, 26 October Tehran talks were corrected. Misspelled URLs in Microsoft MAI-DxO and Tor original reporting were fixed after opening the source pages.
- Scientific hazards and treatment efficacy, accuracy measured in simulated diagnostic cases, and prospective regulatory decisions are explicitly separated from settled outcomes.
- Editorial review of the 25 stories, including detailed semantic equivalence of all questions and answers, still needs to remain transparent; deterministic structural scripts alone cannot attest every reported fact.

## Automated review and release gate

A preliminary in-chat structural audit of the 50 draft JSONs found no missing articles, ranking gaps, locale metadata mismatches, empty Q&As, missing image drafts, or duplicate question prompts. This is **not** a substitute for repository scripts.

**Pending actual GitHub PR Actions validation:** content/source/schema checks, the editorial Q&A automated test, application build and Playwright E2E suite. Verify that all checks succeed on the final PR head and review any warnings/failures before merging. Merge is allowed only if independent verification and all checks pass. Publication must then be confirmed by the production Pages deployment and a live-site check.

At time of this note: branch/PR only. **No merge to main, and no live issue claimed.**
