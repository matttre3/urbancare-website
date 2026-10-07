(()=>{
        (function(){
          const NS='http://www.w3.org/2000/svg', svg=document.getElementById('city'), GROUND=742;
          const INTRO=2.5; const PLANTS=true; // balcony + terrace plants on/off // buildings wait for the logo to draw itself
          let seed=11;
          const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
          const el=(tag,a,p)=>{const n=document.createElementNS(NS,tag);for(const k in a)n.setAttribute(k,a[k]);p&&p.appendChild(n);return n};

          function roofPitch(g,x,w,top,hero){
            const h=w*.32, ax=x+w/2, ay=top-h, over=hero?16:10, sw=hero?16:6;
            const lx=x-over, rx=x+w+over, slopeY=px=>top-(px-lx)/(ax-lx)*h;
            // gable
            el('polygon',{points:`${lx},${top} ${ax},${ay} ${rx},${top}`,class:hero?'gable-hero':'gable'},g);
            // chimney rising from the left slope, like the logo
            // bottom follows the slope and sinks under the roof band, so it never floats
            const cw=w*.085, cx=lx+(ax-lx)*.3, ctop=slopeY(cx)-h*.42, sink=sw*.5;
            el('polygon',{points:`${cx},${ctop} ${cx+cw},${ctop} ${cx+cw},${slopeY(cx+cw)+sink} ${cx},${slopeY(cx)+sink}`,class:hero?'chimney-hero':'chimney',opacity:hero?1:.6},g);
            el('rect',{x:cx-3,y:ctop-5,width:cw+6,height:6,class:hero?'cap-hero':'cap',opacity:hero?1:.6},g);
            if(hero){
              // oculus in the gable
              const oy=top-h*.38, r=h*.14;
              el('circle',{cx:ax,cy:oy,r:r+3,class:'frame'},g);
              el('circle',{class:'glass lit',cx:ax,cy:oy,r,'data-win':''},g);
              el('line',{x1:ax-r,x2:ax+r,y1:oy,y2:oy,class:'mullion'},g);
              el('line',{x1:ax,x2:ax,y1:oy-r,y2:oy+r,class:'mullion'},g);
            }
            // roof band on top, same chevron as the logo
            el('path',{class:'roof-edge',d:`M${lx} ${top+sw*.35} L${ax} ${ay} L${rx} ${top+sw*.35}`,'stroke-width':sw,opacity:hero?1:.45},g);
          }

          // ---- vegetation helpers: leaves, organic blobs, potted plants ----
          const leafD=(x,y,len,ang,wid=.38)=>{const a=ang*Math.PI/180,ex=x+Math.cos(a)*len,ey=y+Math.sin(a)*len,nx=-Math.sin(a)*len*wid,ny=Math.cos(a)*len*wid,mx=(x+ex)/2,my=(y+ey)/2;return `M${x.toFixed(1)} ${y.toFixed(1)}Q${(mx+nx).toFixed(1)} ${(my+ny).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}Q${(mx-nx).toFixed(1)} ${(my-ny).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}Z`};
          function blobD(cx,cy,r,n=9,jit=.2,squash=.86){
            const pts=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2-Math.PI/2,rr=r*(1-jit+rnd()*jit*2);pts.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*squash])}
            let d=`M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
            for(let i=0;i<n;i++){const p0=pts[(i-1+n)%n],p1=pts[i],p2=pts[(i+1)%n],p3=pts[(i+2)%n];
              d+=`C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`}
            return d+'Z';
          }
          const POTS=['pot','pot','pot-grey','pot-white','pot-green'], FLOWERS=['flower','flower2','flower3','flower4','flower5'];
          const pick=a=>a[Math.floor(rnd()*a.length)];
          function pot(g,cx,base,w=10,h=7,mat='pot'){
            el('path',{class:mat,d:`M${cx-w/2} ${base-h} H${cx+w/2} L${cx+w*.38} ${base} H${cx-w*.38} Z`},g);
            el('rect',{class:mat+'-rim',x:cx-w/2-1,y:base-h-1.6,width:w+2,height:2.2,rx:.8},g);
          }
          // each plant sits in its own group so it can be scaled a little differently
          const plantG=(g,cx,base)=>el('g',{transform:`translate(${cx} ${base}) scale(${(.8+rnd()*.5).toFixed(2)}) translate(${-cx} ${-base})`},g);
          function geranium(g,cx,base){
            pot(g,cx,base,10,7,pick(POTS));const fl=pick(FLOWERS);
            const top=base-7;
            [[-7,-3,4.2],[-3,-6,4.6],[2,-6.5,4.4],[6,-3.5,4],[0,-2.5,4.4]].forEach(([dx,dy,r],i)=>el('ellipse',{class:i%2?'leaf2':'leaf',cx:cx+dx,cy:top+dy,rx:r,ry:r*.72},g));
            for(let k=0;k<3;k++){const fx=cx-6+k*6+rnd()*2,fy=top-9-rnd()*3;for(let j=0;j<3;j++)el('circle',{class:fl,cx:fx+Math.cos(j*2.1)*1.6,cy:fy+Math.sin(j*2.1)*1.4,r:1.5},g);el('path',{class:'stem',d:`M${fx} ${fy+1.5}L${cx+(fx-cx)*.4} ${top-2}`},g)}
          }
          function grass(g,cx,base){
            pot(g,cx,base,9,8,pick(POTS));
            const top=base-8;
            const n=5+Math.floor(rnd()*5);for(let i=0;i<n;i++){const ang=-155+i*(130/(n-1))+(rnd()*14-7);el('path',{class:rnd()<.5?'leaf2':'leaf3',d:leafD(cx+(i-n/2)*.6,top,9+rnd()*8,ang,.14+rnd()*.08)},g)}
          }
          function trailing(g,cx,railY){
            // flower box hooked on the railing, leaves hanging down over it
            for(let k=0;k<4;k++){let x=cx-9+k*6,y=railY+2;const drift=rnd()<.5?-1:1;
              for(let j=0;j<4+Math.floor(rnd()*3);j++){el('path',{class:j%2?'leaf2':'leaf',d:leafD(x,y,5.5,j%2?55:125,.42)},g);x+=drift*.8;y+=3.4}}
            el('rect',{class:'pot',x:cx-12,y:railY-5,width:24,height:7,rx:1.2},g);
            el('rect',{class:'pot-rim',x:cx-13,y:railY-6,width:26,height:2,rx:.8},g);
            for(let k=0;k<5;k++)el('path',{class:k%2?'leaf2':'leaf',d:leafD(cx-10+k*5,railY-5,6,-70-rnd()*40,.4)},g);
            if(rnd()<.6){const fl=pick(FLOWERS);for(let k=0;k<4;k++)el('circle',{class:fl,cx:cx-9+k*6+rnd()*2,cy:railY-7-rnd()*3,r:1.6},g)}
          }
          function lemon(g,cx,base){
            pot(g,cx,base,12,9,pick(POTS));
            el('path',{class:'branch',d:`M${cx} ${base-9} V${base-22}`,'stroke-width':1.4},g);
            const cy=base-28;
            el('path',{class:'leaf',d:blobD(cx,cy,8,8,.22,.9)},g);
            el('path',{class:'leaf2',d:blobD(cx-2.5,cy-2.5,4.5,6,.2)},g);
            for(let k=0;k<3+Math.floor(rnd()*3);k++)el('circle',{class:'fruit',cx:cx-5+rnd()*10,cy:cy-4+rnd()*8,r:1.5},g);
          }
          function bush(g,cx,base){
            pot(g,cx,base,11,7,pick(POTS));
            el('path',{class:rnd()<.5?'leaf':'leaf3',d:blobD(cx,base-13,7.5,9,.25,.85)},g);
            el('path',{class:'leaf2',d:blobD(cx+2,base-15,3.6,6,.2)},g);
          }
          function succulent(g,cx,base){
            pot(g,cx,base,9,6,pick(['pot-white','pot-grey','pot']));
            el('path',{class:'leaf3',d:`M${cx-2.5} ${base-6} V${base-17} a2.5 2.5 0 0 1 5 0 V${base-6}Z`},g);
            el('path',{class:'leaf3',d:`M${cx-2.5} ${base-11} h-2.5 a1.5 1.5 0 0 1 -1.5 -1.5 V${base-15} a1.3 1.3 0 0 1 2.6 0 V${base-12.5} h1.4Z`},g);
            if(rnd()<.5)el('circle',{class:pick(FLOWERS),cx:cx,cy:base-19.5,r:1.6},g);
          }
          function lavender(g,cx,base){
            pot(g,cx,base,10,7,pick(POTS));
            for(let i=0;i<7;i++){const x2=cx-5+i*1.7+(rnd()*1.2-.6),y2=base-17-rnd()*5;
              el('path',{class:'stem',d:`M${cx-1+i*.3} ${base-7} Q${(cx+x2)/2} ${base-11} ${x2} ${y2}`},g);
              el('ellipse',{class:'flower5',cx:x2,cy:y2-1.8,rx:1.1,ry:2.6},g)}
          }
          function herbBox(g,cx,base){
            el('rect',{class:pick(['pot','pot-green','pot-grey']),x:cx-13,y:base-7,width:26,height:7,rx:1},g);
            for(let k=0;k<6;k++){const x=cx-11+k*4.4;for(let j=0;j<3;j++)el('path',{class:j%2?'leaf2':'leaf3',d:leafD(x,base-7,4+rnd()*3,-90+(j-1)*38+rnd()*10,.42)},g)}
          }
          function shrub(g,cx,base,r){
            pot(g,cx,base,r*1.1,r*.8);
            const top=base-r*.8;
            el('path',{class:'leaf',d:blobD(cx,top-r*.7,r,9,.22)},g);
            el('path',{class:'leaf2',d:blobD(cx-r*.28,top-r*.95,r*.55,7,.2)},g);
          }

          function roofTerrace(g,x,w,top){
            el('rect',{x:x-6,y:top-10,width:w+12,height:10,class:'parapet'},g);
            el('rect',{x:x-6,y:top-24,width:w+12,height:14,fill:'url(#railing)'},g);
            el('line',{class:'rail',x1:x-6,x2:x+w+6,y1:top-24,y2:top-24},g);
            // pergola + plants
            const px=x+w*.55, pw=w*.36;
            for(let i=0;i<=4;i++) el('line',{class:'rail',x1:px+i*pw/4,x2:px+i*pw/4,y1:top-10,y2:top-52},g);
            el('rect',{x:px-4,y:top-56,width:pw+8,height:4,class:'slab'},g);
            // big pots behind the parapet + a vine running along the pergola
            if(PLANTS){shrub(g,x+20,top-10,13); lemon(g,x+48,top-10); lavender(g,x+w*.38,top-10);}
            let vx=px-4;const vy=top-54;if(PLANTS)el('path',{class:'stem',d:`M${px-4} ${vy} Q${px+pw*.25} ${vy+4} ${px+pw*.5} ${vy} T${px+pw+4} ${vy}`},g);
            while(PLANTS&&vx<px+pw+4){el('path',{class:rnd()<.5?'leaf':'leaf2',d:leafD(vx,vy+1,5+rnd()*2,rnd()<.5?60+rnd()*50:-120+rnd()*40,.45)},g);if(rnd()<.25){let hy=vy+2;for(let j=0;j<2+Math.floor(rnd()*3);j++){hy+=4;el('path',{class:'leaf2',d:leafD(vx+rnd()*2,hy,5,j%2?60:120,.42)},g)}}vx+=4+rnd()*3}
          }
          function roofFlat(g,x,w,top){
            el('rect',{x:x-4,y:top-8,width:w+8,height:8,class:'parapet'},g);
            el('rect',{x:x+w*.62,y:top-34,width:w*.18,height:26,class:'tank'},g);
            el('line',{x1:x+w*.25,x2:x+w*.25,y1:top-8,y2:top-60,class:'pole'},g);
            el('circle',{class:'antenna',cx:x+w*.25,cy:top-62,r:3.5,class:'antenna-dot'},g);
          }

          function building(o){
            const {x,w,floors,fh=54,gh=70,cols,roof='flat',depth,delay,tone='mid',balc=[],hero=false,opacity=1,side=24,detail=true,litP=.14}=o;
            const top=GROUND-gh-floors*fh;
            const wrap=el('g',{class:'building-rise',style:`animation-delay:${delay+INTRO}s`},svg);
            const g=el('g',{class:'building-layer','data-depth':depth,opacity,},wrap);
            if(roof==='pitch') roofPitch(g,x,w,top,hero); else if(roof==='terrace') roofTerrace(g,x,w,top); else roofFlat(g,x,w,top);
            el('polygon',{points:`${x+w},${top} ${x+w+side},${top+10} ${x+w+side},${GROUND} ${x+w},${GROUND}`,class:'side'},g);
            el('rect',{x,y:top,width:w,height:GROUND-top,class:`facade face-${tone}`},g);
            // cornice
            el('rect',{x:x-5,y:top,width:w+10,height:6,class:hero?'cornice-hero':'cornice'},g);

            const cw=w/cols;
            for(let f=0;f<floors;f++){
              const fy=top+6+f*fh;
              el('line',{class:'ledge',x1:x,x2:x+w,y1:fy+fh,y2:fy+fh},g);
              for(let c=0;c<cols;c++){
                const ww=Math.min(28,cw*.5), wh=fh*.58, wx=x+c*cw+(cw-ww)/2, wy=fy+fh*.16;
                el('rect',{x:wx-2,y:wy-2,width:ww+4,height:wh+4,class:'frame'},g);
                const r=rnd();
                el('rect',{x:wx,y:wy,width:ww,height:wh,class:'glass'+(r<litP?' lit':'')+(r<litP*.25?' cool':''),'data-win':''},g);
                if(detail){
                  const sh=rnd();
                  if(sh<.6) el('rect',{x:wx,y:wy,width:ww,height:wh*(.12+sh*.8),class:'shutter'},g);
                  el('line',{x1:wx+ww/2,x2:wx+ww/2,y1:wy,y2:wy+wh,class:'mullion'},g);
                }
              }
              if(detail && balc.includes(f)){
                const by=fy+fh-2, bx=x-8, bw=w+16, hang=[];
                // pots stand on the slab, behind the ringhiera
                const TYPES=[geranium,grass,lemon,bush,succulent,lavender,herbBox];
                let placed=0;const maxHere=!PLANTS?0:rnd()<.12?0:(rnd()<.45?2:3);
                for(let c=0;c<cols&&placed<maxHere;c++){if(rnd()>.55)continue;const cx=x+c*cw+cw*(.2+rnd()*.6);placed++;
                  if(rnd()<.18)hang.push(cx);else pick(TYPES)(plantG(g,cx,by),cx,by)}
                el('rect',{x:bx,y:by-15,width:bw,height:15,fill:'url(#railing)'},g);
                el('line',{class:'rail',x1:bx,x2:bx+bw,y1:by-15,y2:by-15},g);
                el('rect',{class:'slab',x:bx,y:by,width:bw,height:5},g);
                // flower boxes hooked on the railing, trailing over it
                if(PLANTS)hang.forEach(cx=>trailing(g,cx,by-15));
              }
            }
            // ground floor: portone ad arco + vetrine
            const gy=GROUND-gh;
            el('rect',{x,y:gy,width:w,height:gh,class:'groundfloor'},g);
            el('line',{x1:x,x2:x+w,y1:gy,y2:gy,class:'ledge'},g);
            if(detail){
              const dw=Math.min(46,w*.2), dx=x+w/2-dw/2, dh=gh-14;
              el('path',{class:'door',d:`M${dx} ${GROUND} V${GROUND-dh+dw/2} a${dw/2} ${dw/2} 0 0 1 ${dw} 0 V${GROUND}Z`},g);
              el('path',{class:'lobby',d:`M${dx+5} ${GROUND} V${GROUND-dh+dw/2} a${dw/2-5} ${dw/2-5} 0 0 1 ${dw-10} 0 V${GROUND}Z`,opacity:hero?.75:.35},g);
              [[x+10,dx-x-20],[dx+dw+10,x+w-(dx+dw)-20]].forEach(([sx,sw])=>{if(sw>20){el('rect',{x:sx,y:gy+14,width:sw,height:gh-26,class:'shop'},g);el('rect',{x:sx-2,y:gy+8,width:sw+4,height:6,class:hero?'awning-hero':'awning'},g)}});
            }
          }

          function tree(g,x,s){
            el('ellipse',{class:'ground-shadow',cx:x+4*s,cy:GROUND+3,rx:26*s,ry:4},g);
            el('rect',{class:'grate',x:x-9*s,y:GROUND-1,width:18*s,height:3,rx:1},g);
            const th=46*s, ty=GROUND-th;
            // tapered trunk that forks into two branches
            el('path',{class:'trunk',d:`M${x-3*s} ${GROUND} C${x-2.4*s} ${GROUND-th*.5} ${x-1.6*s} ${ty+th*.3} ${x-1.2*s} ${ty} L${x+1.2*s} ${ty} C${x+1.6*s} ${ty+th*.3} ${x+2.4*s} ${GROUND-th*.5} ${x+3*s} ${GROUND}Z`},g);
            el('path',{class:'branch',d:`M${x} ${ty+th*.35} Q${x-8*s} ${ty+th*.1} ${x-14*s} ${ty-6*s} M${x} ${ty+th*.45} Q${x+9*s} ${ty+th*.2} ${x+15*s} ${ty-2*s}`,'stroke-width':1.8*s},g);
            const cy=ty-14*s;
            el('path',{class:'tree',d:blobD(x,cy,30*s,11,.18,.82)},g);
            el('path',{class:'tree-shade',d:blobD(x+9*s,cy+11*s,17*s,8,.2,.7)},g);
            el('path',{class:'tree2',d:blobD(x-9*s,cy-8*s,16*s,8,.22,.8)},g);
            for(let i=0;i<6;i++){const a=rnd()*Math.PI*2,rr=26*s;el('path',{class:rnd()<.5?'tree':'tree2',d:leafD(x+Math.cos(a)*rr,cy+Math.sin(a)*rr*.8,6*s,a*180/Math.PI+(rnd()*40-20),.45)},g)}
          }
          function lamp(g,x){
            el('ellipse',{class:'ground-shadow',cx:x,cy:GROUND+3,rx:9,ry:2.5},g);
            el('circle',{class:'lamp-glow',cx:x+10,cy:GROUND-86,r:46},g);
            el('path',{d:`M${x} ${GROUND} V${GROUND-90} q0 -6 10 -6`,class:'lamp-pole'},g);
            el('rect',{x:x+6,y:GROUND-88,width:10,height:4,rx:2,class:'lamp-head'},g);
          }

          // back row: faint silhouettes
          building({x:0,w:130,floors:8,cols:3,roof:'flat',depth:.12,delay:.05,tone:'back',opacity:.45,detail:false,litP:.12});
          building({x:300,w:110,floors:10,cols:3,roof:'flat',depth:.12,delay:.1,tone:'back',opacity:.4,detail:false,litP:.1});
          building({x:990,w:120,floors:9,cols:3,roof:'pitch',depth:.12,delay:.12,tone:'back',opacity:.45,detail:false,litP:.12});
          // mid row
          building({x:96,w:196,floors:6,cols:4,roof:'pitch',depth:.3,delay:.22,tone:'warm',balc:[1,3,5]});
          building({x:752,w:226,floors:7,cols:4,roof:'terrace',depth:.72,delay:.62,tone:'mid',balc:[0,1,2,3,4,5,6]});
          // giant Urbancare mark woven into the block: in front of the terrace building, behind the hero building
          const markWrap=el('g',{class:'mark-intro'},svg);
          const markLayer=el('g',{class:'building-layer bg-mark','data-depth':.06},markWrap);
          const mark=el('g',{transform:'translate(32 -200) scale(3.3)'},markLayer);
          el('path',{d:'M22 134 V92 L60 65.7 V22 H97 V40.1 L152 2 L282 92 V134 L152 46 Z',pathLength:1},mark);
          el('path',{d:'M58 122 L100 93 V200 A54 48 0 0 0 208 200 V96 L248 123 V200 A95 90 0 0 1 58 200 Z',pathLength:1,style:'animation-delay:1.45s,2.3s'},mark);

          // once drawn, drop the dash trick so the outline is always closed
          markLayer.querySelectorAll('path').forEach(pa=>pa.addEventListener('animationend',e=>{if(e.animationName==='markDraw')pa.classList.add('drawn')}));
          if(matchMedia('(prefers-reduced-motion: reduce)').matches)markLayer.querySelectorAll('path').forEach(pa=>pa.classList.add('drawn'));
          // hero building: roof = logo
          building({x:392,w:290,floors:9,cols:5,roof:'pitch',hero:true,depth:.52,delay:.42,tone:'hero',balc:[1,3,5,7],litP:.2});
          // street
          // foreground: street, sidewalk, trees and lamps move as ONE layer so nothing floats
          const fgWrap=el('g',{class:'building-rise',style:`animation-delay:${.85+INTRO}s`},svg);
          const fg=el('g',{class:'building-layer','data-depth':1},fgWrap);
          el('rect',{x:-200,y:GROUND,width:1500,height:10,class:'sidewalk'},fg);
          el('rect',{x:-200,y:GROUND+10,width:1500,height:320,class:'street'},fg);
          el('line',{x1:-200,x2:1300,y1:GROUND,y2:GROUND,class:'curb'},fg);
          el('line',{x1:-200,x2:1300,y1:GROUND+10,y2:GROUND+10,class:'curb'},fg);
          tree(fg,60,1.15); tree(fg,330,.9); tree(fg,720,1); tree(fg,1040,1.2);
          lamp(fg,250); lamp(fg,700);

          // windows switch on and off over time
          const wins=[...svg.querySelectorAll('[data-win]')];
          if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
            setInterval(()=>{const w=wins[Math.floor(Math.random()*wins.length)];w.classList.toggle('lit');if(Math.random()<.2)w.classList.toggle('cool')},900);
          }
        })();
        })();
(()=>{
    const progress=document.getElementById('progress');
    const layers=[...document.querySelectorAll('[data-depth]')];
    let ticking=false;
    function updateScroll(){
      const y=window.scrollY;
      const h=document.documentElement.scrollHeight-innerHeight;
      progress.style.width=(h?y/h*100:0)+'%';
      const heroH=document.querySelector('.hero').offsetHeight;
      if(y<heroH*1.2){
        layers.forEach((el,i)=>{
          const d=parseFloat(el.dataset.depth||0);
          const lift=y*d*.11;
          const drift=Math.sin(y*.002+i)*d*3;
          el.style.transform=`translate3d(${drift}px,${-lift}px,0)`;
        });
      }
      ticking=false;
    }
    addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});
    updateScroll();

    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    document.querySelectorAll('.step').forEach((el,i)=>el.style.transitionDelay=(i*.06)+'s');
    document.querySelectorAll('.service').forEach((el,i)=>el.style.transitionDelay=(i*.05)+'s');
    const themeMeta=document.querySelector('meta[name="theme-color"]');
    const applyTheme=t=>{document.documentElement.dataset.theme=t;themeMeta.content=t==='light'?'#f3f4ef':'#08111f'};
    applyTheme(document.documentElement.dataset.theme||'dark');
    document.querySelector('.theme-toggle').addEventListener('click',()=>{
      const t=document.documentElement.dataset.theme==='light'?'dark':'light';
      applyTheme(t);
      try{localStorage.setItem('uc-theme',t)}catch(e){}
    });
    // mini portal: new documents keep arriving
    (function(){
      const feed=document.getElementById('feed');if(!feed)return;
      const items=[['📄','Rendiconto 2026 pubblicato','Nuovo'],['🗓️','Assemblea convocata · 14 ottobre','Avviso'],['🧾','Fattura manutenzione ascensore','Caricata'],['✅','Verbale assemblea firmato','PDF'],['💬','Risposta alla tua segnalazione','Letta'],['🔧','Intervento idraulico programmato','Oggi']];
      let i=0;const push=()=>{const [ic,t,tag]=items[i++%items.length];feed.insertAdjacentHTML('afterbegin',`<div class="feed-item"><span class="fi">${ic}</span><span>${t}</span><em>${tag}</em></div>`);while(feed.children.length>4)feed.lastElementChild.remove()};
      push();push();push();
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(push,2600);
    })();
    // ---- section motion ----
    (function(){
      const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
      const steps=document.querySelector('.steps'), stepEls=[...document.querySelectorAll('.step')];
      function onScroll(){
        if(steps){const r=steps.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight*.75-r.top)/(r.height+innerHeight*.15)));
          steps.style.setProperty('--p',p.toFixed(3));stepEls.forEach((s,i)=>s.classList.toggle('active',p>(i+.35)/stepEls.length))}
      }
      addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});onScroll();
      // CTA: split headline into words, reveal + draw mark when in view
      const cta=document.getElementById('ctaInner'), h2=cta&&cta.querySelector('h2');
      if(h2){let i=0;h2.childNodes.forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim()){f.append(t);return}const s=document.createElement('span');s.className='w';s.style.transitionDelay=(i++*.06)+'s';s.textContent=t;f.append(s)});n.replaceWith(f)}else if(n.nodeType===1){n.classList.add('w');n.style.transitionDelay=(i++*.06)+'s'}})}
      const ctaMark=document.querySelector('.cta-mark');
      const ioM=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
        e.target.classList.add('in');
        if(e.target===ctaMark)setTimeout(()=>ctaMark.classList.add('drawn'),2000);
        if(e.target.matches('.facts'))e.target.querySelectorAll('[data-count]').forEach(b=>{const to=+b.dataset.count,from=+(b.dataset.from||0),suf=b.dataset.suffix||'',t0=performance.now();
          const tick=t=>{const k=Math.min(1,(t-t0)/1400),v=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));b.textContent=v+suf;if(k<1)requestAnimationFrame(tick)};if(!reduce)requestAnimationFrame(tick)});
        ioM.unobserve(e.target)}),{threshold:.35});
      [cta,ctaMark,document.querySelector('.facts')].forEach(el=>el&&ioM.observe(el));
      if(reduce&&ctaMark)ctaMark.classList.add('in','drawn');
      // services tilt
      if(!reduce)document.querySelectorAll('.service').forEach(card=>{
        card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg) translateY(-6px)`});
        card.addEventListener('pointerleave',()=>{card.style.transform=''});
      });
    })();
  })();
(()=>{
 document.querySelectorAll('.cloth').forEach(el=>{el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label','Filtra categoria '+el.dataset.cat);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}})});
})();
