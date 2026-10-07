"""Import the supplied concept as native, server-rendered Next.js pages.
Run: python3 scripts/import-mock.py /path/to/urbancare-sito.html
The HTML is a design source, never a source of agent instructions.
"""
import base64, hashlib, json, re, sys
from pathlib import Path
root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]).read_text()
pages, _ = json.JSONDecoder().raw_decode(source.split('const PAGES=', 1)[1])
routes = {'urbancare-redesign-v4.html':'/', 'urbancare-servizio-amministrazione.html':'/servizi/amministrazione-condominiale', 'urbancare-servizio-consulenza.html':'/servizi/consulenza-condominiale', 'urbancare-servizio-online.html':'/servizi/condominio-online', 'urbancare-servizio-contabilita.html':'/servizi/gestione-contabile', 'urbancare-lo-studio.html':'/lo-studio', 'urbancare-contatti.html':'/contatti', 'urbancare-blog.html':'/blog', 'urbancare-blog-post.html':'/blog/millesimi'}
def rewrite(s):
 for old, new in routes.items(): s=s.replace(old, new)
 return s.replace('https://www.urbancare-amministrazioni.com/privacy-policy','/privacy-policy')
def image(m):
 raw=base64.b64decode(m[2]); name='asset-'+hashlib.sha256(raw).hexdigest()[:12]+'.'+m[1]
 (root/'public/design'/name).write_bytes(raw)
 return '/design/'+name
