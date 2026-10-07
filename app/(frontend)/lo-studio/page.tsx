import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({'title': 'Lo studio', 'description': 'Noele Romano: amministrazione condominiale chiara, trasparente e digitale a Milano e provincia.', 'path': '/lo-studio'})
export default function Page() { return <MockPage page="studio" /> }
