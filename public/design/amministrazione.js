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

  // ---- hero widgets (only the one present on the page runs) ----
  const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';

  // 01 agenda: tasks tick themselves off, then the week starts again
  (function(){
    const el=document.getElementById('agenda');if(!el)return;
    const tasks=[['Convocazione assemblea','Verbale e ordine del giorno · 14 ottobre','Assemblea'],['Aggiornamento regolamento','Bozza condivisa con i consiglieri','Regolamento'],['Rinnovo contratto pulizie','3 preventivi confrontati','Fornitori'],['Adempimenti fiscali','Versamenti e dichiarazioni in scadenza','Fisco'],['Perdita in cantina','Idraulico in arrivo entro 2 ore','Urgente']];
    el.innerHTML=tasks.map((t,i)=>`<div class="task${i===4?' urgent':''}"><span class="box">${CHECK}</span><div><b>${t[0]}</b><small>${t[1]}</small></div><em>${t[2]}</em></div>`).join('')+`<div class="agenda-foot"><span>Questa settimana</span><span class="bar"><i id="agendaBar"></i></span><span id="agendaCount">0/5</span></div>`;
    const rows=[...el.querySelectorAll('.task')],bar=document.getElementById('agendaBar'),cnt=document.getElementById('agendaCount');
    let n=0;const step=()=>{if(n>=rows.length){rows.forEach(r=>r.classList.remove('done'));n=0}else{rows[n].classList.add('done');n++}bar.style.width=(n/rows.length*100)+'%';cnt.textContent=`${n}/${rows.length}`};
    if(REDUCE){rows.forEach(r=>r.classList.add('done'));n=5;bar.style.width='100%';cnt.textContent='5/5'}else setInterval(step,1300);
  })();

  // 02 chat: questions from condòmini, answers from the studio
  (function(){
    const el=document.getElementById('chat');if(!el)return;
    const QA=[['Stiamo cambiando amministratore: da dove partiamo?','Dal passaggio di consegne: verifichiamo documentazione e conti, poi incontriamo i consiglieri.'],
      ['Conviene deliberare subito i lavori sul tetto?','Prima valutiamo preventivi, urgenza e fondi disponibili. Poi decidete in assemblea, con tutti i dati.'],
      ['Due condòmini discutono per il posto auto.','Partiamo dal regolamento e cerchiamo una soluzione condivisa, prima che diventi un contenzioso.'],
      ['Non capisco una norma del regolamento.','Te la spieghiamo con parole semplici e ti diciamo cosa comporta per il tuo caso.']];
    const who=`<span class="who"><svg viewBox="0 0 304 291"><path d="M22 112 L152 22 L282 112" fill="none" stroke="currentColor" stroke-width="34"/><path d="M78 128 V206 a74 74 0 0 0 148 0 V116" fill="none" stroke="currentColor" stroke-width="40"/></svg>UrbanCare</span>`;
    let i=0;const add=html=>{el.insertAdjacentHTML('beforeend',html);while(el.children.length>6)el.firstElementChild.remove()};
    const cycle=()=>{const [q,a]=QA[i++%QA.length];add(`<div class="msg q"><span class="who-q">Condòmino</span>${q}</div>`);
      setTimeout(()=>add('<div class="typing"><i></i><i></i><i></i></div>'),900);
      setTimeout(()=>{const t=el.querySelector('.typing');t&&t.remove();add(`<div class="msg a">${who}${a}</div>`)},2300)};
    cycle();if(!REDUCE)setInterval(cycle,5200);
  })();

  // 03 phone: the condominium portal keeps updating
  (function(){
    const el=document.getElementById('phFeed');if(!el)return;
    const IC={doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>',bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20h4"/>',send:'<path d="M21 3L3 11l7 3 3 7z"/>',chart:'<path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/>'};
    const ic=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;
    const items=[['doc','Bilancio consuntivo 2025','Documenti · consultabile ora',0],['bell','Avviso: pulizia scale spostata a giovedì','Avvisi · oggi',1],['send','La tua segnalazione è stata presa in carico','Segnalazioni · 10 min fa',2],['chart','Riparto spese aggiornato','Documenti · ieri',0],['bell','Assemblea ordinaria convocata','Avvisi · 14 ottobre',1],['send','Lampadina garage sostituita','Segnalazioni · risolta',2]];
    const tabs=[...document.querySelectorAll('.ph-tabs span')];let i=0;
    const push=()=>{const [k,t,s,tab]=items[i++%items.length];el.insertAdjacentHTML('afterbegin',`<div class="ph-item"><span class="pi">${ic(k)}</span><div><b>${t}</b><small>${s}</small></div></div>`);while(el.children.length>5)el.lastElementChild.remove();tabs.forEach((x,j)=>x.classList.toggle('on',j===tab))};
    push();push();push();if(!REDUCE)setInterval(push,2400);
  })();

  // 04 ledger: preventivo vs consuntivo bars + millesimi donut
  (function(){
    const el=document.getElementById('ledger');if(!el)return;
    const voci=[['Pulizie',62,58],['Energia',80,86],['Manut.',70,64],['Assic.',40,40],['Ammin.',48,46]];
    el.querySelector('.bars').innerHTML=voci.map(v=>`<div class="bar-col"><i class="p" data-h="${v[1]}"></i><i class="c" data-h="${v[2]}"></i></div>`).join('');
    el.querySelector('.bar-labels').innerHTML=voci.map(v=>`<span>${v[0]}</span>`).join('');
    const grow=(jit=0)=>el.querySelectorAll('.bar-col i').forEach(b=>b.style.height=(Math.max(8,(+b.dataset.h+(jit?(Math.random()*10-5):0)))*1.8)+'px');
    setTimeout(()=>grow(),300);if(!REDUCE)setInterval(()=>grow(1),2600);
    const parts=[['Scala A',420,'#ffffff'],['Scala B',330,'#b9e6d6'],['Negozi',150,'#7fd3b5'],['Box',100,'#3fae8a']];
    const C=2*Math.PI*44;let off=0;
    el.querySelector('.donut').innerHTML=`<circle cx="55" cy="55" r="44" stroke="rgba(255,255,255,.15)"/>`+parts.map(p=>{const len=p[1]/1000*C,s=`<circle class="seg" cx="55" cy="55" r="44" stroke="${p[2]}" stroke-dasharray="${len-2} ${C}" stroke-dashoffset="${-off}"/>`;off+=len;return s}).join('');
    el.querySelector('.split-list').innerHTML=parts.map(p=>`<div><span><i style="background:${p[2]}"></i>${p[0]}</span><b>${p[1]} ‰</b></div>`).join('');
    const rows=[...el.querySelectorAll('.split-list div')],segs=[...el.querySelectorAll('.seg')];let k=0;
    const hl=()=>{rows.forEach((r,j)=>r.classList.toggle('on',j===k));segs.forEach((s,j)=>s.style.opacity=j===k?1:.45);k=(k+1)%rows.length};
    hl();if(!REDUCE)setInterval(hl,1600);
  })();

  observeReveals();
  })();
(()=>{
 document.querySelectorAll('.cloth').forEach(el=>{el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label','Filtra categoria '+el.dataset.cat);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}})});
})();
