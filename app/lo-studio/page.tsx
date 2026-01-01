import React from "react";
import Image from "next/image";
import { Text } from "@/components/Text";
import MethodologySection from "@/components/MethodologySection";

export default function LoStudio() {
  return (
    <main className="px-5 sm:px-10 md:px-20 flex flex-col gap-2 sm:gap-4 md:gap-6 items-center pt-10">
      <header className="flex flex-col items-center gap-3">
        <Text size="h1" weight="bold" align="center">
          Lo studio
        </Text>
        <Text align="center" className="text-muted-foreground max-w-3xl">
          Amministrazione condominiale moderna, trasparente e orientata alle
          persone
        </Text>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(260px,420px)_1fr] gap-8 md:gap-12 items-center">
        <div className="space-y-6 flex flex-col items-center justify-self-center lg:justify-self-start">
          <Image
            src="/horizontal-logo.svg"
            alt="Urbancare logo"
            width={260}
            height={80}
            className="lg:h-auto lg:w-auto "
            priority
          />

          <Image
            src="/amministratore-noele-romano.png"
            alt="Noele Romano"
            width={420}
            height={520}
            className="rounded-lg object-cover"
            priority
          />
        </div>

        <div className="space-y-6 max-w-3xl">
          <Text size="p">
            <em>Noele Romano</em>, amministratore di condominio in Provincia di
            Milano dal 2024, con un’esperienza nel settore dell’amministrazione
            condominiale maturata a partire dal 2020. Dopo anni di lavoro come
            contabile e segretario, ruoli che mi hanno permesso di acquisire
            solide competenze organizzative, amministrative e relazionali, ho
            deciso di avviare la mia attività in modo autonomo, offrendo un
            servizio professionale e trasparente ai condomini della Provincia di
            Milano.
          </Text>

          <Text size="p">
            Per garantire una gestione completa ed efficiente, mi avvalgo di un{" "}
            <strong>team di esperti</strong> in amministrazione condominiale,
            composto da amministratori, avvocati e commercialisti, con cui
            collaboro costantemente per affrontare ogni aspetto amministrativo,
            legale e fiscale del condominio.
          </Text>

          <Text size="p">
            Ho sempre lavorato nel sociale e a stretto contatto con le persone,
            sviluppando un approccio basato sull’ascolto e sulla risoluzione
            concreta delle problematiche condominiali. Questo mi ha portato a
            scegliere l’amministrazione condominiale come professione ideale per
            unire competenza tecnica e attenzione al rapporto umano.
          </Text>

          <Text size="p">
            Il mio obiettivo è offrire un servizio di amministrazione
            condominiale in Provincia di Milano chiaro, affidabile e presente,
            orientato alla tutela del patrimonio comune e alla serenità dei
            condomini.
          </Text>
        </div>
      </section>
      <MethodologySection />
    </main>
  );
}
