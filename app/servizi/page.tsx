import ServicesSection from "@/components/ServicesSection";
import React from "react";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Servizi di amministrazione condominiale",
  description:
    "Servizi di amministrazione condominiale a Milano e provincia: gestione condominio, preventivi, consulenza e supporto ai condomini.",
  path: "/servizi",
});

export default function Servizi() {
  return (
    <div className="pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Servizi Urbancare",
          description:
            "Servizi di amministrazione condominiale a Milano e provincia",
          provider: {
            "@type": "ProfessionalService",
            name: siteConfig.name,
          },
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
        }}
      />
      <ServicesSection isH1 />
    </div>
  );
}
