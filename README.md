# UrbanCare

Rework Next.js + Payload CMS nella branch `codex/urbancare-rework`. Replica le nove pagine di `urbancare-sito.html` con markup renderizzato dal server, CSS e generatori SVG originali, temi chiaro/scuro e interazioni responsive.

- Node.js 24, pnpm 10.17.1, Next.js 16.4.0, React 19.3.0, Payload 3.90.2.
- Neon Postgres per CMS e blog; Vercel Blob per le immagini; Resend per contatti e preventivi.
- Pannello `/admin`, blog `/blog`, articoli `/blog/[slug]`.

La configurazione passo per passo è in [docs/VERCEL-PAYLOAD.md](docs/VERCEL-PAYLOAD.md). Copia `.env.example` in `.env` per collegare il CMS in locale. Senza database il sito mostra il mock, disponibile per la revisione grafica; i moduli non inviano email senza Resend.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Per il CMS configurato:

```sh
pnpm cms:migrate
pnpm cms:seed # facoltativo: crea bozze dal mock senza sovrascrivere dati
```

```sh
pnpm typecheck
pnpm lint
pnpm build
pnpm test:cms
pnpm test:e2e
```

Il comando di build Vercel applica le migrazioni prima di compilare Next.js. Locale, Preview e Production usano il database Neon `urbancare-cms` e lo store Blob `urbancare-cms-media` condivisi, come richiesto dal proprietario.

## Aggiornare il riferimento grafico

```sh
python3 scripts/import-mock.py /percorso/urbancare-sito.html
```

L'importatore conserva CSS e animazioni, estrae l'immagine condivisa e aggiorna i template. Gli adattamenti per route, dati CMS, invio moduli e accessibilità sono versionati nello script; il riferimento è identificato da `docs/design-source.json`.
