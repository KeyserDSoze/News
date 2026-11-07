# O — Registro di ricerca 2026-11-07 (NON PUBBLICABILE)

Finestra primaria: **2026-11-06 07:00–2026-11-07 07:00 Europe/Rome**. Contesto: cinque giorni precedenti, soltanto per sviluppi documentati. Questo file non costituisce un'edizione.

## Controlli del repository
Consultati direttamente da main: README.md, docs/EDITORIAL_POLICY.md, docs/CONTRIBUTING.md, docs/EDITORIAL_QUESTIONS.md, src/frontend/src/types.ts, scripts/build-news.mjs, news/2026-10-31/it.json. Confrontato il registro di ricerca 2026-11-06: la serie di allarmi bomba sui voli europei è un **aggiornamento**, non un nuovo evento senza legami.

## Piste del 6 novembre, ancora da verificare con fonti indipendenti complete

1. **Europa / allarmi bomba su voli e media, 6 novembre** — AP (reportage originale, 6/11): https://apnews.com/article/31e26bfeb744b9ce8b81b73dbac6a4b8 ; AP (antefatto 5/11): https://apnews.com/article/6585ff565ee1ccb9f19b73074aa2fec4 ; Guardian (antefatto 3/11): https://www.theguardian.com/world/live/2026/nov/03/zelenskyy-berlin-merz-europe-sweden-spain-france-belgium-poland-latest-news . AP riferisce 11 minacce venerdì, 14 giovedì e 7 martedì; NON sommare come numero di voli distinti senza controllo. Nessun ordigno rinvenuto secondo autorità citate; origine non identificata. **Serve seconda redazione indipendente specifica del 6/11 e fonti primarie di polizia/aviazione.**

2. **Spagna / arrivi alle Canarie, 6 novembre** — Reuters (reportage, 6/11): https://www.reuters.com/world/migrant-surge-spains-canary-islands-is-unsustainable-authorities-say-2026-11-06/ . Reuters riporta 3.261 persone soccorse nei primi sei giorni di novembre e una vittima recuperata dopo soccorsi vicino a El Hierro. Attenzione a non confondere soccorsi e ingressi registrati, né andamento settimanale con quello annuo (inferiore rispetto al 2024). **Manca secondo editore indipendente e dato primario ufficiale.**

3. **Paesi Bassi / protesta al cantiere data center di Amsterdam, 6 novembre** — AP (reportage, 6/11): https://apnews.com/article/b4f3f9f368697bb37416bcb4fabdd67c . AP riferisce 150–200 fermati secondo polizia e protesta contro consumi idrici/energetici; distinguere numero approssimativo dei fermati, accuse e posizioni degli attivisti. **Manca seconda redazione indipendente e fonte primaria polizia.**

4. **Mercati / flussi verso fondi azionari, dati al 4 novembre pubblicati il 6** — Reuters (analisi di dati, 6/11): https://www.reuters.com/world/china/global-markets-flows-graphic-2026-11-06/ . 38,63 miliardi USD di flussi netti globali secondo dati citati da Reuters, non rendimento dei mercati. **Manca fonte primaria del dataset e seconda analisi autonoma.**

5. **Mercati / calo titoli tecnologia e aspettative tassi, 6 novembre** — Reuters (analisi, 6/11): https://www.reuters.com/business/retail-consumer/trader-angst-pivots-inflation-growth-tech-rout-deepens-2026-11-06/ . Interpretazioni degli analisti, non cause provate del ribasso; non duplicare la pista del 5/11 già registrata il 6/11 senza aggiornamento misurabile. **Mancano fonti indipendenti e dati primari di mercato.**

6. **Scienza / morbillo USA, aggiornamento 6 novembre** — pista da confermare tramite bollettino CDC del 6/11 e almeno due reportage indipendenti; nessun numero pubblicabile senza lettura della serie primaria e definizione di casi confermati.

7. **Scienza spaziale / prime immagini ravvicinate Hera degli asteroidi Didymos-Dimorphos, 6 novembre** — pista da verificare sul comunicato ESA datato e su due redazioni scientifiche indipendenti; evitare di confondere acquisizione delle immagini con pubblicazione.

## Avanzamento della ricerca (sessione successiva nello stesso 7 novembre)

La ricerca è stata estesa ad altre fonti e settori. Sono state salvate in `docs/editorial-drafts/2026-11-07/articles/` sei bozze complete IT/EN, ciascuna con due Q&A specifiche per lingua, quattro paragrafi per lingua, facts, perspectives e unknowns:

- Mondo: occupazione USA di ottobre, dati BLS pubblicati 6/11, verifiche Reuters e AP.
- Italia: fermo area a caldo dell'ex Ilva comunicato 6/11 (ANSA e Sky TG24, RaiNews su evento 3/11); rinuncia Altieri ad ANAC il 6/11 (la Repubblica e ANSA).
- Tecnologia: cause di Google, Meta e TikTok contro legge californiana AB 1709, ricorsi riferiti il 5/11 (Reuters e AP più testo primario della legge).
- Scienza: due lavori Nature sul glioblastoma usciti il 4/11, ripresi da ANSA il 6/11; immagini ravvicinate Hera diffuse il 5/11 da ESA. **Per entrambi manca ancora prova di due editori sostanzialmente indipendenti.** Per Hera va chiarito anche il conflitto ESA tra 60 e 600 km.

Sono stati creati in `docs/editorial-drafts/2026-11-07/assets/` sei SVG illustrativi originali, marcati come non fotografici, con licenza dichiarata CC0 1.0, credito/provenienza/alt bilingue registrati in ciascun JSON di bozza. Nessun asset è stato distribuito sotto `news/`.

### Controllo Q&A

Le funzioni originali `questionQualityIssues` e `normalizedEditorialText` di `scripts/editorial-questions.mjs` sono state eseguite sui sei JSON di bozza recuperati da GitHub: **24 Q&A locali (12 IT e 12 EN), 0 violazioni automatiche**. Controllate inoltre la presenza di almeno quattro paragrafi, tre tag per lingua e l'assenza di domande identiche nella selezione. La verifica semantica iniziale non equivale ad approvazione finale di tutti i contenuti. Audit completo: `docs/editorial-drafts/2026-11-07/qa-and-source-audit.md`.

## Decisione editoriale attuale

**6/25 bozze bilingui, di cui 4 con due editori indipendenti individuati, 2 ancora prive del necessario riscontro indipendente; 0/25 articoli completamente approvati come edizione.** Restano 19 articoli da produrre, fonti/controlli mancanti e validazione definitiva. **0/8 JSON in `news/2026-11-07/`.** `npm run test:content`, `npm run build` e Playwright su una edizione di 25 articoli non sono stati eseguiti; esiti CI per la PR da verificare. **Vietato merge o deploy** del materiale incompleto. Non dichiarare pubblicazione live senza conferma esterna.
