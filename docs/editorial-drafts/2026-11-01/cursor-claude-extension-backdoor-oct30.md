# O — Bozza bilingue cursor-claude-extension-backdoor-oct30

**NON PUBBLICARE: mancano JSON, immagine originale con credito, audit finale e test.** Desk technology, ID `cursor-claude-extension-backdoor-oct30`, category `technology`, impact 3/5 con cinque tacche, tag IT Cursor, estensioni, sicurezza, EN Cursor, extensions, security. Data fatto/aggiornamento specificata nel corpo.

## Italiano

**Title:** Cursor, un'estensione Claude Code alterata ha distribuito una backdoor SSH: fino a 5.000 utenti esposti

**Dek:** La versione 2.1.313 è rimasta disponibile per circa 11 ore il 29 ottobre; un download non prova automaticamente infezione o furto di credenziali.

**Summary:** Il 30 ottobre 2026 le analisi di BleepingComputer e Ars Technica hanno ricostruito un attacco alla catena di distribuzione delle estensioni software. Il marketplace dell'editor Cursor aveva servito, il 29 ottobre, una versione alterata dell'estensione Claude Code, identificata come 2.1.313. Cursor ha dichiarato che l'episodio potrebbe aver interessato al massimo cinquemila utenti e che l'estensione dannosa non è stata sviluppata da Anthropic.

**Body**

Il 30 ottobre 2026 le analisi di BleepingComputer e Ars Technica hanno ricostruito un attacco alla catena di distribuzione delle estensioni software. Il marketplace dell'editor Cursor aveva servito, il 29 ottobre, una versione alterata dell'estensione Claude Code, identificata come 2.1.313. Cursor ha dichiarato che l'episodio potrebbe aver interessato al massimo cinquemila utenti e che l'estensione dannosa non è stata sviluppata da Anthropic.

La finestra indicata da Cursor va all'incirca dalle 02:27 alle 13:35, ora del Pacifico. Nel pacchetto era stato aggiunto un caricatore JavaScript malevolo che tentava di installare una chiave SSH persistente e aprire un tunnel verso un server controllato dagli aggressori. Il codice cercava anche di spedire informazioni sul sistema, tra cui nome del computer, utente e nomi di variabili d'ambiente; non sono la stessa cosa delle password in chiaro.

Ars Technica riferisce che restano poco chiari i meccanismi con cui è stato possibile distribuire una modifica sotto un account verificato; BleepingComputer distingue il marketplace Cursor dagli archivi Microsoft VS Code e Open VSX, per i quali non risulta lo stesso pacchetto dannoso distribuito. La versione successiva 2.1.314 è stata pubblicata e Cursor ha rimosso l'estensione compromessa, interrotto temporaneamente il servizio e collaborato alla disattivazione del server dell'attaccante.

Chi ha installato proprio la versione 2.1.313 nell'intervallo indicato dovrebbe seguire le istruzioni pubblicate da Cursor, cercare l'eventuale chiave SSH 'svc-telemetry' e valutare isolamento della macchina e rotazione delle credenziali accessibili. L'esistenza di fino a cinquemila utenti esposti non è il numero accertato delle postazioni effettivamente compromesse; un'analisi forense resta necessaria per identificare accessi abusivi riusciti.

**Facts:** le misure o date esplicite dei paragrafi 1 e 2 sono verificate nelle fonti indicate; dichiarazioni industriali rimangono attribuite.

**Perspectives:** interpretazioni societarie e letture tecniche o regolatorie sono attribuite alle parti citate nel testo.

**Unknowns:** i risultati attesi, le prove successive e gli esiti di indagini o test non sono disponibili alla data descritta.

**Questions**

1. **Perché proprio la versione Claude Code 2.1.313 distribuita su Cursor è rilevante?** — Il caricatore malevolo è stato aggiunto al pacchetto 2.1.313 servito nel marketplace Cursor fra le 02:27 e le 13:35 PT del 29 ottobre. La versione 2.1.314 è successiva; non va attribuito automaticamente l'incidente a ogni installazione di Claude Code.
2. **Quale differenza c'è tra una chiave SSH malevola installata e un furto di credenziali confermato?** — La chiave può consentire l'accesso remoto se il servizio SSH e il tunnel funzionano; lo script tenta anche di raccogliere metadati. Ma il rilevamento di un file o il download del pacchetto non dimostrano che un attaccante abbia avuto accesso o copiato password.

