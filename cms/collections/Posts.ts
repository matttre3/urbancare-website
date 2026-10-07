import type { CollectionConfig } from 'payload'
import { authenticated, published } from '../access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Articolo', plural: 'Articoli' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', '_status', 'publishedAt'] },
  access: { read: published, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: { autosave: true }, maxPerDoc: 30 },
  fields: [
    { name: 'title', label: 'Titolo', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      validate: (value: unknown) => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || 'Usa lettere minuscole, numeri e trattini.' },
    { name: 'excerpt', label: 'Introduzione', type: 'textarea', required: true, maxLength: 500 },
    { name: 'category', label: 'Categoria', type: 'select', required: true, defaultValue: 'guide', options: [
      { label: 'Guide', value: 'guide' }, { label: 'Normativa', value: 'normativa' },
      { label: 'Conti & bilanci', value: 'conti' }, { label: 'Manutenzione', value: 'manutenzione' },
      { label: 'Vita in condominio', value: 'vita' }, { label: 'Digitale', value: 'digitale' },
    ] },
    { name: 'cover', label: 'Immagine di copertina (facoltativa)', type: 'upload', relationTo: 'media' },
    { name: 'illustration', label: 'SVG animato se non scegli una foto', type: 'select', defaultValue: 'facade', options: [
      { label: 'Facciata', value: 'facade' }, { label: 'Ringhiera', value: 'ringhiera' },
      { label: 'Contabilità', value: 'blocks' }, { label: 'Tetti', value: 'roofs' },
      { label: 'Scale', value: 'stairs' }, { label: 'Oblò', value: 'oculus' },
    ] },
    { name: 'author', label: 'Autore', type: 'text', defaultValue: 'Noele Romano', required: true },
    { name: 'readTime', label: 'Minuti di lettura', type: 'number', defaultValue: 5, min: 1, max: 60, required: true },
    { name: 'featured', label: 'In evidenza', type: 'checkbox', defaultValue: false },
    { name: 'publishedAt', label: 'Data di pubblicazione', type: 'date', required: true, defaultValue: () => new Date().toISOString() },
    { name: 'content', label: 'Contenuto', type: 'richText', required: true },
    { name: 'calculator', label: 'Includi il calcolatore millesimi', type: 'checkbox', defaultValue: false },
    { name: 'seo', label: 'SEO', type: 'group', fields: [
      { name: 'title', label: 'Titolo per i motori di ricerca', type: 'text' },
      { name: 'description', label: 'Descrizione', type: 'textarea', maxLength: 160 },
    ] },
  ],
}
