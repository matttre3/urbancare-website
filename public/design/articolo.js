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
  const POSTS=window.__UC_POSTS__ || [];
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
  const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const coverHTML=(p,cls='',wide=false)=>`<div class="cover ${cls}" style="--c:${CATS[p.cat].c}">${p.cover?`<img src="${escapeHTML(p.cover)}" alt="${escapeHTML(p.coverAlt)}" style="width:100%;height:100%;object-fit:cover">`:coverSVG(p,wide)}</div>`;
  const chipHTML=p=>`<span class="chip" style="--c:${CATS[p.cat].c}">${CATS[p.cat].name}</span>`;
  const cardHTML=p=>`<a class="post-card lit-on-hover reveal" href="/blog/${encodeURIComponent(p.id)}" data-cat="${p.cat}">
      ${coverHTML(p)}
      <div class="post-body">
        <div class="post-meta">${chipHTML(p)}<span>${p.min} min</span></div>
        <h3>${p.t}</h3>
        <p>${p.x}</p>
        <div class="post-foot"><time>${fmtDate(p.date)}</time><span class="read">Leggi <b>→</b></span></div>
      </div>
    </a>`;


  const heroWins=[...document.querySelectorAll('.big-cover .cw')];
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{const w=heroWins[Math.floor(Math.random()*heroWins.length)];w&&w.classList.toggle('on')},650);
  (()=>{if(!document.getElementById('calc'))return;
  // ---- example table ----
  const units=[['Scala A · 1° piano',62],['Scala A · 3° piano',85],['Scala B · 2° piano',74],['Negozio piano terra',120]];
  const eur=n=>n.toLocaleString('it-IT',{style:'currency',currency:'EUR',maximumFractionDigits:0});
  document.getElementById('exTable').innerHTML=units.map(([u,m])=>`<tr><td>${u}<span class="bar" style="width:${m/1.2}%"></span></td><td>${m}</td><td>${eur(12000*m/1000)}</td></tr>`).join('');
  const sm=units.reduce((a,[,m])=>a+m,0);
  document.getElementById('exMil').textContent=sm;
  document.getElementById('exTot').textContent=eur(12000*sm/1000);

  // ---- calculator ----
  const cS=document.getElementById('cSpesa'),cM=document.getElementById('cMil'),cR=document.getElementById('cRange');
  function calc(){
    const s=Math.max(0,+cS.value||0),m=Math.min(1000,Math.max(0,+cM.value||0));
    document.getElementById('cOut').textContent=eur(s*m/1000);
    document.getElementById('cHint').textContent=`pari al ${(m/10).toLocaleString('it-IT',{maximumFractionDigits:1})}% della spesa`;
    document.getElementById('cBar').style.width=Math.min(100,m/10*4)+'%';
  }
  cS.addEventListener('input',calc);
  cM.addEventListener('input',()=>{cR.value=cM.value;calc()});
  cR.addEventListener('input',()=>{cM.value=cR.value;calc()});
  calc();

  })();
  // ---- elevator TOC ----
  const heads=[...document.querySelectorAll('.prose h2')];
  heads.forEach((h,i)=>{h.id=h.id||'section-'+(i+1);h.dataset.floor=String(i+1);h.dataset.short=h.dataset.short||h.textContent;h.insertAdjacentHTML('afterbegin',`<span class="fl">P${h.dataset.floor}</span>`)});
  const list=document.getElementById('liftList');
  list.innerHTML=heads.slice().reverse().map(h=>`<li data-id="${h.id}"><a href="#${h.id}"><span class="floor-btn">${h.dataset.floor}</span><span>${h.dataset.short}</span></a></li>`).join('')+`<li data-id="top"><a href="#top-article"><span class="floor-btn">T</span><span>Ingresso</span></a></li>`;
  document.querySelector('.a-head').id='top-article';
  const num=document.getElementById('liftNum'),arrow=document.getElementById('liftArrow'),nameEl=document.getElementById('liftName');
  const pillNum=document.getElementById('pillNum'),pillName=document.getElementById('pillName');
  let current='T';
  function setFloor(floor,label,id){
    if(floor===current)return;
    const up=(floor==='T'?0:+floor)>(current==='T'?0:+current);
    arrow.classList.toggle('down',!up);
    num.style.setProperty('--dir',up?'-10px':'10px');
    num.classList.remove('flip');void num.offsetWidth;num.classList.add('flip');
    setTimeout(()=>{num.textContent=floor;pillNum.textContent=floor},160);
    nameEl.textContent=label;pillName.textContent=label==='Ingresso'?'Ingresso':`Piano ${floor} · ${label}`;
    list.querySelectorAll('li').forEach(li=>li.classList.toggle('on',li.dataset.id===id));
    current=floor;
  }
  function spy(){
    let active=null;
    heads.forEach(h=>{if(h.getBoundingClientRect().top<innerHeight*.35)active=h});
    active?setFloor(active.dataset.floor,active.dataset.short,active.id):setFloor('T','Ingresso','top');
  }
  addEventListener('scroll',spy,{passive:true});
  list.querySelector('[data-id="top"]').classList.add('on');

  // ---- share / reactions ----
  const toast=document.getElementById('toast');
  document.getElementById('copyLink').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(location.href);toast.textContent='Link copiato'}catch(e){toast.textContent='Copia il link dalla barra degli indirizzi'}
    toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800);
  });
  document.querySelectorAll('.react').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.react').forEach(x=>x.classList.toggle('on',x===b));toast.textContent=b.textContent.includes('dubbio')?'Scrivici: ti rispondiamo noi':'Grazie! Ci fa piacere';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}));
  observeReveals();
  })();
(()=>{const w=document.querySelector('[aria-label="Condividi su WhatsApp"]'),m=document.querySelector('[aria-label="Invia per email"]');if(w)w.href='https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href);if(m)m.href='mailto:?subject='+encodeURIComponent(document.title)+'&body='+encodeURIComponent(location.href)})();
(()=>{
 const b=document.querySelector('.burger'),wrap=document.querySelector('.nav-wrap');
 if(b&&wrap){b.setAttribute('aria-expanded','false');b.addEventListener('click',()=>{const on=wrap.classList.toggle('menu-open');b.setAttribute('aria-expanded',String(on));b.setAttribute('aria-label',on?'Chiudi menu':'Apri menu');b.textContent=on?'×':'☰'});document.addEventListener('keydown',e=>{if(e.key==='Escape'){wrap.classList.remove('menu-open');b.setAttribute('aria-expanded','false');b.textContent='☰'}})}
 document.querySelectorAll('.cloth').forEach(el=>{el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label','Filtra categoria '+el.dataset.cat);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}})});
})();
