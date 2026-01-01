import Link from "next/link";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";

export default function CondominioOnlinePage() {
  return (
    <main className="min-h-screen flex gap-40 flex-col">
      <section className="px-5 sm:px-10 md:px-20 py-10 sm:py-12 md:py-16 flex flex-col gap-6 sm:gap-8">
        <header className="flex flex-col items-center text-center gap-3">
          <Text size="h1" weight="bold">
            Il tuo condominio è online
          </Text>
          <Text size="p" className="max-w-3xl text-muted-foreground">
            La digitalizzazione al servizio dei condomini
          </Text>
        </header>

        <div className="grid grid-cols-1 gap-8 md:gap-10 max-w-5xl mx-auto">
          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              La digitalizzazione al servizio dei condomini
            </Text>
            <Text size="p" className="text-muted-foreground">
              Portare il condominio online significa semplificare la
              comunicazione e rendere tutte le informazioni accessibili in
              qualsiasi momento. Portali digitali e aree riservate migliorano la
              trasparenza e il coinvolgimento dei condomini.
            </Text>
          </section>

          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              Cosa puoi fare online
            </Text>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <Text size="p">Consultare documenti e bilanci</Text>
              </li>
              <li>
                <Text size="p">Ricevere comunicazioni e avvisi</Text>
              </li>
              <li>
                <Text size="p">Inviare segnalazioni e richieste</Text>
              </li>
              <li>
                <Text size="p">
                  Partecipare attivamente alla vita condominiale
                </Text>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <Text size="h3" weight="semibold">
              I benefici della gestione digitale
            </Text>
            <Text size="p" className="text-muted-foreground">
              Meno carta, più efficienza e maggiore rapidità nelle
              comunicazioni. Un condominio online è moderno, organizzato e
              orientato alle esigenze di tutti.
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
