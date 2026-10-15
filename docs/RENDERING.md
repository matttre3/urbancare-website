# Rendering e consumi Vercel

Prima dell’ottimizzazione, le pagine pubbliche e la sitemap dichiaravano
`force-dynamic`: HTML e letture del CMS venivano ripetuti a ogni richiesta.
`React.cache` eliminava solo duplicati nello stesso rendering, senza una cache
persistente fra visitatori.

## Pagine pubbliche

| Contenuto | Strategia | Scadenza di sicurezza |
| --- | --- | --- |
| Home, studio, servizi, contatti, privacy | SSG al build + ISR | 1 ora |
| Blog e articoli già pubblicati | SSG al build + ISR | 5 minuti |
| Nuovi slug pubblicati dopo il build | Generazione alla prima visita + ISR | 5 minuti |
| Sitemap | Statica + ISR | 5 minuti |
| Admin, autenticazione e API Payload | Dinamici, senza cache pubblica | — |
| Invio informazioni/preventivi | POST dinamico verso Resend | — |

Le animazioni, il cambio tema e i filtri funzionano nel browser e non richiedono
rendering sul server a ogni interazione. Le pagine dei contatti sono statiche;
solo l’invio del modulo attiva una funzione.

Le letture pubbliche del CMS usano la Data Cache di Next e mantengono i controlli
di accesso: vengono letti solo articoli pubblicati con data già raggiunta.
Nessun dato autenticato viene messo nella cache pubblica.

## Aggiornamenti del CMS

Gli hook di Payload invalidano i dati dopo:

- pubblicazione, modifica, ritiro o eliminazione di un articolo;
- modifica o eliminazione di un’immagine;
- aggiornamento dei contatti dello studio.

L’invalidazione usa `revalidateTag(tag, { expire: 0 })`: la richiesta successiva
rigenera le pagine interessate. Non richiede un nuovo build. La scadenza temporale
è un ripiego per pubblicazioni programmate, modifiche dirette al database o
modifiche effettuate su un altro ambiente.

**Locale, Preview e produzione condividono Neon, ma non condividono necessariamente
la cache Next/Vercel.** Una modifica dall’admin di un ambiente invalida subito la
cache di quell’ambiente; gli altri si riallineano al successivo accesso dopo la
scadenza (5 minuti per i post, 1 ora per i contatti). Non è un cron: senza visite
non vengono rigenerate continuamente tutte le pagine.

Gli script CLI che scrivono fuori dal runtime Next devono passare
`context: { disableRevalidation: true }`. Il seed e i test isolati lo fanno già.
In questi casi vale la scadenza di sicurezza o un successivo deploy.

## Verifica

`pnpm exec tsx scripts/test-static-rendering.ts` crea un database PGlite effimero,
compila Next e avvia un server di produzione sulla porta 3102. Verifica il
manifest delle pagine prerenderizzate, gli HIT della cache e l’invalidazione via
API autenticata (modifica, nuovo slug, 404 già visitato, cambio slug, ritiro,
sitemap e contatti), oltre all’esclusione di bozze e articoli futuri.
Non modifica Neon. Scrive il build di test in `.next`; eseguire `pnpm build`
prima di usare nuovamente `pnpm start` con il database reale.

In Vercel controllare dopo il deploy gli HIT e i consumi in Observability/Usage.
La cache riduce invocazioni e query; trasferimento dati, richieste CDN e operazioni
ISR possono comunque concorrere ai limiti del piano. Il risparmio effettivo va
misurato sul traffico reale.
