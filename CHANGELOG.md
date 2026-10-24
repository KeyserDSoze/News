# O — Release notes

Every application version must have a dated, bilingual entry in `src/frontend/src/releases.json` and a corresponding entry in this changelog. Releases use semantic versions starting with **0.0.1**. Daily news publications can update content without changing the app version; code releases must advance the version and include release notes.

## [0.0.5] — 2026-10-25

**Italiano — Più respiro ai comandi**

- Aggiunti 32 px di margine superiore alla pulsantiera laterale delle notizie, per separarla visivamente dalla navigazione delle quattro rubriche.
- Invariati comportamento sticky, accessibilità e layout mobile.

**English — Reading controls with more breathing room**

- Added a 32px top margin to the desktop article action panel, separating it from the desk navigation.
- Sticky scrolling, accessibility and mobile layout are unchanged.

## [0.0.4] — 2026-10-25

**Italiano — Solo le notizie e ritorno al punto esatto**

- Eliminati l'intestazione introduttiva, la fascia riassuntiva e il micro-header superiore: la rassegna segue immediatamente le quattro rubriche.
- Ridotta l'altezza della testata e lo spazio prima delle prime notizie.
- Tornando da un articolo lungo (anche dal pulsante in fondo o col tasto Indietro), ritorno alla scheda originale con posizione in viewport conservata, anziché a una data lontana.
- Persistenza della posizione anche per le edizioni precedenti e per i risultati di ricerca.
- Verifica esplicita del salvataggio della lingua in `localStorage['og-language']`.

**English — Just the news and precise return navigation**

- Removed the redundant introductory banner, information band and top strapline; news follows the four-desk navigation.
- Shorter masthead and less space above the daily briefing.
- Both bottom return and browser Back restore the original news card and viewport position after a long article.
- Previous-edition and search-result navigation preserve their originating positions.
- Explicit test coverage for persisted language in `localStorage['og-language']`.

## [0.0.3] — 2026-10-25

**Italiano — Le notizie al centro**

- Inizio della rassegna più compatto; eliminato il manifesto e avvicinate le notizie.
- Selezione IT/EN tramite menu accessibile e scrollbar sottili coordinate al tema.
- Cache IndexedDB unificata tra anteprima della rassegna, lettura completa e ricerca: l'edizione prelevata include già gli articoli integrali.
- Comandi di condivisione, copia link, Markdown integrale e ascolto raccolti nel pannello laterale sticky su desktop e nella barra mobile.
- «Ascolta solo la notizia» nella sezione centrale; rimossi i comandi ripetitivi dalle altre sezioni.
- Feedback «Copiato» ripristinato automaticamente dopo 2,5 secondi.
- Indicatore d'impatto a cinque tacche con mezze unità e spiegazione per rubrica.

**English — Put the news first**

- Compact newspaper desk heading in place of the oversized promotional hero.
- Accessible Italian/English dropdown and theme-aware thin scrollbars.
- Shared IndexedDB cache across cover editions, full-article reading and archive search, with complete article data prefetched.
- Consolidated sharing, copy permalink, Markdown and full playback actions in a sticky desktop panel or compact mobile controls.
- Only “Listen to story only” inside the body; removed redundant per-section controls.
- Copy feedback automatically resets after 2.5 seconds.
- New five-step impact meter supporting half increments and transparent criteria.

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

