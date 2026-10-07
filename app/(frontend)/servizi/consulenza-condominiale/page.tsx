import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({'title': 'Consulenza condominiale', 'description': 'Supporto per dubbi e situazioni complesse nel tuo condominio.', 'path': '/servizi/consulenza-condominiale'})
export default function Page() { return <MockPage page="consulenza" /> }
