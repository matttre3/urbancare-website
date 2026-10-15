import { notFound } from 'next/navigation'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { MockPage } from '@/components/design/MockPage'
import { JsonLd } from '@/components/JsonLd'
import { getPost, getPosts } from '@/lib/cms'
import { articleHTML } from '@/lib/design/render'
import { createPageMetadata } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/site'
export const dynamic = 'force-static'
export const revalidate = 300
export async function generateStaticParams() {
  return (await getPosts()).map(post => ({ slug: post.id }))
}

type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) return { title: 'Articolo non trovato' }
  const meta=createPageMetadata({title:post.document?.seo?.title || post.t,description:post.document?.seo?.description || post.x,path:'/blog/'+post.id})
  return {...meta,openGraph:{...meta.openGraph,type:'article' as const,publishedTime:post.document?.publishedAt || post.date,...(post.cover?{images:[{url:post.cover,alt:post.coverAlt || post.t}]}:{})}}
}
export default async function Page({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const content = post.document ? convertLexicalToHTML({ data: post.document.content, disableContainer: true }) : undefined
  const posts = await getPosts()
  return <>
    <JsonLd data={{ '@context':'https://schema.org','@type':'BlogPosting',headline:post.t,description:post.x,datePublished:post.document?.publishedAt || post.date,dateModified:post.document?.updatedAt || post.date,author:{'@type':'Person',name:post.author || 'Noele Romano'},mainEntityOfPage:absoluteUrl('/blog/'+post.id),...(post.cover?{image:post.cover}:{}) }} />
    <MockPage page="articolo" posts={posts} html={articleHTML(post,posts,content)} />
  </>
}
