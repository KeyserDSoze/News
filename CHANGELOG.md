# O — Release notes

Every application version must have a dated, bilingual entry in `src/frontend/src/releases.json` and a corresponding entry in this changelog. Releases use semantic versions starting with **0.0.1**. Daily news publications can update content without changing the app version; code releases must advance the version and include release notes.

## [0.0.2] — 2026-10-24

**Italiano — O arriva su onews.app**

- Risolta la pagina bianca dovuta a risorse richieste sotto `/News/` invece che dalla radice.
- URL canonici `https://onews.app/`, articoli, rassegne, tag e note di rilascio.
- Manifest, icone e aggiornamenti automatici PWA installabili dal dominio corretto.
- Compatibilità con i vecchi collegamenti `/News/` e `#/` attraverso redirect statici.

**English — O moves to onews.app**

- Fixed blank pages caused by assets requested under `/News/` instead of the domain root.
- Root-level canonical URLs for the homepage, articles, desks, tags and release notes.
- PWA manifest, icons and update service worker now use the correct custom-domain scope.
- Backward-compatible static redirects for old `/News/` and `#/` links.

## [0.0.1] — 2026-10-24

**Italiano — O diventa un'app installabile**

- Installazione PWA su Android, iPhone e piattaforme compatibili.
- Copia completa o per sezione in Markdown, con citazioni e link alle fonti.
- Lettore vocale in italiano e inglese per sezione o articolo intero, con pausa/riprendi/stop.
- Menu hamburger con versione cliccabile, istruzioni di installazione e note di rilascio.
- Service worker con aggiornamenti automatici ai nuovi deploy e cache offline delle pagine già consultate.
- Mantiene le quattro rassegne, la ricerca e lo storico già disponibili.

**English — O becomes an installable web app**

- Installable PWA for Android, iPhone and supported platforms.
- Copy the full story or individual sections as Markdown, including citations and source links.
- Italian and English text-to-speech for sections or the complete article, with pause/resume/stop.
- Hamburger menu showing clickable version, installation steps and release history.
- Automatically updated service worker and offline cache for previously visited content.
- Retains four briefings, archive and search.

