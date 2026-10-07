import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({'title': 'Contatti e preventivo', 'description': 'Contatta UrbanCare per informazioni o un preventivo per il tuo condominio.', 'path': '/contatti'})
export default function Page() { return <MockPage page="contatti" /> }
