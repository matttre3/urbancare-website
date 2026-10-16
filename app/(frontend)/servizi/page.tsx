import { publicPages } from '@/lib/seo'
import { MockPage } from '@/components/design/MockPage'
import { template, shell } from '@/lib/design/render'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-static'
export const revalidate = 3600
export const metadata = createPageMetadata(publicPages.services)
export default function Page(){const home=template('home');const start=home.indexOf('<section class="services"');const end=home.indexOf('</section>',start)+10;return <MockPage page="home" shellOnly seo="services" html={shell('<main style="padding-top:130px">'+home.slice(start,end).replace('<h2>', '<h1 style="font-size:clamp(42px,5.6vw,88px);line-height:.98">').replace('</h2>','</h1>').replace('Un unico studio.<br>Più livelli di <span class="accent">cura.</span>','Servizi di amministrazione<br><span class="accent">condominiale.</span>').replaceAll('<h3>','<h2 class="service-title">').replaceAll('</h3>','</h2>')+'</main>')} />}
