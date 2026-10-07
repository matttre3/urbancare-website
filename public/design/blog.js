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


  // featured cover: lights switch on and off by themselves
  const featWins=[...document.querySelectorAll('.feat-cover .cw')];
  setInterval(()=>{const w=featWins[Math.floor(Math.random()*featWins.length)];w&&w.classList.toggle('on')},700);

  // ---- grid + filters ----
  const grid=document.getElementById('grid'), empty=grid.querySelector('.empty');

  observeReveals(grid);
  const filters=document.getElementById('filters');
  filters.innerHTML=`<button class="filter active" data-cat="all" style="--c:var(--text)">Tutti</button>`+Object.entries(CATS).map(([k,c])=>`<button class="filter" data-cat="${k}" style="--c:${c.c}"><i></i>${c.name}</button>`).join('');
  let activeCat='all';
  const q=document.getElementById('q'), count=document.getElementById('count');
  function applyFilter(){
    const term=q.value.trim().toLowerCase();let n=0;
    grid.querySelectorAll('.post-card').forEach(card=>{
      const p=POSTS.find(x=>x.t===card.querySelector('h3').textContent);
      const ok=(activeCat==='all'||p.cat===activeCat)&&(!term||(p.t+' '+p.x).toLowerCase().includes(term));
      card.style.display=ok?'':'none';if(ok){n++;card.classList.add('in')}
    });
    grid.classList.toggle('is-empty',n===0);
    count.textContent=n===1?'1 articolo':`${n} articoli`;
    filters.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.cat===activeCat));
    document.querySelectorAll('.cloth').forEach(c=>c.classList.toggle('shake',c.dataset.cat===activeCat));
  }
  const setCat=cat=>{activeCat=cat;applyFilter()};
  filters.addEventListener('click',e=>{const b=e.target.closest('.filter');if(b)setCat(b.dataset.cat)});
  q.addEventListener('input',applyFilter);
  applyFilter();

  // ---- casa di ringhiera: filled illustration, Urbancare mark behind, laundry = categories ----
  (function(){
    const svg=document.getElementById('ringhiera');
    let seed=7;const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
    const P=[];const add=s=>P.push(s);
    const X0=70,X1=550,W=X1-X0,GROUND=440,FH=84,TOP=GROUND-90-3*FH; // 3 floors over a portico
    add(`<defs>
      <linearGradient id="hRoof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8aa4ff"/><stop offset="1" stop-color="#3148a8"/></linearGradient>
      <linearGradient id="hWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--h-wall1)"/><stop offset="1" style="stop-color:var(--h-wall2)"/></linearGradient>
      <linearGradient id="hMarkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d9bff" stop-opacity=".38"/><stop offset=".7" stop-color="#4a68d8" stop-opacity=".14"/><stop offset="1" stop-color="#3557c8" stop-opacity="0"/></linearGradient>
      <pattern id="hTiles" width="14" height="9" patternUnits="userSpaceOnUse"><rect width="14" height="9" style="fill:var(--h-roof)"/><path d="M0 9 Q3.5 2 7 9 Q10.5 2 14 9" style="fill:none;stroke:var(--h-tile);stroke-width:1.4"/></pattern>
      <pattern id="hCobble" width="16" height="8" patternUnits="userSpaceOnUse"><rect width="16" height="8" style="fill:var(--h-ground)"/><ellipse cx="4" cy="4" rx="3.4" ry="2.4" style="fill:var(--h-cobble)"/><ellipse cx="12" cy="4" rx="3.4" ry="2.4" style="fill:var(--h-cobble)" transform="translate(0 0)"/></pattern>
      <clipPath id="hClip"><rect x="-40" y="-80" width="700" height="524"/></clipPath>
      <pattern id="hSlats" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="3" style="fill:var(--h-shutter)"/><rect y="2.2" width="4" height=".8" style="fill:var(--h-slat)"/></pattern>
    </defs>`);


    // 2. roof: tiles under a logo-like band, two chimneys
    const RH=46, apexY=TOP-RH;
    add(`<rect class="h-chim" x="${X0+70}" y="${apexY-4}" width="20" height="40"/><rect class="h-chim-cap" x="${X0+66}" y="${apexY-9}" width="28" height="6" rx="1"/>`);
    add(`<rect class="h-chim" x="${X1-110}" y="${apexY+6}" width="16" height="30"/><rect class="h-chim-cap" x="${X1-113}" y="${apexY+1}" width="22" height="5" rx="1"/>`);
    add(`<polygon points="${X0-16},${TOP} ${310},${apexY} ${X1+16},${TOP}" fill="url(#hTiles)"/>`);
    add(`<path d="M${X0-20} ${TOP+3} L310 ${apexY} L${X1+20} ${TOP+3}" fill="none" stroke="url(#hRoof)" stroke-width="10" stroke-linejoin="miter"/>`);
    add(`<rect class="h-cornice" x="${X0-8}" y="${TOP}" width="${W+16}" height="8"/>`);

    // 3. walls
    add(`<rect x="${X0}" y="${TOP+8}" width="${W}" height="${GROUND-TOP-8}" fill="url(#hWall)"/>`);
    // subtle plaster stains
    for(let i=0;i<7;i++)add(`<ellipse class="h-stain" cx="${X0+30+rnd()*(W-60)}" cy="${TOP+30+rnd()*(GROUND-TOP-140)}" rx="${18+rnd()*30}" ry="${8+rnd()*14}"/>`);

    // 4. floors: doors + windows with green persiane, stone ballatoio, iron railing
    const bays=6,bw=W/bays,lights=[],clothes=[],plants=[];
    for(let f=0;f<3;f++){
      const fy=TOP+8+f*FH, floorY=fy+FH; // ballatoio level
      for(let i=0;i<bays;i++){
        const bx=X0+i*bw;
        // door
        const dx=bx+14,dw=24,dh=54,dy=floorY-dh-2;
        add(`<rect class="h-frame" x="${dx-3}" y="${dy-3}" width="${dw+6}" height="${dh+3}"/>`);
        lights.push(`<rect class="h-glass" data-w x="${dx}" y="${dy}" width="${dw}" height="${dh}"/>`);
        lights.push(`<path class="h-mull" d="M${dx+dw/2} ${dy}V${dy+dh}M${dx} ${dy+18}H${dx+dw}M${dx} ${dy+36}H${dx+dw}"/>`);
        const doorShut=rnd();
        if(doorShut<.3)lights.push(`<rect x="${dx}" y="${dy}" width="${dw}" height="${dh}" fill="url(#hSlats)"/>`);
        else{lights.push(`<rect x="${dx-11}" y="${dy}" width="9" height="${dh}" fill="url(#hSlats)"/><rect x="${dx+dw+2}" y="${dy}" width="9" height="${dh}" fill="url(#hSlats)"/>`)}
        // window
        const wx=bx+52,ww=18,wh=30,wy=dy+4;
        add(`<rect class="h-frame" x="${wx-3}" y="${wy-3}" width="${ww+6}" height="${wh+6}"/><rect class="h-sill" x="${wx-5}" y="${wy+wh+3}" width="${ww+10}" height="3"/>`);
        lights.push(`<rect class="h-glass" data-w x="${wx}" y="${wy}" width="${ww}" height="${wh}"/><path class="h-mull" d="M${wx+ww/2} ${wy}V${wy+wh}M${wx} ${wy+wh/2}H${wx+ww}"/>`);
        const ws=rnd();
        if(ws<.35)lights.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="url(#hSlats)"/>`);
        else if(ws<.7)lights.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${(wh*(.3+rnd()*.4)).toFixed(1)}" fill="url(#hSlats)"/>`);
      }
      // ballatoio slab + brackets (mensole)
      add(`<rect class="h-slab" x="${X0-14}" y="${floorY}" width="${W+28}" height="7"/>`);
      for(let i=0;i<=bays;i++){const x=X0+i*bw;add(`<path class="h-bracket" d="M${x-5} ${floorY+7}h10v4q0 10-5 14q-5-4-5-14z"/>`)}
      // plants on the ballatoio (behind railing)
      for(let i=0;i<bays;i++)if(rnd()<.35){const px=X0+i*bw+bw*(.2+rnd()*.6),py=floorY;plants.push(`<path class="h-pot" d="M${px-5} ${py-8}h10l-1.5 8h-7z"/><ellipse class="h-leaf" cx="${px}" cy="${py-12}" rx="7" ry="5"/><ellipse class="h-leaf2" cx="${px-3}" cy="${py-14}" rx="3.5" ry="2.6"/>`+(rnd()<.6?`<circle class="h-flower" cx="${px+2}" cy="${py-16}" r="1.8"/><circle class="h-flower" cx="${px-2}" cy="${py-17}" r="1.6"/><circle class="h-flower" cx="${px+4}" cy="${py-13}" r="1.5"/>`:''))}
      // railing
      let bars='';for(let x=X0-10;x<X1+12;x+=7)bars+=`M${x} ${floorY-26}V${floorY}`;
      plants.push(`<path class="h-rail-bar" d="${bars}"/><rect class="h-rail" x="${X0-14}" y="${floorY-28}" width="${W+28}" height="3" rx="1"/><rect class="h-rail" x="${X0-14}" y="${floorY-6}" width="${W+28}" height="1.6"/>`);
    }

    // 5. portico with columns and arches, portone with the Urbancare plaque
    const py=GROUND-90;
    add(`<rect class="h-base" x="${X0}" y="${py}" width="${W}" height="90"/>`);
    for(let i=0;i<5;i++){const ax=X0+20+i*(W-40)/5,aw=(W-40)/5-16;
      add(`<path class="h-arch-in" d="M${ax} ${GROUND} V${py+34} A${aw/2} ${aw/2*.8} 0 0 1 ${ax+aw} ${py+34} V${GROUND}Z"/>`);
      add(`<path class="h-arch-edge" d="M${ax-4} ${GROUND} V${py+34} A${aw/2+4} ${aw/2*.8+4} 0 0 1 ${ax+aw+4} ${py+34} V${GROUND}"/>`);
      if(i===2){add(`<rect class="h-gate" x="${ax+6}" y="${py+40}" width="${aw-12}" height="${GROUND-py-40}"/>`);let g='';for(let x=ax+10;x<ax+aw-8;x+=6)g+=`M${x} ${py+44}V${GROUND}`;add(`<path class="h-rail-bar" d="${g}"/>`)}
      if(i===1||i===3)lights.push(`<rect class="h-glass lit-soft" x="${ax+10}" y="${py+50}" width="${aw-20}" height="${GROUND-py-56}" rx="2"/>`);
    }
    add(`<rect class="h-cornice" x="${X0-4}" y="${py-4}" width="${W+8}" height="5"/>`);
    // plaque with the mark
    const plx=310-18,ply=py+8;
    add(`<rect class="h-plaque" x="${plx}" y="${ply}" width="36" height="22" rx="3"/><g transform="translate(${plx+9} ${ply+3}) scale(.058)"><path d="M60 22h36v44l-36 26z" fill="#fff"/><path d="M22 112 L152 22 L282 112" fill="none" stroke="#fff" stroke-width="34"/><path d="M78 128 V206 a74 74 0 0 0 148 0 V116" fill="none" stroke="#fff" stroke-width="40"/></g>`);

    // 6. courtyard: cobbles, bike, potted tree
    add(`<rect x="0" y="${GROUND}" width="620" height="44" fill="url(#hCobble)"/><path class="h-curb" d="M0 ${GROUND}H620"/>`);
    add(`<ellipse class="h-shadow" cx="310" cy="${GROUND+4}" rx="260" ry="6"/>`);
    add(`<g class="h-bike"><circle cx="470" cy="${GROUND+12}" r="12"/><circle cx="508" cy="${GROUND+12}" r="12"/><path d="M470 ${GROUND+12} L484 ${GROUND-8} L508 ${GROUND+12} M484 ${GROUND-8} H500 L508 ${GROUND+12} M481 ${GROUND-12} h9 M500 ${GROUND-8} l-3 -8 h6"/></g>`);
    add(`<path class="h-pot" d="M556 ${GROUND-18}h26l-4 20h-18z"/><path class="h-trunk" d="M569 ${GROUND-18}V${GROUND-50}"/><path class="h-leaf" d="M545 ${GROUND-60}c0-20 16-30 26-26c14-8 28 6 22 20c10 10 0 26-14 22c-10 8-26 4-28-6c-10-2-10-10-6-10z"/><path class="h-leaf2" d="M556 ${GROUND-70}c4-8 14-10 20-4c-6 2-12 6-14 12c-4 0-7-4-6-8z"/>`);

    // 7. laundry lines across the ballatoi: big garments, one per category (clickable filters)
    const cats=Object.entries(CATS);
    const lines=[{f:0,x1:X0+14,x2:X0+236},{f:1,x1:X0+244,x2:X1-14},{f:2,x1:X0+14,x2:X0+236}];
    const lineEls=[];
    lines.forEach(l=>{const y=TOP+8+l.f*FH+FH-52;lineEls.push(`<path class="h-line" d="M${l.x1} ${y} Q${(l.x1+l.x2)/2} ${y+12} ${l.x2} ${y}"/>`);l.y=y});
    const G={
      tee:(x,y)=>`M${x} ${y}h12q6 7 12 0h12l14 13-9 8-5-5v36h-36v-36l-5 5-9-8z`,
      trousers:(x,y)=>`M${x} ${y}h34v10l-3 44h-12l-2-32-2 32h-12l-3-44z`,
      dress:(x,y)=>`M${x+9} ${y}h16l3 12 11 40h-44l11-40z`,
      towel:(x,y)=>`M${x} ${y}h34v50h-34z`
    };
    const kinds=['tee','trousers','dress','towel','tee','towel'];
    cats.forEach(([k,c],i)=>{
      const l=lines[i%3],slot=Math.floor(i/3),x=l.x1+34+slot*104,t=(x+17-l.x1)/(l.x2-l.x1),y=l.y+12*4*t*(1-t)*.5+1;
      const kind=kinds[i];let extra='';
      const label=c.name.split(' ')[0], tw=label.length*7.4+22; // pill grows with the word
      if(kind==='towel')extra=`<rect x="${x}" y="${y+34}" width="34" height="4" fill="#fff" opacity=".55"/><rect x="${x}" y="${y+41}" width="34" height="2" fill="#fff" opacity=".4"/>`;
      if(kind==='tee')extra=`<path d="M${x+12} ${y}q6 7 12 0" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`;
      if(kind==='dress')extra=`<path d="M${x+6} ${y+14}h22" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>`;
      clothes.push(`<g class="cloth" data-cat="${k}" style="animation-delay:${-i*.6}s,${.8+i*.08}s">
        <path class="cloth-shadow" d="${G[kind](x+3,y+4)}"/>
        <path class="cloth-body" fill="${c.c}" d="${G[kind](x,y)}"/>${extra}
        <rect class="h-pin" x="${x+5}" y="${y-5}" width="4" height="9" rx="1"/><rect class="h-pin" x="${x+25}" y="${y-5}" width="4" height="9" rx="1"/>
        <g class="cloth-tag"><rect x="${(x+17-tw/2).toFixed(1)}" y="${y+62}" width="${tw.toFixed(1)}" height="18" rx="9" fill="${c.c}"/><text x="${x+17}" y="${y+74.5}" text-anchor="middle">${label}</text></g>
        <title>${c.name}</title></g>`);
    });

    svg.innerHTML=P.join('')+lights.join('')+plants.join('')+lineEls.join('')+clothes.join('');
    const wins=[...svg.querySelectorAll('[data-w]')];
    wins.forEach(w=>rnd()<.22&&w.classList.add('on'));
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{const w=wins[Math.floor(Math.random()*wins.length)];w.classList.toggle('on')},900);
    const markPaths=svg.querySelectorAll('.h-mark path');
    markPaths.forEach(p=>p.addEventListener('animationend',e=>{if(e.animationName==='hMarkDraw')p.classList.add('drawn')}));
    // ---- onboarding hint: a hand taps a few garments, then gets out of the way ----
    (function(){
      if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      const NS='http://www.w3.org/2000/svg';
      const hand=document.createElementNS(NS,'g');hand.setAttribute('class','hint-hand');
      hand.innerHTML=`<circle class="hint-ripple" cx="0" cy="0" r="14"/><g class="hint-finger"><path d="M0 0 V19.5 L4.6 15.2 L7.8 22.4 L11 21 L7.9 13.9 H14.2 Z"/></g>`;
      svg.appendChild(hand);
      const cloths=[...svg.querySelectorAll('.cloth')], order=[0,4,2].map(i=>cloths[i]).filter(Boolean);
      const at=el=>{const b=el.querySelector('.cloth-body').getBBox();return[b.x+b.width/2,b.y+b.height*.55]};
      const move=([x,y])=>hand.style.transform=`translate(${x}px,${y}px)`;
      let timers=[],stopped=false;
      const later=(fn,ms)=>timers.push(setTimeout(()=>{if(!stopped)fn()},ms));
      const stop=()=>{if(stopped)return;stopped=true;timers.forEach(clearTimeout);hand.classList.remove('show');cloths.forEach(c=>c.classList.remove('demo'))};
      move([560,430]);
      let t=1700;
      later(()=>hand.classList.add('show'),t);
      order.forEach((c,i)=>{
        later(()=>move(at(c)),t+=500);
        later(()=>{hand.classList.remove('tap');void hand.getBBox();hand.classList.add('tap');c.classList.add('demo')},t+=950);
        later(()=>c.classList.remove('demo'),t+=1300);
      });
      later(()=>{move([560,430]);hand.classList.remove('show')},t+=200);
      svg.addEventListener('pointerenter',stop,{once:true});
      svg.addEventListener('click',stop,{once:true});
      addEventListener('scroll',()=>{if(scrollY>300)stop()},{passive:true});
    })();
    svg.addEventListener('click',e=>{const c=e.target.closest('.cloth');if(c){setCat(activeCat===c.dataset.cat?'all':c.dataset.cat);document.querySelector('.toolbar-wrap').scrollIntoView({behavior:'smooth',block:'start'})}});
  })();


  observeReveals();
  document.getElementById('signForm').addEventListener('submit', async e=>{
    e.preventDefault(); const f=e.target,b=f.querySelector('button'),status=document.getElementById('newsletterStatus');
    b.disabled=true; status.textContent='';
    try { const r=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:f.querySelector('input[type="email"]').value,privacyAccepted:f.querySelector('[name="privacy"]').checked,website:f.querySelector('[name="website"]').value})});
      const data=await r.json();if(!r.ok)throw Error(data.error||'Invio non riuscito');
      document.getElementById('notice').classList.add('signed'); b.textContent='Firmato ✓';status.textContent='Iscrizione ricevuta. Puoi cancellarti in qualsiasi momento.';
    } catch(err){status.textContent=err.message} finally{b.disabled=false}
  });
})();
(()=>{
 const b=document.querySelector('.burger'),wrap=document.querySelector('.nav-wrap');
 if(b&&wrap){b.setAttribute('aria-expanded','false');b.addEventListener('click',()=>{const on=wrap.classList.toggle('menu-open');b.setAttribute('aria-expanded',String(on));b.setAttribute('aria-label',on?'Chiudi menu':'Apri menu');b.textContent=on?'×':'☰'});document.addEventListener('keydown',e=>{if(e.key==='Escape'){wrap.classList.remove('menu-open');b.setAttribute('aria-expanded','false');b.textContent='☰'}})}
 document.querySelectorAll('.cloth').forEach(el=>{el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label','Filtra categoria '+el.dataset.cat);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}})});
})();
