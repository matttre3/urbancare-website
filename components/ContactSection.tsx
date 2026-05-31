import React from "react";
import { Text } from "./Text";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

function ContactCardPhone() {
  return (
    <div className="rounded-lg bg-accent p-6 md:p-7 border border-border/60 flex items-start gap-4">
      <div className="size-10 shrink-0 rounded-md bg-urbancare-quaternary-blue grid place-items-center">
        <Phone className="text-urbancare-primary-blue" />
      </div>
      <div className="min-w-0 flex-1">
        <Text as="h3" size="h6" weight="bold" className="text-urbancare-primary-blue">
          Chiamaci al telefono
        </Text>
        <div className="mt-3 space-y-1">
          <Text
            size="p"
            weight="semibold"
            className="text-urbancare-primary-blue"
          >
            Dott. Noele Romano
          </Text>
          <a
            href={siteConfig.phoneHref}
            className="text-muted-foreground underline-offset-4 hover:underline"
          >
            <Text size="p" className="text-muted-foreground">
              {siteConfig.phone}
            </Text>
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactCardEmail() {
  return (
    <div className="rounded-lg bg-accent p-6 md:p-7 border border-border/60 flex items-start gap-4">
      <div className="size-10 shrink-0 rounded-md bg-urbancare-quaternary-blue grid place-items-center">
        <Mail className="text-urbancare-primary-blue" />
      </div>
      <div className="min-w-0 flex-1">
        <Text as="h3" size="h6" weight="bold" className="text-urbancare-primary-blue">
          Scrivici via e-mail
        </Text>
        <div className="mt-3 space-y-1">
          <Text
            size="p"
            weight="semibold"
            className="text-urbancare-primary-blue"
          >
            Dott. Noele Romano
          </Text>
          <a
            className="block text-muted-foreground underline-offset-4 hover:underline break-all"
            href={`mailto:${siteConfig.email}`}
          >
            <Text size="p" className="text-muted-foreground">
              {siteConfig.email}
            </Text>
          </a>
          <Text
            size="p"
            weight="semibold"
            className="text-urbancare-primary-blue"
          >
            Dott. Noele Romano PEC
          </Text>
          <a
            className="block text-muted-foreground underline-offset-4 hover:underline break-all"
            href={`mailto:${siteConfig.pec}`}
          >
            <Text size="p" className="text-muted-foreground">
              {siteConfig.pec}
            </Text>
          </a>
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
        Chiamaci o scrivici: ti ricontattiamo al più presto con informazioni
        chiare e una proposta personalizzata.
      </Text>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
        <ContactCardPhone />
        <ContactCardEmail />
      </div>

      <Button asChild className="col-start-3 justify-self-end">
        <Link href="/preventivo">
          <p className="tracking-wider">Richiedi un preventivo</p>
        </Link>
      </Button>
    </section>
  );
}
