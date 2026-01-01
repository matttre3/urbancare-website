import Link from "next/link";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Gestione contabile condominiale a Milano",
  description:
    "Gestione contabile condominiale a Milano e provincia: bilanci, ripartizione spese e controllo dei conti con trasparenza.",
  alternates: { canonical: "/servizi/gestione-contabile" },
  robots: { index: true, follow: true },
};

export default function GestioneContabileCondominialePage() {
  return (
    <main className="min-h-screen flex gap-40 flex-col">
      <section className="px-5 sm:px-10 md:px-20 py-10 sm:py-12 md:py-16 flex flex-col gap-6 sm:gap-8">
        <header className="flex flex-col items-center text-center gap-3">
          <Text size="h1" weight="bold">
            Gestione contabile condominiale a Milano
          </Text>
          <Text size="p" className="max-w-3xl text-muted-foreground">
            Ordine e trasparenza nei conti
          </Text>
        </header>

        <Script id="ld-service-gestione-contabile" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Gestione contabile condominiale Milano",
            areaServed: "Milano e provincia",
            provider: { "@type": "LocalBusiness", name: "Urbancare" },
            serviceType: "Gestione contabile condominiale",
          })}
        </Script>

        <div className="grid grid-cols-1 gap-8 md:gap-10 max-w-5xl mx-auto">
          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              Ordine e trasparenza nei conti
            </Text>
            <Text size="p" className="text-muted-foreground">
              La gestione contabile condominiale garantisce un controllo preciso
              delle entrate e delle uscite, assicurando chiarezza e correttezza
              nella ripartizione delle spese.
            </Text>
          </section>

          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              Attività principali
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <Text size="p">
                  Redazione del bilancio preventivo e consuntivo
                </Text>
              </li>
              <li>
                <Text size="p">
                  Ripartizione delle spese secondo le tabelle millesimali
                </Text>
              </li>
              <li>
                <Text size="p">Gestione dei pagamenti e dei solleciti</Text>
              </li>
              <li>
                <Text size="p">
                  Conservazione della documentazione contabile
                </Text>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              Perché è così importante
            </Text>
            <Text size="p" className="text-muted-foreground">
              Una contabilità accurata evita incomprensioni e contestazioni,
              rafforzando la fiducia dei condomini e assicurando il rispetto
              degli obblighi di legge.
            </Text>
          </section>

          <div className="pt-2">
            <Link href="/preventivo">
              <Button size="lg">
                <p className="tracking-wider">Richiedi un preventivo</p>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