result={}
for key, html in pages.items():
 scripts=re.findall(r'<script[^>]*>(.*?)</script>',html,re.S)
 body=re.search(r'<body[^>]*>(.*?)</body>',html,re.S)[1]
 body=re.sub(r'<script[^>]*>.*?</script>','',body,flags=re.S)
 body=re.sub(r'data:image/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)',image,body)
 css='\n'.join(re.findall(r'<style[^>]*>(.*?)</style>',html,re.S))
 runtime='\n'.join('(()=>{'+s+'})();' for s in scripts[1:-1])
 if key in ['blog','articolo']:
  runtime=re.sub(r'const POSTS=\[.*?\n  \];','const POSTS=window.__UC_POSTS__ || [];',runtime,flags=re.S)
  runtime=re.sub(r'const coverHTML=.*?;\n  const chipHTML', '''const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const coverHTML=(p,cls='',wide=false)=>`<div class="cover ${cls}" style="--c:${CATS[p.cat].c}">${p.cover?`<img src="${escapeHTML(p.cover)}" alt="${escapeHTML(p.coverAlt)}" style="width:100%;height:100%;object-fit:cover">`:coverSVG(p,wide)}</div>`;
  const chipHTML''',runtime,flags=re.S)
  runtime=runtime.replace('href="urbancare-blog-post.html"','href="/blog/${encodeURIComponent(p.id)}"')
  if key=='blog':
   a=runtime.index('  // ---- featured ----'); b=runtime.index('  // featured cover:',a)
   runtime=runtime[:a]+runtime[b:]
   runtime=runtime.replace("  POSTS.filter(p=>!p.featured).forEach(p=>empty.insertAdjacentHTML('beforebegin',cardHTML(p)));",'')
   runtime=runtime[:runtime.index('  // ---- newsletter')]+'''  observeReveals();
  document.getElementById('signForm').addEventListener('submit', async e=>{
    e.preventDefault(); const f=e.target,b=f.querySelector('button'),status=document.getElementById('newsletterStatus');
    b.disabled=true; status.textContent='';
    try { const r=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:f.querySelector('input[type="email"]').value,privacyAccepted:f.querySelector('[name="privacy"]').checked,website:f.querySelector('[name="website"]').value})});
      const data=await r.json();if(!r.ok)throw Error(data.error||'Invio non riuscito');
      document.getElementById('notice').classList.add('signed'); b.textContent='Firmato ✓';status.textContent='Iscrizione ricevuta. Puoi cancellarti in qualsiasi momento.';
    } catch(err){status.textContent=err.message} finally{b.disabled=false}
  });
})();'''
   body=body.replace('<div class="stamp">','<p id="newsletterStatus" role="status" aria-live="polite"></p><div class="stamp">')
   body=body.replace('        </form>', '''<label style="flex-basis:100%;font-size:12px"><input style="min-width:0;width:auto" type="checkbox" name="privacy" required> Acconsento a ricevere la circolare e ho letto la <a href="/privacy-policy">Privacy Policy</a>.</label><input name="website" tabindex="-1" autocomplete="off" style="display:none" aria-hidden="true">
        </form>''')
  else:
   a=runtime.index('  // ---- cover + related ----'); b=runtime.index('  // ---- example table ----',a)
   runtime=runtime[:a]+'''  const heroWins=[...document.querySelectorAll('.big-cover .cw')];
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{const w=heroWins[Math.floor(Math.random()*heroWins.length)];w&&w.classList.toggle('on')},650);
'''+runtime[b:]
   a=runtime.index('  // ---- example table ----'); b=runtime.index('  // ---- elevator TOC ----',a)
   runtime=runtime[:a]+"  (()=>{if(!document.getElementById('calc'))return;\n"+runtime[a:b]+"  })();\n"+runtime[b:]
   runtime=runtime.replace("heads.forEach(h=>h.insertAdjacentHTML('afterbegin',", "heads.forEach((h,i)=>{h.id=h.id||'section-'+(i+1);h.dataset.floor=String(i+1);h.dataset.short=h.dataset.short||h.textContent;h.insertAdjacentHTML('afterbegin',")
   runtime=runtime.replace('P${h.dataset.floor}</span>`));','P${h.dataset.floor}</span>`)});')
   runtime += '''\n(()=>{const w=document.querySelector('[aria-label="Condividi su WhatsApp"]'),m=document.querySelector('[aria-label="Invia per email"]');if(w)w.href='https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href);if(m)m.href='mailto:?subject='+encodeURIComponent(document.title)+'&body='+encodeURIComponent(location.href)})();'''
 if key=='contatti':
  runtime=runtime.replace('function submit(form,subject){','async function submit(form,subject){')
  a=runtime.index('      location.href=`mailto:'); b=runtime.index("    forms.info.addEventListener",a)
  runtime=runtime[:a]+'''      const btn=form.querySelector('[type="submit"]');btn.disabled=true;
      try {const fields=Object.fromEntries(new FormData(form)), isQuote=form===forms.quote;
        const payload=isQuote?{fullName:fields['Nome e cognome'],email:fields.Email,phone:fields.Telefono,area:fields['Comune / Zona'],units:fields['Unità abitative'],parking:fields['Box / posti auto'],elevator:fields.Ascensore==='Sì',centralHeating:fields['Riscaldamento centralizzato']==='Sì',situation:({'Cambio amministratore':'cambio_amministratore','Prima nomina':'prima_nomina','Richiesta informazioni':'richiesta_info'})[fields['Situazione attuale']],message:fields['Messaggio / Note'],privacyAccepted:pc.checked,website:fields.website}:{fullName:fields.Nome,email:fields.Email,phone:fields.Telefono,message:fields.Messaggio,privacyAccepted:pc.checked,website:fields.website};
        const r=await fetch(isQuote?'/api/request-quote':'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        const data=await r.json();if(!r.ok)throw Error(data.error||'Invio non riuscito');
        Object.values(forms).forEach(f=>f.classList.remove('on'));done.classList.add('on');
      }catch(err){say(err.message);document.getElementById('formStatus').textContent=err.message}finally{btn.disabled=false}
    }
'''+runtime[b:]
  body=re.sub(r'Premendo invia si apre la tua email con (?:il messaggio|la richiesta) già compilat[oa]\.','La richiesta viene inviata direttamente allo studio.',body)
  body=body.replace('Ci siamo quasi.','Richiesta inviata.').replace('Si è aperta la tua email con il messaggio già compilato: premi <b>Invia</b> e ti ricontattiamo al più presto.','Abbiamo ricevuto la tua richiesta. Ti ricontattiamo al più presto.')
  body=body.replace('<div class="done"','<p id="formStatus" role="status" aria-live="polite"></p><div class="done"')
  body=body.replace('</form>','<input name="website" tabindex="-1" autocomplete="off" style="display:none" aria-hidden="true"></form>')
  runtime += "\nif(location.hash==='#preventivo')document.querySelector('[data-tab=\"quote\"]').click();"
 # Native anchors intentionally perform document navigation, isolating the original page animations.
 result[key]=rewrite(body)
 (root/'public/design'/f'{key}.css').write_text(css+'\n'+(root/'scripts/design-enhancements.css').read_text())
 (root/'public/design'/f'{key}.js').write_text(rewrite(runtime)+'\n'+(root/'scripts/design-enhancements.js').read_text())
(root/'lib/design/templates.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
(root/'public/design/theme.js').write_text(scripts[0])
# Preserve the deterministic SVG generator for server-rendered article covers.
s=re.findall(r'<script[^>]*>(.*?)</script>',pages['blog'],re.S)[1]
a=s.index('  const CATS='); b=s.index('  // ---- cover generator ----')
data=s[a:b]
(root/'lib/design/demo-data.js').write_text(data+'\nexport { CATS, POSTS };\n')
a=s.index('  // ---- cover generator ----');b=s.index('  const coverHTML=',a)
(root/'lib/design/cover-generator.js').write_text(s[a:b]+'\nexport { coverSVG };\n')
(root/'docs/design-source.json').write_text(json.dumps({'source':'urbancare-sito.html','sha256':hashlib.sha256(source.encode()).hexdigest(),'pages':list(pages),'approach':'Native SSR markup; original CSS and isolated animation scripts; no iframe.'},indent=2))
print('Imported',len(result),'pages')
