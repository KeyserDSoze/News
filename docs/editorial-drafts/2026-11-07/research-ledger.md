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

## Conclusione della lavorazione

Questo registro contiene l'**iter della ricerca preliminare** (le sette piste iniziali qui sopra non rappresentano l'intero giornale). La lavorazione successiva del 7 novembre ha ampliato le fonti e redatto **25 articoli unici, completi in IT/EN**, nelle quote **10 Mondo, 5 Italia, 5 Tecnologia, 5 Scienza**. Alcune piste iniziali con fonti non sufficienti non sono entrate nell'edizione; sono state sostituite con altri sviluppi documentati, senza riempitivi automatici.

**File dell'edizione:** otto JSON sotto `news/2026-11-07/`; 25 illustrazioni originali SVG sotto `news/2026-11-07/assets/`, crediti e licenza CC0-1.0 indicati in JSON e metadati SVG. I 25 JSON sorgente bilingui nell'area `docs/editorial-drafts/2026-11-07/articles/` sono materiale di lavorazione, non l'archivio letto dalla app.

**Cronologia:** ogni articolo distingue l'accadimento dalla pubblicazione. Le due Q&A per articolo/lingua sono specifiche e spiegano fatti/metodi ed effetti/limiti, per un totale di 100 Q&A localizzate. Le descrizioni originali da due editori distinti non vanno confuse con i comunicati ufficiali o con mere riscritture da agenzia.

**Controllo tecnico:** `Validate pull requests` run GitHub `42367365136` sul commit degli otto JSON ha dato esito verde: controllo Q&A del repository, validazione dei contenuti, `npm run build` e **102 Playwright passati**. Gli aggiornamenti soltanto documentali di questo audit richiedono comunque verifica del workflow sul nuovo commit HEAD. La struttura reale ha otto file e 25 SVG, quindi la precedente nota di ricerca '0/25' non è più attuale.

Per la valutazione dettagliata dei singoli controlli, dei limiti dei report indipendenti e delle incongruenze attribuite, leggere `docs/editorial-drafts/2026-11-07/qa-and-source-audit.md`. **La compilazione CI non equivale a deploy**: segnare una pubblicazione solo dopo un merge consentito e la verifica di GitHub Pages e `https://onews.app/`.
