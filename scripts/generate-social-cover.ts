import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import image from '../lib/OpenGraphImage'
import { socialImage } from '../lib/social-image'

await mkdir('public/social', { recursive: true })

// Freeze the actual hero illustration, including its seeded buildings and U mark.
const templates = JSON.parse(await readFile('lib/design/templates.json', 'utf8'))
const dom = new JSDOM(templates.home, { runScripts: 'outside-only' })
dom.window.matchMedia = (() => ({ matches: true })) as unknown as typeof dom.window.matchMedia
const heroScript = await readFile('public/design/home.js', 'utf8')
const boundary = heroScript.indexOf('\n(()=>{\n    const progress')
if (boundary < 0) throw new Error('Hero illustration script boundary not found')
dom.window.eval(heroScript.slice(0, boundary))
const city = dom.window.document.querySelector<SVGElement>('#city')
if (!city?.querySelector('.bg-mark')) throw new Error('Hero U mark missing')
const css = await readFile('public/design/home.css', 'utf8')
const tokenStart = css.indexOf('/* city:')
const rulesStart = css.indexOf('.city .facade')
const tokens = Object.fromEntries([...css.slice(tokenStart, rulesStart).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(match => [match[1], match[2]]))
const rules = css.slice(rulesStart, css.indexOf('/* intro:'))
const style = dom.window.document.createElementNS('http://www.w3.org/2000/svg', 'style')
style.textContent = rules
city.prepend(style)
city.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
city.setAttribute('viewBox', '0 -220 1100 1000')
city.setAttribute('width', '1100')
city.setAttribute('height', '1000')
city.removeAttribute('id')
const frozen = city.outerHTML.replace(/var\((--[\w-]+)\)/g, (_, token: string) => {
  if (!(token in tokens)) throw new Error(`Unknown hero color: ${token}`)
  return tokens[token]
})
await writeFile('public/social/hero-neighbourhood.svg', frozen)
dom.window.close()

const response = await image()
await writeFile('public' + socialImage.path, Buffer.from(await response.arrayBuffer()))
console.log(`Generated public${socialImage.path} (${socialImage.width}×${socialImage.height}).`)
