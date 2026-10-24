# UrbanCare — Impeccable, 23 ottobre 2026

Sequenza eseguita: critique → audit → polish. Target principale:
`components/design/MockPage.tsx`, homepage, navigazione condivisa e percorso
`/contatti` → preventivo. Pagine rappresentative aggiuntive: `/servizi` e redirect
`/preventivo`. Identità visiva e affermazioni commerciali conservate.

## Metodo e limiti

Critique con due valutazioni indipendenti: A `/root/design_review`,
B `/root/technical_evidence`. A ha concluso prima della sintesi dei risultati B.
Revisione visuale nel browser locale, desktop e mobile 390×844; verifica finale
anche a 1440×1000. Nessun invio reale: le risposte API nei test sono intercettate.

Il launcher Impeccable è presente, ma manca il motore 0.1.5. `context` e il
tentativo reale `detect --json public/design components/design` terminano con
exit 127 perché la cache del motore non è scrivibile nel sandbox. Il detector
non ha prodotto conteggi o regole: non equivale a una scansione senza problemi.
Nessun PRODUCT.md o DESIGN.md presente. Applicati i playbook installati,
le convenzioni del progetto e la guida Next.js locale prima delle modifiche.

Nessun overlay iniettato: l'API browser di valutazione è di sola lettura.
Nessun live-server Impeccable avviato. Nessuna ignore list presente. Slug,
snapshot gestito dal motore e trend non disponibili; questo documento è
l'archivio manuale della revisione, non uno snapshot del motore.
Viewport temporaneo ripristinato; server di verifica locale arrestato a fine lavoro.

## Critique — valutazione iniziale

**Specificità:** il quartiere illustrato, le finestre abitate, il motivo del tetto,
la geografia locale e l'amministratore nominato costruiscono un'identità coerente
con la cura dei condomini. La composizione è riconoscibile e merita di essere preservata.

| Euristica | /4 | Evidenza principale |
|---|---:|---|
| Visibilità dello stato | 2 | Riepilogo preventivo presente anche nelle informazioni |
| Corrispondenza con il mondo reale | 3 | Linguaggio concreto, ma dati dello stabile presunti |
| Controllo e libertà | 3 | Telefono, email, schede e chiusura menu con Escape |
| Coerenza | 2 | Servizi eredita numerazione e composizione della homepage |
| Prevenzione degli errori | 2 | Valori di preventivo precompilati senza conferma |
| Riconoscimento | 3 | Etichette e categorie chiare; riepilogo non pertinente |
| Efficienza | 3 | Canali diretti, copia, autofill e controlli numerici |
| Essenzialità | 3 | Gerarchia forte; modulo contatti visivamente impegnativo |
| Recupero dagli errori | 2 | Messaggi presenti, ma focus e associazioni mancanti |
| Aiuto | 2 | FAQ utili dopo il modulo; attesa descritta genericamente |
| **Totale iniziale** | **25/40** | |

Punti riusciti: promessa leggibile nella hero; amministratore e recapiti rendono
lo studio raggiungibile; quattro servizi e quattro passaggi sono gruppi comprensibili.

Carico cognitivo moderato: tre criticità nelle dimensioni focus singolo,
decisione alla volta e numero di scelte. Il contatto concentra canali, due moduli
e un riepilogo del preventivo anche quando non pertinente. La navigazione desktop
espone sette controlli, inclusi tema e area personale, con servizi in disclosure.

Percorso emotivo: il quartiere e la promessa iniziale rassicurano; il confronto con
la gestione tradizionale introduce tensione; il ritratto ristabilisce fiducia.
Il modulo lungo, i dati presunti e l'assenza di tempi concreti creano la principale
caduta prima della conferma di ricezione.

Persone: un nuovo visitatore può scambiare il riepilogo per un obbligo anche nella
richiesta informazioni; un visitatore mobile incontra il riepilogo dopo il modulo;
chi usa tastiera o screen reader non riceveva nomi e stati sufficienti.

Priorità iniziali:

1. **P1:** rendere il riepilogo pertinente alla sola richiesta di preventivo.
2. **P1:** sostituire i dati dello stabile presunti con dati forniti dall'utente.
3. **P2:** migliorare rassicurazione vicino all'invio, senza inventare promesse.
4. **P2:** dare alla pagina servizi un'introduzione autonoma più compatta.
5. **P2:** correggere semantica dei moduli e recupero dagli errori.

Questions skipped: l'utente ha esplicitamente autorizzato la prosecuzione autonoma
con tutti e tre i passaggi. Non sono state richieste ulteriori decisioni di design.

## Audit tecnico — valutazione iniziale

