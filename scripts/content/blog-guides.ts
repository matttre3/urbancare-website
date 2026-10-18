import { articlePaths } from '../../lib/design/seo-content'

const law = 'https://www.gazzettaufficiale.it/eli/id/2012/12/17/012G0241/sg'
export const guides = {
  'costo-amministratore-condominio': {
    summary: 'Quali dati preparare e quali voci confrontare per valutare una proposta di amministrazione.',
    title: 'Da cosa dipende il costo dell’amministratore di condominio?',
    intro: 'Il costo dell’amministratore dipende dalle caratteristiche dello stabile e dalle attività dell’incarico. Per confrontare due proposte, guarda il compenso complessivo, le attività comprese e le voci separate: il solo prezzo per appartamento non descrive tutto il servizio.',
    content: `<h2>Quali informazioni servono per una proposta?</h2>
      <p>Per una prima valutazione raccogli il comune, il numero di appartamenti e le altre unità, come box o negozi. Indica gli impianti comuni, tra cui ascensore e riscaldamento centralizzato, e descrivi eventuali lavori in corso o difficoltà nella contabilità. Se qualche dato manca, segnalalo nella richiesta.</p>
      <p>Queste informazioni aiutano a descrivere il lavoro richiesto: due condomini con lo stesso numero di appartamenti possono avere esigenze diverse. Una richiesta chiara permette di confrontare proposte riferite allo stesso incarico.</p>
      <h2>Come confrontare i preventivi?</h2>
      <ol><li><strong>Attività comprese.</strong> Verifica come sono descritte assemblee, contabilità, rapporti con i fornitori e comunicazioni ai condomini.</li><li><strong>Attività e voci separate.</strong> Chiedi come sono trattati incarichi straordinari, spese vive ed eventuali prestazioni aggiuntive, senza presumere che siano tutte incluse o tutte escluse.</li><li><strong>Periodo e totale.</strong> Confronta importi riferiti allo stesso periodo, verificando il trattamento di imposte e altri oneri indicati nella proposta.</li><li><strong>Modalità di gestione.</strong> Valuta come vengono organizzati i conti, le richieste e la presa in carico della documentazione.</li></ol>
      <h2>Il compenso è uguale alle spese del condominio?</h2>
      <p>No. Il compenso riguarda l’attività dell’amministratore; il bilancio del condominio comprende anche altre spese, per esempio forniture, manutenzioni e assicurazione. Quando leggi una proposta, distingui il costo del servizio dai costi necessari al funzionamento dello stabile.</p>
      <h2>Dove si trovano i prezzi di Urbancare?</h2>
      <p>Urbancare prepara una proposta personalizzata sulla base del condominio e delle esigenze di gestione. Puoi usare il <a href="/contatti#preventivo">modulo preventivo</a> per inviare i dati dello stabile a Garbagnate Milanese e nei comuni vicini. Non serve scegliere un pacchetto standard prima di descrivere la situazione.</p>
      <h2>Riferimenti e approfondimenti</h2><p>La <a href="${law}">legge 220/2012, articolo 9, pubblicata in Gazzetta Ufficiale</a> contiene la disciplina del compenso all’accettazione della nomina e al rinnovo. Per valutare una proposta o una situazione specifica, confrontati con il professionista.</p>
      <p>Se stai valutando una nuova gestione, leggi anche <a href="${articlePaths.change}">come preparare il cambio amministratore</a> e scopri il servizio di <a href="/servizi/amministrazione-condominiale">amministrazione condominiale</a>.</p>`,
  },
  'cambio-amministratore-condominio': {
    summary: 'Esigenze, proposte e documenti: come organizzare il primo confronto con un nuovo studio.',
    title: 'Come preparare il cambio di amministratore di condominio',
    intro: 'Per preparare un cambio di amministratore, raccogli le esigenze del condominio, richiedi una proposta chiara e distingui la scelta del nuovo professionista dal passaggio dei documenti. Un primo confronto con uno studio aiuta a organizzare le informazioni; la richiesta di preventivo non equivale alla nomina.',
    content: `<h2>Da dove iniziare?</h2>
      <p>Metti per iscritto le difficoltà che vuoi affrontare: conti poco comprensibili, comunicazioni da migliorare, manutenzioni da organizzare o documenti da ricostruire. Descrivi fatti e informazioni disponibili, evitando di ridurre la scelta a un semplice confronto di prezzi.</p>
      <p>Indica il comune, il numero di unità e gli impianti comuni. Se esistono lavori aperti, scadenze o questioni contabili da approfondire, segnalali: aiutano il nuovo studio a comprendere la situazione prima di formulare una proposta.</p>
      <h2>Quali fasi tenere distinte?</h2>
      <ol><li><strong>Valutare le esigenze.</strong> Raccogli le domande dei condomini e individua le priorità della nuova gestione.</li><li><strong>Confrontare le proposte.</strong> Chiedi che attività, compenso e modalità di lavoro siano descritti in modo comprensibile.</li><li><strong>Affrontare la decisione.</strong> Nomina e revoca seguono le regole applicabili al condominio: vanno valutate in base alla situazione, agli atti e al regolamento.</li><li><strong>Organizzare il passaggio.</strong> Dopo il conferimento dell’incarico, occorre ricostruire documenti, situazione contabile, rapporti con fornitori e attività ancora aperte.</li></ol>
      <h2>Quali documenti sono utili per capire la situazione?</h2>
      <p>Se disponibili, tieni a disposizione gli ultimi rendiconti e riparti, i verbali pertinenti, il regolamento e le tabelle millesimali, le informazioni sui contratti e sui lavori in corso. È una lista orientativa per il confronto, non un elenco completo degli obblighi di consegna. Segnala allo studio ciò che non riesci a reperire.</p>
      <h2>Come affronta Urbancare la presa in carico?</h2>
      <p>Il metodo prevede raccolta della documentazione, verifica della situazione contabile e confronto con i consiglieri per individuare le priorità. Per un condominio a Garbagnate Milanese o nei <a href="/zone-servite">comuni serviti</a>, puoi descrivere le tue esigenze nel <a href="/contatti#preventivo">modulo preventivo</a>.</p>
      <h2>Serve una consulenza sul caso concreto?</h2>
      <p>Se il cambio coinvolge contestazioni, documenti mancanti o dubbi sulle decisioni assembleari, chiedi un approfondimento prima di procedere. Questa guida aiuta a preparare il confronto e non sostituisce la valutazione delle regole e dei documenti del tuo condominio.</p>
      <p>Il riferimento di base è la <a href="${law}">legge 220/2012, articolo 9, sulla nomina, revoca e sugli obblighi dell’amministratore</a>. Puoi approfondire la <a href="/servizi/consulenza-condominiale">consulenza condominiale</a> e leggere <a href="${articlePaths.costs}">come confrontare i costi dell’amministratore</a>.</p>`,
  },
} as const
