# Publishing a daily edition of O

The publication has four independent desks. Publish only when **all required stories have independent sourcing and both translations are ready**.

| Desk | Stories per language | Storage |
|---|---:|---|
| World / Mondo | 10 | `news/YYYY-MM-DD/it.json` and `en.json` |
| Italy / Italia | 5 | `news/YYYY-MM-DD/italy/it.json` and `en.json` |
| Technology / Tecnologia | 5 | `news/YYYY-MM-DD/technology/it.json` and `en.json` |
| Science / Scienza | 5 | `news/YYYY-MM-DD/science/it.json` and `en.json` |

**No incomplete or dummy editions**: a desk can skip a day. The frontend honestly marks sections with no editions as forthcoming. The World desk is the primary front page.

## Editorial checklist
1. Research ten World articles and, when ready, five articles for each specialist desk. Rank only within the respective desk; publish both translations together with matching ID, rank, category, `threadId` and `related` references.
2. Write `title`, `dek`, **front-page `summary`**, full article `body` as a nonempty array of substantive paragraphs, and `questions` with precise question/answer pairs; keep `facts`, `perspectives` and `unknowns` explicitly attributable. No invented information or sensational claims.
3. Record at least two distinct original publishers per article (three recommended), full HTTPS links, accurate source title, published date and role. Prefer primary records for science and public policy.
4. Add licensed images in `news/YYYY-MM-DD/assets/`; mark illustrations as such, and document copyright owner, provenance, licence and descriptive alt text. Never treat archive pictures as photos of breaking events.
5. For an ongoing story or genuinely continuing topic, reuse the **stable `threadId`** from previous editions and write a `threadRecap` that is accurate **as of the issue date**. The build generates the timeline; older stories automatically show updates without requiring edits.
6. For connected but separate stories, add a `related` array with exact `{date,section,id}` references. The build resolves both directions; only enter one link if reciprocity is intended. Do not imply identical events or causation merely because subjects overlap.
7. Run from the repository root:

```bash
npm install
npm run test:content
npm run build
npx playwright install chromium
npm run test:e2e
```

8. Submit a PR for editorial review. CI checks the schema and tests; a merge to `main` deploys GitHub Pages.
9. Corrections must be transparent in the Git commit history. A historical recap cannot be silently updated to imply earlier knowledge of facts learned later.

Brand: **O** is the name. **Oggettivizzatore** (Italian) and **Objectivizer** (English) describe the name. Zero ads, zero sensational headlines.

**Sources are links, not reproduced reporting**. Summaries must be newly authored and reflect the weight of available evidence.

## Impact, three tags and contextual writing
Use an `impact` number from **0.5 to 5.0 in steps of 0.5**, with identical numeric value in both locales and an evidence-based translated `impactReason`. Ratings above 3.5 should be very rare; **the maximum level 5.0 is for historic, era-defining consequences only** at the desk's relevant scale, never ordinary national or regional news. The UI represents the rating with five graduated segments (including half-segments), not stars. Read the rubric in `docs/EDITORIAL_POLICY.md`. Every article needs **exactly three localized keyword tags** (single terms or hyphenated words, never clickbait); verify that they lead to relevant coverage. Provide an informative four-or-more-paragraph `body`, distinguishing sourced observations, contextual explanation, alternative interpretations, and uncertainties; do not inflate length by repeating claims. Add source citations and update the Git history transparently when facts or impact change.

## App releases and required patch notes
When a deployment changes the application itself, increment SemVer in the **root** and **frontend** package JSON files, prepend a dated entry to `src/frontend/src/releases.json` containing both `it` and `en` release descriptions, and add the same version heading in `CHANGELOG.md`. Do not silently reuse a previous app version for new application features. The build validates these records with `node scripts/validate-release.mjs` and renders the whole release history at `/News/releases/`.

Daily editorial editions are content updates, not necessarily a new app binary version; every deploy still updates the PWA service worker using the CI commit SHA. Review speech accessibility in both languages, installation instructions on real iOS/Android devices, and test whether the browser restores the reader's scroll position after a new deployment.
