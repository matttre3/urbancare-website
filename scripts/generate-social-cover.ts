import { mkdir, writeFile } from 'node:fs/promises'
import image from '../lib/OpenGraphImage'
import { socialImage } from '../lib/social-image'

await mkdir('public/social', { recursive: true })
const response = await image()
await writeFile('public' + socialImage.path, Buffer.from(await response.arrayBuffer()))
console.log(`Generated public${socialImage.path} (${socialImage.width}×${socialImage.height}).`)
