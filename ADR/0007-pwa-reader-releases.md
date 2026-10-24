# ADR 0007 — Installable O, offline-first reading tools, and bilingual releases

- Status: Accepted
- Date: 2026-10-24
- Initial app version: **0.0.1**

## Context
Readers want to copy any segment or full article into Markdown, listen via the device voice, install O like an app, and always find dated version history. GitHub Pages remains backend-free.

## Decisions
1. **Structured text exports:** Render reusable actions for the complete article, summary, main story, verified facts, attributed perspectives, related dossier when present, source list and objective assessment. Markdown is generated directly from the bilingual news JSON, contains credited media, cited source links and canonical article/dossier links; the content is copied with the Clipboard API, falling back to browser copy where necessary.
2. **Local text-to-speech:** The browser's Web Speech API chooses a voice matching it-IT or en-GB where available. Reading long texts in chunks avoids some mobile engine limits. Start, pause, resume and stop are user-controlled. Changing article/language and component teardown cancel playback. Text is not transmitted by our app to a third-party TTS provider. OS/browser limitations mean some devices may not have a supported voice; use the native accessibility reader as a fallback.
3. **PWA:** An in-scope `/News/manifest.webmanifest`, PNG icons and standalone launch support Android, iPhone and other platforms. Android browsers may provide an install prompt; iOS Safari requires Share → Add to Home Screen. In-app instructions cover both cases.
4. **Updates and offline cache:** `postbuild` generates `sw.js` and `version.json` tied to both the app SemVer and every Git commit deployed. The SW caches the shell, hashed assets and visited news pages and tries the network first for documents/news, falling back to cache on failure. On a new controlling SW the page reloads automatically. Browsers may delay updates when closed, offline or in constrained background modes; the app checks again upon return.
5. **Release discipline:** First official app version is `0.0.1`. The version is shown in a hamburger menu and links to a bilingual `/News/releases/` page generated from `releases.json`. `CHANGELOG.md` and frontend/root package versions must match. CI runs a validator. Every future **app release** needs a new SemVer, dated Italian and English notes and a changelog entry; adding new news content only need not advance app SemVer.

## Consequences
GitHub Pages remains purely static with no backend, subscription, account, analytics or remote speech service. Content cache is best-effort, not a guarantee of complete offline archives. A newly installed PWA inherits the platform-specific install and speech UI; iOS support and voices vary between devices. Client update checks and SW lifecycle cannot promise instant updates while the app is fully closed.
