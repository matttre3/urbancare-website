import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Post, SiteSetting } from '@/payload-types'
import { POSTS } from '@/lib/design/demo-data'

export type BlogPost = {
  id: string; cat: Post['category']; v: string; date: string; min: number;
  featured?: boolean; t: string; x: string; author?: string;
  cover?: string; coverAlt?: string; document?: Post;
}
export const cms = cache(async () => {
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) throw new Error('Configura DATABASE_URL e PAYLOAD_SECRET per usare il CMS.')
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Configura Vercel Blob prima di usare il CMS su Vercel.')
  return getPayload({ config })
})
function normalize(p: Post): BlogPost {
  const cover = p.cover && typeof p.cover === 'object' ? p.cover : undefined
  return {
    id: p.slug, cat: p.category, v: p.illustration || 'facade',
    date: p.publishedAt.slice(0, 10), min: p.readTime, featured: Boolean(p.featured),
    t: p.title, x: p.excerpt, author: p.author,
    cover: cover?.sizes?.hero?.url || cover?.url || undefined, coverAlt: cover?.alt, document: p,
  }
}
export const getPosts = cache(async (): Promise<BlogPost[]> => {
  // Mock data is available locally and in unconfigured previews only.
  if (!process.env.DATABASE_URL) return process.env.VERCEL_ENV === 'production' ? [] : POSTS as BlogPost[]
  const result = await (await cms()).find({ collection: 'posts', depth: 2, limit: 1000, sort: '-publishedAt', overrideAccess: false, pagination: false })
  return result.docs.map(normalize)
})
export const getPost = cache(async (slug: string): Promise<BlogPost | undefined> => {
  if (!process.env.DATABASE_URL) return (await getPosts()).find(p => p.id === slug)
  const result = await (await cms()).find({ collection: 'posts', where: { slug: { equals: slug } }, depth: 2, limit: 1, overrideAccess: false })
  return result.docs[0] ? normalize(result.docs[0]) : undefined
})
export const getSiteSettings = cache(async (): Promise<SiteSetting | undefined> => {
  if (!process.env.DATABASE_URL) return undefined
  return (await cms()).findGlobal({ slug: 'site-settings', overrideAccess: false })
})
