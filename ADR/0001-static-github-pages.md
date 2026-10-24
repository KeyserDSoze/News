# ADR 0001 — Static publication through GitHub Pages
- Status: Accepted
- Date: 2026-10-24

## Context
We need a public bilingual news archive and reader without any always-on backend.

## Decision
Version daily stories and licensed assets under `news/` in the main repository. Build a React/TypeScript static site with Vite and publish to GitHub Pages through the official artifact/deploy workflow. Generate the dates manifest at build time.

## Consequences
No operating costs for a database or API and every correction has Git history. New editions require a commit and deployment. GitHub Actions artifacts are ephemeral deployment products, **not editorial storage**. GitHub Pages still has traffic and repository size limits; monitor if the archive grows significantly.
