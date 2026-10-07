# Verifica del rework — 7 ottobre 2026

- `pnpm build`: completata con Next.js 16.4.0, Payload 3.90.2 e import map rigenerata.
- `pnpm typecheck` e `pnpm lint`: completati senza errori o warning.
- `pnpm test:e2e`: 43 test superati, un controllo del menu mobile escluso dal progetto desktop. Include tutte le route, temi, ricerca/categorie, navigazione blog, preventivo animato, calcolatore, errori e conferma invio, consenso, redirect, 404 e immagine Open Graph.
- `pnpm test:cms`: completato su Postgres temporaneo in memoria. Verificati migrazione iniziale e ripetibilità, utenti/ruoli, bozze e date future, lettura pubblica degli articoli, riservatezza degli iscritti, login nel pannello, editor Lexical, modifica dei contenuti, upload/ridimensionamento e copertine nel frontend.
- Confronto con il mock: viewport 1440×1000 e 390×844, tema scuro. Le misure di navigazione, titoli e sezioni confrontate coincidono. Gli screenshot iniziali di amministrazione e studio coincidono; la home differisce solo leggermente nei pixel delle animazioni temporizzate/casuali. Non è una verifica pixel per pixel di ogni stato di tutte le pagine.

I file di confronto e gli screenshot sono stati salvati in `/private/tmp/urbancare-review`. Per ripetere il confronto usa `pnpm exec tsx scripts/check-design.ts /percorso/urbancare-sito.html`, con il sito stabile sulla porta 3100.

Non sono stati usati database di produzione o credenziali cloud. L'invio email nei test browser è simulato; consegna reale via Resend e upload Vercel Blob/Neon vanno verificati nella preview dopo aver configurato gli account.
