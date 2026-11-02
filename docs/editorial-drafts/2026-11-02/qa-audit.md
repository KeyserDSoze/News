# Audit parziale Q&A — 2 novembre 2026 · NON AUTORIZZA LA PUBBLICAZIONE

**Ambito:** cinque bozze bilingui in questa cartella (3 Mondo, 1 Italia, 1 Tecnologia). Dieci versioni linguistiche, **20 domande con risposta** complessive (due IT e due EN per articolo). Ogni testo contiene quattro paragrafi numerati per lingua, due `unknowns`, `facts`, `perspectives`, motivazione dell'impatto e tre tag.

## Controllo tecnico realmente eseguito

Recuperato via GitHub `main/scripts/editorial-questions.mjs` e **eseguite le sue funzioni originali** `questionQualityIssues` e `normalizedEditorialText` in runtime JavaScript su domande, risposte e incognite estratte dai cinque Markdown. Controllati anche duplicati di domande normalizzate fra bozze della stessa lingua, presenza di quattro paragrafi per lingua e numero di Q&A.

| Bozza | IT Q&A | EN Q&A | `questionQualityIssues` | Duplicati nell'insieme | Body |
|---|---:|---:|---|---|---|
| Bulgaria | 2 | 2 | nessuna segnalazione | nessuno | 4 IT / 4 EN |
| MINURSO | 2 | 2 | nessuna segnalazione | nessuno | 4 IT / 4 EN |
| OPEC+ | 2 | 2 | nessuna segnalazione | nessuno | 4 IT / 4 EN |
| Binance | 2 | 2 | nessuna segnalazione | nessuno | 4 IT / 4 EN |
| Magistrati | 2 | 2 | nessuna segnalazione | nessuno | 4 IT / 4 EN |

**Audit semantico redazionale:** Bulgaria: la prima domanda confronta exit poll e conteggio CEC, la seconda spiega competenze della presidenza e peso della maggioranza. MINURSO: liquidazione amministrativa vs ritiro fisico; cessazione mandato vs status territoriale. OPEC+: target formale vs volumi effettivi; decisione dei sette vs quadro quote 2027. Binance: reintegro finanziario vs recupero forense; ruolo di DeFi e indirizzi nell'allerta FBI. Magistrati: media ponderata e sua conseguenza sull'indice; distinzione tra arretrati e adeguamenti futuri. Ogni risposta è autonoma e le coppie IT/EN sono congruenti. Nessuna domanda prefabbricata o strawman sensazionalistico individuato.

**Limite cruciale:** il controllo è stato applicato ai **Markdown di lavoro**, non agli otto JSON che non esistono. Non equivale a `npm run test:content`, `npm run build`, Playwright, CI, verifica integrale di tutte le fonti o approvazione di 25 articoli. Il controllo automatico non prova correttezza semantica: per esempio, in Bulgaria il timestamp mostrato da Reuters è contraddittorio; in Italia manca il testo primario del DDL 2027; OPEC+ è parzialmente dietro paywall; per Binance l'articolo Guardian include materiale d'agenzia; il testo primario ONU completo non era accessibile. Queste lacune **impediscono la pubblicazione**.

**Decisione:** conservare le bozze e la ricerca in PR draft, **non creare una falsa edizione**, non unire in `main`, non annunciare un deploy del 2 novembre.
