import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import PillNav, { type PillNavItem } from "../PillNav/PillNav";
import styles from "./SiteHeader.module.css";

const SECTION_IDS = [
  "home",
  "about",
  "events",
  "technical-partners",
  "gallery",
  // "schedule",
  "faq",
  "contact",
];

export default function SiteHeader() {
  const [isHero, setIsHero] = useState(true);
  const [activeHref, setActiveHref] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

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
    { label: "Events", href: "#events" },
    { label: "Technical Partners", href: "#technical-partners" },
    { label: "Gallery", href: "#gallery" },
    // { label: "Schedule", href: "#schedule" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href?: string) => {
    if (!href) return;
    setMobileMenuOpen(false);
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
      className={`${styles.header} ${!isHero ? styles.scrolled : ""} ${mobileMenuOpen ? styles.menuOpen : ""}`}
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
              collapse="never"
              intro={false}
              ariaLabel="Symposium navigation"
            />
          </div>
        </div>

        <button
          type="button"
          className={styles.mobileMenuToggle}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className={styles.mobileMenu}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.mobileMenuLink} ${activeHref === item.href ? styles.mobileMenuLinkActive : ""}`}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className={styles.headerRight} aria-hidden="true" />
      </div>
    </header>
  );
}
