import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventConfig } from "../../config/eventConfig";
import styles from "./SiteFooter.module.css";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =========================================================
   DATA
========================================================= */

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Schedule", href: "#schedule" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const LEGAL_ITEMS = ["Privacy Policy", "Terms", "Accessibility"];

const MARQUEE_WORDS = [
  "Techvistra",
  eventConfig.edition,
  eventConfig.descriptor,
  eventConfig.organizer,
].filter(Boolean) as string[];

const cx = (...parts: Array<string | undefined | false>) =>
  parts.filter(Boolean).join(" ");


type MagneticButtonProps = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  (
    { className, children, as: Component = "button", ...props },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;

          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

MagneticButton.displayName = "MagneticButton";


/* =========================================================
   MARQUEE
========================================================= */

const MarqueeItem = () => (
  <div className={styles.marqueeItem}>
    {[0, 1, 2].map((round) =>
      MARQUEE_WORDS.map((word, i) => (
        <React.Fragment key={`${round}-${i}`}>
          <span>{word}</span>
          <span
            className={
              (round + i) % 2 === 0 ? styles.starPrimary : styles.starSecondary
            }
          >
            ✦
          </span>
        </React.Fragment>
      ))
    )}
  </div>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SiteFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // React strict-mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered content reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    /*
      The "curtain reveal" wrapper sits in normal flow. Because of its
      clip-path, the fixed footer inside is only visible within this box.
    */
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* The actual footer stays fixed to the viewport, underneath the page */}
      <footer className={styles.footer} role="contentinfo">
        {/* Ambient light + grid */}
        <div className={styles.aurora} aria-hidden="true" />
        <div className={styles.grid} aria-hidden="true" />

        {/* Giant background text */}
        <div ref={giantTextRef} className={styles.giantText} aria-hidden="true">
          TECHVISTRA
        </div>

        {/* 1. Diagonal marquee */}
        <div className={styles.marqueeBand} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 2. Main centre content */}
        <div className={styles.content}>
          <img className={styles.logo} src="/logo.png" alt="Techvistra Q-Vortex" />

          <h2 ref={headingRef} className={styles.heading}>
            {eventConfig.edition}
          </h2>

          <p className={styles.identity}>
            <span>{eventConfig.descriptor}</span>
            <span>{eventConfig.organizer}</span>
          </p>

          {/* Interactive magnetic pills */}
          <div ref={linksRef} className={styles.linkStack}>
            {/* Primary row — site navigation */}
            <nav className={styles.rowPrimary} aria-label="Footer navigation">
              {NAV_ITEMS.map((item) => (
                <MagneticButton
                  key={item.href}
                  as="a"
                  href={item.href}
                  className={cx(styles.pill, styles.pillLg)}
                >
                  {item.label}
                </MagneticButton>
              ))}
            </nav>

            {/* Secondary row — social + legal */}
            <div className={styles.rowSecondary}>
              {eventConfig.socialLinks.length > 0 ? (
                eventConfig.socialLinks.map((link, i) => (
                  <MagneticButton
                    key={i}
                    as="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(styles.pill, styles.pillSm)}
                  >
                    {link.label}
                  </MagneticButton>
                ))
              ) : (
                <span className={styles.placeholder}>
                  Social links to be announced
                </span>
              )}

              {LEGAL_ITEMS.map((item) => (
                <MagneticButton
                  key={item}
                  as="a"
                  href="#"
                  className={cx(styles.pill, styles.pillSm)}
                >
                  {item}
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Bottom bar / credits */}
        <div className={styles.bottom}>
          {/* Copyright */}
          <div className={styles.copyright}>
            © {new Date().getFullYear()} {eventConfig.organizer}. All rights
            reserved.
          </div>

          {/* Badge */}
          <div className={cx(styles.pill, styles.badge)}>
            <span className={styles.badgeText}>Crafted with</span>
            <span className={styles.heart} aria-hidden="true">
              ❤
            </span>
            <span className={styles.badgeText}>by</span>
            <span className={styles.badgeName}>{eventConfig.organizer}</span>
          </div>

          {/* Back to top */}
          <MagneticButton
            as="button"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={cx(styles.pill, styles.topBtn)}
          >
            <svg
              className={styles.topIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </div>
  );
}