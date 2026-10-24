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

// Contact modes share the original artwork, but expose only their own task and state.
(() => {
 const tabs=[...document.querySelectorAll('.tabs [role="tab"]')];
 const info=document.getElementById('f-info'),quote=document.getElementById('f-quote'),preview=document.getElementById('preview'),done=document.getElementById('done'),status=document.getElementById('formStatus');
 if(!info||!quote||!preview||!done||!status||!tabs.length)return;
 const forms=[info,quote],send=document.getElementById('pvSend');
 function sync(){
  const active=tabs.find(t=>t.classList.contains('on'));
  tabs.forEach(t=>{const selected=t===active;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1});
  preview.hidden=active?.dataset.tab!=='quote'||done.classList.contains('on');
  preview.closest('.form-wrap').classList.toggle('information-mode',preview.hidden);
  const pending=forms.some(f=>f.querySelector('[type="submit"]').disabled);
  send.disabled=pending;
 }
 tabs.forEach((t,i)=>{
  t.addEventListener('click',()=>{status.textContent='';sync()});
  t.addEventListener('keydown',e=>{
   let next;
   if(e.key==='ArrowRight'||e.key==='ArrowLeft')next=tabs[(i+1)%tabs.length];
   else if(e.key==='Home')next=tabs[0];else if(e.key==='End')next=tabs[tabs.length-1];else return;
   e.preventDefault();next.click();next.focus();
  });
 });
 forms.forEach((form,index)=>{
  form.querySelectorAll('.f').forEach((field,i)=>{
   let message=field.querySelector('.msg');
   if(!message){message=document.createElement('em');message.className='msg';message.textContent='Controlla questo campo e seleziona un valore valido.';field.append(message)}
   message.id=`contact-error-${index}-${i}`;
   field.querySelectorAll('input,textarea').forEach(input=>input.setAttribute('aria-describedby',message.id));
  });
  form.addEventListener('submit',e=>{
   if(form.getAttribute('aria-busy')==='true'){e.preventDefault();e.stopImmediatePropagation();return}
   let first;
   form.querySelectorAll('.f,.check').forEach(field=>{
    const inputs=[...field.querySelectorAll('input,textarea')];
    const invalid=inputs.some(input=>!input.validity.valid);
    field.classList.toggle('err',invalid);
    inputs.forEach(input=>input.setAttribute('aria-invalid',String(!input.validity.valid)));
    if(invalid&&!first)first=inputs.find(input=>!input.validity.valid);
   });
   if(first){
    e.preventDefault();e.stopImmediatePropagation();status.textContent='Controlla i campi evidenziati. La richiesta non è stata inviata.';first.focus();return;
   }
   status.textContent='Invio della richiesta in corso…';
  },true);
  form.addEventListener('input',e=>{
   const field=e.target.closest('.f,.check');
   field?.querySelectorAll('[aria-invalid]').forEach(input=>input.setAttribute('aria-invalid',String(!input.validity.valid)));
   if(field&&[...field.querySelectorAll('input,textarea')].every(input=>input.validity.valid))field.classList.remove('err');
  });
  const submit=form.querySelector('[type="submit"]'),label=submit.innerHTML;
  new MutationObserver(()=>{
   form.setAttribute('aria-busy',String(submit.disabled));
   submit.innerHTML=submit.disabled?'Invio in corso…':label;
   sync();
  }).observe(submit,{attributes:true,attributeFilter:['disabled']});
 });
 new MutationObserver(()=>{sync();if(done.classList.contains('on')){status.textContent='';done.focus()}}).observe(done,{attributes:true,attributeFilter:['class']});
 window.addEventListener('hashchange',sync);
 sync();
})();
