import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'
import { it } from '@payloadcms/translations/languages/it'
import { Users } from './cms/collections/Users'
import { Media } from './cms/collections/Media'
import { Posts } from './cms/collections/Posts'
import { Subscribers } from './cms/collections/Subscribers'
import { SiteSettings } from './cms/globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  i18n: { fallbackLanguage: 'it', supportedLanguages: { it } },
  admin: { user: Users.slug, importMap: { baseDir: dirname } },
  collections: [Users, Media, Posts, Subscribers],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '', max: 3, connectionTimeoutMillis: 10000 },
    push: false,
    migrationDir: path.resolve(dirname, 'cms/migrations'),
  }),
  plugins: [vercelBlobStorage({
    enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    alwaysInsertFields: true,
    collections: { media: true },
    token: process.env.BLOB_READ_WRITE_TOKEN,
    clientUploads: { access: ({ req }) => Boolean(req.user) },
    addRandomSuffix: true,
  })],
  ...(process.env.RESEND_API_KEY ? { email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY,
    defaultFromAddress: process.env.CMS_FROM_EMAIL || 'cms@urbancare-amministrazioni.com',
    defaultFromName: 'UrbanCare',
  }) } : {}),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
