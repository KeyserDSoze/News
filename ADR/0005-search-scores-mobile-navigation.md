# ADR 0005 — O search, conservative impact, image fallback and state-preserving navigation
- Status: Accepted
- Date: 2026-10-24

## Context
Readers need a much smaller mobile lead, article-level research, trustworthy impact ratings and the ability to navigate between a long infinite-scroll briefing, a full-text search, and article pages without losing place. There is still no backend.

## Decisions
1. **Compact mobile masthead**: hide duplicate announcement line and remove the 'Explore' jump link; collapse the introductory hero to make the first edition visible sooner.
2. **Rare 5-star impact**: decimal half-stars (0.5 increments) are allowed. Five is reserved for truly world-changing or historically extraordinary events, not ordinary serious news; each rating remains a scoped, reasoned editorial judgement. The pipeline validates range/increments.
3. **Fuller articles and tags**: four or more contextual paragraphs for existing articles, precisely three localized tags per article, which hyperlink to a shareable filtered search.
4. **Search is client-side and persistent**: a versioned static manifest lists all dated editions. The browser searches localized JSON bodies, summaries, source metadata, and tags. Empty date filters select the prior 365 days; explicit date filters fetch requested available issues regardless of age. Four concurrent requests, each locally cached by edition/locale/revision in IndexedDB, with a memory fallback when browser storage is unavailable.
5. **History and scroll**: mounted section/search trees are hidden instead of unmounted when articles open. Pixel scroll positions are saved by hash in sessionStorage, and history traversal restores them. The article's 'back' link returns to the originating section or search, including query and scrolling state.
6. **Attribution-safe fallback art**: four original vector artworks are hosted with the frontend. When original cover fails, try the attributed alternative or the appropriate desk illustration, with explicit editorial-illustration labelling.

## Tradeoffs
Fetching a full year's archive on a first blank search can take time and storage; a visible progress indicator and concurrency limit make it predictable. IndexedDB is optional, so restrictive private browsing may trigger re-downloads. A date-scoped query intentionally avoids downloading all years. Fully static image fallbacks are deliberately not confused with documentary photography. Long-form quality and tag accuracy still require editorial review, not simply a schema check.
