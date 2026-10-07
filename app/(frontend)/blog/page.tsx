import { MockPage } from '@/components/design/MockPage'
import { getPosts } from '@/lib/cms'
import { blogHTML } from '@/lib/design/render'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({ title: 'Il Cortile — Blog', description: 'Guide, conti e vita in condominio: il blog di UrbanCare.', path: '/blog' })
export default async function Page() { const posts = await getPosts(); return <MockPage page="blog" posts={posts} html={blogHTML(posts)} /> }
