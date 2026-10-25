# O — Regole editoriali per domande e risposte / Q&A standards

Le Q&A concludono l'articolo per spiegare **fatti, meccanismi, cifre, impatto e limiti specifici del soggetto raccontato**. Non sono uno spazio da compilare con un modello generico.

## Redazione IT/EN

- Preferire due o tre domande per nuovo articolo: una dedicata al fatto o meccanismo, una all'interpretazione o alle conseguenze verificabili. Per gli articoli storici una sola domanda chiara può essere sufficiente: non aggiungere riempitivi.
- Inserire un riferimento identificabile al protagonista, prodotto, studio, indicatore, luogo o misura. Scrivere risposte complete, utili anche lette isolatamente, sostenute dalle fonti dell'articolo.
- Distinguere misurazioni da ipotesi, rischi relativi da valori assoluti, dichiarazioni attribuite da eventi documentati e risultati preliminari da prove consolidate.
- Non ripetere il contenuto della sezione `unknowns` sotto un'altra intestazione; non copiare nemmeno `facts` senza aggiungere un chiarimento utile.
- Non chiedere come sia stata costruita l'edizione o quando la notizia sia stata pubblicata, salvo che una discrepanza cronologica sia rilevante per il fatto.
- Non usare domande identiche su notizie diverse, neppure cambiando soltanto il soggetto. Evitare controargomentazioni fittizie e risposte monosillabiche.
- Le Q&A italiane e inglesi devono essere equivalenti nei fatti e naturali nella formulazione. Rivederle leggendo il corpo completo dell'articolo.
- Vietate formule prefabbricate: «Quali elementi risultano documentati?», «Cosa resta da verificare?», «Cosa resta incerto?», «È una scoperta fatta il 25 ottobre?», «I risultati dimostrano una guarigione universale?» e corrispettivi in inglese.

## Esempio: modello vocale Dessa

**Domanda pertinente:** «Che cosa significa full-duplex per Dessa?» — «Il sistema è progettato per ascoltare e rispondere nello stesso momento, gestendo interruzioni e segnali di ascolto.»

**Seconda domanda:** «Le dimostrazioni provano affidabilità in tutti i contesti?» — «No: sono esempi del produttore, e mancano ancora misure indipendenti di prestazione.»

**English:** “What does full-duplex mean for Dessa?” — “The system is designed to listen while speaking and manage interruptions.”

**Second question:** “Do the demos prove reliability in all conditions?” — “No. They are developer-selected recordings, not independent performance tests.”

## Controllo prima della pubblicazione

Lo script `scripts/editorial-questions.mjs` identifica formule vietate, risposte vuote e ripetizioni testuali del blocco `unknowns`. Non può dimostrare automaticamente **pertinenza, accuratezza o indipendenza delle fonti**: questi aspetti richiedono una lettura critica delle singole notizie. Il job ChatGPT delle 07:00 deve eseguire anche un audit semantico delle Q&A per entrambe le lingue. Se non supera la verifica, deve bloccare la pubblicazione, non riempire artificialmente il campo.
