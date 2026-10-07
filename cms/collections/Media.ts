import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Immagine', plural: 'Immagini' },
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  upload: {
    disableLocalStorage: Boolean(process.env.VERCEL),
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    imageSizes: [{ name: 'card', width: 880, height: 560 }, { name: 'hero', width: 1600 }],
    adminThumbnail: 'card',
  },
  hooks: { beforeOperation: [({ operation }) => {
    if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN && (operation === 'create' || operation === 'update')) {
      throw new Error('Configura BLOB_READ_WRITE_TOKEN per gestire le immagini su Vercel.')
    }
  }] },
  fields: [
    { name: 'alt', label: 'Testo alternativo', type: 'text', required: true },
    { name: 'caption', label: 'Didascalia', type: 'text' },
  ],
}
