import ContactSection from "@/components/ContactSection";
import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Urbancare – Amministratore condominiale a Milano e provincia. Richiedi informazioni su gestione condominio, preventivi e supporto.",
  alternates: { canonical: "/contatti" },
  robots: { index: true, follow: true },
};

export default function Contatti() {
  return (
    <div className="pt-10">
      <Script id="ld-contactpage" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contatti Urbancare",
          description:
            "Contatta Urbancare, amministratore condominiale a Milano e provincia",
          about: {
            "@type": "LocalBusiness",
            name: "Urbancare",
            areaServed: "Milano e provincia",
            serviceType: [
              "Amministratore condominiale Milano e provincia",
              "Gestione condominio Milano e provincia",
            ],
          },
        })}
      </Script>
      <ContactSection isH1 />
    </div>
  );
}
