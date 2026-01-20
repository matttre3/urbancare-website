"use client";

import Hero from "@/components/Hero";
import SingleStat from "@/components/SingleStat";
import StatsSection from "@/components/StatsSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import AdministratorSection from "@/components/AdministratorSection";
import ContactSection from "@/components/ContactSection";
import Script from "next/script";
import { motion, easeOut } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: easeOut }
};

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
        <motion.div {...fadeInUp}>
          <Hero />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}>
          <StatsSection />
        </motion.div>
      </div>
      <motion.div {...fadeInUp}>
        <MethodologySection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <ServicesSection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <AdministratorSection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <ContactSection />
      </motion.div>
    </main>
  );
}
