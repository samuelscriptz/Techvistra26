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

  // Header entrance animation
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) return;

      const { default: gsap } = await import("gsap");

      ctx = gsap.context(() => {
        gsap.from(el, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
      }, el);
    };

    init();
    return () => {
      ctx?.revert();
    };
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

        <PillNav
          items={navItems}
          activeHref={activeHref}
          onItemClick={(item) => {
            if (item.href) setActiveHref(item.href);
          }}
          theme="dark"
          layout="split"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          surface="glass"
          size="md"
          barColor="rgba(18, 17, 24, 0.85)"
          textColor="#ffffff"
          highlightColor="#f59e0b"
          highlightTextColor="#050507"
          collapse="auto"
          intro={false}
          ariaLabel="Symposium navigation"
        />
      </div>
    </header>
  );
}
