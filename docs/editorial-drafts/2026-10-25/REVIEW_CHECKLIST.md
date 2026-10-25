# O — 25 ottobre 2026 · Registro di verifica e blocco pubblicazione

> **STATO: BOZZA / DRAFT — NON FONDERE / DO NOT MERGE.** Questo branch contiene un dossier IT/EN di **15** candidati Mondo (10) e Italia (5), più due dossier IT/EN di **5** candidati Tecnologia e **5** Scienza. Totale: **25 testi candidati**, non 25 articoli certificati o pubblicabili. **Nessun file di edizione `news/2026-10-25/...json` è stato creato; nulla è stato pubblicato sul sito.**

## Perimetro editoriale
- Edizione: **2026-10-25**.
- Finestra esatta 24 ore: **[2026-10-24T06:00:00Z, 2026-10-25T06:00:00Z)**, cioè dalle **08:00 CEST del 24 ottobre** alle **07:00 CET del 25 ottobre** (cambio di ora legale).
- Distinguere ogni **evento** e ogni **aggiornamento sostanziale nuovo** dalla mera ripubblicazione del giorno seguente o dalla copertura tardiva.
- Mai inventare numeri, fatti, URL, date, image credit, licenze e due editori indipendenti.
- Non considerare due riprese di un comunicato come giornalismo indipendente. Verificare anche la proprietà comune degli editori.
- Articoli di notizie precedenti non vanno replicati per riempire una quota.

## Bozze da revisionare
| Rubrica | Bozze IT/EN | Pronte per la pubblicazione |
|---|---:|---:|
| Mondo | 10 | **non accertato** |
| Italia | 5 | **non accertato** |
| Tecnologia | 5 | **non accertato** |
| Scienza | 5 | **non accertato** |
| **Totale** | **25** | **0 approvate** |

Le bozze Mondo e Italia provengono da un dossier redatto in precedenza e **richiedono il controllo completo di date, eventi, cifre, fonti, duplicati e autorialità**. Il dossier riproduce lo stato editoriale anteriore a questo branch; eventuali affermazioni che non siano state create branch o PR sono riferite allo snapshot storico, non allo stato attuale.

### Tecnologia — controlli obbligatori
1. **GMO / richiesta difesa cibernetica attiva in Giappone:** controllare cronologia della richiesta del **24 ottobre**, importo di 5.000 yen, 26.739 server potenzialmente esposti, esito non noto; confronto TBS News, FNN e ITmedia.
2. **Google / personalizzazione con servizi collegati:** policy **in vigore dal 16 ottobre**, dunque fuori finestra; la copertura successiva potrebbe non rappresentare nuovo fatto sostanziale. Non affermare che Google venda le email agli inserzionisti.
3. **Dessa / modello vocale Block:** presentazione il **23 ottobre**, fuori finestra; eventuali nuovi test e analisi del 24 sono cronaca di seconda giornata, non nuovo rilascio del prodotto.
4. **ASUS / router:** bollettini e patch risalgono al **20–23 ottobre**, fuori finestra; evitare di far passare il 24 come data di scoperta o correzione.
5. **BlackX / bootkit:** ricerca originaria Kaspersky del **21–22 ottobre**, fuori finestra; allo stato è riportata **una sola testata giornalistica indipendente** per l'analisi del 24, pertanto **non soddisfa il requisito di due**.

**Decisione necessaria:** sostituire i candidati non databili nella finestra con veri eventi documentati nella stessa finestra oppure segnalare esplicitamente che la rubrica non è completa. Non approvare cinque articoli basati soltanto sulla pubblicazione di approfondimenti di fatti vecchi.

### Scienza — controlli obbligatori
1. **DeLLphi-305 (SCLC):** dati presentati il **24 ottobre**; verificare studio primario NEJM, Reuters e OncLive, valori di sopravvivenza e tossicità.
2. **VOLGA (tumore della vescica):** dati presentati il **24 ottobre**; confrontare il paper primario, La Repubblica e Urology Times; attenzione ai bracci dello studio e agli endpoint.
3. **DASL-HiCaP (prostata):** dati ESMO del **24 ottobre**; **seconda testata giornalistica indipendente non accertata** (OncoDaily + Bayer e Cancer Trials Ireland non bastano se manca seconda redazione). La sopravvivenza globale non è dimostrata migliore.
4. **PROTEUS (prostata):** dati ESMO del **24 ottobre**; CancerNetwork e Urology Times potrebbero condividere gruppo editore; **indipendenza editoriale da verificare**. Evitare equivalenza fra event-free survival e overall survival.
5. **TANGENT (TGCT raro):** dati ESMO del **24 ottobre**; **seconda testata giornalistica indipendente assente** nel dossier, studio storico di progettazione non verifica i risultati recenti.

**Decisione necessaria:** acquisire secondo giornalismo indipendente su studi 3–5 oppure rimpiazzarli. Verificare anche la concentrazione monotematica (cinque trial oncologici): la varietà è criterio editoriale.

## Criteri per trasformare i dossier in edizione pubblicabile
- [ ] Per ciascuna delle **25** storie, prova di un fatto/aggiornamento nuovo nella finestra di 24h.
- [ ] Almeno **due editori giornalistici indipendenti realmente consultati** per ciascuna storia (preferibilmente tre) + primarie quando esistono.
- [ ] URL reali funzionanti, titolo e data/ora di ogni fonte, ruolo e verifica puntuale di numeri e citazioni.
- [ ] Verifica dei duplicati rispetto a tutte le rubriche del 24 ottobre (e archivio precedente); `threadId` e `related` motivati.
- [ ] Identità di ogni `Article` IT/EN: `id`, `rank`, `impact`, relazioni, 3 tag localizzati e quattro paragrafi sostanziosi ciascuno.
- [ ] Immagini editoriali pertinenti, crediti e licenze verificati; asset salvati in Git e URL di provenienza validi. Il precedente pacchetto locale di 15 SVG non è integrato in questo branch.
- [ ] Creare otto JSON (`news/2026-10-25/{it,en}.json` e `news/2026-10-25/{italy,technology,science}/{it,en}.json`) conformi allo schema effettivo `src/frontend/src/types.ts`, senza alterarlo.
- [ ] Controllo incrociato numeri/data con revisore umano.
- [ ] Eseguire realmente `npm install`, `npm run test:content`, `npm run build`, `npx playwright install chromium`, `npm run test:e2e`; dichiarare i risultati.
- [ ] Solo dopo approvazione umana, **merge** del branch idoneo su `main`, controllo GitHub Actions e sito https://onews.app/.

## Archivi
- `DOSSIER_IT_EN.md` — 15 bozze Mondo/Italia, snapshot iniziale.
- `TECHNOLOGY_IT_EN.md` — 5 ulteriori bozze, con avvertenze sulle date e indipendenza.
- `SCIENCE_IT_EN.md` — 5 ulteriori bozze, con avvertenze sulle fonti e diversità dei temi.

**Questo documento è una barriera editoriale, non una dichiarazione di verifica completata.** Tenere la Pull Request in modalità **draft** fino all'effettivo superamento dei controlli.
