import Link from "next/link";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";

export default function AmministrazioneCondominialePage() {
  return (
    <main className="min-h-screen flex gap-40 flex-col">
      <section className="px-5 sm:px-10 md:px-20 py-10 sm:py-12 md:py-16 flex flex-col gap-6 sm:gap-8">
        <header className="flex flex-col items-center text-center gap-3">
          <Text size="h1" weight="bold">
            Amministrazione Condominiale
          </Text>
          <Text size="p" className="max-w-3xl text-muted-foreground">
            Gestione chiara e senza sorprese: scopri come valorizzare il tuo
            condominio.
          </Text>
        </header>

        <div className="grid grid-cols-1 gap-8 md:gap-10 max-w-5xl mx-auto">
          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              Cos’è l’amministrazione condominiale e perché è fondamentale
            </Text>
            <Text size="p" className="text-muted-foreground">
              L’amministrazione condominiale è il cuore organizzativo di un
              edificio: coordina persone, risorse e obblighi di legge per
              garantire una gestione efficiente, trasparente e conforme alle
              normative vigenti. Un buon amministratore non si limita a pagare
              le spese, ma tutela il valore dell’immobile e la serenità dei
              condomini.
            </Text>
          </section>

          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              I principali compiti dell’amministratore
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <Text size="p">Gestione delle assemblee e verbalizzazione</Text>
              </li>
              <li>
                <Text size="p">
                  Redazione e aggiornamento del regolamento condominiale
                </Text>
              </li>
              <li>
                <Text size="p">
                  Gestione dei fornitori e dei contratti di manutenzione
                </Text>
              </li>
              <li>
                <Text size="p">Cura degli adempimenti fiscali e normativi</Text>
              </li>
              <li>
                <Text size="p">
                  Gestione delle emergenze e degli interventi straordinari
                </Text>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              I vantaggi di una gestione professionale
            </Text>
            <Text size="p" className="text-muted-foreground">
              Affidarsi a un’amministrazione condominiale professionale
              significa avere chiarezza sui costi, riduzione dei conflitti
              interni e maggiore tutela legale. La comunicazione costante con i
              condomini è un elemento chiave per costruire fiducia.
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
