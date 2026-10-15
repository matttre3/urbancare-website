import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-static'
export const revalidate = 3600
export const metadata = createPageMetadata({'title': 'Condominio online', 'description': 'Verbali, rate e documenti del condominio sempre accessibili online.', 'path': '/servizi/condominio-online'})
export default function Page() { return <MockPage page="online" /> }
