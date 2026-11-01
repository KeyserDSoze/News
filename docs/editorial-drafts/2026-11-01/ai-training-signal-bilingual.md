# O — Bozza IT/EN · Segnale comune per le preferenze di training AI

**NON PUBBLICARE:** bozza testuale, non JSON dell'edizione; immagine originale e controllo finale mancano. ID proposto `ai-training-preference-robots-policy-token-oct30`, rank provvisorio Tecnologia 1, categoria `technology`, impatto **2,5/5 tacche**, tag IT `intelligenza-artificiale`, `editori`, `standard`; EN `artificial-intelligence`, `publishers`, `standards`. Nessun threadId/related senza riferimento documentato.

## Italiano

**Titolo:** Training AI, quattro aziende sostengono un segnale comune in robots.txt: è ancora una bozza

**Dek:** OpenAI, Google, Microsoft e Anthropic annunciano l'adozione progressiva di una preferenza leggibile dai servizi AI. Il documento IETF del 30 ottobre non è uno standard approvato e non blocca di per sé la scansione.

**Summary:** Il 30 ottobre 2026 OpenAI, Google, Microsoft e Anthropic hanno dichiarato sostegno a un meccanismo comune che consente ai gestori dei siti di indicare, tramite il file robots.txt, la preferenza sull'uso delle pagine per addestrare modelli generativi. Il documento tecnico di Kevin Kelley, affiliato ad Anthropic, è un Internet-Draft individuale: non costituisce uno standard approvato dall'IETF. I tempi di adozione variano fra le aziende e il segnale disciplina l'uso per il training, non il semplice accesso alle pagine.

**Corpo**

Il 30 ottobre quattro sviluppatori di modelli AI hanno annunciato di voler riconoscere un segnale condiviso di preferenza sull'addestramento. L'idea è permettere a un editore, un'organizzazione o un gestore di sito di comunicare una sola volta la propria scelta a più servizi, invece di mantenere istruzioni distinte per ogni fornitore. La proposta è descritta nell'Internet-Draft *Machine-Readable Training Preference Signal*, firmato da Kevin Kelley e registrato il 30 ottobre nel sistema dell'IETF. The Verge e Thurrott hanno ricostruito gli annunci, mentre i testi ufficiali dei fornitori consentono di controllare impegni e differenze.

Il meccanismo usa la sintassi già esistente di robots.txt. Un gruppo con la riga `User-Agent: __usage_ai-training` e la direttiva `Disallow: /` esprime la preferenza a non utilizzare le pagine del sito per modificare i parametri appresi di modelli generativi; possono essere previste eccezioni `Allow` per percorsi specifici. Il documento distingue questo segnale dai gruppi destinati ai singoli crawler. Un gruppo generico `User-Agent: *` non vale automaticamente come preferenza di training, e l'assenza del nuovo token significa che quella particolare preferenza non è stata espressa.

La distinzione più importante riguarda uso e accesso. Il testo tecnico dice esplicitamente che il token non è una direttiva che impedisce la scansione delle pagine. Un operatore che voglia limitare il crawling deve continuare a usare le regole applicabili ai bot interessati. Il segnale non elimina contenuti già utilizzati per addestrare modelli, non impone automaticamente un divieto legale e può convivere con accordi privati. Microsoft ha inoltre annunciato un controllo separato per il *grounding*, ossia l'uso di contenuti esterni per costruire risposte AI: è un'attività diversa dall'addestramento.

Le aziende non hanno indicato un'attivazione simultanea. Anthropic ha riferito di aver iniziato l'implementazione; OpenAI parla dei prossimi mesi, Google del 2027 e Microsoft del 1 febbraio 2027. Queste sono tempistiche dichiarate, non una verifica indipendente che tutti i servizi rispettino già il token. Il datatracker IETF precisa che la proposta individuale non è approvata dall'organizzazione e può essere modificata. Per gli editori il beneficio potenziale è ridurre la complessità di espressione della preferenza; l'efficacia reale dipenderà dalle implementazioni, dalle eccezioni e dalla possibilità di controllarne il rispetto.

**Fatti verificati**
- L'Internet-Draft di Kevin Kelley è datato 30 ottobre 2026 e non ha lo status di standard IETF approvato.
- Il token `__usage_ai-training` permette di esprimere preferenze per percorsi in robots.txt sul training di modelli generativi.
- I quattro fornitori hanno comunicato tempi diversi di adozione; il token non equivale a un blocco del crawling.

**Prospettive attribuite**
- OpenAI presenta il segnale come modo volontario per semplificare le preferenze dei gestori di siti, senza sostituire i controlli esistenti.
- Microsoft distingue esplicitamente training e grounding, promettendo scelte separate per gli editori.
- The Verge sottolinea il contesto delle controversie tra editori e operatori di AI sulla raccolta dei contenuti.

**Incognite**
- Non è verificata l'adozione completa da parte di tutti i fornitori né la conformità operativa dei rispettivi servizi.
- Il testo della proposta e le precedenze tra regole proprietarie, token condiviso e accordi privati possono ancora evolvere.

**Domande finali**
1. **Che cosa indica in robots.txt il token `__usage_ai-training` proposto da Kevin Kelley?** — Se accompagnato da `Disallow: /`, comunica la preferenza del sito a non far utilizzare le sue pagine per modificare i parametri di modelli generativi; con regole `Allow` si possono escludere singoli percorsi dal divieto espresso. È una preferenza sull'uso dei contenuti, non un comando che impedisce ai crawler di visitarli.
2. **Perché il segnale condiviso non sostituisce i controlli dei crawler di OpenAI, Google e Microsoft?** — Il nuovo gruppo riguarda il training, mentre le istruzioni specifiche per ciascun bot continuano a governare l'accesso e altri impieghi dei contenuti. Inoltre le aziende attiveranno il supporto in momenti diversi e Microsoft distingue il grounding dall'addestramento: un editore deve quindi mantenere i controlli esistenti per gli usi che vuole limitare.

