# O — Bozza IT/EN · Collegamenti quantistici tra due chip IBM (2026-10-27)

**STATO: BOZZA, NON PUBBLICARE.** Desk Science, ID `ibm-nighthawk-quantum-interconnects-oct27`, rank provvisorio 1, category `technology`, impact 2.5/5 (cinque tacche, due piene e metà della terza); tag IT `quantistica`, `IBM`, `ricerca`; EN `quantum`, `IBM`, `research`. **Fatto originale:** studio preliminare e comunicazione IBM del **27 ottobre 2026**, rientra nei cinque giorni di contesto; **approfondimento giornalistico 31 ottobre** in Phys.org. Notizia scientifica, non un annuncio di computer commerciale fault-tolerant.

## Italiano

**Title:** IBM collega due processori quantistici con quattro cavi superconduttori: trasferimenti al 99%, porte al 94,75%

**Dek:** Il prototipo sperimentale usa due chip Nighthawk e collegamenti di 80 centimetri. L'accuratezza di trasferimento non misura la correttezza di un intero calcolo.

**Summary:** In uno studio preliminare illustrato da IBM il 27 ottobre 2026, due processori quantistici superconduttori Nighthawk R1 da 120 qubit ciascuno sono stati collegati tramite quattro cavi di alluminio superconduttore, lunghi circa 80 centimetri. In laboratorio la fedeltà media del trasferimento di stati è stata del 99%, mentre quella media di una porta logica a due qubit tra chip diversi è stata del 94,75%. ScienceAlert, The Quantum Insider, The Korea Herald e Phys.org hanno riferito indipendentemente sui test fra il 27 e il 31 ottobre. Il dimostratore è un passo verso sistemi modulari, non la prova che 240 qubit funzionino già come computer privo di errori.

**Body**

Il 27 ottobre 2026 IBM Research ha presentato i risultati preliminari di un esperimento volto a far lavorare insieme due processori quantistici superconduttori anziché ingrandire all'infinito un solo chip. Nel frigorifero a diluizione del laboratorio, i ricercatori hanno installato quattro collegamenti superconduttori, chiamati «L-couplers», tra due moduli IBM Quantum Nighthawk R1 da 120 qubit ciascuno. Ogni cavo misura circa 80 centimetri: una distanza notevole per stati quantistici che tendono a degradarsi per rumore e perdite. I connettori sono stati inseriti dopo il montaggio dei processori, un dettaglio di ingegneria importante per un'architettura modulare sostituibile.

La prova fondamentale è la qualità del trasferimento di uno stato quantistico fra un processore e l'altro. La media riportata sui quattro canali è del 99,00%, con il migliore al 99,29%. Una seconda misura riguarda una porta logica «CZ» fra qubit posti su due chip differenti: qui la fedeltà media dichiarata è del 94,75%, più bassa del dato sul semplice trasferimento. Non sono la stessa statistica: trasferire uno stato con successo non significa aver eseguito correttamente una lunga sequenza di operazioni. Il laboratorio ha dimostrato inoltre stati entangled condivisi fra moduli e l'uso contemporaneo di due collegamenti.

ScienceAlert, in un articolo autonomo di David Nield del 27 ottobre, ha descritto i vincoli di fragilità dei qubit e la ragione per cui i collegamenti sono necessari a crescere oltre un singolo chip. The Quantum Insider, con Matt Swayne, ha distinto la qualità di trasferimento dal rendimento delle operazioni a due qubit. Il 29 ottobre The Korea Herald ha ripreso con analisi originale il requisito di modularità e, il 31 ottobre, Phys.org ha pubblicato un approfondimento di Sam Jarman. Il confronto dei resoconti e dei parametri del manoscritto disponibile su arXiv restituisce un risultato sperimentale reale, ma i dettagli della robustezza del sistema e della sua replicabilità su numerosi moduli devono ancora essere dimostrati.

Il disegno richiede cavi schermati, frequenze e temperature controllate e correzione degli errori ancora da sviluppare su scala utile. IBM stessa scrive che servono migliori stabilità e riproducibilità dei collegamenti prima di farne un sistema su vasta scala: un valore medio del 94,75% per le porte remote può essere un limite importante per circuiti lunghi, nei quali gli errori si accumulano. La ricerca, resa pubblica come preprint e non ancora indicata come lavoro valutato da peer review, non dimostra alcuna «supremazia quantistica» o accelerazione su un problema reale. Definisce invece un componente ingegneristico misurabile per eventuali computer distribuiti su più chip.

