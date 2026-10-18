# Full Audit UrbanCare del 18 ottobre 2026

Applicate le skill ai-seo e seo-geo-aeo dopo scelta Full dell’utente.

- `urbancare-full-audit-2026-10-18.docx` e `.pdf`: report finale.
- `full-audit.md`: analisi in formato testuale.
- `ricerca-keyword.md`: ricerca iniziale e limiti dei volumi.
- `google-ads-keywords-italia.csv` e `google-ads-keywords-milano.csv`: esportazioni originali UTF-16 del Keyword Planner, 687 righe ciascuna, lingua Italian, rete Google, ottobre 2025-settembre 2026.
- `keyword-map.csv`: classificazione preliminare automatica; la mappa finale degli intenti prioritari è nel report.
- `evidence/`: 15 risposte HTTP pubbliche (10 pagine, robots, sitemap e tre controlli 404), estrazione del build locale e quattro probe user agent.
- `build-report.cjs`: sorgente riproducibile del report, richiede il pacchetto docx del runtime Codex.

Controlli passati: `node --import tsx scripts/test-seo.ts` e `node --import tsx scripts/test-seo-build.ts`. Il build esaminato è quello esistente del 15 ottobre, non rigenerato. Nessun cambiamento ai sorgenti dell’app, al database, ai profili esterni o alle campagne.

Non misurati: Search Console, conversioni, backlink, Core Web Vitals, profilo Google gestito e tasso di citazione su sessioni AI ripetute. I punteggi descrivono il materiale osservato, non ranking o risultati commerciali.

## Implementazione successiva all’audit

Su richiesta dell’utente sono state applicate risposte al preventivo e ai servizi,
collegamenti interni, metadata e coerenza del portale. Le due guide su costo e
cambio amministratore sono state inserite nel CMS come articoli del blog; la
sezione autonoma `/guide` è stata rimossa con redirect permanenti. L’articolo
sui millesimi è stato ritirato e conservato come bozza.
Vedere `docs/SEO.md` e `lib/design/seo-content.ts`. I report Word/PDF restano
la fotografia precedente agli interventi, non una rivalutazione successiva.

Verifiche: typecheck, lint, build con contenuti CMS e controlli SEO passati.
La pubblicazione del codice avviene sul branch di preview; il dominio pubblico
resta collegato a `main`.
