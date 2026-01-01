import Hero from "@/components/Hero";
import SingleStat from "@/components/SingleStat";
import StatsSection from "@/components/StatsSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import AdministratorSection from "@/components/AdministratorSection";
import ContactSection from "@/components/ContactSection";
import Script from "next/script";

export default function Home() {
  return (
    <main className="min-h-screen flex gap-40 flex-col">
      <Script id="ld-localbusiness" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Urbancare",
          areaServed: "Milano e provincia",
          serviceType: [
            "Amministratore condominiale Milano e provincia",
            "Gestione condominio Milano e provincia",
          ],
        })}
      </Script>
      <div>
        <Hero />
        <StatsSection />
      </div>
      <MethodologySection />
      <ServicesSection />
      <AdministratorSection />
      <ContactSection />
    </main>
  );
}