**Motivazione impatto 2,5/5:** possibile semplificazione significativa delle preferenze dei siti su scala internazionale, ma adozione volontaria e scaglionata, senza forza di standard definitivo o controllo già dimostrato.

## English

**Title:** Four AI companies back a shared robots.txt training preference, but it remains a draft

**Dek:** OpenAI, Google, Microsoft and Anthropic plan staggered support for a common website signal. The October 30 IETF Internet-Draft is not an adopted standard and does not itself prevent crawling.

**Summary:** On October 30, 2026, OpenAI, Google, Microsoft and Anthropic said they would support a shared mechanism for websites to express preferences about using their pages to train generative AI models. Kevin Kelley's individual Internet-Draft describes a policy token in robots.txt, but it is not an IETF-approved standard. Adoption dates differ by provider, and the signal concerns training use rather than access to a website itself.

**Body**

On October 30, four major AI developers announced support for a common way to express training preferences. The aim is to let publishers, organizations and website operators communicate one choice to multiple providers rather than maintain separate instructions for each. The mechanism is set out in *Machine-Readable Training Preference Signal*, an individual Internet-Draft by Kevin Kelley filed with the IETF on October 30. The Verge and Thurrott covered the announcements, while the companies' own statements establish the scope and differences of their commitments.

The proposal uses existing robots.txt syntax. A group containing `User-Agent: __usage_ai-training` followed by `Disallow: /` expresses a preference against using the site's pages to change the learned parameters of generative AI models; `Allow` rules can make path-specific exceptions. The draft treats this separately from instructions addressed to individual crawlers. A general `User-Agent: *` group does not automatically count as a training preference, and a site without the new policy token has not expressed that particular preference.

The key distinction is between use and access. The technical document explicitly says the token is not a directive that blocks crawling. Site operators who want to restrict bots from fetching pages must continue to use the appropriate crawler-specific rules. The signal cannot undo training that has already happened, is not automatically a legally enforceable ban and may coexist with private agreements. Microsoft has also announced a separate preference for *grounding*, meaning the use of external material to support AI-generated answers; grounding and model training are different activities.

The providers have not announced a single activation date. Anthropic says it has begun implementing support; OpenAI refers to the coming months, Google to 2027, and Microsoft to February 1, 2027. These are company commitments, not independent proof that every service already honors the token. The IETF datatracker explicitly says the individual draft has no formal standing as an approved standard and may change. The potential gain for publishers is simpler expression of preferences, but practical effectiveness will depend on implementation details, exceptions and the ability to check compliance.

**Verified facts**
- Kevin Kelley's Internet-Draft is dated October 30, 2026, and is not an IETF-approved standard.
- The `__usage_ai-training` token expresses path-based preferences in robots.txt about generative-model training.
- The four providers have stated different implementation timelines; the token is not itself a crawling prohibition.

**Attributed perspectives**
- OpenAI describes the voluntary shared signal as a way to simplify website preferences while keeping existing controls.
- Microsoft explicitly separates training from grounding and plans separate publisher choices.
- The Verge places the announcement in the wider dispute over AI companies' collection of publisher content.

**Unknowns**
- Complete adoption by all providers and operational compliance across their services have not been independently established.
- The draft's wording and precedence among proprietary rules, the common token and private agreements may still change.

**Final questions**
1. **What does Kevin Kelley's proposed `__usage_ai-training` token mean in robots.txt?** — With `Disallow: /`, it states a website's preference against using its pages to change the learned parameters of generative AI models; `Allow` rules can create exceptions for particular paths. It is a content-use preference, not an instruction preventing crawlers from visiting the site.
2. **Why does the shared signal not replace OpenAI, Google and Microsoft's existing crawler controls?** — The new group concerns training, while provider-specific bot instructions still govern access and other content uses. Support will also start at different times, and Microsoft distinguishes grounding from training, so publishers must retain existing controls for the activities they want to restrict.

**Impact reason 2.5/5:** a potentially meaningful international simplification for website publishers, but voluntary and staggered implementation without a final standard or demonstrated universal compliance.

## Sources to encode after final verification

- IETF Datatracker, Kevin Kelley, *Machine-Readable Training Preference Signal*, 2026-10-30, `official`: https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/
- OpenAI, *Making it easier for websites to express AI training preferences*, 2026-10-30, `official`: https://openai.com/index/helping-websites-express-ai-training-preferences/
- Google Search Central, *Supporting a shared AI training control for websites*, 2026-10-30, `official`: https://developers.google.com/search/blog/2026/10/ai-training-control
- Microsoft Bing, *Your content, your choice: clearer preferences for training and grounding*, 2026-10-30, `official`: https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/
- The Verge, Emma Roth, *The biggest names in AI are backing a new way to opt out of scraping*, 2026-10-30, `reporting`: https://www.theverge.com/tech/1023763/openai-google-microsoft-ai-scraping-standard-opt-out
- Thurrott, Paul Thurrott, *Anthropic, Google, Microsoft, and OpenAI Agree to Let Sites Opt Out of AI Training*, 2026-10-30, `reporting`: https://www.thurrott.com/a-i/343407/anthropic-google-microsoft-and-openai-agree-to-let-sites-opt-out-of-ai-training

**Image:** NOT PROVIDED. An original, non-documentary illustration is needed; no company logo or proprietary screenshot should be copied without checking rights.
