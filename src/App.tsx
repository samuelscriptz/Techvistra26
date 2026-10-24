import SiteHeader from "./components/SiteHeader/SiteHeader";
import Hero from "./components/Hero/Hero";
import TechnicalPartners from "./components/TechnicalPartners/TechnicalPartners";
import {
  AboutSection,
  ProgramSection,
  ScheduleSection,
  VenueSection,
  FAQSection,
} from "./components/sections/ContentSections";
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
        {/* Hero page with video background and centered Techvistra logo */}
        <Hero />

        {/* 3–9. Content sections (placeholder-aware) */}
        <AboutSection />
        <TechnicalPartners />
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
