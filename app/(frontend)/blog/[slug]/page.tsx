import { notFound } from 'next/navigation'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { MockPage } from '@/components/design/MockPage'
import { JsonLd } from '@/components/JsonLd'
import { getPost, getPosts } from '@/lib/cms'
import { articleHTML } from '@/lib/design/render'
import { createPageMetadata } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/site'
import { breadcrumbSchema, shortDescription } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 300
export async function generateStaticParams() {
  return (await getPosts()).map(post => ({ slug: post.id }))
}

type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const meta = createPageMetadata({
    title: post.document?.seo?.title?.trim() || post.t,
    description: shortDescription(post.document?.seo?.description?.trim() || post.x),
    path: '/blog/' + post.id,
    ...(post.cover ? { image: { url: post.cover, alt: post.coverAlt || post.t } } : {}),
  })
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article' as const, publishedTime: post.document?.publishedAt || post.date, modifiedTime: post.document?.updatedAt || post.date, authors: [post.author || 'Noele Romano'] } }
}
export default async function Page({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const content = post.document ? convertLexicalToHTML({ data: post.document.content, disableContainer: true }) : undefined
  const posts = await getPosts()
  const path = '/blog/' + post.id
  const author = post.author || 'Noele Romano'
  return <>
    <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'BlogPosting', '@id': absoluteUrl(path + '#article'), headline: post.t, description: post.x, datePublished: post.document?.publishedAt || post.date, dateModified: post.document?.updatedAt || post.date, author: author === 'Noele Romano' ? { '@id': absoluteUrl('/lo-studio#noele-romano') } : { '@type': 'Person', name: author }, publisher: { '@id': absoluteUrl('/#organization') }, inLanguage: 'it-IT', isAccessibleForFree: true, mainEntityOfPage: absoluteUrl(path), ...(post.cover ? { image: absoluteUrl(post.cover) } : {}) },
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Il Cortile', path: '/blog' }, { name: post.t, path }]),
    ] }} />
    <MockPage page="articolo" posts={posts} html={articleHTML(post, posts, content)} />
  </>
}
