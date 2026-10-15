import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-static'
export const revalidate = 3600
export const metadata = createPageMetadata({'title': 'Gestione contabile', 'description': 'Conti chiari, rendiconti leggibili e riparti trasparenti.', 'path': '/servizi/gestione-contabile'})
export default function Page() { return <MockPage page="contabilita" /> }