**Facts**
- IBM ha descritto il 27 ottobre un dimostratore con due Nighthawk R1, quattro cavi di 80 cm e connettori inseribili dopo il montaggio.
- Fedeltà media trasferimento: 99%; migliore collegamento: 99,29%; fedeltà media delle porte CZ remote: 94,75%.
- Il lavoro è presentato come studio preliminare arXiv, non come soluzione commerciale pronta o prestazione dimostrata di un computer fault-tolerant.

**Perspectives**
- IBM considera la modularità un percorso pratico per collegare chip quantistici e realizzare futuri codici di correzione d'errore più grandi.
- ScienceAlert e The Quantum Insider inquadrano i risultati come sperimentali e spiegano perché i dati del trasferimento e delle porte logiche devono essere distinti.

**Unknowns**
- Quanto migliorino le fedeltà delle porte remote in nuove configurazioni e quante interconnessioni siano riproducibili in un sistema operativo più grande.
- Quando, e se, l'approccio porterà a vantaggi misurabili su applicazioni reali con correzione degli errori.

**Questions**
1. **Che cosa misurano il 99% e il 94,75% dei collegamenti fra i processori IBM Nighthawk?** — Il 99% è la fedeltà media con cui uno stato quantistico viene trasferito attraverso i quattro cavi superconduttori; il 94,75% è invece la fedeltà media delle operazioni logiche CZ che coinvolgono qubit collocati su chip differenti. Una porta è un'operazione più articolata del semplice trasferimento e i due valori non sono intercambiabili.
2. **Perché IBM ha scelto quattro cavi da 80 centimetri invece di costruire un solo chip più grande?** — La prova esplora un'architettura modulare: collegare unità già costruite può limitare la complessità di fabbricazione e rendere sostituibili i componenti. È però necessario proteggere gli stati quantistici dai disturbi lungo i cavi; per ora i ricercatori hanno verificato una connessione di laboratorio, non una macchina scalabile senza ulteriori miglioramenti.

**ImpactReason 2.5:** una verifica pratica di interconnessioni tra processori quantistici potenzialmente utile alla futura scalabilità, ma il risultato è un preprint con prestazioni lontane dalla prova di calcolo affidabile su larga scala.

## English

**Title:** IBM links two quantum chips with four superconducting cables: 99% state transfers, 94.75% two-qubit gates

**Dek:** The experimental prototype uses two Nighthawk processors and 80-centimetre links. Transfer fidelity is not the same as the accuracy of a full quantum calculation.

**Summary:** In preliminary research presented by IBM on October 27, 2026, two superconducting Nighthawk R1 quantum processors containing 120 qubits apiece were connected by four roughly 80-centimetre superconducting aluminium cables. In laboratory tests, average quantum-state transfer fidelity was 99%, while average fidelity for two-qubit gates spanning the processors was 94.75%. ScienceAlert, The Quantum Insider, The Korea Herald and Phys.org reported independently on the experiment between October 27 and 31. The demonstration is a step towards modular hardware, not evidence that 240 qubits already operate as a fully error-corrected computer.

**Body**

On October 27, 2026, IBM Research presented preliminary results from an experiment designed to make two superconducting quantum processors work together, rather than seeking to keep increasing the size of a single chip. Within a dilution refrigerator, the team installed four superconducting links called L-couplers between two IBM Quantum Nighthawk R1 modules, each containing 120 qubits. Each cable was around 80 centimetres long — a substantial separation for fragile quantum states susceptible to noise and loss. The connectors were attached after the processors had been mounted, a practical engineering feature for replaceable modular components.

The main measurement was how faithfully quantum states could be transferred from one processor to the other. The team reported a 99.00% average across four links, with the best reaching 99.29%. A different measurement tested a controlled-Z, or CZ, logic gate performed between qubits on different chips; its average fidelity was 94.75%, substantially below the transfer result. Those are distinct metrics: successfully moving a quantum state is not the same as executing an extended program correctly. The researchers also demonstrated entangled states shared across processors and the concurrent use of two couplers.

