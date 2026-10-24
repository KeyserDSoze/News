# Editorial policy / Politica editoriale

## Mission
**O** is the publication. **Oggettivizzatore** (Italian) and **Objectivizer** (English) explain the name; O also stands for zero advertisements and zero sensational headlines. We aim at **verifiability, provenance and fair context**, not the impossible promise of total objectivity. The absence of interpretation is not a requirement to report verified harm or documented human-rights violations.

## Selection process
Ten stories per edition chosen for public significance, impact, timeliness, geographic and thematic breadth—not just popularity or traffic. Avoid duplication. Make the edition date and publication time explicit. Rank is editorial judgment, never an objectively measured truth.

## Every article must include
- A cautious headline and succinct lead without clickbait.
- A factual summary written from scratch; never paste copyrighted articles.
- A `facts` section of attributable, independently checkable assertions.
- A `perspectives` section identifying **who says what** without presenting unsupported claims as established fact.
- An `unknowns` section indicating what could not yet be verified and conflicts between sources.
- At least two distinct named source outlets/owners (aim for three or more: Reuters, AP, BBC, ANSA, RaiNews, Guardian, FT, original official releases and specialist outlets). Different URLs from one syndication desk do not count as independent reporting.
- Original source URLs, publication timestamps, source roles. Source diversity includes affected populations and qualified experts when relevant, not just political institutions.
- Cover image with meaningful alt text, author/owner, license or permission basis and clickable original provenance. Distinguish documentary photos from **illustrative** imagery. Don't republish protected Reuters/AP/ANSA photography simply because an attribution is supplied.

## Standards
1. Identify events and dates precisely; distinguish occurrence from publication.
2. Avoid false balance: contrary claims are not equal to verified evidence. Avoid repeating unsubstantiated allegations as fact.
3. Describe uncertainty numerically where possible, and label divergent casualty or polling figures by source and time.
4. Provide full contextual geography and identify actors by their roles. No dehumanizing descriptors or emotional framing.
5. For elections, attribute polls, fieldwork, sample and margin of error. Never project unconfirmed results.
6. For breaking news, prefer verified developments; use cautious labels such as “authorities report”.
7. Recheck cited URLs and translations before merging a daily edition. Human editorial review is required prior to publication.
8. Corrections: publish a new commit with a descriptive message and correction note, maintaining the Git history; don't silently erase errors.
9. Avoid defamatory speculation, personal data beyond genuinely necessary public-interest facts, and copyrighted article text.
10. The seed edition primarily uses original *illustrative vectors*. It also references two openly licensed Wikimedia Commons images with explicit provenance: a 20 October 2026 satellite image of Typhoon Champi and a clearly dated 2008 archival photograph of olive harvesting in the West Bank. Do not present archival imagery as contemporary event evidence. Replace or extend with event photos only after confirming reuse permissions and rights details.

## Daily workflow
Ask ChatGPT to research **the top ten stories for YYYY-MM-DD**, compare independent reporting and primary documents, flag unresolved claims, propose Italian/English versions and appropriately licensed images. Review the drafts before merging into `news/`. Push triggers validation and static deploy, **not autonomous fact-checking**. No unattended publishing until a dedicated editorial review protocol exists.


## Four independent editorial briefings
- **World (10)**: the ten most consequential world stories, with international reporting and broad geographic perspective.
- **Italy (5)**: five significant national developments, with trustworthy local and national reporting.
- **Technology (5)**: five changes in technology with technical and societal context.
- **Science (5)**: five research developments, preferably with peer-reviewed papers and institutional primary sources. Explicitly distinguish new evidence from preprints and speculative claims.

The counts are enforced separately per issue and language. Do not pad an edition, copy World items into specialist briefings to fill slots, or claim a specialist issue exists before five independently verified articles are ready.

## Long-form, dossiers and objective questions
A front-page story begins with a brief summary. Its dedicated article then presents a complete contextual explanation, sources, and **objective questions and observations last**. For ongoing issues, assign a stable `threadId` only when there is a meaningful shared story. Keep the dated recap accurate as of that day, not retrospectively prophetic. The compiled index creates backlinks automatically so old stories surface later developments. Use `related` for adjacent but different stories, and never imply causation merely because two articles share a topic. Every timeline episode must provide a direct link and clear date. Historical accuracy and corrections are especially important.


## Impact rating (0.5–5 stars) / Scala d'impatto
The impact score is **a clearly justified editorial judgement**, never a scientific measurement, a ranking of victims, or a prediction of future outcomes. Scores use 0.5-star increments and the same number in both translations; `impactReason` explains the score in each language. Compare stories **only within the desk's scope**: worldwide for World, national for Italy, technology ecosystem-wide for Technology, and robust contribution to scientific knowledge for Science.

- **0.5–1.0:** limited geographic or specialist impact; an early announcement or preliminary observation.
- **1.5–2.0:** concrete regional, community or specialised-sector impact, with bounded consequences.
- **2.5–3.0:** notable national, cross-border or scientific/technological implications, supported by evidence.
- **3.5:** rare, very high and sustained sector-wide or international significance.
- **4.0–4.5:** extraordinary large-scale, historically significant consequences, well supported by verified facts.
- **5.0:** **reserved for genuinely world-changing, era-defining events**—for instance a catastrophe comparable in historical reach to the 11 September attacks, the use of a nuclear weapon, or a validated discovery that fundamentally changes global energy production. Mere speculation about such a discovery cannot receive 5 stars.

Five-star headlines should be virtually absent from ordinary daily issues. A major storm, a serious crime, a Phase III trial or a company security announcement is **not automatically** four or five stars. Evaluate breadth, duration, affected population, evidence quality, and systemic consequences; never confuse emotional language with impact. A score must be explainable in plain language. A change of rating must be auditable in Git.

## Discoverability and contextual coverage
Every article carries exactly three localized, concise `tags` identifying actual subjects—not promotional keywords. Tags link to the same on-device search as the header. The search supports full article text, date intervals, tag equality and desk filters. Daily long-form copy should add sourced explanation, definitions, historical background and important limitations rather than repeating the front-page lead verbatim. Editorial SVG illustrations used as fallbacks are **not documentary photography** and must be labelled as original artwork.
