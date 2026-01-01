import Hero from "@/components/Hero";
import SingleStat from "@/components/SingleStat";
import StatsSection from "@/components/StatsSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import AdministratorSection from "@/components/AdministratorSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen flex gap-40 flex-col">
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
