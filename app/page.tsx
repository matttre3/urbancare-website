import Hero from "@/components/Hero";
import SingleStat from "@/components/SingleStat";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsSection />
    </main>
  );
}
