import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-static'
export const revalidate = 3600
export const metadata = createPageMetadata({'title': 'Lo studio', 'description': 'Noele Romano: amministrazione condominiale chiara, trasparente e digitale a Milano e provincia.', 'path': '/lo-studio'})
export default function Page() { return <MockPage page="studio" /> }
