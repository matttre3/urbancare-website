# Copertina per la condivisione social

Copertina generale PNG 1200×630: `public/social/urbancare-share-2026.png`.
Usa il logo originale in bianco, i colori del sito e un condominio vettoriale.
I metadati Open Graph e Twitter delle pagine pubbliche usano questo asset;
le copertine personalizzate degli articoli CMS continuano ad avere precedenza.
Il percorso include una versione per distinguere il nuovo file da quello precedente.
La route `/opengraph-image` rimane disponibile e usa lo stesso generatore.

Per rigenerare il file dopo una modifica a `lib/OpenGraphImage.tsx`:

```sh
node --import tsx scripts/generate-social-cover.ts
```

Il generatore usa solo risorse locali, senza richieste a font o servizi esterni.
