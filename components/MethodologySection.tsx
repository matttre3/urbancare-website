"use client";

import React from "react";
import { Text } from "./Text";
import SingleStep from "./SingleStep";
import Link from "next/link";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion, easeOut } from "framer-motion";

export default function MethodologySection() {
  const steps = [
    {
      number: "01",
      title: "Presa in carico e passaggio di consegne",
      description:
        "Riceviamo tutta la documentazione dalla precedente amministrazione, verifichiamo la completezza dei dati amministrativi, tecnici e contabili, ponendo particolare attenzione a eventuali pendenze o irregolarità",
    },
    {
      number: "02",
      title: "Ricostruzione contabile",
      description:
        "Procediamo alla ricostruzione della contabilità, analizzando le entrate, uscite, fondi e morosità, allo scopo di restituire una situazione economica chiara, aggiornata e comprensibile a tutti i condomini",
    },
    {
      number: "03",
      title: "Digitalizzazione e trasparenza",
      description:
        "Digitalizziamo tutta la contabilità e la documentazione condominiale, rendendola accessibile online ai condomini.",
    },
    {
      number: "04",
      title:
        "Incontro con i consiglieri e analisi della situazione condominiale",
      description:
        "Organizziamo un incontro con i consiglieri per: analizzare lo stato generale del condominio, individuare criticità tecniche o gestionali, definire priorità e obiettivi di intervento da portare in assemblea",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.30,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 flex flex-col gap-4 sm:gap-9 items-center justify-center ">
      <Text size="h2" weight="bold" align="center">
        Come lavoriamo
      </Text>
      <motion.div 
        className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {steps.map((step) => (
          <motion.div key={step.number} variants={itemVariants}>
            <SingleStep
              number={step.number}
              title={step.title}
              description={step.description}
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="w-full rounded-xl p-5 sm:p-6 md:p-8">
        <Text size="h3" weight="bold" align="center" className="mb-6">
          Il cambiamento inizia dal metodo
        </Text>
        <Text size="p" align="center" className="mb-8 text-muted-foreground max-w-3xl mx-auto">
          Sceglierci significa dire addio alla gestione tradizionale e abbracciare un approccio moderno, trasparente ed efficiente.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <Text size="h3" weight="bold" className="mb-4 md:mb-6">
              GESTIONE TRADIZIONALE
            </Text>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <XCircle className="mt-1 shrink-0 text-red-500" />
                <div>
                  <Text size="p" weight="semibold">
                    Errore
                  </Text>
                  <Text size="p" className="text-muted-foreground">
                    Informazioni contabili spesso incomplete o non aggiornate.
                  </Text>
                </div>
              </li>
              <li className="flex gap-3">
                <XCircle className="mt-1 shrink-0 text-red-500" />
                <div>
                  <Text size="p" weight="semibold">
                    Incertezza
                  </Text>
                  <Text size="p" className="text-muted-foreground">
                    I condomini non sanno a chi rivolgersi per chiarimenti.
                  </Text>
                </div>
              </li>
              <li className="flex gap-3">
                <XCircle className="mt-1 shrink-0 text-red-500" />
                <div>
                  <Text size="p" weight="semibold">
                    Sovraccarico
                  </Text>
                  <Text size="p" className="text-muted-foreground">
                    Documenti cartacei difficili da gestire e archiviare.
                  </Text>
                </div>
              </li>
              <li className="flex gap-3">
                <XCircle className="mt-1 shrink-0 text-red-500" />
                <div>
                  <Text size="p" weight="semibold">
                    Distanza
                  </Text>
                  <Text size="p" className="text-muted-foreground">
                    Comunicazione limitata alle assemblee.
                  </Text>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <Text size="h3" weight="bold" className="mb-4 md:mb-6">
              IL NOSTRO APPROCCIO
            </Text>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" />
                <div>
                  <Text size="p" weight="semibold">
                    Precisione
                  </Text>
                  <Text size="p" className="text-muted-foreground">
                    Contabilità sempre aggiornata e verificata, consultabile in
                    tempo reale.
                  </Text>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" />
                <div>
                  <Text size="p" weight="semibold">
                    Trasparenza
                  </Text>
                  <Text size="p" className="text-muted-foreground">
                    Accesso diretto e semplice alle informazioni, con report
                    chiari e condivisi.
                  </Text>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" />
                <div>
                  <Text size="p" weight="semibold">
                    Organizzazione
                  </Text>
                  <Text size="p" className="text-muted-foreground">
                    Tutto digitalizzato, ordinato e facilmente consultabile.
                  </Text>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" />
                <div>
                  <Text size="p" weight="semibold">
                    Dialogo
                  </Text>
                  <Text size="p" className="text-muted-foreground">
                    Confronto costante con consiglieri e condomini per
                    intercettare criticità prima che diventino problemi.
                  </Text>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Link href="/preventivo">
        <Button className="col-start-3 justify-self-end">
          <p className="tracking-wider">Richiedi un preventivo</p>
        </Button>
      </Link>
    </div>
  );
}