**ImpactReason:** La versione 2.1.313 è rimasta disponibile per circa 11 ore il 29 ottobre; un download non prova automaticamente infezione o furto di credenziali. Impatto 3/5 valutato per ampiezza delle conseguenze tecnologiche documentate.

## English

**Title:** Malicious Claude Code extension on Cursor carried SSH backdoor; up to 5,000 users exposed

**Dek:** Version 2.1.313 was available for about 11 hours on October 29; downloading it does not by itself establish infection or credential theft.

**Summary:** On October 30, 2026, BleepingComputer and Ars Technica independently examined a software supply-chain attack involving developer extensions. Cursor's editor marketplace had served a modified copy of Anthropic's Claude Code extension on October 29, identified as version 2.1.313. Cursor said at most 5,000 users could have been affected and that Anthropic did not create the malicious build.

**Body**

On October 30, 2026, BleepingComputer and Ars Technica independently examined a software supply-chain attack involving developer extensions. Cursor's editor marketplace had served a modified copy of Anthropic's Claude Code extension on October 29, identified as version 2.1.313. Cursor said at most 5,000 users could have been affected and that Anthropic did not create the malicious build.

Cursor put the exposure window at approximately 2:27 a.m. to 1:35 p.m. Pacific time. Attackers inserted a JavaScript loader that attempted to install a persistent SSH key and create a tunnel to a remote server under their control. The code also attempted to transmit host information, usernames and names of potentially sensitive environment variables; those names are not the same as the plaintext secrets themselves.

Ars Technica reports that investigators still do not know how the attackers managed to distribute code under a verified account. BleepingComputer distinguishes Cursor's marketplace from the Microsoft VS Code and Open VSX registries, which were not shown to have served the same altered package. Version 2.1.314 was released, and Cursor removed the malicious extension, temporarily suspended its marketplace and helped disable the attacker's server.

Developers who installed version 2.1.313 during the affected window should follow Cursor's remediation guidance, check for an SSH key named 'svc-telemetry', and consider isolating affected machines and rotating exposed credentials. The estimate of at most 5,000 potentially exposed users is not a confirmed count of compromised devices; forensic work would be needed to establish successful unauthorized access.

**Verified facts:** the measurements and dates in the first two paragraphs are sourced; company claims remain attributed.

**Attributed perspectives:** industry and technical or regulatory interpretations are assigned to their actual proponents.

**Unknowns:** expected outcomes, later evidence and final investigation or test results are not available as of the events described.

**Questions**

1. **Why does Claude Code extension version 2.1.313 on Cursor matter?** — That particular package carried the injected malicious loader and was served by Cursor's marketplace between 2:27 a.m. and 1:35 p.m. PT on October 29. Version 2.1.314 followed it; the incident cannot be attributed to every Claude Code installation.
2. **What distinguishes a malicious SSH key from proven theft of credentials?** — The key could enable remote access if the SSH service and tunnel function; the script also attempted to collect host metadata. But finding a file or downloading the package does not prove attackers gained access or copied passwords.

**ImpactReason:** Version 2.1.313 was available for about 11 hours on October 29; downloading it does not by itself establish infection or credential theft. The 3/5 rating reflects demonstrated technological consequences, not popularity.

## Sources

- BleepingComputer, *Malicious Claude Code extension on Cursor planted SSH backdoors*, 2026-10-30, `reporting`: https://www.bleepingcomputer.com/news/security/malicious-claude-code-extension-on-cursor-planted-ssh-backdoors/
- Ars Technica, *Anthropic VS code extension on Cursor backdoored for nearly 12 hours*, 2026-10-30, `reporting`: https://arstechnica.com/security/2026/10/anthropic-vs-code-extension-on-cursor-backdoored-for-nearly-12-hours/
- RH-ISAC, *Claude Code Extension Trojanized on Cursor Marketplace with SSH Backdoor*, 2026-10-30, `analysis`: https://rhisac.org/general-blog/claude-code-extension-trojanized-on-cursor-marketplace-with-ssh-backdoor-add-a-tag/

**Image**: not yet supplied; requires owned original editorial SVG or a correctly licensed photo. **Q&A**: bilingual and topic-specific, final independent editorial review pending.
