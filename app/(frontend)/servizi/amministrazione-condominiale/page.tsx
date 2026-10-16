import { publicPages } from '@/lib/seo'
import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-static'
export const revalidate = 3600
export const metadata = createPageMetadata(publicPages.amministrazione)
export default function Page() { return <MockPage page="amministrazione" /> }
