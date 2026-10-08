# Umami Cloud per UrbanCare

Il tracker è nel layout del sito pubblico, separato dal layout Payload. Si carica soltanto con `VERCEL_ENV=production` e configurazione valida. Locale e Preview non raccolgono statistiche. Il filtro `data-domains` consente solo il dominio canonico e la variante con/senza `www`.

## Attivazione

1. Crea/accedi al tuo account Umami Cloud sul piano Hobby gratuito e aggiungi il sito `www.urbancare-amministrazioni.com`.
2. Copia da **Tracking code** l'URL `src` e il `data-website-id`.
3. Configura solo nell'ambiente **Production** del progetto Vercel:
   - `UMAMI_SCRIPT_URL`: URL HTTPS dello script fornito da Umami.
   - `UMAMI_WEBSITE_ID`: identificativo del sito fornito da Umami.
4. Verifica regione dei dati, condizioni/DPA e informativa privacy per la configurazione effettiva prima dell'attivazione. Il testo predisposto descrive Umami Cloud Hobby e la conservazione di sei mesi; adegualo se cambi piano.
5. Dopo il merge del rework in `main` e il deployment Production, apri il dominio pubblico e verifica le visite nella dashboard. Browser con Do Not Track attivo o ad blocker possono non comparire.

Non servono API key, credenziali dell'account, nuovi database o SDK. URL e website ID del tracker sono pubblici e compariranno nel browser. Senza entrambe le variabili il tracker resta disattivato.

## Minimizzazione

- Solo pageview; eventi personalizzati e identificazione utenti vengono scartati dal filtro `urbancareUmamiBeforeSend`.
- Query string e frammenti esclusi dagli URL della pagina e del referrer.
- Nessun dato dei moduli viene passato al tracker; non vengono abilitati replay, heatmap o identificativi degli account.
- Rispetto di Do Not Track; credenziali del browser escluse dalle richieste del tracker.
- L'informativa dedicata compare quando il tracker è configurato e attivo in Production.

Non confondere l'assenza di cookie con un'esenzione automatica da ogni obbligo sul tracciamento: la configurazione concreta va valutata secondo le indicazioni del Garante. Il codice non costituisce una verifica legale dell'esenzione dal consenso.

## Documentazione

- https://docs.umami.is/docs/collect-data
- https://docs.umami.is/docs/tracker-configuration
- https://umami.is/pricing
- https://www.garanteprivacy.it/faq/Cookie
