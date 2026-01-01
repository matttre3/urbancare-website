import React from "react";
import type { Metadata } from "next";
import { Text } from "@/components/Text";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa privacy ai sensi dell'art. 13 GDPR per i visitatori del sito Urbancare – Noele Romano. Dati trattati, finalità, basi giuridiche e diritti dell'interessato.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex gap-40 flex-col">
      <section className="px-5 sm:px-10 md:px-20 py-10 sm:py-12 md:py-16 flex flex-col gap-6">
        <header className="flex flex-col  text-center gap-3">
          <Text size="h1" weight="bold">
            Privacy Policy
          </Text>
          <Text size="p" className="text-muted-foreground max-w-3xl">
            Informativa ai sensi dell’art. 13 del Regolamento UE 2016/679 (GDPR)
          </Text>
        </header>

        <div className="prose max-w-4xl leading-relaxed text-muted-foreground">
          <Text size="p" className="text-sm">
            Gentile visitatore, con la presente pagina Urban Care – Noele Romano
            intende fornirLe tutte le indicazioni previste dall’art. 13 del
            Regolamento UE 2016/679 (di seguito anche “Regolamento” o “GDPR”) in
            merito al trattamento dei dati personali dei visitatori del presente
            sito internet.
          </Text>
          <Text size="p" className="text-sm">
            Le presenti informazioni non riguardano altri siti, pagine o servizi
            online raggiungibili tramite link ipertestuali pubblicati nel
            presente sito, o comunque gestiti da soggetti terzi. L’informativa è
            resa, ai sensi del Regolamento UE 2016/679, a tutti gli utenti che
            interagiscono con il Sito e i relativi servizi. La validità delle
            informazioni contenute nella presente pagina è limitata al solo Sito
            e non si estende ad altri siti web esterni eventualmente
            consultabili mediante collegamento ipertestuale.
          </Text>
          <Text size="p" className="text-sm">
            Ai sensi della normativa sul trattamento dei dati personali: a)
            “Noi”, cioè Urban Care – Noele Romano, proprietario del sito, siamo
            il Titolare del Trattamento; b) “Lei” è l’Interessato, e ha i
            diritti che Le vengono illustrati di seguito.
          </Text>

          <hr className="my-6 border-border/60" />

          <Text
            size="h3"
            weight="semibold"
            className="text-foreground text-urbancare-primary-blue"
          >
            1. Titolare del trattamento
          </Text>
          <Text size="p" className="text-sm">
            Il Titolare del Trattamento è: Noele Romano – Urban Care. Email:
            [inserisci email di contatto]. Sede: [facoltativo]. Il Titolare
            tratta i dati personali secondo i principi di liceità, correttezza,
            trasparenza, limitazione delle finalità e della conservazione,
            minimizzazione dei dati, esattezza, integrità e riservatezza.
          </Text>

          <Text
            size="h3"
            weight="semibold"
            className="text-foreground mt-6 text-urbancare-primary-blue"
          >
            2. Finalità e basi giuridiche del trattamento
          </Text>
          <Text size="p" className="text-sm">
            I dati personali sono trattati esclusivamente per le seguenti
            finalità:
          </Text>
          <ul className="list-disc pl-6 text-sm">
            <li>consentire il corretto funzionamento tecnico del sito;</li>
            <li>
              gestire le richieste di informazioni inviate dagli utenti tramite
              il modulo di contatto o tramite email.
            </li>
          </ul>
          <Text size="p" className="text-sm">
            I sistemi informatici e le procedure software preposte al
            funzionamento del sito acquisiscono alcuni dati personali di
            navigazione (es. indirizzi IP, URL richiesti, orario della
            richiesta), necessari al funzionamento dei protocolli di
            comunicazione Internet.
          </Text>

          <Text
            size="h3"
            weight="semibold"
            className="text-foreground mt-6 text-urbancare-primary-blue"
          >
            3. Modalità del trattamento e destinatari dei dati
          </Text>
          <Text size="p" className="text-sm">
            I dati personali sono trattati con strumenti informatici da parte
            del Titolare o di soggetti da lui autorizzati. I dati possono essere
            comunicati a fornitori di servizi tecnici (es. hosting, manutenzione
            del sito, servizi email), formalmente nominati Responsabili del
            trattamento, esclusivamente per le finalità sopra indicate. I dati
            personali non saranno diffusi.
          </Text>

          <Text
            size="h3"
            weight="semibold"
            className="text-foreground mt-6 text-urbancare-primary-blue"
          >
            4. Periodo di conservazione dei dati
          </Text>
          <ul className="list-disc pl-6 text-sm">
            <li>
              I dati di navigazione sono conservati per il tempo strettamente
              necessario a garantire la sicurezza del sito.
            </li>
            <li>
              I dati forniti tramite il modulo di contatto sono conservati per
              il tempo necessario a gestire la richiesta dell’utente.
            </li>
          </ul>

          <Text
            size="h3"
            weight="semibold"
            className="text-foreground mt-6 text-urbancare-primary-blue"
          >
            5. Natura del conferimento dei dati
          </Text>
          <Text size="p" className="text-sm">
            Il conferimento dei dati tramite il modulo di contatto è
            facoltativo. Il mancato conferimento dei dati obbligatori comporta
            l’impossibilità di inoltrare la richiesta o di ricevere risposta.
          </Text>

          <Text
            size="h3"
            weight="semibold"
            className="text-foreground mt-6 text-urbancare-primary-blue"
          >
            6. Trasferimento dei dati verso Paesi extra UE
          </Text>
          <Text size="p" className="text-sm">
            I dati possono essere trattati anche tramite fornitori di servizi
            informatici o di posta elettronica che operano al di fuori
            dell’Unione Europea. In tal caso, il trasferimento avviene nel
            rispetto degli articoli 44 e seguenti del GDPR, sulla base di
            decisioni di adeguatezza o clausole contrattuali standard approvate
            dalla Commissione Europea.
          </Text>

          <Text
            size="h3"
            weight="semibold"
            className="text-foreground mt-6 text-urbancare-primary-blue"
          >
            7. Diritti dell’interessato
          </Text>
          <Text size="p" className="text-sm">
            L’Interessato può esercitare in qualsiasi momento i diritti previsti
            dagli artt. 15-22 del GDPR, tra cui:
          </Text>
          <ul className="list-disc pl-6 text-sm font-poppins text-urbancare-primary-blue ">
            <li>accesso ai dati personali;</li>
            <li>rettifica o cancellazione;</li>
            <li>limitazione o opposizione al trattamento;</li>
            <li>portabilità dei dati;</li>
            <li>revoca del consenso.</li>
          </ul>
          <Text size="p" className="text-sm">
            Le richieste possono essere inviate al Titolare all’indirizzo email
            indicato al punto 1. L’Interessato ha inoltre diritto di proporre
            reclamo all’Autorità Garante per la Protezione dei Dati Personali:{" "}
            <a
              href="https://www.garanteprivacy.it"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.garanteprivacy.it
            </a>
          </Text>
        </div>
      </section>
    </main>
  );
}
