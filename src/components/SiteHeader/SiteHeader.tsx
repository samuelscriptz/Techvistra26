import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { eventConfig, isPlaceholder } from "../../config/eventConfig";
import styles from "./SiteHeader.module.css";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venue", href: "#venue" },
  { label: "FAQ", href: "#faq" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
    return () => { ctx?.revert(); };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Focus management
  useEffect(() => {
    if (mobileOpen) closeRef.current?.focus();
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape key closes menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  const regUrl = isPlaceholder(eventConfig.registrationUrl)
    ? undefined
    : eventConfig.registrationUrl;

  return (
    <>
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

          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.navLink}
              >
                {item.label}
              </a>
            ))}
            <a
              href={regUrl ?? "#register"}
              className={styles.registerBtn}
              {...(regUrl
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Register
              {regUrl && <ExternalLink size={14} aria-hidden="true" />}
            </a>
          </nav>

          <button
            ref={toggleRef}
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />
      <nav
        className={`${styles.mobileNav} ${mobileOpen ? styles.open : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <button
          ref={closeRef}
          className={styles.mobileClose}
          onClick={closeMobile}
          aria-label="Close navigation menu"
        >
          <X size={24} />
        </button>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={styles.mobileNavLink}
            onClick={closeMobile}
          >
            {item.label}
          </a>
        ))}
        <div className={styles.mobileRegister}>
          <a
            href={regUrl ?? "#register"}
            className={styles.registerBtn}
            onClick={closeMobile}
            {...(regUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Register
            {regUrl && <ExternalLink size={14} aria-hidden="true" />}
          </a>
        </div>
      </nav>
    </>
  );
}
