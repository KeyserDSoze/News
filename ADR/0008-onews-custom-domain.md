# ADR 0008 — Canonical custom domain and root paths

- Status: Accepted
- Date: 2026-10-24
- App release: **0.0.2**

## Context
The user configured `onews.app` on GitHub Pages but the deployed frontend was built with `/News/` as the Vite base path. Project Pages URLs use `/News/` on `keyserdsoze.github.io`; a custom domain serves this repository from `/`. React could fail to load its modules, JSON, image and PWA resources, showing a blank page.

## Decisions
1. **Canonical origin:** `https://onews.app/`. Vite uses `base: '/'`; GitHub Actions specifies `VITE_BASE_PATH=/` and `PUBLIC_SITE_ORIGIN=https://onews.app` for reproducible builds.
2. **Static GitHub Pages:** `src/frontend/public/CNAME` contains `onews.app`. Continue using a single static Pages artifact, with no backend.
3. **Deep links and social previews:** article and desk pages are prerendered as static HTML entry points with canonical/Open Graph metadata for `https://onews.app`. Navigation, search, images and archive index are rooted at `/`.
4. **PWA:** manifest `start_url`, `id`, `scope`, service worker registration and precache URLs use root; new SW updates as usual on every deployment. Installs previously associated with another origin or scope may need reinstalling.
5. **Legacy links:** publish lightweight static redirect pages for previous `/News/.../` article/section/search paths. A redirect from `/News/#/article/...` also parses the hash to retain article identity. The SPA retains a route-migration fallback for any missing static alias.
6. **Release version:** v0.0.2 patch with notes in both languages, per release policy, even though editorial content is unchanged.

## Verification
Playwright serves the actual build at root, checks canonical URLs and social metadata, legacy redirects, assets, PWA scope and service worker activation. The domain's DNS, certificate and GitHub Pages custom-domain setting must also be checked separately because source changes alone cannot correct misconfigured DNS.

## Consequences
The former `https://keyserdsoze.github.io/News/` URL may be redirected by GitHub Pages to the custom domain; old shared links are handled as aliases. `onews.app` is the sole canonical entry point for new shares and installations.
