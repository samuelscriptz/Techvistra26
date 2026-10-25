import { useState, useEffect, useRef } from "react";
import PillNav, { type PillNavItem } from "../PillNav/PillNav";
import { eventConfig, isPlaceholder } from "../../config/eventConfig";
import styles from "./SiteHeader.module.css";

const SECTION_IDS = ["home", "about", "program", "schedule", "venue", "faq", "register"];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Dynamically track active section for PillNav indicator
      const scrollPos = window.scrollY + 200;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveHref(`#${id}`);
            return;
          }
        }
      }
      setActiveHref("#home");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const regUrl = isPlaceholder(eventConfig.registrationUrl)
    ? undefined
    : eventConfig.registrationUrl;

  const navItems: PillNavItem[] = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Program", href: "#program" },
    { label: "Schedule", href: "#schedule" },
    { label: "Venue", href: "#venue" },
    { label: "FAQ", href: "#faq" },
    { label: "Register", href: regUrl ?? "#register" },
  ];

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={styles.inner}>
        <a
          href="#home"
          className={styles.brand}
          aria-label="Techvistra Q-Vortex — back to top"
        >
          <img
            src="/logo.png"
            alt="Techvistra Q-Vortex"
            className={styles.brandLogo}
          />
        </a>

        <div className={styles.navWrapper}>
          <PillNav
            items={navItems}
            activeHref={activeHref}
            onItemClick={(item) => {
              if (item.href) setActiveHref(item.href);
            }}
            theme="light"
            layout="split"
            itemStyle="pill"
            hoverEffect="fill"
            indicator="dot"
            surface="glass"
            size="lg"
            barColor="rgba(255, 255, 255, 0.94)"
            textColor="#1d1f21"
            highlightColor="#cdac68"
            highlightTextColor="#ffffff"
            collapse="auto"
            intro={false}
            ariaLabel="Symposium navigation"
          />
        </div>

        <div className={styles.headerRight} aria-hidden="true" />
      </div>
    </header>
  );
}