In independently written coverage on October 27, ScienceAlert's David Nield explained the fragility of qubits and why interconnects could help overcome limits on single-chip designs. Matt Swayne at The Quantum Insider distinguished transfer quality from the fidelity of cross-chip operations. The Korea Herald followed with its own account of the scaling problem on October 29, and Phys.org published Sam Jarman's deeper explanation on October 31. Cross-checking those reports against the IBM technical account and available arXiv preprint supports the experimental metrics, but not a claim that the method has already been replicated across an arbitrarily large network.

The design still requires shielding, carefully controlled operating conditions and large-scale error correction that has yet to be demonstrated with this setup. IBM itself says more work is needed on stability, yield and reproducibility before deployment in more complex systems. An average 94.75% fidelity for remote two-qubit gates can be a major limitation when errors compound in longer circuits. The findings have been made available in a preprint, rather than being established as peer-reviewed production technology. They define a measurable engineering building block, not a proven computational advantage on a practical problem.

**Verified facts**
- IBM announced the experimental two-Nighthawk, four-80-cm-link setup on October 27, with couplers inserted after chip installation.
- Mean state-transfer fidelity was 99%, peak 99.29%, and mean cross-module CZ-gate fidelity 94.75%.
- The reported results are preliminary arXiv research, not a commercially deployed fault-tolerant quantum computer.

**Attributed perspectives**
- IBM frames modular linking as a possible route to more qubits and future error-correction codes.
- ScienceAlert and The Quantum Insider present it as an experimental result and distinguish state-transfer from two-qubit gate metrics.

**Unknowns**
- Whether and how far remote-gate fidelity and reproducibility can improve as the number of links and processor modules grows.
- When, or whether, the architecture will demonstrate application-level advantage with effective quantum error correction.

**Questions**
1. **What do IBM Nighthawk's 99% and 94.75% interconnect figures measure?** — The 99% figure is average fidelity for moving a quantum state over the four superconducting cables; 94.75% is the average fidelity of CZ logic gates involving qubits on different chips. A cross-module gate is a more complex operation than simple state transfer, so the two metrics cannot be substituted for each other.
2. **Why connect processors using four 80-centimetre cables instead of building a single larger quantum chip?** — The experiment tests a modular approach: connecting existing modules may reduce fabrication complexity and allow parts to be replaced. But fragile quantum states must survive travel through the cables, and the team has so far validated laboratory connections rather than a broadly scalable machine without further engineering work.

**ImpactReason 2.5:** a concrete quantum interconnect demonstration with potential long-term value for scalable hardware, while the preprint is still far from proof of reliable, fault-tolerant large-scale computing.

## Sources and original timestamps

- ScienceAlert, David Nield, *Success! IBM Hits 99% Accuracy Transferring Quantum Information Between Chips*, published 2026-10-27, `reporting`: https://www.sciencealert.com/bm-hits-99-accuracy-in-transferring-quantum-information-between-two-chips
- The Quantum Insider, Matt Swayne, *IBM Connects Two 120-Qubit Processors With 99% State-Transfer Fidelity*, 2026-10-27, `reporting`: https://thequantuminsider.com/2026/10/27/ibm-connects-two-120-qubit-processors-with-99-state-transfer-fidelity/
- The Korea Herald, Jang Yun-woo, *IBM links quantum chips like Lego blocks, opening path to unlimited scaling*, 2026-10-29 20:10 Korea time, `reporting`: https://mbiz.heraldcorp.com/article/10919478
- Phys.org, Sam Jarman, *Four superconducting cables link two large quantum processors into one*, 2026-10-31, `reporting`: https://phys.org/news/2026-10-superconducting-cables-link-large-quantum.html
- IBM Research blog, Ryan Mandelbaum and Neereja Sundaresan, *Modular quantum computing takes shape with l-couplers*, 2026-10-27, `official`: https://www.ibm.com/quantum/blog/connecting-quantum-processors-with-l-couplers
- Neereja M. Sundaresan et al., *Meter-scale quantum interconnects between large quantum processors*, arXiv 2026-10 (DOI 10.48550/arXiv.2610.29986), `official`: https://arxiv.org/abs/2610.29986
- Image: NONE. Need original schematic drawing; cannot label a drawing as actual laboratory photograph.

**Q&A check:** distinct physical mechanism/measurement and engineering rationale/limitation; all figures align in IT/EN, no boilerplate. Automated test not run.
