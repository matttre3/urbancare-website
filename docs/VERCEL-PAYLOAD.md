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

## 1. Mantieni isolata la preview

Nel progetto Vercel già collegato al repository `matttre3/urbancare-website`:

1. Controlla che la Production Branch sia ancora `main`.
2. Le configurazioni sotto vanno in **Preview**, limitate alla branch `codex/urbancare-rework`. Non aggiungerle alla produzione attuale.
3. Mantieni la protezione dei deployment preview attiva. Crea il primo utente `/admin` mentre la preview è protetta.

Il `vercel.json` di questa branch configura installazione e build senza richiedere modifiche al comando di build del progetto corrente. Le altre branch continuano a usare i loro file.

## 2. Crea il database Neon

1. Apri **Storage / Marketplace → Neon** in Vercel, oppure crea un progetto dalla console Neon.
2. Crea un progetto `urbancare-cms`, in una regione europea vicina alle funzioni Vercel, ad esempio Frankfurt.
3. Mantieni il database principale per il futuro sito pubblico e crea una branch Neon `rework` per questa preview. Per iniziare può essere vuoto: il codice contiene la migrazione completa.
4. Copia la connection string **pooled**, con SSL (`sslmode=require`), della branch `rework` in `DATABASE_URL` per la sola preview del rework.
5. Se preferisci preview isolate automaticamente, l'integrazione Neon/Vercel permette di creare una branch database per ciascun deployment preview. Abilita questa opzione prima di collegare le variabili. Non usare la connection string del database di produzione nelle preview.

Non devi creare tabelle manualmente. `pnpm cms:migrate` applica le migrazioni versionate; `push` automatico dello schema è disabilitato.

## 3. Crea lo storage immagini

1. In Vercel **Storage → Create Database / Blob**, crea uno store **pubblico** `urbancare-media-preview`.
2. Collegalo al progetto per **Preview**, senza collegarlo alla produzione attuale. Se il dashboard non consente di scegliere la singola branch, imposta il relativo token come variabile Preview limitata al rework.
3. Controlla che `BLOB_READ_WRITE_TOKEN` sia presente.
4. Per il sito pubblico crea successivamente un secondo store `urbancare-media-production`, con un token differente.

Il pannello supporta upload diretti dal browser, riservati agli utenti autenticati. Foto pubbliche del blog nello store pubblico; evita di caricare documenti riservati dei condomini nella libreria immagini.

## 4. Imposta queste variabili

| Variabile | Valore da inserire | Necessaria |
| --- | --- | --- |
| `DATABASE_URL` | Connection string pooled/SSL della branch Neon corretta | Sì |
| `PAYLOAD_SECRET` | Un segreto casuale generato con `openssl rand -hex 32` | Sì |
| `BLOB_READ_WRITE_TOKEN` | Token dello store Blob dell'ambiente | Sì su Vercel |
| `NEXT_PUBLIC_SITE_URL` | `https://urbancare-amministrazioni.com` o il dominio pubblico definitivo | Sì |
| `RESEND_API_KEY` | API key Resend del progetto | Per invio email |
| `RESEND_FROM` | `UrbanCare <preventivi@urbancare-amministrazioni.com>` | Per invio email |
| `CMS_FROM_EMAIL` | `cms@urbancare-amministrazioni.com` | Per recupero password |
| `QUOTE_REQUEST_TO` | Email destinataria di contatti/preventivi; nella preview usa una tua email di test | Per invio email |

Mantieni il `PAYLOAD_SECRET` stabile fra i deployment dello stesso ambiente e distinto da quello di produzione. Non usare un nome `NEXT_PUBLIC_` per password, token o segreti.

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

Se vuoi importarli, configura `.env` locale usando le credenziali **della preview** (vedi `.env.example`) ed esegui:

```sh
pnpm install --frozen-lockfile
pnpm cms:migrate
pnpm cms:seed
```

L'importazione è ripetibile: non sovrascrive articoli esistenti. Crea solo **bozze**, perché i testi del concept devono essere verificati prima di pubblicarli. Gli otto articoli senza testo completo ricevono un promemoria editoriale, non contenuti inventati. Per i millesimi viene importato il testo modificabile e attivato il calcolatore.

## Circolare

Il modulo del mock raccoglie email e consenso nel CMS. L'invio periodico delle circolari non è automatizzato: gli iscritti si gestiscono dalla collezione dedicata, accessibile agli amministratori. Il canale per rimuovere un consenso è il contatto dello studio indicato nella privacy. Prima di usare la circolare, verifica i testi dell'informativa e imposta il tuo processo di invio e cancellazione.

## Passaggio alla produzione, quando approvi il rework

1. Configura le variabili **Production** usando database Neon e Blob di produzione, con segreti propri.
2. Fai prima un backup/snapshot del database e verifica la preview finale.
3. Unisci la branch in `main`. Vercel applicherà la migrazione al database di produzione e costruirà il sito.
4. Il database di preview non viene copiato automaticamente in quello di produzione: gli articoli e le immagini vanno creati/importati anche nell'ambiente definitivo.
5. Crea l'utente amministratore di produzione immediatamente, prima di rendere pubblico il deployment, o inizializza gli utenti sul database di produzione da un ambiente protetto.

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

La configurazione e il flusso completo con Neon, Blob e Resend devono ancora essere verificati sui tuoi account: i controlli locali non costituiscono un deployment cloud.

## Documentazione ufficiale consultata

- [Installazione e compatibilità di Payload](https://payloadcms.com/docs/getting-started/installation)
- [Adapter Postgres](https://payloadcms.com/docs/database/postgres)
- [Migrazioni Payload](https://payloadcms.com/docs/database/migrations)
- [Vercel Blob con Payload](https://payloadcms.com/docs/upload/storage-adapters)
- [Variabili Preview e branch specifiche in Vercel](https://vercel.com/docs/environment-variables)
- [Neon: database isolato per preview Vercel](https://neon.com/blog/neon-vercel-native-integration)
