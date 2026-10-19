# Umami Cloud per UrbanCare

Il tracker è nel layout del sito pubblico, separato dal layout Payload. Si carica soltanto dopo l’accettazione esplicita nel banner, con `VERCEL_ENV=production` e configurazione valida. Locale e Preview non raccolgono statistiche. Il filtro `data-domains` consente solo il dominio canonico e la variante con/senza `www`.

## Stato del collegamento (19 ottobre 2026)

Production su Vercel aveva già `UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js`
e il website ID `b8cc84d9-a61f-4992-9855-647781f9ddda`, configurati l’8 ottobre.
La precedente verifica del solo account MATTTRE e dell’ambiente locale era incompleta:
non dimostrava l’assenza della configurazione Production né di un altro account.

Il proprietario ha fornito il nuovo website ID dell’account dedicato a Urbancare:
`555dd40f-82e5-4b65-9e44-6f3d1555f747`. Il valore è stato salvato e verificato
nella variabile `UMAMI_WEBSITE_ID` di **Production**; l’URL script è invariato.
Le nuove variabili si applicano al prossimo deploy Production. Nessun merge in
`main` o redeploy Production è stato eseguito con questo aggiornamento.
Il branch di preview contiene il caricamento subordinato al consenso.
La ricezione di pageview nel nuovo account resta da verificare dopo il rilascio.

## Attivazione

1. Crea/accedi al tuo account Umami Cloud sul piano Hobby gratuito e aggiungi il sito `www.urbancare-amministrazioni.com`.
2. Copia da **Tracking code** l'URL `src` e il `data-website-id`.
3. Configura solo nell'ambiente **Production** del progetto Vercel:
   - `UMAMI_SCRIPT_URL`: URL HTTPS dello script fornito da Umami.
   - `UMAMI_WEBSITE_ID`: identificativo del sito fornito da Umami.
4. Verifica regione dei dati, condizioni/DPA e informativa privacy per la configurazione effettiva prima dell'attivazione. Il testo predisposto descrive Umami Cloud Hobby e la conservazione di sei mesi; adegualo se cambi piano.
5. Dopo il merge del rework in `main` e il deployment Production, apri il dominio pubblico, accetta le statistiche nel banner e verifica le visite nella dashboard. Browser con Do Not Track attivo o ad blocker possono non comparire.

Non servono API key, credenziali dell'account, nuovi database o SDK. URL e website ID del tracker sono pubblici e compariranno nel browser. Senza entrambe le variabili il tracker resta disattivato.

## Consenso

- Il banner presenta “Rifiuta” e “Accetta” con la stessa evidenza. Nessun download
  dello script Umami e nessuna pageview prima dell’accettazione.
- La preferenza è salvata in `localStorage` (`urbancare-privacy-v1`) per 180 giorni,
  come MATTTRE Studio. Valori mancanti, malformati o scaduti richiedono una nuova scelta.
- “Preferenze privacy” è nel footer accanto alla Privacy Policy su tutte le pagine pubbliche, senza pulsanti flottanti sulle CTA.
  Il pannello consente di revocare o rinnovare il consenso.
- La revoca blocca anche l’invio da un tracker già caricato, senza ricaricare la pagina;
  la modifica si propaga alle altre schede. Il controllo viene ripetuto prima di ogni invio.
- Do Not Track e Global Privacy Control impediscono il caricamento anche con consenso.
- Locale e Preview mostrano il banner per verificarne la UI, ma non caricano Umami.
- Il pannello Payload `/admin` non contiene banner o tracker.

## Minimizzazione

- Solo pageview; eventi personalizzati e identificazione utenti vengono scartati.
- Query string e frammenti esclusi dagli URL della pagina e del referrer.
- Nessun dato dei moduli viene passato al tracker; replay e heatmap non sono abilitati.
- Credenziali del browser escluse dalle richieste del tracker.
- L’informativa descrive preferenze e revoca; i dettagli del servizio vengono mostrati
  in Production quando la configurazione del tracker è valida.

## Verifica

`node --import tsx scripts/test-privacy.tsx` verifica il blocco iniziale, rifiuto,
accettazione, revoca, rinnovo senza duplicati, scadenza, sincronizzazione tra schede,
Do Not Track, Global Privacy Control, assenza del tracker nelle preview e minimizzazione.

## Documentazione

- https://docs.umami.is/docs/collect-data
- https://docs.umami.is/docs/tracker-configuration
