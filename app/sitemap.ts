import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { getPosts } from '@/lib/cms'
export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes=['/','/servizi','/servizi/gestione-contabile','/servizi/amministrazione-condominiale','/servizi/consulenza-condominiale','/servizi/condominio-online','/contatti','/lo-studio','/privacy-policy','/blog']
  return [
    ...routes.map(path=>({url:absoluteUrl(path),changeFrequency:'monthly' as const,priority:path==='/'?1:0.7})),
    ...(await getPosts()).map(p=>({url:absoluteUrl('/blog/'+p.id),lastModified:new Date(p.document?.updatedAt || p.date),changeFrequency:'monthly' as const,priority:0.6})),
  ]
}
