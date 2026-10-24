import { enhanceContactTemplate } from './contact-template'

/** Editorial additions kept separate from imported design templates. */
const quote = '/contatti#preventivo'
export const articlePaths = {
  costs: '/blog/costo-amministratore-condominio',
  change: '/blog/cambio-amministratore-condominio',
} as const

function section(title: string, body: string) {
  return `<section class="seo-section"><div class="label">Il condominio, con chiarezza</div><h2>${title}</h2>${body}</section>`
}
function faq(items: [string, string][]) {
  return `<div class="seo-faq">${items.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('')}</div>`
}
const guideLinks = `<div class="seo-links"><a href="${articlePaths.costs}">Da cosa dipende il costo dell’amministratore →</a><a href="${articlePaths.change}">Come preparare il cambio amministratore →</a></div>`
const sections: Record<string, string> = {
  contatti: section('Come richiedere un preventivo per il condominio', `<p>Per richiedere un preventivo a Urbancare, indica il comune, il numero di unità e le principali esigenze di gestione. Nel modulo puoi specificare anche box, ascensore, riscaldamento e situazione attuale: queste informazioni aiutano lo studio a valutare la richiesta e preparare una proposta personalizzata.</p><h3>Da cosa dipende il compenso?</h3><p>Numero di unità, impianti comuni, attività richieste e situazione contabile aiutano a definire l’incarico. Per confrontare le proposte, verifica quali attività sono comprese nel compenso, quali voci sono separate e come vengono trattati gli incarichi straordinari.</p>${guideLinks}${faq([
    ['Posso chiedere una proposta prima di cambiare amministratore?', 'Sì. Puoi descrivere la situazione del condominio e chiedere una proposta da valutare. La richiesta di informazioni non equivale alla nomina del nuovo amministratore.'],
    ['Devo avere già tutta la documentazione?', 'Per un primo confronto indica i dati che conosci e segnala ciò che manca. La documentazione necessaria alla valutazione dell’incarico può essere individuata insieme allo studio.'],
    ['In quali comuni posso richiedere il servizio?', 'Urbancare segue Garbagnate Milanese, Cesate, Arese, Lainate, Bollate, Senago e Caronno Pertusella. Per Milano e altre zone della provincia, indica il comune nel modulo per valutare l’incarico.'],
  ])}<p><a class="btn primary" href="${quote}">Compila la richiesta di preventivo →</a></p>`),
  amministrazione: section('Le domande prima di scegliere un amministratore', `${faq([
    ['Come si prepara il cambio di amministratore?', `Raccogli le esigenze del condominio e chiedi una proposta che descriva attività e compenso. La scelta del nuovo amministratore e il passaggio di consegne sono fasi distinte: <a href="${articlePaths.change}">leggi come preparare il cambio</a>.`],
    ['Quanto costa l’amministrazione di un condominio?', `La proposta dipende dalle caratteristiche dello stabile e dall’incarico. Un numero di appartamenti, da solo, non descrive impianti, lavori e complessità contabili. <a href="${articlePaths.costs}">Scopri quali voci confrontare</a> e chiedi un preventivo sul tuo condominio.`],
    ['Come inizia la gestione con Urbancare?', 'Il metodo prevede presa in carico della documentazione, verifica della situazione contabile e confronto con i consiglieri per individuare le priorità. Il percorso viene valutato in base alla situazione del condominio.'],
  ])}`),
  consulenza: section('Come preparare una consulenza condominiale', `<p>Descrivi il problema, indica il comune e raccogli i documenti utili a comprenderlo: per esempio un rendiconto, un riparto o un verbale. Segnala eventuali informazioni mancanti, così da chiarire con lo studio quali approfondimenti servono.</p>${faq([
    ['La consulenza è utile prima di scegliere un nuovo amministratore?', `Può aiutare a mettere a fuoco le difficoltà di gestione e le esigenze da presentare ai nuovi studi. <a href="${articlePaths.change}">Consulta la guida al cambio amministratore</a>.`],
    ['Posso chiedere chiarimenti su una spesa?', 'Puoi descrivere la voce contestata o poco chiara e indicare il documento in cui compare. Per valutare un riparto servono il tipo di spesa, le tabelle applicate e la documentazione del condominio.'],
  ])}<p><a href="/contatti">Descrivi la tua esigenza allo studio →</a></p>`),
  contabilita: section('Come leggere i conti del condominio', `<p>Per comprendere una quota, parti dalla voce di spesa, dal periodo a cui si riferisce e dal criterio di ripartizione applicato. Il totale da pagare può includere rate, conguagli e saldi precedenti: controllare soltanto i millesimi non basta a ricostruire ogni importo.</p>${faq([
    ['Che differenza c’è tra preventivo e consuntivo?', 'Il preventivo stima le spese da affrontare; il consuntivo riepiloga la gestione trascorsa. Confrontarli aiuta a individuare scostamenti da chiarire, senza confondere una previsione con una spesa già sostenuta.'],
    ['Cosa serve per chiedere un chiarimento sul riparto?', 'Indica la voce, l’esercizio di riferimento e la quota che vuoi comprendere. Tieni a disposizione il prospetto del riparto e, se disponibili, la tabella applicata e i documenti della spesa.'],
  ])}<p><a href="/contatti">Chiedi un chiarimento sulla gestione contabile →</a></p>`),
  online: section('Domande sull’area personale', faq([
    ['Cosa posso consultare nell’area personale Urbancare?', 'L’area personale permette ai condomini amministrati di consultare le rate e ricevere le comunicazioni del condominio. Per chiarimenti sui conti o per richiedere documenti, contatta lo studio.'],
    ['Come richiedo assistenza per l’accesso?', 'Contatta Urbancare usando i recapiti nella pagina contatti. Non inviare password o credenziali nel modulo: descrivi il problema di accesso e il condominio di riferimento.'],
  ])),
  home: section('Stai valutando un nuovo amministratore?', `<p>Per il tuo condominio a Garbagnate Milanese e nei comuni vicini, parti dalle esigenze concrete: conti da chiarire, comunicazioni da organizzare o un passaggio di gestione da preparare. Queste guide ti aiutano a fare le prime domande.</p>${guideLinks}`),
}

export function enhancePageTemplate(page: string, html: string) {
  if (page === 'contatti') html = enhanceContactTemplate(html)
  // Align the studio's method with the confirmed portal features everywhere.
  html = html.replaceAll('Digitalizziamo tutta la contabilità e la documentazione condominiale, rendendola accessibile online ai condomini.', 'Organizziamo la contabilità e la documentazione del condominio. Nell’area personale sono disponibili le rate e le comunicazioni; per consultare altri documenti puoi rivolgerti allo studio.')
  const content = sections[page]
  if (!content) return html
  const before = html.includes('<section class="cta-band">') ? '<section class="cta-band">' : html.includes('<section class="cta-section"') ? '<section class="cta-section"' : '<footer>'
  return html.replace(before, content + '\n' + before)
}
