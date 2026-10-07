import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'
import sharp from 'sharp'
if (!process.argv[2]) throw Error('Usage: pnpm exec tsx scripts/check-design.ts /path/to/urbancare-sito.html')
const source = await readFile(process.argv[2], 'utf8')
const raw = source.match(/const PAGES=(\{[\s\S]*\});\s*const frames/)?.[1]
if (!raw) throw Error('Mock pages not found')
const pages = JSON.parse(raw) as Record<string,string>
const output = '/private/tmp/urbancare-review'
await mkdir(output,{recursive:true})
const browser = await chromium.launch()
const report:unknown[]=[]
try {
 for (const width of [1440,390]) {
  const context = await browser.newContext({viewport:{width,height:width===1440?1000:844},colorScheme:'dark'})
  for (const [key,route] of [['home','/'],['amministrazione','/servizi/amministrazione-condominiale'],['studio','/lo-studio']] as const) {
   const shapes:unknown[]=[]
   for(const mode of ['reference','native']){
    const page=await context.newPage()
    if(mode==='reference')await page.route('**/reference.html',r=>r.fulfill({status:200,contentType:'text/html',body:pages[key]}))
    await page.goto('http://127.0.0.1:3100'+(mode==='reference'?'/reference.html':route))
    await page.evaluate(()=>document.fonts.ready)
    await page.waitForTimeout(3400)
    shapes.push(await page.evaluate(()=>['nav','h1','.hero-copy','.p-hero','.profile-grid'].map(selector=>{const el=document.querySelector(selector);if(!el)return null;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {selector,x:r.x,y:r.y,width:r.width,height:r.height,font:s.fontFamily,size:s.fontSize}})))
    await page.screenshot({path:`${output}/${key}-${width}-${mode}.png`,animations:'disabled'})
    await page.close()
   }
   const a=await sharp(`${output}/${key}-${width}-reference.png`).removeAlpha().raw().toBuffer()
   const b=await sharp(`${output}/${key}-${width}-native.png`).removeAlpha().raw().toBuffer()
   let difference=0
   for(let i=0;i<a.length;i++)difference+=Math.abs(a[i]-b[i])
   const result={key,width,meanChannelDifference:difference/a.length,shapes}
   report.push(result)
   console.log(JSON.stringify(result))
  }
  await context.close()
 }
 await writeFile(`${output}/comparison.json`,JSON.stringify(report,null,2))
}finally{await browser.close()}
