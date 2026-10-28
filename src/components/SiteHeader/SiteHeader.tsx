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
  const [isHero, setIsHero] = useState(true);
  const [activeHref, setActiveHref] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      const aboutEl = document.getElementById("about");

      // We are on hero when:
      // 1. #about hasn't reached the viewport top yet (rect.top > 80)
      // 2. OR scrollPos is within the pinned hero scroll distance (~1100px desktop, ~800px mobile)
      const heroThreshold = window.innerWidth <= 768 ? 840 : 1140;
      const onHero = aboutEl
        ? aboutEl.getBoundingClientRect().top > 80
        : scrollPos < heroThreshold;

      setIsHero(onHero);

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
<<<<<<< HEAD
    return () => window.removeEventListener("scroll", onScroll);
=======
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", syncActiveHref);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", syncActiveHref);
    };
>>>>>>> b39d014513d5c80caf7fda7aa007031e3d4b0086
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

  const handleNavClick = (href?: string) => {
    if (!href) return;
    setActiveHref(href);
    const targetId = href.replace(/^#/, "");
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${!isHero ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={styles.inner}>
        <a
          href="#home"
          className={styles.brand}
          aria-label="Techvistra Q-Vortex — back to top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
        >
          <img
            src="/logo.png"
            alt="Techvistra Q-Vortex"
            className={styles.brandLogo}
          />
        </a>

        <div className={styles.navWrapper}>
          {/* Simple Bold Nav on Hero */}
          <nav
            className={`${styles.boldNav} ${isHero ? styles.boldNavActive : styles.boldNavHidden}`}
            aria-label="Hero navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.boldNavLink} ${activeHref === item.href ? styles.boldNavLinkActive : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Floating PillNav when Scrolled */}
          <div
            className={`${styles.pillNavWrapper} ${!isHero ? styles.pillNavActive : styles.pillNavHidden}`}
          >
            <PillNav
              items={navItems}
              activeHref={activeHref}
              onItemClick={(item) => {
                if (item.href) handleNavClick(item.href);
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
        </div>

        <div className={styles.headerRight} aria-hidden="true" />
      </div>
    </header>
  );
}
