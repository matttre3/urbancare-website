(() => {
 const wrap=document.querySelector('.nav-wrap'),burger=wrap?.querySelector('.burger'),links=wrap?.querySelector('.nav-links'),dd=wrap?.querySelector('.dd'),toggle=dd?.querySelector('.services-toggle'),menu=dd?.querySelector('.dd-menu');
 if(!wrap||!burger||!links||!toggle||!menu)return;
 const mobile=matchMedia('(max-width:1050px)');let closeTimer;
 function services(open){clearTimeout(closeTimer);dd.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));menu.inert=!open}
 function navigation(open){wrap.classList.toggle('menu-open',open);burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Chiudi menu':'Apri menu');links.inert=mobile.matches&&!open;if(!open)services(false)}
 burger.setAttribute('aria-controls','navigation-links');navigation(false);
 burger.addEventListener('click',()=>navigation(!wrap.classList.contains('menu-open')));
 toggle.addEventListener('click',()=>services(!dd.classList.contains('is-open')));
 dd.addEventListener('pointerenter',e=>{if(!mobile.matches&&e.pointerType==='mouse')services(true)});
 dd.addEventListener('pointerleave',e=>{if(!mobile.matches&&e.pointerType==='mouse')closeTimer=setTimeout(()=>services(false),140)});
 dd.addEventListener('focusout',e=>{if(!dd.contains(e.relatedTarget))services(false)});
 document.addEventListener('click',e=>{if(!wrap.contains(e.target))navigation(false);else if(!dd.contains(e.target))services(false)});
 document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(dd.classList.contains('is-open')){services(false);toggle.focus()}else if(wrap.classList.contains('menu-open')){navigation(false);burger.focus()}});
 links.addEventListener('click',e=>{if(e.target.closest('a'))navigation(false)});
 mobile.addEventListener('change',()=>navigation(false));
})();
