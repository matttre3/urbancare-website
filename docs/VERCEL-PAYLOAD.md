# Attivare UrbanCare su Vercel

Il codice è nella branch `codex/urbancare-rework`, creata da `origin/main`. La produzione deve continuare a usare `main` finché il rework non viene approvato e unito.

## Architettura pronta

| Componente | Servizio | Cosa contiene |
| --- | --- | --- |
| Sito e pannello `/admin` | Next.js 16.4.0 + Payload 3.90.2 su Vercel | Le nove pagine del mock, route SEO, API e amministrazione |
| Database | Neon PostgreSQL | Articoli, bozze, utenti, metadati immagini, contatti dello studio e consensi alla circolare |
| Immagini | Vercel Blob, store pubblico | File originali e varianti delle immagini; Neon conserva i riferimenti |
| Email | Resend | Informazioni, preventivi e recupero password degli utenti CMS |

Neon è usato qui come database PostgreSQL; per le immagini il codice usa l'adapter ufficiale Vercel Blob di Payload. Gli SVG del mock sono asset/generatori del sito e non devono essere caricati nel CMS.

## 1. Ambienti condivisi

Per scelta del proprietario, locale, Preview e Production usano un solo database `urbancare-cms` e uno store pubblico `urbancare-cms-media`, entrambi a Frankfurt. I collegamenti Vercel sono configurati per Development, Preview e Production. La creazione automatica di branch Neon è disattivata.

La Production Branch resta `main`. Il codice del rework viene pubblicato in produzione solo dopo il merge. Le modifiche ai contenuti effettuate dal CMS locale o dalla preview si applicano allo stesso database del sito pubblico.

Mantieni la protezione dei deployment preview attiva e crea il primo amministratore da un ambiente protetto prima del merge.

## 2. Database Neon

Usa `DATABASE_URL` pooled con SSL del database condiviso in tutti gli ambienti. Non creare tabelle manualmente: `pnpm cms:migrate` applica le migrazioni versionate; `push` automatico dello schema è disabilitato. Le migrazioni eseguite da locale e dalle build modificano il database condiviso.

## 3. Storage immagini

Usa `BLOB_READ_WRITE_TOKEN` dello store pubblico `urbancare-cms-media` in tutti gli ambienti. Il pannello supporta upload diretti dal browser riservati agli utenti autenticati. Gli SVG del mock sono asset del sito; non richiedono upload. La libreria media contiene immagini pubbliche del blog.

## 4. Imposta queste variabili

| Variabile | Valore da inserire | Necessaria |
| --- | --- | --- |
| `DATABASE_URL` | Connection string pooled/SSL di `urbancare-cms` | Sì |
| `PAYLOAD_SECRET` | Un segreto casuale generato con `openssl rand -hex 32` | Sì |
| `BLOB_READ_WRITE_TOKEN` | Token di `urbancare-cms-media` | Sì su Vercel |
| `NEXT_PUBLIC_SITE_URL` | `https://urbancare-amministrazioni.com` o il dominio pubblico definitivo | Sì |
| `RESEND_API_KEY` | API key Resend del progetto | Per invio email |
| `RESEND_FROM` | `UrbanCare <preventivi@urbancare-amministrazioni.com>` | Per invio email |
| `CMS_FROM_EMAIL` | `cms@urbancare-amministrazioni.com` | Per recupero password |
| `QUOTE_REQUEST_TO` | Email destinataria di contatti/preventivi; nella preview usa una tua email di test | Per invio email |

Mantieni lo stesso `PAYLOAD_SECRET` stabile in locale, Preview e Production. Non usare un nome `NEXT_PUBLIC_` per password, token o segreti.

In Resend verifica il dominio mittente aggiungendo i record DNS forniti nel suo dashboard. Gli indirizzi `RESEND_FROM` e `CMS_FROM_EMAIL` devono appartenere al dominio verificato. Senza Resend i moduli mostrano un errore chiaro; non simulano un invio riuscito.

## 5. Avvia il deployment preview

