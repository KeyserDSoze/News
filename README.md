# O — Oggettivizzatore / Objectivizer

**O = Oggettivizzatore / Objectivizer. O = zero ads, zero sensational headlines.**\n\nFour independent daily briefings: **World (10)**, **Italy (5)**, **Technology (5)** and **Science (5)**. Every article has a shareable detailed page, an upfront summary, sourced context and objective questions. A static cross-edition index connects chronologically evolving stories in both directions.

Static, bilingual, source-transparent independent press review built with **React + TypeScript + Vite** and published through **GitHub Pages**, with no backend or database.

## Read the paper

Once Pages is activated, the site is published at **https://keyserdsoze.github.io/News/**.

The World archive currently contains **23 and 24 October 2026**, with **20 sourced stories in each language**. The Italy/Technology/Science desks show a clearly marked upcoming state until the first full set of five articles is researched. Daily editions have at least two distinct sources per article, original illustrated covers, and explicit separation of established facts, attributed claims and remaining uncertainties. The 24 October edition also includes two Wikimedia-licensed contextual images. Photos and satellite imagery carry provenance, dates, credits and licenses; archival media is never presented as photography of today's event.

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
| `news/YYYY-MM-DD/en.json` | Same 10 World stories in English |\n| `news/YYYY-MM-DD/{italy,technology,science}/{it,en}.json` | 5 fully researched stories per specialized desk |
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
