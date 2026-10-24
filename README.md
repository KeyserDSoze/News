# O — Oggettivizzatore / Objectivizer

**O = Oggettivizzatore / Objectivizer. O = zero ads, zero sensational headlines.**

Four independent daily briefings: **World (10)**, **Italy (5)**, **Technology (5)** and **Science (5)**. Every article has a shareable detailed page, an upfront summary, sourced context and objective questions. A static cross-edition index connects chronologically evolving stories in both directions.

Static, bilingual, source-transparent independent press review built with **React + TypeScript + Vite** and published through **GitHub Pages**, with no backend or database.

## Read the paper

Once Pages is activated, the site is published at **https://keyserdsoze.github.io/News/**.

The World archive currently contains **23 and 24 October 2026**, with **20 sourced stories in each language**. The Italy, Technology and Science desks each have a fully sourced five-story edition dated 24 October 2026. Across the four desks, the archive now contains 35 distinct article instances, each in Italian and English. Daily editions have at least two distinct sources per article, original illustrated covers, and explicit separation of established facts, attributed claims and remaining uncertainties. The 24 October edition also includes two Wikimedia-licensed contextual images. Photos and satellite imagery carry provenance, dates, credits and licenses; archival media is never presented as photography of today's event.

## Start locally

```bash
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173/News/` by default.

```bash
npm run test:content
npm run build
npx playwright install chromium
npm run test:e2e
```

## Where things live

| Path | Purpose |
|---|---|
| `src/frontend/` | React/TypeScript SPA, i18n, dark/light theme, responsive reader |
| `news/YYYY-MM-DD/it.json` | 10 Italian World articles and metadata |
| `news/YYYY-MM-DD/en.json` | Same 10 World stories in English |
| `news/YYYY-MM-DD/{italy,technology,science}/{it,en}.json` | 5 fully researched stories per specialized desk |
| `news/YYYY-MM-DD/assets/` | Credited original artwork or appropriately licensed photographs |
| `scripts/build-news.mjs` | Validates every edition, generates static archive and manifest |
| `tests/` | Playwright desktop/mobile browser tests |
| `ADR/` | Architecture decisions |
| `docs/` | Editorial policy, publishing process, architecture |
| `.github/workflows/` | PR tests and GitHub Pages deployment |

## Enable GitHub Pages (repository owner)

1. Go to [Settings → Pages](https://github.com/KeyserDSoze/News/settings/pages).
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. The [Deploy Oggettivizzatore workflow](https://github.com/KeyserDSoze/News/actions/workflows/pages.yml) builds, tests and deploys on every relevant push to `main`.
4. Watch the workflow output to confirm a successful deployment.

GitHub Actions artifacts are short-lived build products, not the archive. All editions remain permanently versioned as ordinary Git files on `main` unless deliberately deleted. The browser downloads the JSON from the same GitHub Pages origin, initially preloading up to seven days and progressively fetching earlier dates.

## How to publish tomorrow

Use [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md). Each World edition requires **exactly ten articles**; every specialist edition requires **exactly five** with at least two distinct newsrooms per article, bilingual aligned IDs and ranks, source links, cautious fact/claim separation and credited imagery. Opening a PR triggers checks; merging to `main` triggers publication. Editorial review remains a human responsibility.

Read the [editorial policy](docs/EDITORIAL_POLICY.md), [architecture](docs/ARCHITECTURE.md), and [decisions](ADR/). No agency images have been copied without a verified license.

## Impact rating · 1–5 stars
Each article carries a justified **desk-relative** 1–5 star assessment: global relevance for World, impact on Italy for Italy, technology ecosystem significance for Technology, and quality/significance of research evidence for Science. The reasoning is public and localized; it is editorial judgement, not a mathematical fact. A score of 5 is reserved for exceptional impact in its particular scope. See `docs/EDITORIAL_POLICY.md`.

## The reader's search and archive memory
The search in O's masthead is completely static. It fetches date/section JSON documents from GitHub Pages and caches them in **browser IndexedDB** for later searches. With no dates selected, it searches the latest year; readers can set exact dates (including older ones), enter article text, click one of **three tags per story**, or restrict results to a section. There are no account logins or tracking services. Browser and phone-back navigation restore the exact scroll location in a briefing or search results, even after opening an article. Invalid image URLs display original desk-specific editorial art with truthful credits.

Scores use **half-star steps (0.5–5)** with a conservative editorial rubric: 5 means genuinely world-changing, historically exceptional impact. Every score has a localized rationale. Existing World and specialist stories were reassessed rather than automatically assigned 4 or 5 stars.

## Shareable direct links (ADR 0006)
Article URLs now use **normal slashes**: `https://keyserdsoze.github.io/News/article/world/2026-10-24/oleshky-humanitarian-ceasefire/`. Section, search and tags also have slash URLs instead of hashes. The project remains fully static: the build emits one `index.html` per article with readable Open Graph/Twitter metadata, plus a `404.html` fallback for arbitrary client URLs. Refreshing a published article opens directly; previously shared hash links migrate automatically. On mobile, **Share** opens the native sharing sheet (WhatsApp, Messages, etc., depending on installed apps); **Copy link** works independently, and browsers without Web Share automatically copy the permalink.

## App installabile, lettura e versioni

O è una PWA installabile, **v0.0.1**, con icona O, splash e avvio indipendente dal browser ove supportato. **Android/Chrome:** dal menu di O scegli *Installa O* o l'opzione equivalente nel browser. **iPhone/iPad/Safari:** tocca *Condividi* → *Aggiungi alla schermata Home*. Su altri browser le opzioni dipendono dal sistema operativo.

Nell'articolo i pulsanti **Markdown** e **Ascolta** sono disponibili per il riassunto, il testo, i fatti verificati, le dichiarazioni, le fonti, le domande e l'eventuale dossier, oltre che per l'articolo completo. Markdown include link, attribuzioni e fonti; la lettura usa il motore vocale locale supportato dal browser, con pausa, ripresa e interruzione. In assenza di sintesi vocale browser non viene offerto un servizio esterno.

I file **`src/frontend/src/releases.json`** e **`CHANGELOG.md`** conservano per sempre le note bilingui di ogni versione applicativa. La versione, mostrata nel menu hamburger, apre la pagina **/News/releases/**. `node scripts/validate-release.mjs` verifica che versioni dei package, JSON e changelog corrispondano, e la GitHub Action lo esegue prima del deploy. Quando si pubblica una modifica dell'app, aggiornare versioni, data e note; le notizie quotidiane possono cambiare senza aumentare la versione del programma.

Il Service Worker è rigenerato **a ogni deploy**, distinguendo il numero di versione dal commit pubblicato; verifica gli aggiornamenti al caricamento, tornando online, quando la scheda torna in primo piano e periodicamente. La nuova versione viene attivata e la pagina ricaricata automaticamente quando viene rilevata, conservando lo stato di navigazione ove possibile. Le pagine già consultate possono essere disponibili offline, ma un archivio non ancora scaricato non lo è necessariamente.
