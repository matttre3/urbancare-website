import fs from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {JSDOM} from 'jsdom';
const run=promisify(execFile), out='docs/seo/2026-10-18/evidence',base='https://www.urbancare-amministrazioni.com';
const all=[], seen=new Set();
const clean=s=>(s||'').replace(/\s+/g,' ').trim();
function parse(html,url){
 const d=new JSDOM(html).window.document;let schemas=[],errors=[];
 for(const el of d.querySelectorAll('script[type="application/ld+json"]'))try{schemas.push(JSON.parse(el.textContent))}catch(e){errors.push(e.message)}
 const nodes=schemas.flatMap(x=>x['@graph']||[x]);const main=d.querySelector('main')||d.body;
 const clone=main.cloneNode(true);clone.querySelectorAll('script,style,nav,footer,header').forEach(x=>x.remove());
 const text=clean(clone.textContent);const links=[...d.querySelectorAll('a[href]')].map(a=>({text:clean(a.textContent),href:a.getAttribute('href')}));
 return {url,title:d.title,titleLength:d.title.length,description:d.querySelector('meta[name="description"]')?.content||'',canonical:d.querySelector('link[rel="canonical"]')?.href||'',robots:d.querySelector('meta[name="robots"]')?.content||'',viewport:!!d.querySelector('meta[name="viewport"]'),lang:d.documentElement.lang,h1:[...d.querySelectorAll('h1')].map(x=>clean(x.textContent)),headings:[...d.querySelectorAll('h2,h3')].map(x=>clean(x.textContent)),wordCount:text.split(/\s+/).length,text,links,external:links.filter(l=>/^https?:/.test(l.href)&&!l.href.includes('urbancare-amministrazioni.com')),images:[...d.querySelectorAll('img')].map(x=>({alt:x.getAttribute('alt'),src:x.getAttribute('src')})),schemaTypes:nodes.map(x=>x['@type']),schemas,schemaErrors:errors,ogImage:d.querySelector('meta[property="og:image"]')?.content||'',twitter:d.querySelector('meta[name="twitter:card"]')?.content||'',faqCount:d.querySelectorAll('details').length,tables:d.querySelectorAll('table').length};
}
async function get(path){
 const safe=(path==='/'?'home':path.slice(1).replaceAll('/','__')).replace(/[^a-z0-9_.-]/gi,'_');
 const {stdout}=await run('curl',['-sS','-L','--max-time','30','-A','Mozilla/5.0','-w','\nAUDIT_STATUS:%{http_code}\nAUDIT_URL:%{url_effective}',base+path],{maxBuffer:10*1024*1024});
 const [body,meta]=stdout.split('\nAUDIT_STATUS:');await fs.writeFile(`${out}/live-${safe}.html`,body);
 const status=Number(meta?.split('\n')[0]);const record={path,status,...(body.includes('<html')?parse(body,base+path):{text:body,url:base+path})};all.push(record);return record;
}
const home=await get('/');await get('/robots.txt');const sitemap=await get('/sitemap.xml');
const paths=new Set(['/','/robots.txt','/sitemap.xml']);
function discover(p){for(const l of p.links||[])try{const u=new URL(l.href,base);if(u.origin===base&&!u.search&&!/\.(svg|png|jpg|jpeg|webp|ico|pdf)$/.test(u.pathname)&&!u.pathname.startsWith('/api')&&!u.pathname.startsWith('/admin'))paths.add(u.pathname)}catch{}}
discover(home);for(const m of sitemap.text?.matchAll(/<loc>(.*?)<\/loc>/g)||[]) {const u=new URL(m[1]);if(u.origin===base)paths.add(u.pathname)}
for(let pass=0;pass<20;pass++){const pending=[...paths].filter(p=>!seen.has(p)&&!all.some(x=>x.path===p));if(!pending.length)break;for(let i=0;i<pending.length;i+=4){const batch=await Promise.all(pending.slice(i,i+4).map(async p=>{seen.add(p);try{return await get(p)}catch(e){const x={path:p,status:0,error:e.message};all.push(x);return x}}));batch.forEach(discover)}}
for(const p of ['/blog','/zone-servite','/llms.txt'])if(!all.some(x=>x.path===p))await get(p);
await fs.writeFile(`${out}/live-audit.json`,JSON.stringify(all,null,2));
async function walk(dir){let r=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory())r.push(...await walk(p));else if(p.endsWith('.html')&&!p.includes('/_'))r.push(p)}return r}
const local=[];for(const file of await walk('.next/server/app')){if(file.includes('(payload)'))continue;const html=await fs.readFile(file,'utf8');local.push({file,...parse(html,base+file.replace('.next/server/app','').replace(/\.html$/,'').replace('/index','/'))})}await fs.writeFile(`${out}/local-build-audit.json`,JSON.stringify(local,null,2));
console.log(JSON.stringify({live:all.map(({path,status,title,wordCount,schemaTypes,h1})=>({path,status,title,wordCount,schemaTypes,h1})),local:local.map(({file,title,wordCount,schemaTypes,h1})=>({file,title,wordCount,schemaTypes,h1}))},null,2));
