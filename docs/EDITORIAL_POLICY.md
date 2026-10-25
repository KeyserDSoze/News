# Editorial policy / Politica editoriale

## Mission
**O** is the publication. **Oggettivizzatore** (Italian) and **Objectivizer** (English) explain the name; O also stands for zero advertisements and zero sensational headlines. We aim at **verifiability, provenance and fair context**, not the impossible promise of total objectivity. The absence of interpretation is not a requirement to report verified harm or documented human-rights violations.

## Selection process
Ten stories per edition chosen for public significance, impact, timeliness, geographic and thematic breadth—not just popularity or traffic. Avoid duplication. Make the edition date and publication time explicit. Rank is editorial judgment, never an objectively measured truth.

## Every article must include
- A cautious headline and succinct lead without clickbait.
- A factual summary written from scratch; never paste copyrighted articles.
- A `facts` section of attributable, independently checkable assertions.
- A `questions` section that adds **specific, evidence-based clarification**, not boilerplate: no generic questions about the issue date, no duplicated `unknowns`, no repeated identical questions across different stories. See [editorial Q&A guidance](EDITORIAL_QUESTIONS.md).
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
7. Recheck cited URLs and translations before merging a daily edition. Manual editions require human pre-publication review. The dedicated autonomous newsroom may publish without a separate daily pre-approval **only after** the owner opts in, a real dry-run passes and all automated research, independent-source, localization and technical gates succeed (ADR 0014). Human post-publication sampling and transparent corrections remain required.
8. Corrections: publish a new commit with a descriptive message and correction note, maintaining the Git history; don't silently erase errors.
9. Avoid defamatory speculation, personal data beyond genuinely necessary public-interest facts, and copyrighted article text.
10. The seed edition primarily uses original *illustrative vectors*. It also references two openly licensed Wikimedia Commons images with explicit provenance: a 20 October 2026 satellite image of Typhoon Champi and a clearly dated 2008 archival photograph of olive harvesting in the West Bank. Do not present archival imagery as contemporary event evidence. Replace or extend with event photos only after confirming reuse permissions and rights details.

## Daily workflow
Ask ChatGPT to research **the top ten stories for YYYY-MM-DD**, compare independent reporting and primary documents, flag unresolved claims, propose Italian/English versions and appropriately licensed images. Review the drafts before merging into `news/`. Push triggers structural validation and static deploy, **not infallible fact-checking**. Unattended publishing is available only through the explicitly enabled, fail-closed workflow in ADR 0014. If two independent reporting publishers cannot be checked for each proposed article or any editorial quota cannot be fulfilled, that day's edition must not be published.


## Four independent editorial briefings
- **World (10)**: the ten most consequential world stories, with international reporting and broad geographic perspective.
- **Italy (5)**: five significant national developments, with trustworthy local and national reporting.
- **Technology (5)**: five changes in technology with technical and societal context.
- **Science (5)**: five research developments, preferably with peer-reviewed papers and institutional primary sources. Explicitly distinguish new evidence from preprints and speculative claims.

The counts are enforced separately per issue and language. Do not pad an edition, copy World items into specialist briefings to fill slots, or claim a specialist issue exists before five independently verified articles are ready.

## Long-form, dossiers and objective questions
A front-page story begins with a brief summary. Its dedicated article then presents a complete contextual explanation, sources, and **objective questions and observations last**. For ongoing issues, assign a stable `threadId` only when there is a meaningful shared story. Keep the dated recap accurate as of that day, not retrospectively prophetic. The compiled index creates backlinks automatically so old stories surface later developments. Use `related` for adjacent but different stories, and never imply causation merely because two articles share a topic. Every timeline episode must provide a direct link and clear date. Historical accuracy and corrections are especially important.


## Scala d'impatto / Impact scale (0,5–5 / 0.5–5)

**IT — Regola editoriale attuale**

L'impatto è un **giudizio editoriale motivato**, non una misura scientifica, una graduatoria delle vittime o una previsione. Il valore numerico `impact` va da **0,5 a 5,0**, con **incrementi di 0,5** (dieci valori possibili); il frontend lo mostra con **cinque tacche**, riempibili anche a metà. Le tacche indicano il grado dell'impatto, non la popolarità o la qualità dell'articolo.

