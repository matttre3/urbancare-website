import { MockPage } from '@/components/design/MockPage'
import { createPageMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, siteConfig } from '@/lib/site'
export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({'title': 'Amministratore condominiale Milano', 'description': 'Gestione trasparente, strumenti digitali e supporto dedicato per il tuo condominio.', 'path': '/'})
export default function Page() { return <>
  <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: siteConfig.name, legalName: siteConfig.legalName, url: absoluteUrl('/'), logo: absoluteUrl('/horizontal-logo.svg'), telephone: siteConfig.phone, email: siteConfig.email, address: { '@type': 'PostalAddress', addressLocality: siteConfig.location, addressRegion: siteConfig.region, addressCountry: 'IT' }, areaServed: siteConfig.areaServed, founder: { '@type': 'Person', name: 'Noele Romano' } }} />
  <MockPage page="home" />
</> }
