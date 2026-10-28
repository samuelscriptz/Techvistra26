import { useState, useEffect, useRef } from "react";
import PillNav, { type PillNavItem } from "../PillNav/PillNav";
import styles from "./SiteHeader.module.css";

const SECTION_IDS = [
  "home",
  "about",
  "gallery",
  "events",
  "schedule",
  "faq",
  "contact",
];

export default function SiteHeader() {
  const [isHero, setIsHero] = useState(true);
  const [activeHref, setActiveHref] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const aboutEl = document.getElementById("about");
      const onHero = aboutEl
        ? aboutEl.getBoundingClientRect().top > 80
        : window.scrollY < (window.innerWidth <= 768 ? 840 : 1140);

      setIsHero(onHero);

      const marker = Math.min(window.innerHeight * 0.32, 240);
      let currentId = "home";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) {
          currentId = id;
        }
      }

      setActiveHref(`#${currentId}`);
    };

    const onHashChange = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (SECTION_IDS.includes(id)) {
        setActiveHref(`#${id}`);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    onScroll();

    const initialId = window.location.hash.replace(/^#/, "");
    const initialHashFrame = window.requestAnimationFrame(() => {
      if (SECTION_IDS.includes(initialId)) {
        setActiveHref(`#${initialId}`);
        document.getElementById(initialId)?.scrollIntoView({ behavior: "auto", block: "start" });
      }
      onScroll();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.cancelAnimationFrame(initialHashFrame);
    };
  }, []);

  const navItems: PillNavItem[] = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Events", href: "#events" },
    { label: "Schedule", href: "#schedule" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href?: string) => {
    if (!href) return;
    setActiveHref(href);
    const targetId = href.replace(/^#/, "");

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
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
