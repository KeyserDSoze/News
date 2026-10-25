# O — 25 ottobre 2026 · Registro finale di redazione

## Decisione editoriale

**Il responsabile del progetto ha approvato la pubblicazione dell'edizione il 25 ottobre 2026 e ha successivamente autorizzato l'inclusione di fatti importanti dei giorni precedenti**, purché non presentati falsamente come avvenuti il 24–25 ottobre. La vecchia finestra rigida di 24 ore non è più un requisito bloccante per questa edizione. È invece obbligatorio datare con precisione fatti e sviluppi, e non duplicare senza aggiornamenti notizie già nell'archivio.

## Edizione preparata e versionata nel branch

- Mondo: `news/2026-10-25/{it,en}.json` — **10 articoli IT/EN**.
- Italia: `news/2026-10-25/italy/{it,en}.json` — **5 articoli IT/EN**.
- Tecnologia: `news/2026-10-25/technology/{it,en}.json` — **5 articoli IT/EN**.
- Scienza: `news/2026-10-25/science/{it,en}.json` — **5 articoli IT/EN**.
- Immagini: `news/2026-10-25/assets/` — **25 illustrazioni editoriali SVG originali**; non sono fotografie né prove documentali degli eventi. Source URL punta al path che verrà reso pubblico dopo merge in `main`.

Totale: **25 articoli distinti / 50 localizzazioni** in 8 JSON con 25 asset originali. Ogni articolo contiene 4 paragrafi IT e EN, titolo/dek/summary, facts, perspectives, unknowns, questions, 3 tag e impatto a tacche da 0,5–5. ID, rank, categoria, impatto e relazioni sono allineati fra lingue.

## Correzioni rispetto alle bozze

- Il rapporto **BlackX** viene datato correttamente: ricerca originale 21–22 ottobre e spiegazioni giornalistiche 23–24 ottobre. Fonte di reporting aggiunta: The Hacker News (23 ottobre), oltre a BleepingComputer e Kaspersky (primaria).
- Per **ASUS** le patch sono dichiarate del 20–23 ottobre, non una nuova scoperta avvenuta il 24.
- **Google** distingue il cambiamento facoltativo della policy del 16 ottobre dalle analisi del 23–24; non afferma che i messaggi Gmail siano venduti agli inserzionisti.
- **Dessa** distingue l'annuncio del 23 ottobre dalle analisi del 24.
- Per **DASL-HiCaP** integrate ANSA e la Repubblica; la riduzione del rischio riguarda metastasi **o** morte, non prova una riduzione delle sole morti.
- **PROTEUS** e **TANGENT**, che non disponevano di sufficiente giornalismo indipendente, sono stati **sostituiti** da FOURLIGHT-1 (studio di fase II, OncLive + OncoDaily + Annals of Oncology) e primo caso umano di Shamonda (Reuters + AP + El País + ECDC + ministero francese). I nuovi eventi hanno date esplicite.
- Per Mondo corretti collegamenti AP inizialmente non verificati (Francia e Giordania), aggiunti riferimenti Euronews e AP effettivamente identificati. Le 5 notizie Italia riprendono aggiornamenti o fatti nuovi rispetto al giorno prima.

## Validazioni tecniche

- [x] Controllo di struttura JSON: **25 articoli**, 8 file, 4 paragrafi per localizzazione, ≥2 link sorgenti per articolo, 3 tag, impatti numerici, Q&A e immagini con path in Git.
- [x] Allineamento `id`, `rank`, `impact`, `category`, `related` per le coppie linguistiche verificato direttamente sui JSON salvati nel branch.
- [x] CI PR: step `npm install`, controllo dati `node scripts/build-news.mjs --check` e `npm run build` completati con successo durante il run GitHub Actions 40185333737.
- [x] Esito completo Playwright e GitHub CI: **successo** nei run GitHub Actions 40185664058 e 40185765257 dopo adeguamento dei test all'edizione 25 ottobre; contenuti, build e browser test superati.
- [ ] Merge su `main`, deploy Pages e verifica pubblica `https://onews.app/`: da confermare dopo l'operazione.

## Limiti residuali e principio delle fonti

La validazione dello schema prova la correttezza tecnica, **non** la verità di ogni frase. Una fonte istituzionale non conta automaticamente come seconda redazione giornalistica; due siti che riprendono un identico comunicato potrebbero non essere reportage indipendenti. I titoli delle fonti redatti dai permalink devono essere confrontati con gli headline originali nel lavoro di manutenzione editoriale. I documenti di bozza originari indicano limiti della loro versione iniziale, non dello stato dei JSON finali.

## Dopo il merge

Confermare il successo della pipeline `.github/workflows/pages.yml`, la presenza di `news/2026-10-25/it.json` sul sito e la navigazione delle quattro sezioni. In caso di correzioni, nuovi commit trasparenti, non riscrittura silenziosa della cronologia Git.
