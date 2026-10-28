import SiteHeader from "./components/SiteHeader/SiteHeader";
import GoldenSealReveal from "./components/GoldenSealReveal/GoldenSealReveal";
import Hero from "./components/Hero/Hero";
import TechnicalPartners from "./components/TechnicalPartners/TechnicalPartners";
import {
  AboutSection,
  ScheduleSection,
  FAQSection,
  ContactSection,
} from "./components/sections/ContentSections";
import EventSection from "./components/sections/EventSection";
import GallerySection from "./components/sections/GallerySection";
import WaveMesh from "./components/WaveMesh/WaveMesh";
import styles from "./App.module.css";

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

        {/* Content sections with continuous, seamless WaveMesh background */}
        <div className={styles.contentWrap}>
          <div className={styles.waveBackground} aria-hidden="true">
            <WaveMesh
              colors={["#d4d6cc", "#1d1f21", "#cdac68"]}
              crests={true}
              className={styles.waveCanvas}
            />
          </div>

          <div className={styles.contentInner}>
            <AboutSection />
            <EventSection />
            <TechnicalPartners />
            <GallerySection />
            <ScheduleSection />
            <FAQSection />
            <ContactSection />
          </div>
        </div>
      </main>
    </>
  );
}
