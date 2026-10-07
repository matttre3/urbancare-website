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

observeReveals();})();
(()=>{
 document.querySelectorAll('.cloth').forEach(el=>{el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label','Filtra categoria '+el.dataset.cat);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}})});
})();
