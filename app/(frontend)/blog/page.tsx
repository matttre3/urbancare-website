import { publicPages } from '@/lib/seo'
import { MockPage } from '@/components/design/MockPage'
import { getPosts } from '@/lib/cms'
import { blogHTML } from '@/lib/design/render'
import { createPageMetadata } from '@/lib/metadata'
export const dynamic = 'force-static'
export const revalidate = 300
export const metadata = createPageMetadata(publicPages.blog)
export default async function Page() { const posts = await getPosts(); return <MockPage page="blog" posts={posts} html={blogHTML(posts)} /> }
