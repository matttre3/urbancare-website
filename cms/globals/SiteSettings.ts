import type { GlobalConfig } from 'payload'
import { authenticated } from '../access'
import { siteConfig } from '../../lib/site'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings', label: 'Contatti dello studio',
  access: { read: () => true, update: authenticated },
  fields: [
    { name: 'email', type: 'email', defaultValue: siteConfig.email, required: true },
    { name: 'pec', label: 'PEC', type: 'email', defaultValue: siteConfig.pec, required: true },
    { name: 'phone', label: 'Telefono', type: 'text', defaultValue: siteConfig.phone, required: true },
    { name: 'location', label: 'Comune', type: 'text', defaultValue: siteConfig.location, required: true },
    { name: 'portalUrl', label: 'Area personale', type: 'text', defaultValue: 'https://condomini.baslab.it/auth/login/BAS20559',
      validate: (v: unknown) => typeof v === 'string' && /^https:\/\//.test(v) || 'Inserisci un URL HTTPS.' },
  ],
}
