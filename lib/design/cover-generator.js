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

export { coverSVG };
