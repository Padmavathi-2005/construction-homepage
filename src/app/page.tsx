import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import MovingHeroLogo from "@/components/hero/MovingHeroLogo";
import ArchitectureShowcase from "@/components/showcase/ArchitectureShowcase";
import ServicesSection from "@/components/services/ServicesSection";
import ProcessSection from "@/components/process/ProcessSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen bg-white text-[#111111]">
      {/* Dynamic continuous scroll traveler logo from Hero to Section 2 */}
      <MovingHeroLogo />

      {/* 1. Header */}
      <Header />

      {/* 2. Hero Section (Centered Heading and Sub Heading with scrubbed construction) */}
      <Hero />

      {/* 3. Editorial Architecture Showcase Section */}
      <ArchitectureShowcase />

      {/* 4. Comprehensive Architectural & Civil Engineering Services */}
      <ServicesSection />

      {/* 5. Methodology / Architectural Process Section */}
      <ProcessSection />

      {/* 6. Our Portfolio Section with 3D Marquee */}
      <PortfolioSection />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}

