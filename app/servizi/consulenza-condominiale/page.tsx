import Link from "next/link";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Consulenza condominiale a Milano",
  description:
    "Consulenza condominiale a Milano e provincia: supporto normativo e strategico per amministratori e condomini.",
  alternates: { canonical: "/servizi/consulenza-condominiale" },
  robots: { index: true, follow: true },
};

export default function ConsulenzaCondominialePage() {
  return (
    <main className="min-h-screen flex gap-40 flex-col">
      <section className="px-5 sm:px-10 md:px-20 py-10 sm:py-12 md:py-16 flex flex-col gap-6 sm:gap-8">
        <header className="flex flex-col items-center text-center gap-3">
          <Text size="h1" weight="bold">
            Consulenza condominiale a Milano
          </Text>
          <Text size="p" className="max-w-3xl text-muted-foreground">
            Un supporto strategico per il tuo condominio
          </Text>
        </header>

        <Script id="ld-service-consulenza" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Consulenza condominiale Milano",
            areaServed: "Milano e provincia",
            provider: { "@type": "LocalBusiness", name: "Urbancare" },
            serviceType: "Consulenza condominiale",
          })}
        </Script>

        <div className="grid grid-cols-1 gap-8 md:gap-10 max-w-5xl mx-auto">
          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              Un supporto strategico per il tuo condominio
            </Text>
            <Text size="p" className="text-muted-foreground">
              La consulenza condominiale offre un supporto specialistico per
              affrontare situazioni complesse, dubbi normativi e decisioni
              importanti. È ideale sia per condomini che per amministratori che
              desiderano operare con maggiore sicurezza.
            </Text>
          </section>

          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              Quando è utile la consulenza
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <Text size="p">
                  Interpretazione delle normative condominiali
                </Text>
              </li>
              <li>
                <Text size="p">Gestione di controversie tra condomini</Text>
              </li>
              <li>
                <Text size="p">Valutazione di interventi straordinari</Text>
              </li>
              <li>
                <Text size="p">
                  Supporto durante il cambio di amministratore
                </Text>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              Un investimento in tranquillità
            </Text>
            <Text size="p" className="text-muted-foreground">
              Una consulenza mirata permette di prevenire errori costosi e di
              prendere decisioni consapevoli, riducendo il rischio di
              contenziosi e migliorando la gestione complessiva del condominio.
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
