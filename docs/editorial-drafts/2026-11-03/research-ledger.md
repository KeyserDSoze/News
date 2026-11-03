# O — Registro di ricerca · edizione potenziale 2026-11-03 · BLOCCATA

**Finestra primaria:** 2026-11-02 07:00 CET → 2026-11-03 07:00 CET. **Contesto:** 2026-10-29 → 2026-11-03. **Non pubblicare da questo branch.** Questo documento è un audit della ricerca, non un'edizione pronta. I collegamenti sono HTTPS originali quando disponibili. La data di pubblicazione non va scambiata con la data del fatto.

## Istruzioni e archivio consultati

Letti sul branch `main`: `README.md`, `docs/EDITORIAL_POLICY.md`, `docs/CONTRIBUTING.md`, **`docs/EDITORIAL_QUESTIONS.md`**, `src/frontend/src/types.ts`, `scripts/build-news.mjs` e l'edizione `news/2026-10-31/it.json`. Consultati titoli/ID per tutte e quattro le sezioni nelle edizioni del 24, 28, 30 e 31 ottobre; non esiste `news/2026-11-01/it.json` o `news/2026-11-02/it.json` su `main` al controllo. La PR #12 (1 novembre) e la PR #13 (2 novembre) sono ancora **draft non unite**. I loro contenuti non sono archivio pubblicato. Duplicati rilevanti: `gmo-onamae-customer-data-update-oct27` (28 ottobre), `oleshky-humanitarian-ceasefire` (24 ottobre), `oleshky-demining-humanitarian-oct29` (30 ottobre), `world-us-early-vote-oct30` (31 ottobre), `italy-inflation-oct30` (31 ottobre). Non usare senza una novità del 2 novembre.

## Conteggio reale

| Sezione | Bozze IT/EN complete in Markdown | Articoli con asset e JSON finali | Quota |
| --- | ---: | ---: | ---: |
| Mondo | 2 | 0 | 10 |
| Italia | 1 | 0 | 5 |
| Tecnologia | 0 | 0 | 5 |
| Scienza | 0 | 0 | 5 |
| **Totale** | **3** | **0** | **25** |

**Quattro Q&A per bozza bilingue**, cioè 2 domande italiane + 2 inglesi per articolo, **12 domande con risposta** in totale. Verifica semantica manuale dei due testi; non è stato eseguito il test automatico sul JSON di edizione, perché non esiste. Immagini non acquisite. **Nessun merge, deploy o validazione di edizione.**

## Mondo — piste e stato

1. **Komyshuvakha, 2 novembre: bombe su scuola/punto aiuti e rifugio, 26 morti secondo i soccorsi ucraini.** **BOZZA IT/EN REDATTA**, nel file `world-komyshuvakha-bilingual.md`. Reuters 2/11: https://www.reuters.com/world/ukraines-zelenskiy-russian-bombing-kills-18-southeastern-zaporizhzhia-region-2026-11-02/ ; AP 2/11: https://apnews.com/article/717372f7bbf4e8a805bc918f06f9730f . Il vecchio 18 nel percorso Reuters non è il bilancio finale; distinguere 18/24/26 e i dispersi. Guardian è in larga parte agenzie, non terza conferma indipendente: https://www.theguardian.com/world/2026/nov/03/russia-bombs-ukrainian-aid-centre-komyshuvakha . **Non sovrapporre a Oleshky** (Kherson) né presentare intenzionalità come accertata.

2. **Belgio, 2 novembre: Bart De Wever offre le dimissioni dopo fallimento negoziato di bilancio; re non ha ancora accettato. BOZZA IT/EN REDATTA** in `world-belgium-budget-bilingual.md`. Reuters 2/11: https://www.reuters.com/business/belgian-government-crisis-looms-budget-talks-collapse-de-tijd-reports-2026-11-02/ ; AP 2/11: https://apnews.com/article/d6e28f97ddcf13c3b358201c4d45cf7e . **Doppia redazione confrontata e bozza bilingue preparata; fonte primaria Palazzo reale ancora da acquisire.** Non dire governo già dimesso.

3. **Iran/USA, 2 novembre: colloqui indiretti a Doha terminati senza svolta; contatti proseguono.** Reuters 2/11: https://www.reuters.com/world/middle-east/iranians-have-left-doha-talks-draft-proposal-us-deal-being-circulated-official-2026-11-02/ . È un **aggiornamento** della trattativa del 1/11 (https://www.reuters.com/world/middle-east/iranian-negotiators-doha-continue-talks-end-us-iran-war-official-says-2026-11-01/). **Manca secondo reportage indipendente sullo specifico aggiornamento**, non pubblicare.

4. **Isola di Qeshm, notte 2–3 novembre: riferiti attacchi USA, Washington li definisce difensivi secondo Reuters.** Reuters 3/11: https://www.reuters.com/world/middle-east/us-struck-irans-qeshm-island-wall-street-journal-reports-2026-11-03/ ; Guardian 3/11: https://www.theguardian.com/world/2026/nov/03/us-strikes-irans-qeshm-island . **Non verificata conferma primaria CENTCOM**; media iraniani parlano di esplosioni con cause non chiare. Evitare qualificazioni definitive e ricostruire dipendenze dal Wall Street Journal.

