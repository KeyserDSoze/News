# O — Audit conclusivo della redazione, edizione 7 novembre 2026

## Perimetro e criteri
Finestra principale **6 novembre ore 07:00 – 7 novembre ore 07:00 Europe/Rome**, con sviluppi dei cinque giorni precedenti solo se documentati e chiaramente datati; la pubblicazione degli articoli e la data dell'evento sono distinti. Consultati README, docs/EDITORIAL_POLICY.md, docs/CONTRIBUTING.md, **docs/EDITORIAL_QUESTIONS.md**, src/frontend/src/types.ts, scripts/build-news.mjs, scripts/editorial-questions.mjs, news/2026-10-31/it.json e archivi del 28 e 30 ottobre. Confrontati anche i registri editoriali precedenti e i contenuti della PR.

## Composizione
**25 articoli unici**, ognuno nelle versioni complete italiana e inglese, in otto file:
- Mondo: 10, `news/2026-11-07/{it,en}.json`
- Italia: 5, `news/2026-11-07/italy/{it,en}.json`
- Tecnologia: 5, `news/2026-11-07/technology/{it,en}.json`
- Scienza: 5, `news/2026-11-07/science/{it,en}.json`

I **50 testi localizzati** comprendono **200 paragrafi** di `body`, cioè quattro per articolo e lingua, con `title`, `dek`, `summary` autonomo, `facts`, `perspectives`, `unknowns`, esattamente tre tag per lingua, `impact` in mezze unità e `impactReason` tradotto; ID e rank allineati. Non sono stati inseriti `threadId` o `related` non documentati.

Le **25 illustrazioni SVG** sono in `news/2026-11-07/assets/`. Sono originali, vettoriali, con metadata CC0-1.0, credito di O / Oggettivizzatore, `sourceUrl` HTTPS, alt bilingue e indicazione che non sono fotografie o grafici scientifici effettivi. La compilazione richiede l'esistenza del file asset e l'ha confermata.

## Q&A — verifica tecnica e semantica
**2 coppie domanda/risposta specifiche per lingua per articolo = 100 coppie localizzate**, 50 in italiano e 50 in inglese. Si è usata la funzione originale `questionQualityIssues` del repository per tutte le Q&A e `normalizedEditorialText` per intercettare ripetizioni nella stessa edizione. **Nessuna violazione** di domanda generica, risposta troppo breve, copia esatta di `unknowns` o domanda ripetuta è risultata. Le Q&A specificano metodi, numeri, attori, limiti ed effetti del caso (es.: BLS indagine imprese/famiglie; campione di tre persone nella chemogenetica; METR benchmark vs effetti causali). La lettura semantica ha confrontato IT ed EN: non equivalgono a domande sulla redazione o a strawman negativi.

## Provenienza e cronologie
Ogni scheda contiene almeno due redazioni differenti insieme a fonti primarie quando disponibili; i comunicati di organizzazioni coinvolte non sono conteggiati come editori indipendenti. Per la ricerca Nature sul glioblastoma, i due paper restano **fonti primarie** e le redazioni ANSA e Tom's Hardware sono trattate distintamente; per Hera, ESA/ASI restano **primarie** mentre Space.com e Ciel & Espace sono redazioni diverse. La discrepanza sul metadato della distanza Hera (60/600 km) è esplicitamente dichiarata in `body`, `facts` e `unknowns`. Il provvedimento FinCEN è attribuito all'autorità e non trattato come una condanna; le stime e i dati parziali restano qualificati. I bollettini dell'occupazione USA e del morbillo sono datati 6 novembre ma misurano periodi più lunghi, non eventi occorsi tutti quel giorno.

## Verifiche effettuate
Il workflow GitHub **Validate pull requests**, run `42367365136`, ha eseguito effettivamente sul codice dell'edizione:
- `node --test tests/daily-publisher.test.mjs` — **5 test superati**
- `node --test tests/editorial-questions.test.mjs` — **3 test superati**
- `node scripts/build-news.mjs --check` — **superato** (235 articoli unici dell'archivio complessivo, 10 edizioni Mondo)
- `npm run build` — **superato**; frontend TypeScript/Vite, indice e PWA compilati
- `npx playwright install --with-deps chromium` — completato
- Browser tests Playwright — **102 test superati**.

Questi sono esiti tecnici della PR; non sostituiscono il giudizio sulla verità di ogni notizia o il controllo del deploy live. Prima del merge verificare ancora lo stato CI sul **commit HEAD finale**, eventuali permessi GitHub, e al termine il deploy del workflow Pages. L'autorizzazione editoriale consente il merge solo con tutte le condizioni rispettate; non presentare come pubblicato finché il merge e il sito non sono verificati.
