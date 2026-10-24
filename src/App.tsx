import SiteHeader from "./components/SiteHeader/SiteHeader";
import GoldenSealReveal from "./components/GoldenSealReveal/GoldenSealReveal";
import Hero from "./components/Hero/Hero";
import TechnicalPartners from "./components/TechnicalPartners/TechnicalPartners";
import {
  AboutSection,
  ProgramSection,
  ScheduleSection,
  VenueSection,
  FAQSection,
} from "./components/sections/ContentSections";
import GallerySection from "./components/sections/GallerySection";
import RegistrationCTA from "./components/RegistrationCTA/RegistrationCTA";
import SiteFooter from "./components/SiteFooter/SiteFooter";

export default function App() {
  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content">
        {/* Cinematic Golden Seal transition revealing the preserved Hero */}
        <GoldenSealReveal>
          <Hero />
        </GoldenSealReveal>

        {/* 3–9. Content sections (placeholder-aware) */}
        <AboutSection />
        <TechnicalPartners />
        <GallerySection />
        <ProgramSection />
        <ScheduleSection />
        <VenueSection />
        <FAQSection />

        {/* 10. Final registration CTA */}
        <RegistrationCTA />
      </main>

      {/* 11. Footer */}
      <SiteFooter />
    </>
  );
}
