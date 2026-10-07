import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Iscritto alla circolare', plural: 'Iscritti alla circolare' },
  admin: { useAsTitle: 'email', description: 'Consensi raccolti dal sito. Invio delle circolari gestito separatamente.' },
  access: { read: adminOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'consentedAt', label: 'Consenso ricevuto', type: 'date', required: true },
    { name: 'consentVersion', label: 'Informativa accettata', type: 'text', required: true },
  ],
}
