import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "./Text";
import { Button } from "./ui/button";

export default function AdministratorSection() {
  return (
    <section className="px-5 sm:px-10 md:px-20 flex flex-col gap-4 sm:gap-9 items-center justify-center">
      <Text size="h2" weight="bold" align="center">
        L’amministratore
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(260px,380px)_1fr] items-center gap-8 md:gap-12">
        <div className="justify-self-center md:justify-self-start">
          <Image
            src="/amministratore-noele-romano.png"
            alt="Amministratore Noele Romano"
            width={380}
            height={420}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col items-center md:items-start gap-6 w-fit">
          <Text
            size="p"
            className="max-w-2xl w-fit text-urbancare-primary-blue/90"
          >
            <em>Noele Romano</em>, <strong>amministratore</strong> di condominio
            in
            <strong> Provincia di Milano</strong>. Dal 2024 gestisco condomini
            con professionalità, trasparenza e attenzione alle persone,
            supportato da un team di esperti in amministrazione, diritto e
            contabilità.
          </Text>

          <div>
            <Link href="/lo-studio">
              <Button variant="secondary" size="lg" className="px-8">
                <Text size="p" weight="medium" className="tracking-wide">
                  Scopri di più
                </Text>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