| Dimensione | /4 | Evidenza |
|---|---:|---|
| Accessibilità | 2 | Campi numerici senza nomi, schede ed errori incompleti |
| Performance | 3 | SVG, IntersectionObserver e rAF; suggerimenti compositing permanenti |
| Responsive | 2 | Nessun overflow osservato a 390 px, alcuni controlli piccoli |
| Temi | 2 | Token e persistenza presenti; contrasto secondario insufficiente |
| Integrità | 3 | Sistema coerente con difetti locali di stato e semantica |
| **Totale iniziale** | **12/20** | Nessun P0 nei percorsi ispezionati |

Integrità: sistema coerente con il prodotto, con correzioni necessarie nel modulo.
Scansione deterministica indisponibile; nessun falso positivo da valutare.

| Gravità | Posizione iniziale | Problema e impatto |
|---|---|---|
| P1 | templates.json, contatti; #qUnits, #qBox, .seg | Numeri e gruppi senza nomi accessibili; WCAG 1.3.1, 3.3.2, 4.1.2 |
| P1 | contatti.css:19, :218, :259 | #8a929d su bianco: 3,144:1 per testo piccolo; WCAG 1.4.3 |
| P2 | contatti.js:127–129 | Schede senza selezione, pannello associato e frecce da tastiera |
| P2 | contatti.js:357–372 | Errori senza focus, aria-invalid o associazione ai messaggi |
| P2 | contatti.css:57, :221, :228, :249–252 | Azioni alte 32,5 px, schede 38 px, stepper ristretti; obiettivo ergonomico 44 px |
| P2 | home.js:237–253 | Parallasse JS senza rispetto della preferenza movimento ridotto |
| P3 | home.css:80, :470 | will-change permanente senza necessità misurata |

44 px è l'obiettivo ergonomico del playbook, non una dichiarazione automatica di
violazione WCAG 2.5.8. Non sono stati misurati frame rate, Core Web Vitals o
prestazioni di produzione. Le dimensioni tecniche sono valutazioni circoscritte.

Pratiche positive: menu con pulsante reale, aria-expanded, inert, Escape e ritorno
del focus; immagini CMS con alt escapato, lazy loading e sorgenti responsive;
FAQ native; valori del modulo conservati dopo errori.

## Polish applicato

- Riepilogo nascosto nelle informazioni e dopo il successo; modulo informazioni
  con larghezza di lettura contenuta.
- Unità e box facoltativi inizialmente vuoti; ascensore e riscaldamento richiedono
  scelta esplicita. Riepilogo con “Da indicare” e otto requisiti aggiornati.
  Illustrazione dichiarata indicativa.
- Schede con aria-selected, pannelli associati, tabulazione coerente e tasti
  freccia, Home ed End.
- Campi numerici e pulsanti incremento/decremento nominati; gruppi radio associati
  alla loro domanda.
- Validazione dei vincoli nativi prima dell'invio, messaggi associati, aria-invalid,
  annuncio dell'errore e focus sul primo campo errato.
- Stato di invio annunciato, entrambe le azioni disabilitate durante la richiesta,
  focus sulla conferma soltanto dopo risposta positiva. Le API restano invariate.
- Testo secondario chiaro più scuro; errori adattati ai due temi; azioni, schede,
  radio e tema con area di almeno 44 px; stepper senza restringimento.
- Parallasse disattivata con movimento ridotto; rimosso will-change permanente.
- Importatore aggiornato per conservare le modifiche al runtime su reimportazione;
  semantica dei template applicata nella trasformazione server condivisa.

Restano osservazioni editoriali/di struttura: composizione autonoma di `/servizi`,
posizionamento delle FAQ, eventuali tempi di risposta e rassicurazioni commerciali
confermate dallo studio. Non sono blocchi funzionali e non sono state introdotte
affermazioni prive di conferma. Nessun nuovo punteggio globale assegnato dopo i fix.

## Verifica

Typecheck e lint superati. Otto verifiche dedicate superate, quattro su desktop
e quattro su mobile: schede e dati iniziali, errori e focus, invio simulato con
disabilitazione delle azioni e focus sulla conferma, dimensioni touch e overflow.
La prima esecuzione browser era bloccata dal sandbox; rieseguita con autorizzazione.
Una successiva correzione del test usa le etichette visibili dei radio personalizzati
e rifiuta il banner privacy, come un visitatore, prima di compilare.

Controllati anche i test esistenti di persistenza del tema, menu mobile con Escape,
riepilogo dinamico e successo solo dopo consegna confermata: sette casi superati,
uno escluso intenzionalmente perché il menu mobile non si applica al desktop.
Corretto il test di persistenza del tema su mobile aprendo prima il menu che
contiene il controllo. Totale dei casi distinti verificati: **15 superati, 1 saltato**.
Controlli di sintassi JavaScript/Python e `git diff --check` superati.

Invio email reale e build di produzione non eseguiti. File del CMS già modificato,
directory output/ e tmp/ preesistenti lasciati intatti.
