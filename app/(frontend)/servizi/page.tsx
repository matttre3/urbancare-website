import { MockPage } from '@/components/design/MockPage'
import { template, shell } from '@/lib/design/render'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic='force-dynamic'
export const metadata=createPageMetadata({title:'Servizi',description:'Amministrazione, consulenza, contabilità e portale online per il tuo condominio.',path:'/servizi'})
export default function Page(){const home=template('home');const start=home.indexOf('<section class="services"');const end=home.indexOf('</section>',start)+10;return <MockPage page="home" shellOnly html={shell('<main style="padding-top:130px">'+home.slice(start,end).replace('<h2>', '<h1 style="font-size:clamp(42px,5.6vw,88px);line-height:.98">').replace('</h2>','</h1>')+'</main>')} />}
