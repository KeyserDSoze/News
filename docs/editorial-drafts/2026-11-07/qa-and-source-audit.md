# O — Audit intermedio Q&A e fonti · 7 novembre 2026

**Stato: bozze non pubblicabili; nessuna edizione creata.** Finestra principale 6 novembre 07:00–7 novembre 07:00 Europe/Rome, con precedenti cinque giorni soltanto per aggiornamenti verificati.

## Materiale nel branch

Sei bozze bilingui JSON in `docs/editorial-drafts/2026-11-07/articles/`, in ordine editoriale provvisorio:
- **Mondo 1/10:** `us-october-2026-jobs-bls.json` — BLS + Reuters + AP (giorno di evento: statistiche relative a ottobre; pubblicazione 6/11).
- **Italia 2/5:** `taranto-ex-ilva-hot-area-shutdown.json` — ANSA + Sky TG24 + RaiNews (cronologia spegnimento 3–6/11); `altieri-withdraws-anac-nomination.json` — la Repubblica + ANSA, Sky TG24 per cronologia (ritiro 6/11).
- **Tecnologia 1/5:** `california-ab1709-platform-lawsuits.json` — Reuters + AP + California legislative records (ricorsi riferiti il 5/11, firma della legge 10/9).
- **Scienza 2/5:** `glioblastoma-cell-plasticity-nature.json` — Nature primarie (4/11) + ANSA (6/11) + comunicazioni degli istituti autori; `hera-didymos-closeup-nov5.json` — ESA/ASI (5/11) + Space.com/EarthSky (5–6/11, soprattutto da materiale ESA).

**Attenzione all'indipendenza:** i primi quattro fascicoli hanno due redazioni distinte individuate; i due fascicoli scientifici **non soddisfano ancora l'indipendenza sostanziale** di almeno due reportage originali separati dagli autori o dai comunicati. Gli articoli scientifici restano bozze anche per questa ragione. Il fascicolo Hera riporta inoltre il conflitto nei materiali ESA fra distanza di ripresa di 60 e 600 km. Non scegliere arbitrariamente un numero.

## Q&A — controllo tecnico eseguito

Sono stati letti i file del branch via collegamento GitHub autorizzato; il codice di `scripts/editorial-questions.mjs` è stato caricato direttamente da `main` e le funzioni `questionQualityIssues` e `normalizedEditorialText` sono state effettivamente eseguite in un ambiente JavaScript temporaneo, sui sei JSON di bozza:
- 6/6 bozze contengono **4 paragrafi** in entrambe le lingue.
- **2 Q&A per lingua per bozza**, dunque **24 coppie domanda-risposta complessive**, 12 domande concettuali in IT e 12 equivalenti in EN.
- **0** segnalazioni di formula generica, risposta breve, duplicazione testuale della sezione `unknowns`, o domanda ripetuta nella stessa edizione tra questi sei articoli.
- Controllati anche numero di domande per locale e tre tag per lingua; nessun errore emerso.
- Verifica di pertinenza redazionale effettuata su ciascuna bozza, ma **non è un'approvazione semantica finale**: richiede ancora revisione alla luce di testi integrali delle fonti, in particolare per gli studi Nature e Hera.

**Questo non è** `npm run test:content`, né `npm run build`, né Playwright, né una validazione del formato `news/YYYY-MM-DD/` di 25 articoli.

## Media

Sei SVG **originali e illustrativi** in `docs/editorial-drafts/2026-11-07/assets/`, uno per bozza. Autore/owner dichiarato: **O / Oggettivizzatore, grafica vettoriale originale assistita da AI, 7/11/2026**. Licenza di rilascio dichiarata **CC0 1.0** (https://creativecommons.org/publicdomain/zero/1.0/). Ogni SVG include metadati di credito e dichiarazione di *illustrazione*, non immagine documentaria; `draftImage` in ciascun JSON contiene il percorso del file, URL di provenienza GitHub, credito, licenza e alt IT/EN. **Non** descrivere la produzione di queste illustrazioni come fotografie delle notizie.

## Esito editoriale e tecnico

- Obiettivo giornaliero: **25** articoli con due versioni; **6 bozze redatte**, di cui **4** con almeno due fonti indipendenti individuate, **2** con lacune di indipendenza sostanziale, **19** bozze ancora assenti. **Nessuna** delle 6 è approvata per una pubblicazione solitaria.
- File finali sotto `news/2026-11-07`: **0/8 JSON**, **0 asset distribuiti**. Tutti gli SVG restano nel percorso bozza.
- Test editoriali sul giornale compilato: **non eseguiti**. `npm run test:content`, build, Playwright: **non eseguiti**. Esiti CI da verificare sul commit finale, se presenti.
- **Nessun merge su main, nessun deploy dichiarato**. Il controllo di pubblicazione live su https://onews.app/ non ha restituito una prova utilizzabile.
- PR #18 resta **draft**, branch `editorial/research-2026-11-07`. La regola fail-closed impedisce la pubblicazione senza 25 pezzi completi e verificati e senza test.

## Controlli di duplicazione e cronologia

Consultati `news/2026-10-31/it.json`, il registro della ricerca 6/11 e la ricerca già salvata del 7/11. Gli allarmi bomba sui voli europei si collegano a episodi 3–5/11, e non sono trattati come sette notizie nuove; Hera è sviluppo delle immagini di missione, non nuova prova dell'impatto DART del 2022. I dati sul lavoro americano riguardano ottobre e sono diffusi il 6 novembre, non rappresentano posti creati il 6 novembre. La vicenda AB1709 è un aggiornamento giudiziario della legge promulgata a settembre.
