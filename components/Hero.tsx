import React from "react";
import Image from "next/image";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <Image
        src="/bg-hero.png"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 scale-[1.02] object-cover object-center opacity-85 sm:opacity-95"
      />
      <div className="-z-10 absolute inset-0 bg-linear-to-b from-white/6 via-white/14 to-white/28" />
      <div className="absolute inset-0 -z-10 bg-radial-[circle_at_center] from-transparent via-transparent to-white/10" />
      <div className="flex min-h-[calc(88dvh-64px)] w-full flex-col items-center justify-center gap-4 px-5 py-16 sm:gap-9 sm:px-10 md:px-20 lg:min-h-[calc(90dvh-104px)]">
        <Text
          size="h1"
          className="max-w-5xl bg-linear-to-t from-urbancare-primary-blue to-urbancare-secondary-blue bg-clip-text text-2xl! font-bold tracking-normal text-transparent sm:text-4xl! md:text-6xl!"
          align="center"
        >
          Gestione condominiale trasparente ed efficiente in Provincia di Milano
        </Text>
        <Text size="p" align="center" className="max-w-3xl">
          Organizzazione chiara, comunicazioni costanti e strumenti digitali per
          ogni condominio.
        </Text>

        <Button asChild className="col-start-3 justify-self-end">
          <Link href="/preventivo">
            <p className="tracking-wider">Richiedi un preventivo</p>
          </Link>
        </Button>
      </div>
    </section>
  );
}