1. Imposta Node.js **24.x** nelle impostazioni Vercel (o lascia che venga letto da `package.json`). Non serve un server Payload separato.
2. Fai **Redeploy** della branch `codex/urbancare-rework` dopo aver inserito le variabili. Un primo deployment precedente alla configurazione può fallire per variabili mancanti: è sufficiente ripeterlo dopo la configurazione.
3. La build esegue le migrazioni, rigenera la import map del pannello con gli adapter attivi e compila con `next build --webpack`. Webpack è scelto esplicitamente per la build Payload verificata.
4. Apri l'URL preview, poi `/admin`, e crea il primo utente con nome, email e password. Il primo account è amministratore. Gli account successivi vengono creati da un amministratore, scegliendo il ruolo appropriato.
5. In **Contatti dello studio** verifica email, PEC, telefono, comune e link dell'area personale.
6. Crea un articolo, aggiungi una copertina oppure scegli il tipo di illustrazione SVG, e pubblicalo. Comparirà subito in `/blog`, nella route del suo slug e nella sitemap. Le bozze e gli articoli con data futura restano privati.
7. Prova una foto, il modulo informazioni, il preventivo e la ricerca nel blog sulla preview.

## Importare le bozze del mock

Questo è facoltativo: puoi creare gli articoli dal pannello senza usare il terminale. Il mock contiene titoli/abstract di nove articoli e il testo completo di uno solo, quello sui millesimi.

Se vuoi importarli, configura `.env` locale usando le credenziali **del database condiviso** (vedi `.env.example`) ed esegui:

```sh
pnpm install --frozen-lockfile
pnpm cms:migrate
pnpm cms:seed
```

L'importazione è ripetibile: non sovrascrive articoli esistenti. Crea solo **bozze**, perché i testi del concept devono essere verificati prima di pubblicarli. Gli otto articoli senza testo completo ricevono un promemoria editoriale, non contenuti inventati. Per i millesimi viene importato il testo modificabile e attivato il calcolatore.

## Circolare

Il modulo del mock raccoglie email e consenso nel CMS. L'invio periodico delle circolari non è automatizzato: gli iscritti si gestiscono dalla collezione dedicata, accessibile agli amministratori. Il canale per rimuovere un consenso è il contatto dello studio indicato nella privacy. Prima di usare la circolare, verifica i testi dell'informativa e imposta il tuo processo di invio e cancellazione.

## Passaggio alla produzione, quando approvi il rework

1. Verifica che le variabili **Production** puntino allo stesso database Neon e store Blob già usati dalla preview.
2. Fai prima un backup/snapshot del database e verifica la preview finale.
3. Unisci la branch in `main`. Vercel applicherà la migrazione al database di produzione e costruirà il sito.
4. Articoli, immagini e utenti sono già condivisi: non richiedono una copia al merge.
5. Accedi con l'account amministratore già creato sul database condiviso e verifica `/admin` sul dominio pubblico.

## Sviluppo e verifiche

```sh
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm test:cms
pnpm test:e2e
```

`test:cms` crea un database Postgres temporaneo in memoria e verifica migrazioni, permessi e integrazione; non usa le credenziali Neon. `test:e2e` richiede una build recente e verifica desktop e mobile. `pnpm exec playwright install chromium` installa il browser di test.

Le nove pagine del mock sono renderizzate dal server Next.js, senza iframe. Markup, CSS, SVG e generatori animati derivano dal file allegato; i link ora usano route reali. La navigazione tra pagine ricarica il documento per isolare correttamente gli script originali. Il mock è visibile in locale senza database; in produzione i dati dimostrativi non vengono pubblicati come articoli reali.

Il 7 ottobre 2026 Neon e Blob sono stati creati e collegati nei tre ambienti; `PAYLOAD_SECRET` è configurato e le variabili Development sono sincronizzate in `.env.local` ignorato da Git. La migrazione iniziale su Neon è riuscita. La Preview `dpl_9i59WJXsAMqbxQPfEkNpbiv1kj1M` è Ready: homepage e `/admin` restituiscono HTTP 200. Nove articoli del mock sono importati come bozze. La creazione del primo amministratore resta al proprietario. La chiave Resend esistente permette solo invio: dominio mittente e consegna email non sono stati verificati, nessuna email di prova è stata inviata.

Preview protetta: https://urbancare-website-git-codex-urbancare-rework-matttre3s-projects.vercel.app. Il dominio pubblico continua a usare `main`.

## Documentazione ufficiale consultata

- [Installazione e compatibilità di Payload](https://payloadcms.com/docs/getting-started/installation)
- [Adapter Postgres](https://payloadcms.com/docs/database/postgres)
- [Migrazioni Payload](https://payloadcms.com/docs/database/migrations)
- [Vercel Blob con Payload](https://payloadcms.com/docs/upload/storage-adapters)
- [Variabili Preview e branch specifiche in Vercel](https://vercel.com/docs/environment-variables)
- [Neon: database isolato per preview Vercel](https://neon.com/blog/neon-vercel-native-integration)
