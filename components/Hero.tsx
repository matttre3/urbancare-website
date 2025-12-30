import React from "react";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="bg-[url(/bg-hero.png)] bg-cover bg-center">
      <div className=" px-5 sm:px-10 md:px-20 flex flex-col gap-4 sm:gap-9 items-center justify-center min-h-[calc(100dvh-104px)] ">
        <Text
          size="h1"
          className="bg-linear-to-t font-bold tracking-normal from-urbancare-primary-blue to-urbancare-secondary-blue bg-clip-text text-transparent text-3xl! sm:text-4xl! md:text-6xl! max-w-[1060px]"
          align="center"
        >
          Gestione condominiale trasparente ed efficiente in Provincia di Milano
        </Text>
        <Text size="p" align="center">
          Organizzazione chiara, comunicazioni costanti e strumenti digitali per
          ogni condominio.
        </Text>

        <Button size="lg" className=" col-start-3 justify-self-end">
          <Text
            size="p"
            weight="bold"
            className="tracking-wider text-white text-sm"
          >
            Richiedi un preventivo
          </Text>
        </Button>
      </div>
    </div>
  );
}