5. **Abu Dhabi, 2 novembre: Witkoff annuncia colloqui trilaterali USA–Ucraina–Russia per 10–11 novembre.** Reuters 2/11: https://www.reuters.com/world/europe/us-hold-trilateral-talks-with-ukraine-russia-abu-dhabi-next-week-us-official-2026-11-02/ ; AP menziona l'annuncio nel reportage sul bombardamento: https://apnews.com/article/717372f7bbf4e8a805bc918f06f9730f . **Solo appuntamento previsto**, non trattativa già avvenuta o accordo.

6. **Venezuela, 2 novembre: Rubio incontra Oliver Blanco per preparativi elettorali.** AP 2/11: https://apnews.com/article/bc2edbe9c9257e82c821ccdc89035936 ; Reuters 2/11 (pubblicato sul sito di Internazionale il 3/11): https://www.internazionale.it/ultime-notizie-reuters/2026/11/03/rubio-speaks-to-venezuelan-minister-about-reforms-that-lay-groundwork-for-elections . **Seconda redazione reperita; fonte primaria Dipartimento di Stato da acquisire**, non confondere preparativi con data elettorale confermata.

7. **USA, 2 novembre: ultime ore della campagna midterm.** Reuters: https://www.reuters.com/world/us/republicans-democrats-set-midterm-closing-arguments-michigan-endorsement-roils-2026-11-02/ ; AP su mercati: https://apnews.com/article/stocks-markets-ai-earnings-oil-iran-048328e49e47ce7afe6c1fb9d9acf13d . **AP citata non copre lo stesso fatto**, quindi manca secondo editore indipendente. Archivio già contiene il voto anticipato al 30/10: evitare riassunto duplicato.

8. **Commonwealth, 2 novembre: Antigua e Barbuda si prepara al vertice.** AP 2/11: https://apnews.com/article/commonwealth-meeting-antigua-royals-king-charles-4ad76f1cf2b591ce92c7835f094f97cd . **Un solo editore trovato, l'evento principale è successivo**, non pubblicare come avvenuto.

## Italia — piste e stato

1. **Immatricolazioni auto ottobre, dati diffusi il 2 novembre:** **BOZZA IT/EN REDATTA**, file `italy-car-registrations-bilingual.md`. Reuters: https://www.reuters.com/business/italy-new-car-registrations-up-48-year-on-year-october-2026-11-02/ ; ANSA: https://www.ansa.it/sito/notizie/economia/2026/11/02/mercato-dellauto-in-crescita-del-48-in-italia-a-ottobre-nei-dieci-mesi-83_126df56f-11d4-454c-99fc-b6f40d624449.html ; primaria UNRAE: https://unrae.it/sala-stampa/autovetture/7858/mercato-vetture-italia-ottobre-a-48-131921-ma-la-transizione-resta-ferma-ai-box ; Radiocor: https://www.borsaitaliana.it/borsa/notizie/radiocor/prima-pagina/dettaglio/auto-481-immatricolazioni-ottobre-832-da-inizio-anno-rco-nRC_02112026_1805_536142363.html . **Nota:** non fondere i diversi perimetri Stellantis/Leapmotor; BEV 6,1% UNRAE, PHEV 12,7%.

2. **PMI manifatturiero italiano, dato ottobre diffuso il 2 novembre:** 49,4 contro 50,4 settembre, sotto 50; Reuters (testo integrale ripubblicato, NON nuova fonte) https://live.euronext.com/en/financial-news/italian-manufacturing-sector-unexpectedly-contracts-october-pmi-shows ; ANSA 2/11 https://www.ansa.it/sito/notizie/economia/2026/11/02/lindice-pmi-manifatturiero-dellitalia-scende-a-494-a-ottobre_7c239212-bd55-4a45-be17-274def5e9064.html . **Prima di scrivere:** acquisire report originale S&P Global e confrontare definizione/periodo; un indice <50 è segnale di contrazione rispetto al mese precedente, non variazione percentuale della produzione.

3. **Carta Dedicata a Te, 2 novembre: annuncio di 500 euro per oltre un milione di famiglie dal 4 novembre.** ANSA: https://www.ansa.it/sito/notizie/economia/2026/11/02/lollobrigida-dal-4-novembre-500-euro-a-oltre-1-milione-di-famiglie_274f51fa-e7f2-40a6-8ef3-3a999c0339a9.html . **Annuncio ministeriale non equivale a pagamenti già effettuati; mancano decreto e seconda redazione.**

