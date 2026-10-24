# ADR 0012 — Editorial impact levels, not star ratings

- Status: Accepted
- Date: 2026-10-25
- App version: 0.0.7
- Supersedes: star terminology in ADR 0005 and normative documentation

## Context
O originally described article impact using half-star ratings. Version 0.0.3 replaced visual stars with a **five-segment ascending impact meter** that supports half steps, but the editorial policy, contributor instructions, README and technical architecture still referred to stars (and parts of the architecture incorrectly claimed integer scores of 1–5). This contradicted the minimal editorial design and could be confused with a popularity or quality rating.

## Decision
- **Name:** “Scala d'impatto” / “Impact scale”; use levels/values and graduated segments rather than stars in all current normative documentation.
- **Data and visual mapping:** keep the established numeric `impact` from 0.5 to 5.0 inclusive in steps of 0.5, displayed across five rising segments with half fills. Preserve existing published ratings and both localized `impactReason` fields.
- **Meaning:** it is explicitly a transparent, desk-relative editorial judgement of the scale and evidence of consequences, not public approval, a scientific measurement or a ranking of human suffering.
- **Rare maxima:** 4.0–4.5 denotes extraordinary and well-documented scale; 5.0 is reserved for genuinely era-defining changes within a desk's scope, and must not be reached by unverified speculation.
- **Bilingual policy:** maintain the complete rubric in Italian and English at `docs/EDITORIAL_POLICY.md`. Leave historical changelogs and old ADR wording untouched where useful for accurately explaining earlier implementations, but mark superseded decisions.

## Verification
Repository tests check that current normative documents define the 0.5–5.0 scale and segment mapping without presenting it as a star-based rating; published news scores and UI logic are unchanged.

## Consequences
Documentation-only editorial alignment (no backend, schema migration or rescore). A patch release records the clarification to preserve version and release-note consistency.
