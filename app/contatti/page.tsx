import ContactSection from "@/components/ContactSection";
import React from "react";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contatti",
  description:
    "Contatta Urbancare – Amministratore condominiale a Milano e provincia. Richiedi informazioni su gestione condominio, preventivi e supporto.",
  path: "/contatti",
});

export default function Contatti() {
  return (
    <div className="pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contatti Urbancare",
          description:
            "Contatta Urbancare, amministratore condominiale a Milano e provincia",
          about: {
            "@type": "LocalBusiness",
            name: "Urbancare",
            areaServed: "Milano e provincia",
            email: siteConfig.email,
            telephone: siteConfig.phone,
            serviceType: [
              "Amministratore condominiale Milano e provincia",
              "Gestione condominio Milano e provincia",
            ],
          },
        }}
      />
      <ContactSection isH1 />
    </div>
  );
}
