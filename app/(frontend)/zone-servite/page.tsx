import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
import { publicPages } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { shell } from '@/lib/design/render'

export const dynamic = 'force-static'
export const revalidate = 3600
export const metadata = createPageMetadata(publicPages.zones)

export default function Page() {
  const content = `<main class="legal zones">
    <div class="crumb"><a href="/">Home</a> / Zone servite</div>
    <header><div class="label">Dove operiamo</div><h1>Amministrazione condominiale a Garbagnate Milanese e dintorni.</h1>
    <p class="lead">Urbancare segue la gestione dei condomini a Garbagnate Milanese e nei comuni vicini, con contabilità chiara, organizzazione dei fornitori e comunicazione con i condomini.</p></header>
    <h2>I comuni che seguiamo</h2>
    <ul>${siteConfig.localAreas.map(name => `<li>${name}</li>`).join('')}</ul>
    <p>Garbagnate Milanese è il nostro riferimento principale. Operiamo anche nell’hinterland nord-ovest, a Milano e in provincia: contattaci indicando il comune e le esigenze del condominio, così da valutare insieme l’incarico.</p>
    <h2>Di cosa ha bisogno il tuo condominio?</h2>
    <p>Puoi approfondire il servizio di <a href="/servizi/amministrazione-condominiale">amministrazione condominiale</a>, chiedere una <a href="/servizi/consulenza-condominiale">consulenza</a> o conoscere la <a href="/servizi/gestione-contabile">gestione contabile</a>. Per i condomini amministrati è disponibile l’<a href="/servizi/condominio-online">area personale con rate e comunicazioni</a>.</p>
    <h2>Vuoi cambiare amministratore?</h2>
    <p>Per un primo confronto indicaci il comune, il numero indicativo di unità e le principali difficoltà di gestione. Il Dott. Noele Romano valuterà con te le esigenze del condominio e la proposta di amministrazione.</p>
    <div class="actions"><a class="btn primary" href="/contatti#preventivo">Richiedi un preventivo →</a><a class="btn ghost" href="/contatti">Contatta Urbancare →</a></div>
  </main>`
  return <MockPage page="articolo" shellOnly seo="zones" html={shell(content)} />
}
