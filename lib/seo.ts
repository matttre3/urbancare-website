import { absoluteUrl, siteConfig } from './site'
import type { SiteSetting } from '@/payload-types'

export const publicPages = {
  home: { path: '/', title: 'Amministratore di condominio a Garbagnate Milanese', description: 'Urbancare segue il tuo condominio a Garbagnate Milanese e nei comuni vicini: contabilità chiara, fornitori e comunicazioni. Richiedi un preventivo.' },
  services: { path: '/servizi', title: 'Servizi di amministrazione condominiale', description: 'Amministrazione, consulenza, gestione contabile e area personale per i condomini. Scopri i servizi Urbancare a Garbagnate Milanese e nei comuni vicini.' },
  amministrazione: { path: '/servizi/amministrazione-condominiale', title: 'Amministrazione condominiale a Garbagnate Milanese', description: 'Assemblee, coordinamento dei fornitori e rendiconto annuale per il tuo condominio a Garbagnate Milanese. Scopri il metodo Urbancare.' },
  consulenza: { path: '/servizi/consulenza-condominiale', title: 'Consulenza condominiale a Garbagnate Milanese', description: 'Supporto sui problemi di gestione e sul cambio di amministratore. Contatta Urbancare per una consulenza a Garbagnate Milanese e nei comuni vicini.' },
  contabilita: { path: '/servizi/gestione-contabile', title: 'Gestione contabile condominiale', description: 'Rendiconto, ripartizione delle spese e controllo dei pagamenti. Scopri la gestione contabile Urbancare a Garbagnate Milanese e nei comuni vicini.' },
  online: { path: '/servizi/condominio-online', title: 'Rate e comunicazioni condominiali online', description: 'Consulta le rate e ricevi le comunicazioni del tuo condominio nell’area personale Urbancare. Scopri come accedere e contattare l’amministratore.' },
  studio: { path: '/lo-studio', title: 'Dott. Noele Romano, amministratore a Garbagnate Milanese', description: 'Conosci il Dott. Noele Romano e il metodo Urbancare: organizzazione, contabilità chiara e comunicazione con i condomini di Garbagnate Milanese e dintorni.' },
  contatti: { path: '/contatti', title: 'Preventivo amministratore a Garbagnate Milanese', description: 'Contatta Urbancare per informazioni o un preventivo di amministrazione condominiale a Garbagnate Milanese e dintorni. Telefono, email e modulo online.' },
  blog: { path: '/blog', title: 'Il Cortile: guide sulla gestione del condominio', description: 'Guide su spese, gestione e vita in condominio, con gli approfondimenti dell’amministratore Dott. Noele Romano. Leggi il blog di Urbancare.' },
  zones: { path: '/zone-servite', title: 'Garbagnate Milanese e comuni serviti', description: 'Urbancare segue condomini a Garbagnate Milanese, Cesate, Arese, Lainate, Bollate, Senago e Caronno Pertusella, oltre a Milano e provincia.' },
  privacy: { path: '/privacy-policy', title: 'Privacy Policy', description: 'Informativa sul trattamento dei dati personali dei visitatori del sito Urbancare.' },
} as const
export type PublicPage = keyof typeof publicPages

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return { '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absoluteUrl(item.path) })) }
}

// There is no confirmed public office/address. Describe the real organization
// and its service areas without inventing a LocalBusiness address or hours.
export function siteStructuredData(settings?: SiteSetting, page?: PublicPage) {
  const organization = absoluteUrl('/#organization')
  const person = absoluteUrl('/lo-studio#noele-romano')
  const graph: Record<string, unknown>[] = [
    { '@type': 'Organization', '@id': organization, name: siteConfig.name, url: absoluteUrl('/'), logo: absoluteUrl('/horizontal-logo.svg'), email: settings?.email || siteConfig.email, telephone: settings?.phone || siteConfig.phone, areaServed: siteConfig.areaServed.map(name => ({ '@type': 'Place', name })), founder: { '@id': person } },
    { '@type': 'Person', '@id': person, name: 'Noele Romano', honorificPrefix: 'Dott.', jobTitle: 'Amministratore di condominio', url: absoluteUrl('/lo-studio'), image: absoluteUrl('/design/noele-romano.webp'), worksFor: { '@id': organization } },
    { '@type': 'WebSite', '@id': absoluteUrl('/#website'), url: absoluteUrl('/'), name: siteConfig.name, inLanguage: 'it-IT', publisher: { '@id': organization } },
  ]
  if (page) {
    const entry = publicPages[page]
    const isService = ['amministrazione', 'consulenza', 'contabilita', 'online'].includes(page)
    graph.push({ '@type': page === 'studio' ? 'AboutPage' : page === 'contatti' ? 'ContactPage' : ['services', 'blog'].includes(page) ? 'CollectionPage' : 'WebPage', '@id': absoluteUrl(entry.path + '#webpage'), url: absoluteUrl(entry.path), name: entry.title, description: entry.description, inLanguage: 'it-IT', isPartOf: { '@id': absoluteUrl('/#website') }, about: { '@id': page === 'studio' ? person : organization }, ...(isService ? { mainEntity: { '@id': absoluteUrl(entry.path + '#service') } } : {}) })
    if (isService) graph.push({ '@type': 'Service', '@id': absoluteUrl(entry.path + '#service'), name: entry.title, description: entry.description, url: absoluteUrl(entry.path), provider: { '@id': organization }, areaServed: siteConfig.areaServed.map(name => ({ '@type': 'Place', name })) })
    if (page !== 'home') graph.push(breadcrumbSchema([{ name: 'Home', path: '/' }, ...(isService ? [{ name: 'Servizi', path: '/servizi' }] : []), { name: entry.title, path: entry.path }]))
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function shortDescription(text: string) {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length <= 160 ? clean : clean.slice(0, 157).replace(/\s+\S*$/, '') + '…'
}
