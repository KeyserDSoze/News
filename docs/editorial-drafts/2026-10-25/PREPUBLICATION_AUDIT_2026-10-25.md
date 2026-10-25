# O — 25 ottobre 2026: audit prima della pubblicazione

**Stato: PR in bozza, edizione NON pubblicata.** In chat il 25 ottobre 2026 l'editore ha espresso approvazione e richiesta di pubblicazione. L'autorizzazione editoriale **non sostituisce** i controlli di verità, periodo, immagini e build obbligatori dalla politica di O.

## Controllo del rilascio

- La PR #1 (`editorial/2026-10-25-review`) contiene soltanto dossier in `docs/editorial-drafts/`: **non contiene** i file di edizione `news/2026-10-25/{it,en}.json` e `news/2026-10-25/{italy,technology,science}/{it,en}.json`, né gli asset necessari.
- Il workflow `.github/workflows/pages.yml` pubblica su push a `main` soltanto se cambiano percorsi applicativi/news/script/test/workflow. Un merge della PR **così com'è non produrrebbe la nuova edizione**, indipendentemente dall'approvazione.
- Non sono stati eseguiti i test di contenuto, build o Playwright né un deploy con verifica del sito.
- Finestra esatta: `2026-10-24T06:00:00Z` ≤ sviluppo < `2026-10-25T06:00:00Z` (08:00 CEST 24 ottobre → 07:00 CET 25 ottobre).

## Prove primarie ricontrollate il 25 ottobre

**GMO (Tecnologia):** la società pubblica un nuovo aggiornamento il 24 ottobre alle ore 11:50 locali, comprensivo di rimborso da 5.000 yen agli utenti del servizio e richiesta di difesa cibernetica attiva. Fonti:
- comunicato originale (24 ottobre): https://internet.gmo/news/article/249/
- ITmedia News, articolo indipendente (24 ottobre): https://www.itmedia.co.jp/news/article/2610/24/2000002566/
- The Japan Times/Jiji, 24 ottobre: https://www.japantimes.co.jp/business/2026/10/24/gmo-cyber-defense-government-request/
Prima di pubblicare distinguere il numero di server interessati dai conti realmente compromessi e non presentare come già avviate misure governative solo richieste dalla società.

**DeLLphi-305 (Scienza):** presentazione il 24 ottobre, sopravvivenza mediana 21,1 vs 12,7 mesi (n=282 contro n=281), HR 0,42. Fonti:
- AstraZeneca, risultati datati 24 ottobre: https://www.astrazeneca.com/media-centre/press-releases/2026/imfinzi-plus-imdelltra-reduced-the-risk-of-death-by-58-pct-in-1st-line-extensive-stage-small-cell-lung-cancer-in-the-dellphi-305-phase-iii-trial.html
- Dana-Farber, 24 ottobre: https://www.dana-farber.org/newsroom/news-releases/2026/immunotherapy-combo-extends-survival-for-patients-with-aggressive-small-cell-lung-cancer-based-on-trial-results-presented-by-dana-farber-at-esmo-congress-2026
La riduzione relativa del rischio di morte non equivale a guarigione; confermare anche i dati degli eventi avversi con articolo scientifico completo e almeno due redazioni indipendenti.

**Francia (Mondo):** conferma cronaca The Guardian del 24 ottobre, primo bilancio di 'quasi 1.000' arresti e stime di partecipazione divergenti. Fonte:
- https://www.theguardian.com/world/2026/oct/24/hundreds-of-thousands-march-across-france-in-protests-over-schools-and-policing
Seconda cronaca attribuita ad AP nel dossier non è risultata accessibile all'apertura; non dichiarare controllata la fonte se non consultabile.

**Giordania (Mondo):** Reuters del 24 ottobre ore 06:17 UTC descrive aggiornamento con nove morti nell'attacco del giorno prima e rafforzamento sicurezza:
- https://www.reuters.com/business/media-telecom/us-embassy-says-security-ramped-up-jordan-after-deadly-church-attack-2026-10-24/
Se si parla dell'attacco del 23, chiarire che il fatto nuovo del 24 sono il bilancio/il cordoglio e le operazioni delle autorità.

**DASL-HiCaP (Scienza):** la Repubblica 24 ottobre ore 08:30 italiane, testata autonoma, parla di riduzione del rischio composito di metastasi **o morte**, non del 58% delle sole morti:
- https://www.repubblica.it/salute/dossier/oncoline/2026/10/24/news/tumore_alla_prostata_una_nuova_terapia_riduce_del_58_il_rischio_di_metastasi_o_morte-425671803/
Integrare con ANSA e lo studio/abstract primario.

## Fatti precedenti alla finestra: NON utilizzabili come nuova scoperta del 24 ottobre

- **ASUS:** allerta CSIRT del **20 ottobre** per una famiglia di firmware: https://csirt.regione.toscana.it/vulnerabilita-in-prodotti-asus-al04-261020-csirt-ita/ ; distinta allerta del **23 ottobre**: https://csirt.regione.toscana.it/vulnerabilita-in-prodotti-asus-al02-261023-csirt-ita/ . Un approfondimento OC3D del 24 ottobre conferma che gli aggiornamenti erano del 20/23: https://overclock3d.net/news/misc/asus-issues-wifi-router-updates-to-address-severe-vulnerabilities/
- **BlackX:** annuncio originale di Kaspersky del **22 ottobre**, relativo a compromissioni precedenti: https://www.kaspersky.it/about/press-releases/kaspersky-scopre-blackx-il-bootkit-che-prende-di-mira-le-organizzazioni-diplomatiche-dellasia-centrale
- **Dessa / Block:** annuncio pubblico il **23 ottobre**, secondo TechCrunch (pubblicato il 24): https://techcrunch.com/2026/10/24/blocks-new-voice-model-sounds-eerily-human/ . Non presentare la data del 24 come lancio originale.
- **Google:** la modifica della politica di trattamento citata nell'articolo è entrata in vigore il **16 ottobre**, la cronaca successiva non dimostra automaticamente un nuovo trattamento dati iniziato il 24.

## Requisiti ancora bloccanti

1. **Revisionare integralmente tutte le 25 storie**, sostituire quelle fuori periodo e quelle con meno di 2 testate realmente indipendenti (senza imputare riprese di agenzia come verifiche separate).
2. **Creare 8 JSON** conformi a `src/frontend/src/types.ts`, con 25 article IDs coerenti IT/EN, body sostanzioso, tags e sources realmente verificati.
3. **Aggiungere 25 illustrazioni/foto lecite** con credit, licenza, alt e URL di origine reale, evitando di pubblicare asset dichiarati ma assenti.
4. **Eseguire** `npm install`, `npm run test:content`, `npm run build`, `npx playwright install chromium`, `npm run test:e2e` e correggere eventuali errori.
5. Soltanto dopo, unire su `main`, verificare GitHub Actions e https://onews.app/.

**Conclusione:** autorizzazione ricevuta, **pubblicazione non eseguita**, fino a disponibilità di un'edizione tecnicamente valida e documentalmente verificata. Non unire la PR che contiene soltanto documenti.
