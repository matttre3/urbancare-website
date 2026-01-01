import ServicesSection from "@/components/ServicesSection";
import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Servizi – Amministratore condominiale Milano",
  description:
    "Servizi di amministrazione condominiale a Milano e provincia: gestione condominio, preventivi, consulenza e supporto ai condomini.",
  alternates: { canonical: "/servizi" },
  robots: { index: true, follow: true },
};

export default function Servizi() {
  return (
    <div className="pt-10">
      <Script id="ld-services" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Servizi Urbancare",
          description:
            "Servizi di amministrazione condominiale a Milano e provincia",
          hasPart: [
            {
              "@type": "Service",
              name: "Amministratore condominiale Milano",
              areaServed: "Milano e provincia",
            },
            {
              "@type": "Service",
              name: "Gestione condominio Milano",
              areaServed: "Milano e provincia",
            },
          ],
        })}
      </Script>
      <ServicesSection isH1 />
    </div>
  );
}
