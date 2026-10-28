import { useState, useEffect, useRef } from "react";
import PillNav, { type PillNavItem } from "../PillNav/PillNav";
import styles from "./SiteHeader.module.css";

const SECTION_IDS = [
  "home",
  "about",
  "gallery",
  "events",
  "schedule",
  "venue",
  "faq",
  "contact",
  "register",
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncActiveHref = () => {
      const hash = window.location.hash;
      if (hash && SECTION_IDS.includes(hash.slice(1))) {
        setActiveHref(hash);
      }
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Select the section nearest the header marker instead of the last section that has merely passed it.
      const marker = 220;
      let currentHref = "#home";
      let nearestDistance = Number.POSITIVE_INFINITY;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const distance = Math.abs(el.getBoundingClientRect().top - marker);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          currentHref = `#${id}`;
        }
      }
      setActiveHref(currentHref);
    };

    syncActiveHref();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", syncActiveHref);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", syncActiveHref);
    };
  }, []);

  const navItems: PillNavItem[] = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Events", href: "#events" },
    { label: "Schedule", href: "#schedule" },
    { label: "Venue", href: "#venue" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
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
