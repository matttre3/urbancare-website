import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import AdministratorSection from "@/components/AdministratorSection";
import ContactSection from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-24 overflow-x-hidden sm:gap-32 lg:gap-40">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": absoluteUrl("/#localbusiness"),
          name: siteConfig.name,
          legalName: siteConfig.legalName,
          url: absoluteUrl("/"),
          logo: absoluteUrl("/horizontal-logo.svg"),
          image: absoluteUrl("/bg-hero.png"),
          telephone: siteConfig.phone,
          email: siteConfig.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.location,
            addressRegion: siteConfig.region,
            addressCountry: "IT",
          },
          areaServed: siteConfig.areaServed,
          priceRange: "€€",
          serviceType: [
            "Amministratore condominiale Milano e provincia",
            "Gestione condominio Milano e provincia",
            "Consulenza condominiale Milano",
            "Gestione contabile condominiale Milano",
          ],
          founder: {
            "@type": "Person",
            name: "Noele Romano",
            jobTitle: "Amministratore di condominio",
          },
        }}
      />
      <div>
        <Hero />
        <StatsSection />
      </div>
      <div>
        <MethodologySection />
      </div>
      <div>
        <ServicesSection />
      </div>
      <div>
        <AdministratorSection />
      </div>
      <div>
        <ContactSection />
      </div>
    </main>
  );
}
