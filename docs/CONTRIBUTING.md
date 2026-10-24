# Publishing an edition
1. Start from the previous `news/YYYY-MM-DD/it.json` and `en.json`. Create one new directory for the date.
2. Write exactly ten articles in each language. The `id`, `rank`, and `category` fields must match in the same order.
3. Cite two distinct sources minimum per article (three recommended); add the link title, published ISO timestamp and source type.
4. Verify rights to each image and use `news/YYYY-MM-DD/assets/*` for files. Mark an original illustration `kind=illustration`, `license=original work`; for third-party photos record proper attribution and precise license.
5. Run `cd src/frontend && npm install && npm run test:content && npm run build`.
6. Run `npx playwright install chromium && npm run test:e2e` after build.
7. Submit a PR with editorial review. On merge to main, Pages deploy runs automatically.
8. GitHub Settings → Pages → Build and deployment → **GitHub Actions** must be set on first setup.

**Sources are links, not reproduced reporting.** Article summaries must be freshly written, fact checked and revised where evidence conflicts.
