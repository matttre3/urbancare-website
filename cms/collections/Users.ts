import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utente', plural: 'Utenti' },
  admin: { useAsTitle: 'name' },
  auth: { maxLoginAttempts: 5, lockTime: 600000 },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: adminOnly,
    read: ({ req }) => !req.user ? false : req.user.role === 'admin' ? true : { id: { equals: req.user.id } },
    update: ({ req }) => !req.user ? false : req.user.role === 'admin' ? true : { id: { equals: req.user.id } },
    delete: adminOnly,
  },
  fields: [
    { name: 'name', label: 'Nome', type: 'text', required: true },
    { name: 'role', label: 'Ruolo', type: 'select', defaultValue: 'admin', required: true,
      options: [{ label: 'Amministratore', value: 'admin' }, { label: 'Redattore', value: 'editor' }],
      access: { create: ({ req }) => req.user?.role === 'admin', update: ({ req }) => req.user?.role === 'admin' },
    },
  ],
}
