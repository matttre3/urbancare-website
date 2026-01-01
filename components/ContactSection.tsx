import React from "react";
import { Text } from "./Text";
import { Phone, Mail } from "lucide-react";

function ContactCardPhone() {
  return (
    <div className="rounded-xl bg-accent p-6 md:p-7 border border-border/60 flex items-start gap-4">
      <div className="size-10 shrink-0 rounded-md bg-urbancare-quaternary-blue grid place-items-center">
        <Phone className="text-urbancare-primary-blue" />
      </div>
      <div className="flex-1">
        <Text size="h6" weight="bold" className="text-urbancare-primary-blue">
          Chiamaci al telefono
        </Text>
        <div className="mt-3 space-y-1">
          <Text
            size="p"
            weight="semibold"
            className="text-urbancare-secondary-blue"
          >
            Dott. Romano Noele
          </Text>
          <Text size="p" className="text-muted-foreground">
            +39 327 530 6234
          </Text>
        </div>
      </div>
    </div>
  );
}

function ContactCardEmail() {
  return (
    <div className="rounded-xl bg-accent p-6 md:p-7 border border-border/60 flex items-start gap-4">
      <div className="size-10 shrink-0 rounded-md bg-urbancare-quaternary-blue grid place-items-center">
        <Mail className="text-urbancare-primary-blue" />
      </div>
      <div className="flex-1">
        <Text size="h6" weight="bold" className="text-urbancare-primary-blue">
          Scrivici via e-mail
        </Text>
        <div className="mt-3 space-y-1">
          <Text
            size="p"
            weight="semibold"
            className="text-urbancare-secondary-blue"
          >
            Dott. Romano Noele:{" "}
            <span className="font-normal text-muted-foreground">
              urbancareregest@gmail.com
            </span>
          </Text>
          <Text
            size="p"
            weight="semibold"
            className="text-urbancare-secondary-blue"
          >
            Dott. Romano Noele PEC:{" "}
            <span className="font-normal text-muted-foreground">
              urbancare@legalmail.it
            </span>
          </Text>
        </div>
      </div>
    </div>
  );
}

export default function ContactSection({ isH1 }: { isH1?: boolean }) {
  return (
    <section className="px-5 sm:px-10 md:px-20 flex flex-col gap-4 sm:gap-9 items-center justify-center">
      <Text size={isH1 ? "h1" : "h2"} weight="bold" align="center">
        Richiedi supporto o informazioni
      </Text>
      <Text size="p" align="center" className="max-w-3xl text-muted-foreground">
        Compila il form qui sotto e verrai ricontattato al più presto con una
        proposta personalizzata.
      </Text>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
        <ContactCardPhone />
        <ContactCardEmail />
      </div>
    </section>
  );
}
