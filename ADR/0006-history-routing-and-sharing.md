# ADR 0006 — Clean URLs, prerendered static entry points and native sharing

- Status: Accepted
- Date: 2026-10-24

## Context
Hash URLs such as `#/article/world/2026-10-24/id` are unattractive when sharing O articles. GitHub Pages is static and cannot be configured to rewrite unknown paths to the SPA shell.

## Decision
- Use canonical, project-relative History API paths under `/News/`: `world/`, `italy/`, `technology/`, `science/`, `search/`, `search/tag/<tag>/`, and `article/<section>/<date>/<id>/`.
- Intercept only internal, same-origin app links on ordinary unmodified primary-button clicks. Leave new tabs, modified clicks, external and file links to the browser. `history.pushState` and `popstate` preserve natural Back/Forward.
- Keep the existing visited desks and search mounted, and store per-path scroll coordinates in sessionStorage. Navigation to an article remembers which desk or search page it came from, so 'Back to briefing' works without losing search, loaded archive days or scroll position.
- Backward compatibility: on first load, previously distributed `#/...` URLs are migrated using `replaceState` to their equivalent clean paths.
- During `postbuild`, generate `dist/article/.../index.html` for every published issue/article. Each entry serves the same compiled React shell but carries server-readable Open Graph/Twitter metadata, canonical URL and an attributed image, so sharing and direct reloads do not require a server rewrite and known stories return HTTP 200.
- Generate static entry HTML for each desk, the search page, and existing tags. A copy of the shell at `dist/404.html` handles unknown/future client routes gracefully on GitHub Pages. Unlike prerendered entries, a 404 fallback may retain HTTP 404 status.
- The article toolbar has a native Web Share API button (title, contextual teaser and exact permalink) for supported phones/browsers. Where unavailable or rejected for reasons other than user cancellation, it copies the canonical link. A separate explicit copy button is always available. No analytics or third-party sharing scripts.

## Consequences
Static builds contain one tiny HTML entry per article plus tags; images and React bundle remain shared. Adding an edition automatically publishes its new URLs. GitHub Pages needs no backend or framework service. Article metadata currently defaults to Italian, with bilingual content rendered after the reader loads the site. Adjust `PUBLIC_SITE_ORIGIN` and `VITE_BASE_PATH` if migrating to a custom domain.