4. **Ecomondo, annuncio 2 novembre di apertura 3 novembre con 1.800 espositori.** ANSA: https://www.ansa.it/sito/notizie/economia/2026/11/02/domani-apre-ecomondo-a-rimini-1800-espositori-sulleconomia-circolare_358637cf-8c1a-40b5-aad2-edf5d0796c35.html . **Previsione evento, non inaugurazione verificata; fonte primaria organizzatore e secondo editore mancanti.**

## Tecnologia — piste e stato

1. **GMO Internet Group, 2 novembre: scuse e promessa di risarcimento dopo violazione Onamae.com Desktop Cloud.** AP 2/11: https://apnews.com/article/1a14fac1015f2bbca62a07358615af19 . **Aggiornamento distinto** dall'articolo O del 28/10 `gmo-onamae-customer-data-update-oct27`; **mancano secondo editore indipendente e comunicato originale per controllare 26mila casi, importi e periodo**.

2. **UK NCSC, rapporto e previsione di attacchi ransomware potenziati dall'IA entro 2028.** AP pubblicato 2/11 con discorso previsto martedì 3/11: https://abcnews.com/International/wireStory/uk-cyber-chief-uk-face-ai-cyberattacks-critical-137788396 ; Guardian 3/11: https://www.theguardian.com/technology/2026/nov/03/ai-powered-malware-artificial-intelligence-hacking-critical-uk-infrastructure . **Rischio stimato, non attacco già accaduto**; controllare orario pubblicazione originale del rapporto NCSC e confermare che fosse disponibile prima delle 07:00 CET.

3. **CrowdStrike/Dell/Nvidia, annuncio integrazione sicurezza IA 2 novembre.** Comunicato: https://www.businesswire.com/news/home/20261102048231/en/CrowdStrike-and-Dell-Technologies-Announce-Integrated-AI-Security-for-the-Dell-AI-Factory-with-NVIDIA . **Solo fonte aziendale**, nessuna verifica indipendente di efficacia: non pubblicare come fatto provato.

## Scienza — piste e stato

1. **GLOW, 2 novembre: Hubble e 37 galassie nane, ossigeno mancante rispetto ai modelli.** Fonte primaria NASA: https://science.nasa.gov/missions/hubble/nasas-hubble-uncovers-case-of-missing-oxygen-in-nearby-dwarf-galaxies/ . Studio indicato come pubblicato il 2 novembre su *The Astrophysical Journal*. **Mancano articolo scientifico completo e due editori indipendenti**. Espulsione per venti galattici è interpretazione sostenuta da modelli, non osservazione diretta dell'ossigeno fuori da tutte le galassie.

2. **Nature Chemical Biology, 2 novembre: inibitore selettivo TNKS2 per segnalazione WNT in cellule tumorali con perdita di 8p.** Indice originale: https://www.nature.com/subjects/cell-biology/nchembio . **Studio originale da acquisire, due editori indipendenti assenti**. Non descrivere come terapia clinica approvata.

3. **Nature Genetics, 2 novembre: atlante regolazione genetica da biobanca mediorientale.** Indice: https://www.nature.com/subjects/genomics/ng . **Originale da acquisire, editori indipendenti assenti**. Distinguere associazioni genetiche e effetti causali.

4. **Scientific Reports, 2 novembre: studio multicentrico sul controllo della miopia infantile con atropina 0,01% una o due volte al giorno.** Indice: https://www.nature.com/subjects/medical-research/srep . **Articolo e protocollo da leggere, nessun secondo editore**; non trasformare un trial in raccomandazione clinica.

5. **Scientific Reports, 2 novembre: approccio a equità nei modelli di malattie infettive.** Indice: https://www.nature.com/subjects/health-care/ctg . **Articolo da acquisire e controllare; non equiparare risultati di simulazione a benefici clinici dimostrati.**

6. **NASA APOD, 2 novembre: nube allungata di Arsia Mons su Marte.** https://science.nasa.gov/image-article/apod-2026-november-2-a-long-cloud-on-mars/ . **ESCLUSA come nuova scoperta**: immagine del 2018 e osservazioni precedenti; pubblicazione APOD del 2 novembre non è data di scoperta.

## Verifiche editoriali e tecniche

- **Fatti vs attribuzioni:** bilanci ucraini attribuiti, intenzionalità non accertata; dati auto misurati separati da previsioni UNRAE; previsioni di attacchi AI non confuse con incidenti.
- **Q&A IT/EN:** 2 coppie per articolo nelle tre bozze, contenuto specifico e semanticamente corrispondente; non contengono le formule vietate né duplicano `unknowns`. **Audit tecnico `scripts/editorial-questions.mjs` non eseguito sui JSON**; audit manuale non sostituisce il test.
- **Non creati:** otto JSON, immagini e relativi metadati di licenza, indice edizione.
- **Non eseguiti:** `npm run test:content`, `npm run build`, `npm run test:e2e` / Playwright su questa edizione; nessuna CI di pubblicazione da dichiarare.
- **Blocco:** 22 articoli bilingui completi ancora mancanti, fonti indipendenti incomplete per la maggioranza delle piste, nessun asset, nessuna validazione completa. **NON unire in main.**
