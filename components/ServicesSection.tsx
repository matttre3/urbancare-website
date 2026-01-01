import React from "react";
import Link from "next/link";
import { Text } from "./Text";
import { Button } from "./ui/button";
import { Building2, FileText, Globe2, BriefcaseBusiness } from "lucide-react";

type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
};

const services: Service[] = [
  {
    icon: <Building2 className="text-urbancare-primary-blue" />,
    title: "Amministrazione Condominiale",
    description:
      "Gestione chiara e senza sorprese: scopri come valorizzare il tuo condominio.",
    href: "/servizi/amministrazione-condominiale",
  },
  {
    icon: <FileText className="text-urbancare-primary-blue" />,
    title: "Consulenza Condominiale",
    description:
      "Supporto esperto per affrontare dubbi e situazioni complesse in sicurezza.",
    href: "/servizi/consulenza-condominiale",
  },
  {
    icon: <Globe2 className="text-urbancare-primary-blue" />,
    title: "Il tuo condominio è online",
    description:
      "Tutte le informazioni a portata di click: comunicazione veloce e trasparente per tutti i condomini.",
    href: "/servizi/condominio-online",
  },
  {
    icon: <BriefcaseBusiness className="text-urbancare-primary-blue" />,
    title: "Gestione Contabile Condominiale",
    description:
      "Conti trasparenti e ordine assicurato: semplifica la contabilità del tuo condominio.",
    href: "/servizi/gestione-contabile",
  },
];

function ServiceCard({ icon, title, description, href }: Service) {
  return (
    <div className="rounded-xl bg-accent p-5 sm:p-6 md:p-7 border border-border/60">
      <div className="flex items-start gap-3">
        <div className="size-8 shrink-0 rounded-md bg-urbancare-quaternary-blue grid place-items-center">
          {icon}
        </div>
        <Text size="h6" weight="bold" className="text-urbancare-primary-blue">
          {title}
        </Text>
      </div>
      <Text size="p" className="mt-3 text-muted-foreground">
        {description}
      </Text>
      <div className="mt-6 text-right">
        {href ? (
          <Link
            href={href}
            className="text-muted-foreground hover:text-foreground"
          >
            <Text size="p" weight="medium" className="underline">
              Scopri di più
            </Text>
          </Link>
        ) : (
          <Text
            size="p"
            weight="medium"
            className="text-muted-foreground underline"
          >
            Scopri di più
          </Text>
        )}
      </div>
    </div>
  );
}

export default function ServicesSection({ isH1 = false }: { isH1?: boolean }) {
  return (
    <section className="px-5 sm:px-10 md:px-20 flex flex-col gap-4 sm:gap-9 items-center justify-center">
      <Text size={isH1 ? "h1" : "h2"} weight="bold" align="center">
        I nostri servizi
      </Text>

      <Text size="p" align="center" className="max-w-4xl text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a
        nunc eu lacus dapibus iaculis id eu leo. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Sed velit
        velit, mollis in tortor vitae, scelerisque blandit tortor. Vivamus ut
        semper libero, eget gravida dolor.
      </Text>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>

      <Link href="/preventivo">
        <Button className="mt-4">
          <p className="tracking-wider">Richiedi un preventivo</p>
        </Button>
      </Link>
    </section>
  );
}
