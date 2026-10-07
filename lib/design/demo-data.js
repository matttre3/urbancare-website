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


export { CATS, POSTS };
