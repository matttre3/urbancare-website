# SEO Urbancare

## Identità e territorio

Brand: **Urbancare**. Professionista: **Dott. Noele Romano**.
Area principale: Garbagnate Milanese. Comuni confermati: Cesate, Arese,
Lainate, Bollate, Senago e Caronno Pertusella. Milano e provincia restano
un mercato secondario.

Non sono pubblicati indirizzi di sede, orari, recensioni o certificazioni non
confermate. Il grafo JSON-LD descrive un’`Organization`, il professionista,
il sito e i servizi: nessun indirizzo fittizio e nessuna promessa di idoneità
a risultati LocalBusiness/Maps. La presenza locale deriva dai contenuti e dalle
aree effettivamente servite, non dall’invenzione di una sede fisica.

## Gestione

- `lib/seo.ts`: title, description, grafo dell’attività e breadcrumb.
- `lib/metadata.ts`: canonical, branding coerente e social metadata.
- `lib/design/templates.json`: testi visibili e collegamenti tra servizi.
- Payload → Articoli → SEO: titolo e description specifici degli articoli.
  Il titolo SEO va scritto senza aggiungere il brand, inserito automaticamente.
- `/zone-servite`: una sola pagina utile per le zone confermate, senza landing
  duplicate ottenute sostituendo il nome del comune.
- Home, servizi e contatti restano SSG/ISR. Nessun rendering per ogni visita.
- Blog: tutti gli articoli pubblicati sono presenti nella lista SSR filtrabile;
  il contenuto in evidenza non viene escluso dalla ricerca.
- Le copertine di apertura non sono lazy; le schede usano varianti responsive.
- Il portale è descritto per rate e comunicazioni, senza promettere bilanci
  o documenti non confermati. Nessuna frequenza editoriale obbligatoria.

Prima di pubblicare un articolo: verificare contenuto, fonti per riferimenti
normativi, autore, collegamenti ai servizi, titolo/description e immagine/alt.
Non pubblicare automaticamente le bozze importate dal mock.

## Verifiche

- `pnpm exec tsx scripts/test-seo.ts`: metadata, grafo, copertine e lista SSR.
- `pnpm exec tsx scripts/test-seo-build.ts`: HTML del build effettivo.
- `pnpm exec tsx scripts/test-static-rendering.ts`: build e invalidazione CMS
  con un database temporaneo. Vedere `docs/RENDERING.md`.

## Google Search Console: passaggio del proprietario

1. Aprire https://search.google.com/search-console con l’account Google che
   deve essere proprietario del sito. Se la proprietà esiste già, selezionarla:
   non crearne una duplicata.
2. Se manca, aggiungere una proprietà di tipo **Dominio** per
   `urbancare-amministrazioni.com` (senza protocollo e senza www).
3. Copiare il record TXT di verifica fornito da Google. Quel valore dipende
   dall’account/proprietà e non può essere inventato dal codice del sito.
4. Inserirlo presso il gestore DNS autorevole, poi premere **Verifica**.
   Il record può essere fornito a Codex per completare la configurazione se
   il DNS è accessibile; non servono password Google né credenziali nel repo.
5. Inviare `https://www.urbancare-amministrazioni.com/sitemap.xml`.
6. Dopo il merge del rework controllare con Ispezione URL: home, amministrazione,
   contatti, zone servite e un articolo pubblicato. Verificare canonical scelto,
   indicizzabilità e lettura della sitemap. La Preview deve restare noindex.

Nessun ranking, volume, traffico o valore Core Web Vitals è attestato dai soli
test del codice. Le metriche effettive vanno lette in Search Console e nei dati
pubblici PageSpeed/CrUX, quando disponibili.

## Interventi dopo il Full Audit del 18 ottobre 2026

- `lib/design/seo-content.ts` aggiunge risposte visibili al preventivo e ai servizi,
  collegamenti ai due articoli del Cortile e coerenza delle promesse del portale.
- I contenuti su costo e cambio amministratore sono articoli del CMS nella
  categoria **Guide**, disponibili a `/blog/costo-amministratore-condominio` e
  `/blog/cambio-amministratore-condominio`, modificabili dall’admin.
- La sezione autonoma `/guide` è stata rimossa. I vecchi indirizzi reindirizzano
  permanentemente al blog e agli articoli corrispondenti. Non ci sono voci Guide
  nel menu o nel footer, né URL Guide nella sitemap.
- L’importazione idempotente è in `scripts/import-blog-guides.ts`, con contenuti
  sorgente in `scripts/content/blog-guides.ts`: la modalità predefinita verifica
  gli slug; `--publish` crea solo quelli mancanti, senza sovrascrivere articoli.
  Si esegue caricando `.env.local`, che punta al CMS condiviso. Non ripubblicare
  le altre bozze importate dal mock.
- L’autore dei due nuovi articoli è Urbancare: il BlogPosting usa l’Organization
  dello studio e la scheda autore è coerente con la redazione.
- Restano da confermare con il proprietario qualifiche e casi pubblicabili;
  l’articolo CMS sui millesimi è stato ritirato e conservato come bozza.

## Testi approvati del 19 ottobre 2026

I due articoli sono stati sostituiti con i Word forniti dall’amministratore.
La trascrizione esatta (titoli, introduzioni, corpo e meta description) è in
`scripts/content/approved-blog-guides.json`. Le descrizioni SEO esplicite del CMS
non sono troncate; il campo ammette 320 caratteri per conservare quelle approvate.
`scripts/update-approved-blog-guides.ts` controlla la fedeltà della conversione
Word/HTML → Lexical e aggiorna solo i due slug esistenti con `--publish`.
Date di pubblicazione, autore, copertine e URL restano invariati.
`test-approved-blog-build.ts` verifica che i testi pubblicati corrispondano alla fonte.
