import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({'title': 'Amministrazione condominiale', 'description': 'Gestione condominiale trasparente a Milano e provincia.', 'path': '/servizi/amministrazione-condominiale'})
export default function Page() { return <MockPage page="amministrazione" /> }
