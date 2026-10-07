(()=>{
  // ---- theme ----
  const themeMeta=document.querySelector('meta[name="theme-color"]');
  const applyTheme=t=>{document.documentElement.dataset.theme=t;themeMeta.content=t==='light'?'#f3f4ef':'#08111f'};
  applyTheme(document.documentElement.dataset.theme||'dark');
  document.querySelector('.theme-toggle').addEventListener('click',()=>{
    const t=document.documentElement.dataset.theme==='light'?'dark':'light';
    applyTheme(t);try{localStorage.setItem('uc-theme',t)}catch(e){}
  });

  // ---- progress + reveal ----
  const progress=document.getElementById('progress');
  addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h?scrollY/h*100:0)+'%'},{passive:true});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'});
  const observeReveals=root=>(root||document).querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));

  // ---- data ----
  const CATS={
    guide:{name:'Guide',c:'#3557c8'},
    normativa:{name:'Normativa',c:'#6a55c9'},
    conti:{name:'Conti & bilanci',c:'#2e8a73'},
    manutenzione:{name:'Manutenzione',c:'#c8683a'},
    vita:{name:'Vita in condominio',c:'#c9922e'},
    digitale:{name:'Digitale',c:'#2f8fc4'}
  };
  const POSTS=[
    {id:'millesimi',cat:'guide',v:'facade',date:'2026-09-24',min:7,featured:true,
     t:'Millesimi, spiegati bene.',x:'Come si divide davvero una spesa condominiale, e perché la tua quota non è mai un numero a caso. Con un calcolatore per provare subito.'},
    {id:'caldaia',cat:'manutenzione',v:'oculus',date:'2026-09-16',min:4,
     t:'Riscaldamento centralizzato: prepararsi all’accensione',x:'Controlli, letture dei contabilizzatori e cosa comunicare ai condomini prima che arrivi il freddo.'},
    {id:'assemblea',cat:'vita',v:'ringhiera',date:'2026-09-10',min:6,
     t:'Assemblea condominiale: come si prepara (e come si sopravvive)',x:'Ordine del giorno, deleghe, verbale: la checklist per un’assemblea breve e senza sorprese.'},
    {id:'rendiconto',cat:'conti',v:'blocks',date:'2026-09-03',min:5,
     t:'Leggere il rendiconto in 10 minuti',x:'Le tre voci da guardare per prime e le domande da fare all’amministratore se qualcosa non torna.'},
    {id:'bonus',cat:'normativa',v:'roofs',date:'2026-08-27',min:6,
     t:'Bonus edilizi: cosa resta per le parti comuni',x:'Una mappa delle agevolazioni ancora disponibili per i lavori condominiali e le verifiche da fare prima di deliberare.'},
    {id:'ascensore',cat:'manutenzione',v:'stairs',date:'2026-08-20',min:4,
     t:'Ascensore fermo: chi paga, chi decide, quanto aspettare',x:'Dalla chiamata al manutentore alla ripartizione della spesa: cosa succede davvero quando l’ascensore si blocca.'},
    {id:'portale',cat:'digitale',v:'oculus',date:'2026-08-06',min:3,
     t:'Il portale online del tuo condominio, passo passo',x:'Dove trovare verbali, rate e documenti, e come ricevere le comunicazioni senza cercarle nella cassetta della posta.'},
    {id:'morosita',cat:'normativa',v:'facade',date:'2026-07-23',min:6,
     t:'Morosità: cosa succede quando un condomino non paga',x:'I passaggi previsti, i tempi e perché intervenire presto conviene a tutto il condominio.'},
    {id:'regolamento',cat:'vita',v:'roofs',date:'2026-07-09',min:5,
     t:'Rumori, animali, parcheggi: il regolamento senza drammi',x:'Cosa dice di solito il regolamento, cosa non può vietare e come si risolve un conflitto prima dell’assemblea.'}
  ];
  const fmtDate=d=>new Date(d+'T12:00:00').toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});

  // ---- cover generator ----
  let coverUid=0;
  function rng(seed){let s=0;for(const ch of seed)s=(s*31+ch.charCodeAt(0))|0;return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function coverSVG(post,wide){
    const r=rng(post.id), id='cg'+(coverUid++), W=wide?880:400, H=wide?360:260, ox=(W-400)/2, oy=H-260;
    const out=[];
    const win=(x,y,w,h,extra='')=>{const on=r()<.18?' on':'';out.push(`<rect class="cw${on}" x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" style="transition-delay:${(r()*.45).toFixed(2)}s" ${extra}/>`);if(r()<.5)out.push(`<rect class="cs" x="${x}" y="${y}" width="${w}" height="${(h*(.2+r()*.5)).toFixed(1)}" rx="1.5"/>`)};
    const roof=(x,y,w,h,cls='cm')=>out.push(`<path class="${cls}" d="M${x} ${y} L${x+w/2} ${y-h} L${x+w} ${y}"/>`);
    if(post.v==='facade'){
      const fx=110,fw=180,top=92;
      out.push(`<rect class="cf" x="${fx}" y="${top}" width="${fw}" height="${H-top}"/>`);
      roof(fx-14,top+2,fw+28,58);
      out.push(`<rect class="cm" x="${fx+30}" y="${top-50}" width="16" height="26"/>`);
      for(let row=0;row<3;row++)for(let c=0;c<4;c++)win(fx+18+c*40,top+18+row*46,22,30);
      out.push(`<circle class="cl" cx="${fx+fw/2}" cy="${top-20}" r="9"/>`);
    }else if(post.v==='ringhiera'){
      for(let f=0;f<3;f++){
        const y=70+f*62;
        for(let c=0;c<6;c++)win(34+c*58,y,20,40);
        out.push(`<path class="cl" d="M18 ${y+44}H382"/><path class="cl" d="M18 ${y+30}H382"/>`);
        let bars='';for(let x=22;x<382;x+=9)bars+=`M${x} ${y+30}V${y+44}`;out.push(`<path class="cl" style="stroke-width:1;opacity:.7" d="${bars}"/>`);
      }
      out.push(`<path class="cl" d="M60 48 Q200 64 340 48"/>`);
      ['#ffd98a','#fff','#ffb4a0','#b8ccff'].forEach((col,i)=>{const x=90+i*62,y=52+Math.sin(i)*2;out.push(`<path d="M${x} ${y}h22l4 8-5 2v14h-20v-14l-5-2z" fill="${col}" opacity=".85" class="sway" style="animation-delay:${-i*.7}s"/>`)});
    }else if(post.v==='roofs'){
      const hs=[120,150,105,168,132];
      hs.forEach((h,i)=>{const x=24+i*72,w=64,top=H-h;out.push(`<rect class="cf" x="${x}" y="${top}" width="${w}" height="${h}"/>`);roof(x-4,top+1,w+8,26);for(let row=0;row<Math.floor(h/42);row++)for(let c=0;c<2;c++)win(x+12+c*24,top+14+row*38,16,22)});
    }else if(post.v==='oculus'){
      out.push(`<circle class="cl" cx="130" cy="130" r="78"/><circle class="cl" cx="130" cy="130" r="62" style="opacity:.6"/>`);
      out.push(`<circle class="cw${r()<.5?' on':''}" cx="130" cy="130" r="54" style="transition-delay:.1s"/>`);
      out.push(`<path class="cl" d="M76 130H184M130 76V184" style="stroke:rgba(0,0,0,.25);stroke-width:4"/>`);
      for(let row=0;row<4;row++)for(let c=0;c<3;c++)win(250+c*44,40+row*52,24,34);
    }else if(post.v==='stairs'){
      let d='M20 240';for(let i=0;i<8;i++)d+=` h26 v-24`;out.push(`<path class="cl" style="stroke-width:3" d="${d}"/>`);
      out.push(`<rect class="cf" x="270" y="28" width="86" height="232"/><path class="cl" d="M313 28V260"/>`);
      for(let f=0;f<5;f++)win(282,42+f*44,62,26);
      out.push(`<path class="cm" d="M234 70l12-14 12 14M234 96l12 14 12-14"/>`);
    }else if(post.v==='blocks'){
      const hs=[70,110,90,150,125,185];
      hs.forEach((h,i)=>{const x=30+i*58,w=44;out.push(`<rect class="cf" x="${x}" y="${H-24-h}" width="${w}" height="${h}"/>`);for(let row=0;row<Math.floor((h-10)/26);row++)win(x+8,H-24-h+10+row*26,28,14)});
      out.push(`<path class="cl" style="stroke-width:2" d="M14 ${H-24}H386"/>`);
      roof(318,H-24-185+1,52,22);
      out.push(`<path class="cm" d="M40 ${H-120} L120 ${H-150} L200 ${H-140} L300 ${H-200}" style="stroke-dasharray:4 5;opacity:.6"/>`);
    }
    let body=out.join('');out.length=0;
    if(wide){
      // side neighbourhood so the wide cover reads as a street, not a zoomed facade
      [[24,150],[118,196],[212,128],[W-300,176],[W-206,140],[W-112,204]].forEach(([x,h])=>{
        const w=80,top=H-h;out.push(`<rect class="cf" x="${x}" y="${top}" width="${w}" height="${h}" style="opacity:.6"/>`);roof(x-4,top+1,w+8,24);
        for(let row=0;row<Math.floor((h-20)/40);row++)for(let c=0;c<2;c++)win(x+14+c*32,top+16+row*40,20,24);
      });
      out.push(`<path class="cl" d="M0 ${H-1}H${W}"/>`);
      body=out.join('')+`<g transform="translate(${ox} ${oy})">${body}</g>`;out.length=0;
    }
    // tiny Urbancare mark, bottom-right
    out.push(`<g transform="translate(${W-44} ${H-42}) scale(.1)" class="cm" style="stroke-width:20"><path d="M22 134 V92 L60 65.7 V22 H97 V40.1 L152 2 L282 92 V134 L152 46 Z"/><path d="M58 122 L100 93 V200 A54 48 0 0 0 208 200 V96 L248 123 V200 A95 90 0 0 1 58 200 Z"/></g>`);
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>${body}${out.join('')}</svg>`;
  }
  const coverHTML=(p,cls='',wide=false)=>`<div class="cover ${cls}" style="--c:${CATS[p.cat].c}">${coverSVG(p,wide)}</div>`;
  const chipHTML=p=>`<span class="chip" style="--c:${CATS[p.cat].c}">${CATS[p.cat].name}</span>`;
  const cardHTML=p=>`<a class="post-card lit-on-hover reveal" href="/blog/millesimi" data-cat="${p.cat}">
      ${coverHTML(p)}
      <div class="post-body">
        <div class="post-meta">${chipHTML(p)}<span>${p.min} min</span></div>
        <h3>${p.t}</h3>
        <p>${p.x}</p>
        <div class="post-foot"><time>${fmtDate(p.date)}</time><span class="read">Leggi <b>→</b></span></div>
      </div>
    </a>`;


  (function(){
    const toast=document.getElementById('toast');
    const say=t=>{toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1700)};
    document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);say('Copiato: '+b.dataset.copy)}catch(e){say(b.dataset.copy)}}));

    // tabs
    const tabs=[...document.querySelectorAll('.tabs button')],pill=document.getElementById('tabPill');
    const forms={info:document.getElementById('f-info'),quote:document.getElementById('f-quote')},done=document.getElementById('done'),preview=document.getElementById('preview');
    function setTab(k){tabs.forEach(t=>t.classList.toggle('on',t.dataset.tab===k));const on=tabs.find(t=>t.dataset.tab===k);pill.style.left=on.offsetLeft+'px';pill.style.width=on.offsetWidth+'px';
      Object.entries(forms).forEach(([n,f])=>f.classList.toggle('on',n===k&&!done.classList.contains('on')));preview.style.opacity=k==='quote'?1:.55}
    tabs.forEach(t=>t.addEventListener('click',()=>{done.classList.remove('on');setTab(t.dataset.tab)}));
    const initial=location.hash==='#preventivo'?'quote':'info';
    requestAnimationFrame(()=>setTab(initial));
    addEventListener('hashchange',()=>{if(location.hash==='#preventivo'){done.classList.remove('on');setTab('quote')}});
    addEventListener('resize',()=>setTab(tabs.find(t=>t.classList.contains('on')).dataset.tab));

    // steppers
    document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{const i=document.getElementById(b.dataset.for);i.value=Math.max(0,Math.min(200,(+i.value||0)+ +b.dataset.step));i.dispatchEvent(new Event('input',{bubbles:true}))}));

  // ================= "Il tuo condominio": the building takes shape while you fill the quote =================
  (function(){
    const q=document.getElementById('f-quote'); if(!q) return;
    const NS='http://www.w3.org/2000/svg', REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const svg=document.getElementById('pvSvg'), world=document.getElementById('pvWorld'), sky=document.getElementById('pvSky');
    const stage=document.getElementById('pvStage'), tip=document.getElementById('pvTip'), badge=document.getElementById('pvBadge');
    const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    const W=440,H=330, FH=22, GH=30, COLW=24, GAP=18, SIDE=8;
    const MARK='<path d="M22 112 L152 22 L282 112" fill="none" stroke="#fff" stroke-width="34"/><path d="M78 128 V206 a74 74 0 0 0 148 0 V116" fill="none" stroke="#fff" stroke-width="40"/>';

    // ---- sky (not scaled): stars, moon/sun, clouds ----
    let s='<g class="pv-stars">';
    for(let i=0;i<34;i++)s+=`<circle class="pv-star" cx="${(Math.random()*W).toFixed(1)}" cy="${(Math.random()*170).toFixed(1)}" r="${(Math.random()*1.1+.35).toFixed(2)}" style="animation-delay:${(-Math.random()*3).toFixed(2)}s;opacity:${(.35+Math.random()*.6).toFixed(2)}"/>`;
    s+='</g><g class="pv-moon"><circle cx="388" cy="44" r="15"/><circle cx="396" cy="38" r="13" fill="var(--pv-sky1)"/></g>';
    s+='<g class="pv-sun"><circle class="ray" cx="386" cy="46" r="30"/><circle cx="386" cy="46" r="17"/></g>';
    s+='<path class="pv-cloud" d="M0 70h46a12 12 0 0 0-10-16a16 16 0 0 0-28-4a11 11 0 0 0-8 20z"/><path class="pv-cloud" style="animation-delay:-14s;animation-duration:36s" d="M0 118h34a9 9 0 0 0-8-12a12 12 0 0 0-20-3a8 8 0 0 0-6 15z"/>';
    sky.innerHTML=s;

    // ---- persistent layers inside the scaled world ----
    const mk=(tag,attrs,parent)=>{const n=document.createElementNS(NS,tag);for(const k in attrs)n.setAttribute(k,attrs[k]);parent&&parent.appendChild(n);return n};
    const gStreet=mk('g',{},world), gBuild=mk('g',{},world), gLift=mk('g',{id:'pvLift'},world), gFx=mk('g',{},world);
    const shaft=mk('rect',{class:'pv-shaft',rx:2},gLift), cable=mk('line',{class:'pv-cable'},gLift), cab=mk('rect',{class:'pv-cab',width:10,height:13,rx:1.5},gLift);

    // ---- state ----
    const lit=new Map(); const isLit=k=>{if(!lit.has(k))lit.set(k,Math.random()<.32);return lit.get(k)};
    let prev={blocks:0,floors:[],box:0,sit:''}, geo=null, liftLevel=0;
    const read=()=>({
      units:Math.max(0,Math.min(200,+document.getElementById('qUnits').value||0)),
      box:Math.max(0,Math.min(200,+document.getElementById('qBox').value||0)),
      lift:(q.querySelector('[name="Ascensore"]:checked')||{}).value==='Sì',
      heat:(q.querySelector('[name="Riscaldamento centralizzato"]:checked')||{}).value==='Sì',
      sit:(q.querySelector('[name="Situazione attuale"]:checked')||{}).value||'',
      comune:q.querySelector('#qComune').value.trim(),
      name:q.querySelector('[name="Nome e cognome"]').value.trim()
    });

    function layout(u){
      const cols=u<=6?2:u<=18?3:4;
      const needed=Math.max(1,Math.ceil(u/cols));
      const blocks=Math.min(3,Math.ceil(needed/9));
      const per=[];let left=u;
      for(let b=0;b<blocks;b++){const share=Math.ceil(left/(blocks-b));per.push(share);left-=share}
      const floors=per.map(n=>Math.min(12,Math.max(1,Math.ceil(n/cols))));
      const bw=cols*COLW+16;
      return {cols,blocks,per,floors,bw};
    }

    function build(st){
      const L=layout(st.units); const {cols,blocks,per,floors,bw}=L;
      const liftW=st.lift?20:0;
      const xs=[];let x=0;
      for(let b=0;b<blocks;b++){xs.push(x);x+=bw+SIDE+(b===0?liftW:0)+GAP}
      const totalW=x-GAP;
      const tops=floors.map(f=>-GH-f*FH), roofH=bw*.3;
      let h='';

      for(let b=0;b<blocks;b++){
        const bx=xs[b], F=floors[b], top=tops[b], units=per[b];
        const newBlock=b>=prev.blocks, prevF=prev.floors[b]||0;
        h+=`<g class="pv-block${newBlock?' enter':''}" style="animation-delay:${newBlock?(b-prev.blocks)*.12:0}s">`;
        // side face + roof
        h+=`<polygon class="ws" points="${bx+bw},${top} ${bx+bw+SIDE},${top+5} ${bx+bw+SIDE},0 ${bx+bw},0"/>`;
        const cx=bx-7+(bw/2+7)*.34, ch=roofH*.75;
        h+=`<g class="pv-roofg${(F!==prevF&&!newBlock)?' settle':''}">`;
        h+=`<polygon class="pv-gable" points="${bx-6},${top} ${bx+bw/2},${top-roofH} ${bx+bw+6},${top}"/>`;
        h+=`<rect class="pv-chim" x="${cx}" y="${top-ch-4}" width="${bw*.1}" height="${ch}"/>`;
        if(st.heat)for(let i=0;i<3;i++)h+=`<circle class="pv-smoke" cx="${cx+bw*.05}" cy="${top-ch-8}" r="${4+i}" style="animation-delay:${-i*1.2}s"/>`;
        h+=`<path class="pv-roof" stroke-width="${Math.max(5,bw*.07)}" d="M${bx-10} ${top+2} L${bx+bw/2} ${top-roofH} L${bx+bw+10} ${top+2}"/>`;
        if(b===0){const oy=top-roofH*.4;h+=`<circle cx="${bx+bw/2}" cy="${oy}" r="5.5" class="pv-win on"/>`}
        h+='</g>';
        // cornice
        h+=`<rect class="pv-slab" x="${bx-3}" y="${top-3}" width="${bw+6}" height="3"/>`;
        // floors
        for(let i=0;i<F;i++){
          const y=-GH-(i+1)*FH, enter=newBlock||i>=prevF;
          const inFloor=Math.max(0,Math.min(cols,units-i*cols));
          h+=`<g class="pv-floor${enter?' enter':''}" style="animation-delay:${enter?Math.max(0,i-prevF)*.06:0}s">`;
          h+=`<rect class="${i%2?'w2':'w1'}" x="${bx}" y="${y}" width="${bw}" height="${FH}"/>`;
          for(let c=0;c<cols;c++){
            const wx=bx+8+c*COLW+4, wy=y+4, key=`${b}-${i}-${c}`;
            if(c<inFloor){
              h+=`<rect class="pv-win${isLit(key)?' on':''}" data-k="${key}" x="${wx}" y="${wy}" width="16" height="12" rx="1"/>`;
              const sh=(i*7+c*13+b*5)%5;
              if(sh===1)h+=`<rect class="pv-shut" x="${wx}" y="${wy}" width="16" height="5"/>`;
              if(sh===3)h+=`<rect class="pv-shut" x="${wx}" y="${wy}" width="16" height="9"/>`;
            }
          }
          // ringhiera
          let bars='';for(let rx=bx-2;rx<=bx+bw+2;rx+=3.4)bars+=`M${rx.toFixed(1)} ${y+FH-7}V${y+FH-1}`;
          h+=`<path class="pv-rail" d="${bars}"/><line class="pv-railtop" x1="${bx-3}" x2="${bx+bw+3}" y1="${y+FH-7}" y2="${y+FH-7}"/><rect class="pv-slab" x="${bx-3}" y="${y+FH-1.5}" width="${bw+6}" height="2"/>`;
          if(!st.heat)h+=`<rect class="pv-boiler" x="${bx+bw+2}" y="${y+6}" width="4.5" height="7" rx="1"/><path class="pv-flame" d="M${bx+bw+4.2} ${y+12.2}q-1.6-1.8 0-3.8q1.6 2 0 3.8z"/>`;
          h+=`<rect class="pv-hit" data-tip="${blocks>1?'Scala '+'ABC'[b]+' · ':''}Piano ${i+1} · ${inFloor} ${inFloor===1?'unità':'unità'}" x="${bx}" y="${y}" width="${bw}" height="${FH}"/>`;
          h+='</g>';
        }
        // ground floor: portico, portone, plate
        const dw=Math.min(22,bw*.26), dx=bx+bw/2-dw/2;
        h+=`<rect class="pv-base" x="${bx}" y="${-GH}" width="${bw}" height="${GH}"/>`;
        h+=`<path class="pv-door" d="M${dx} 0 V${-GH+12} a${dw/2} ${dw/2} 0 0 1 ${dw} 0 V0Z"/><path class="pv-lobby" d="M${dx+3} 0 V${-GH+13} a${dw/2-3} ${dw/2-3} 0 0 1 ${dw-6} 0 V0Z"/>`;
        [[bx+6,dx-bx-12],[dx+dw+6,bx+bw-dx-dw-12]].forEach(([sx,sw])=>{if(sw>6)h+=`<rect class="pv-win" x="${sx}" y="${-GH+8}" width="${sw}" height="${GH-14}" rx="1"/>`});
        h+=`<rect class="pv-plate" x="${bx+bw/2-6}" y="${-GH+1}" width="12" height="8" rx="1.5"/><g transform="translate(${bx+bw/2-4} ${-GH+2}) scale(.026)">${MARK}</g>`;
        h+=`<rect class="pv-hit" data-tip="${blocks>1?'Scala '+'ABC'[b]+' · ':''}Piano terra · ingresso" x="${bx}" y="${-GH}" width="${bw}" height="${GH}"/>`;
        h+='</g>';
      }
      gBuild.innerHTML=h;

      // street: ground, garages, sign, tree
      const raw=(st.comune||'Milano').toUpperCase(), signText=raw.length>24?raw.slice(0,23)+'…':raw, fs=signText.length>14?8:10, sw=Math.max(46,signText.length*fs*.66+14);
      const minX=-sw-26, maxX=totalW+38;
      let g=`<rect class="pv-ground" x="${minX-2000}" y="0" width="${maxX-minX+4000}" height="400"/><rect class="pv-slab" x="${minX-2000}" y="-1" width="${maxX-minX+4000}" height="2" opacity=".6"/>`;
      const cap=Math.max(4,Math.floor((maxX-minX-20)/15)), shown=Math.min(st.box,cap), gx0=(minX+maxX)/2-shown*15/2;
      for(let i=0;i<shown;i++){const x=gx0+i*15,en=i>=prev.box;
        g+=`<g class="pv-gd${en?' enter':''}" style="animation-delay:${en?(i-prev.box)*.04:0}s"><rect class="pv-gdoor" x="${x}" y="7" width="12" height="15" rx="1"/><path class="pv-gdoor-l" d="M${x} 11h12M${x} 15h12M${x} 19h12"/></g>`}
      if(st.box>cap)g+=`<text x="${gx0+shown*15+4}" y="19" class="pv-sign-t" style="fill:var(--pv-ink)">+${st.box-cap}</text>`;
      g+=`<line class="pv-pole" x1="${minX+sw/2}" x2="${minX+sw/2}" y1="0" y2="-34"/><rect class="pv-sign-b" x="${minX}" y="-54" width="${sw}" height="20" rx="1.5"/><text class="pv-sign-t" x="${minX+sw/2}" y="${fs>8?-40.5:-41}" text-anchor="middle" style="font-size:${fs}px">${esc(signText)}</text>`;
      g+=`<line class="pv-trunk" x1="${totalW+26}" x2="${totalW+26}" y1="0" y2="-20"/><circle class="pv-tree" cx="${totalW+26}" cy="-30" r="12"/><circle class="pv-tree2" cx="${totalW+22}" cy="-34" r="6"/>`;
      gStreet.innerHTML=g;

      // elevator attached to Scala A
      const topA=tops[0];
      const sx=xs[0]+bw+SIDE+3;
      gLift.style.opacity=st.lift?1:0;clearTimeout(gLift._t);if(st.lift)gLift.style.visibility='';else gLift._t=setTimeout(()=>gLift.style.visibility='hidden',460);
      shaft.setAttribute('x',sx);shaft.setAttribute('y',topA-8);shaft.setAttribute('width',14);shaft.setAttribute('height',-topA+8);
      cable.setAttribute('x1',sx+7);cable.setAttribute('x2',sx+7);cable.setAttribute('y1',topA-8);cable.setAttribute('y2',0);
      cab.setAttribute('x',sx+2);cab.setAttribute('y',-15);
      geo={xs,bw,tops,floors,roofH,totalW,minX,maxX,doorA:xs[0]+bw/2};
      liftLevel=Math.min(liftLevel,floors[0]);moveCab();

      // fit everything into the stage
      const minY=Math.min(...tops.map(t=>t-roofH))-46, maxY=30;
      const k=Math.min(1.9,(W-40)/(maxX-minX+20),(H-58)/(maxY-minY));
      const tx=W/2-(minX+maxX)/2*k, ty=H-6-maxY*k;
      world.style.transform=`translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${k.toFixed(3)})`;

      prev.blocks=blocks;prev.floors=floors.slice();prev.box=shown;
      return L;
    }

    function moveCab(){if(!geo)return;cab.style.transform=`translateY(${liftLevel===0?0:-(GH+(liftLevel-1)*FH)}px)`}
    if(!REDUCE)setInterval(()=>{if(!geo)return;let n;do{n=Math.floor(Math.random()*(geo.floors[0]+1))}while(n===liftLevel&&geo.floors[0]>0);liftLevel=n;moveCab()},2200);
    // windows switch on and off by themselves
    if(!REDUCE)setInterval(()=>{const ws=gBuild.querySelectorAll('.pv-win[data-k]');if(!ws.length)return;const w=ws[Math.floor(Math.random()*ws.length)];const k=w.dataset.k;lit.set(k,!isLit(k));w.classList.toggle('on',lit.get(k))},800);

    // ---- situation: badge + a little scene ----
    const SIT={
      'Cambio amministratore':['⇄','Cambio amministratore · passaggio di consegne'],
      'Prima nomina':['★','Prima nomina · si parte da zero'],
      'Richiesta informazioni':['?','Richiesta informazioni']
    };
    function situation(st){
      const s=SIT[st.sit];
      badge.classList.toggle('on',!!s);
      if(s)badge.innerHTML=`<i>${s[0]}</i>${s[1]}`;
      let f='';
      if(st.sit==='Cambio amministratore'){
        const start=geo.minX+6, run=geo.doorA-start-6;
        f+=`<g class="pv-folder run" style="--run:${run}px"><path d="M${start} -12 h6 l2 2 h8 v10 h-16z" fill="#ffd36b"/><path d="M${start} -8 h16" stroke="#e0a93a" stroke-width="1"/></g>`;
      }
      if(st.sit==='Richiesta informazioni'){
        const ax=geo.xs[0]+geo.bw/2, ay=geo.tops[0]-geo.roofH-22;
        f+=`<g class="pv-bubble"><rect x="${ax-11}" y="${ay-12}" width="22" height="18" rx="6" fill="#fff"/><path d="M${ax-3} ${ay+6} l3 5 l3-5z" fill="#fff"/><text x="${ax}" y="${ay+2}" text-anchor="middle" style="font:800 12px var(--f-display);fill:#3557c8">?</text></g>`;
      }
      gFx.innerHTML=f;
      if(st.sit==='Prima nomina'&&prev.sit!=='Prima nomina'&&!REDUCE){
        const ax=geo.xs[0]+geo.bw/2, ay=geo.tops[0]-geo.roofH;
        const cols=['#ffd36b','#fff','#8fa6ff','#7fd3b5','#ff9ab0'];
        for(let i=0;i<22;i++){const r=mk('rect',{x:ax-2,y:ay-4,width:4,height:6,rx:1,fill:cols[i%5],class:'pv-confetti'},gFx);
          r.style.setProperty('--dx',(Math.random()*120-60).toFixed(0)+'px');r.style.setProperty('--dy',(Math.random()*70-60).toFixed(0)+'px');r.style.setProperty('--r',(Math.random()*540-270).toFixed(0)+'deg');r.style.animationDelay=(Math.random()*.15).toFixed(2)+'s'}
      }
      prev.sit=st.sit;
    }

    // ---- stats with counting numbers ----
    const shown={};
    function count(el,to){const from=shown[el.id]??to;shown[el.id]=to;if(from===to||REDUCE){el.textContent=to;return}const t0=performance.now();const tick=t=>{const p=Math.min(1,(t-t0)/450);el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)}
    const lastTxt={};
    function setTxt(id,txt){const el=document.getElementById(id);if(lastTxt[id]!==undefined&&lastTxt[id]!==txt){const tile=el.closest('.pv-stat');tile.classList.remove('bump');void tile.offsetWidth;tile.classList.add('bump')}lastTxt[id]=txt;el.textContent=txt}
    function stats(st,L){
      const totF=L.floors.reduce((a,b)=>a+b,0);
      count(document.getElementById('pvUnits'),st.units);
      setTxt('pvUnitsS',st.units?`su ${totF} ${totF===1?'piano':'piani'}${L.blocks>1?` · ${L.blocks} scale`:''}`:'aggiungi le unità');
      count(document.getElementById('pvBox'),st.box);
      setTxt('pvBoxS',st.box?'box e posti auto':'nessun box');
      setTxt('pvLiftV',st.lift?'Sì':'No');setTxt('pvLiftS',st.lift?'in servizio':'non presente');
      setTxt('pvHeatV',st.heat?'Centralizzato':'Autonomo');setTxt('pvHeatS',st.heat?'centrale termica':'caldaie singole');
    }

    // ---- title, name, progress ----
    const REQ=[()=>q.querySelector('[name="Nome e cognome"]').value.trim(),()=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(q.querySelector('[name="Email"]').value),()=>q.querySelector('[name="Telefono"]').value.trim(),()=>q.querySelector('#qComune').value.trim(),()=>q.querySelector('[name="Situazione attuale"]:checked'),()=>q.querySelector('[name="privacy"]').checked];
    const send=document.getElementById('pvSend');
    function head(st){
      document.getElementById('pvTitle').innerHTML=st.comune?`Un condominio a <span class="c">${esc(st.comune)}</span>`:`Il tuo condominio a <span class="c">Milano e provincia</span>`;
      document.getElementById('pvWho').textContent=st.name?`Preventivo per ${st.name}`:'Compila il modulo e guardalo prendere forma.';
      const n=REQ.filter(f=>f()).length, left=REQ.length-n;
      document.getElementById('pvBar').style.width=(n/REQ.length*100)+'%';
      document.getElementById('pvProg').innerHTML=left?`<span><b>${n}</b> di ${REQ.length} campi obbligatori</span><span>${Math.round(n/REQ.length*100)}%</span>`:`<span><b>Tutto pronto</b> ✓</span><span>100%</span>`;
      send.classList.toggle('ready',!left);
      send.innerHTML=left?`Completa ${left} ${left===1?'campo':'campi'}`:'Richiedi il preventivo <span>→</span>';
    }
    send.addEventListener('click',()=>q.requestSubmit());

    function update(){const st=read();const L=build(st);situation(st);stats(st,L);head(st)}
    q.addEventListener('input',update);q.addEventListener('change',update);
    update();

    // ---- hover a floor ----
    svg.addEventListener('pointermove',e=>{const h=e.target.closest('.pv-hit');if(!h){tip.classList.remove('on');return}const r=stage.getBoundingClientRect();tip.textContent=h.dataset.tip;tip.style.left=(e.clientX-r.left)+'px';tip.style.top=(e.clientY-r.top)+'px';tip.classList.add('on')});
    svg.addEventListener('pointerleave',()=>tip.classList.remove('on'));

    // ---- press and hold on the steppers ----
    document.querySelectorAll('[data-step]').forEach(b=>{let t,iv;const stop=()=>{clearTimeout(t);clearInterval(iv)};
      b.addEventListener('pointerdown',()=>{t=setTimeout(()=>{iv=setInterval(()=>b.click(),70)},380)});
      ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,stop))});
  })();


    // validation + mailto
    let lastBody='';
    async function submit(form,subject){
      let ok=true;
      form.querySelectorAll('.f').forEach(f=>{const i=f.querySelector('input[required],textarea[required]');if(!i)return;const bad=i.type==='radio'?!form.querySelector(`[name="${i.name}"]:checked`):(!i.value.trim()||(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)));f.classList.toggle('err',bad);if(bad)ok=false});
      const pc=form.querySelector('[name="privacy"]');pc.closest('.check').classList.toggle('err',!pc.checked);if(!pc.checked)ok=false;
      if(!ok){const e=form.querySelector('.err');e&&e.scrollIntoView({behavior:'smooth',block:'center'});return}
      const lines=[];new FormData(form).forEach((v,k)=>{if(k!=='privacy'&&String(v).trim())lines.push(`${k}: ${v}`)});
      lastBody=lines.join('\n');
      const btn=form.querySelector('[type="submit"]');btn.disabled=true;
      try {const fields=Object.fromEntries(new FormData(form)), isQuote=form===forms.quote;
        const payload=isQuote?{fullName:fields['Nome e cognome'],email:fields.Email,phone:fields.Telefono,area:fields['Comune / Zona'],units:fields['Unità abitative'],parking:fields['Box / posti auto'],elevator:fields.Ascensore==='Sì',centralHeating:fields['Riscaldamento centralizzato']==='Sì',situation:({'Cambio amministratore':'cambio_amministratore','Prima nomina':'prima_nomina','Richiesta informazioni':'richiesta_info'})[fields['Situazione attuale']],message:fields['Messaggio / Note'],privacyAccepted:pc.checked,website:fields.website}:{fullName:fields.Nome,email:fields.Email,phone:fields.Telefono,message:fields.Messaggio,privacyAccepted:pc.checked,website:fields.website};
        const r=await fetch(isQuote?'/api/request-quote':'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        const data=await r.json();if(!r.ok)throw Error(data.error||'Invio non riuscito');
        Object.values(forms).forEach(f=>f.classList.remove('on'));done.classList.add('on');
      }catch(err){say(err.message);document.getElementById('formStatus').textContent=err.message}finally{btn.disabled=false}
    }
    forms.info.addEventListener('submit',e=>{e.preventDefault();submit(forms.info,()=>'Richiesta informazioni dal sito')});
    forms.quote.addEventListener('submit',e=>{e.preventDefault();submit(forms.quote,f=>'Richiesta preventivo – '+(f.querySelector('#qComune').value||'condominio'))});
    document.querySelectorAll('.f input,.f textarea').forEach(i=>i.addEventListener('input',()=>i.closest('.f').classList.remove('err')));
    document.getElementById('copyMsg').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(lastBody);say('Testo copiato')}catch(e){say('Copia non disponibile')}});
    document.getElementById('again').addEventListener('click',()=>{done.classList.remove('on');setTab(tabs.find(t=>t.classList.contains('on')).dataset.tab)});
  })();

  observeReveals();
  })();
if(location.hash==='#preventivo')document.querySelector('[data-tab="quote"]').click();
(()=>{
 const b=document.querySelector('.burger'),wrap=document.querySelector('.nav-wrap');
 if(b&&wrap){b.setAttribute('aria-expanded','false');b.addEventListener('click',()=>{const on=wrap.classList.toggle('menu-open');b.setAttribute('aria-expanded',String(on));b.setAttribute('aria-label',on?'Chiudi menu':'Apri menu');b.textContent=on?'×':'☰'});document.addEventListener('keydown',e=>{if(e.key==='Escape'){wrap.classList.remove('menu-open');b.setAttribute('aria-expanded','false');b.textContent='☰'}})}
 document.querySelectorAll('.cloth').forEach(el=>{el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label','Filtra categoria '+el.dataset.cat);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}})});
})();
