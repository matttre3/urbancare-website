(()=>{
 const b=document.querySelector('.burger'),wrap=document.querySelector('.nav-wrap');
 if(b&&wrap){b.setAttribute('aria-expanded','false');b.addEventListener('click',()=>{const on=wrap.classList.toggle('menu-open');b.setAttribute('aria-expanded',String(on));b.setAttribute('aria-label',on?'Chiudi menu':'Apri menu');b.textContent=on?'×':'☰'});document.addEventListener('keydown',e=>{if(e.key==='Escape'){wrap.classList.remove('menu-open');b.setAttribute('aria-expanded','false');b.textContent='☰'}})}
 document.querySelectorAll('.cloth').forEach(el=>{el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label','Filtra categoria '+el.dataset.cat);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}})});
})();