Confronta i valori **solo nell'ambito della rubrica**: rilevanza globale per Mondo, nazionale per Italia, conseguenze per l'ecosistema tecnologico in Tecnologia e contributo affidabile alla conoscenza in Scienza. Il valore deve essere identico nei JSON italiano e inglese; `impactReason` spiega la motivazione, tradotta in ciascuna lingua.

- **0,5–1,0:** ricaduta geografica o specialistica circoscritta; annuncio iniziale o osservazione preliminare.
- **1,5–2,0:** conseguenze concrete a livello regionale, comunitario o di settore, ma delimitate.
- **2,5–3,0:** implicazioni importanti, nazionali, transfrontaliere, scientifiche o tecnologiche, sostenute da evidenze.
- **3,5:** rilevanza molto elevata, rara e persistente per un settore ampio o sul piano internazionale.
- **4,0–4,5:** conseguenze straordinarie, estese e storicamente significative, ben documentate.
- **5,0:** **livello massimo, riservato a eventi realmente epocali** nell'ambito pertinente; su scala mondiale, per esempio una catastrofe di portata storica paragonabile agli attentati dell'11 settembre, l'impiego di un'arma nucleare o una scoperta validata che rivoluzioni la produzione energetica globale. Un'ipotesi non verificata non può ottenere il massimo.

Il valore **5,0 deve essere eccezionale** nelle rassegne ordinarie. Una tempesta grave, un delitto, uno studio clinico di fase III o un avviso di sicurezza informatica non meritano automaticamente 4,0–5,0. Consideriamo diffusione, durata, persone coinvolte, solidità delle prove ed effetti sistemici, senza confondere il linguaggio emotivo con l'impatto. Ogni valutazione deve essere spiegabile in termini semplici; eventuali modifiche restano verificabili nella cronologia Git.

**EN — Current editorial rule**

The impact score is **a reasoned editorial judgement**, not a scientific measurement, a ranking of victims or a prediction. The numeric `impact` ranges from **0.5 to 5.0** in **0.5 increments** (ten possible values). The frontend renders it as **five rising segments**, each of which can be half-filled. The segments express the scale of consequences, not story popularity or article quality.

Compare values **only within the desk's scope**: global for World, national for Italy, ecosystem-wide for Technology, and robust contribution to scientific knowledge for Science. Italian and English JSON must contain the same numeric score, with a localized `impactReason` explaining it.

- **0.5–1.0:** limited geographic or specialist consequences; early announcement or preliminary observation.
- **1.5–2.0:** tangible regional, community or specialist-sector impact with bounded outcomes.
- **2.5–3.0:** notable national, cross-border, scientific or technological implications supported by evidence.
- **3.5:** rare, very high and sustained sector-wide or international significance.
- **4.0–4.5:** extraordinary large-scale, historically significant consequences, supported by verified facts.
- **5.0:** **the maximum level, reserved for genuinely era-defining events** within the relevant scope. Worldwide examples include a catastrophe comparable in historical reach to the 11 September attacks, the use of a nuclear weapon, or a validated discovery fundamentally transforming global energy production. Unverified speculation cannot receive the maximum.

A **5.0 score should be extraordinarily rare** in ordinary daily editions. A major storm, serious crime, phase III trial or security bulletin does not automatically warrant 4.0–5.0. Evaluate breadth, duration, affected population, quality of evidence and systemic consequences. All ratings require plain-language justification and any later change must be auditable in Git.

## Discoverability and contextual coverage
Every article carries exactly three localized, concise `tags` identifying actual subjects—not promotional keywords. Tags link to the same on-device search as the header. The search supports full article text, date intervals, tag equality and desk filters. Daily long-form copy should add sourced explanation, definitions, historical background and important limitations rather than repeating the front-page lead verbatim. Editorial SVG illustrations used as fallbacks are **not documentary photography** and must be labelled as original artwork.
