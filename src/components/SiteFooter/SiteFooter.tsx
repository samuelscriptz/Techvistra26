import { useEffect, useRef } from "react";
import { eventConfig, isPlaceholder } from "../../config/eventConfig";
import styles from "./SiteFooter.module.css";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venue", href: "#venue" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Register", href: "#register" },
];

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) return;

      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const inner = el.querySelector(`.${styles.inner}`);
        if (inner) {
          gsap.fromTo(
            inner.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }, el);
    };

    init();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Brand column */}
        <div>
          <div className={styles.brand} style={{ marginBottom: "12px" }}>
            <img
              src="/logo.png"
              alt="Techvistra Q-Vortex"
              style={{
                height: "46px",
                width: "auto",
                maxWidth: "200px",
                objectFit: "contain",
                filter:
                  "drop-shadow(0 0 10px rgba(197, 164, 78, 0.3))",
              }}
            />
          </div>
          <p className={styles.identity}>
            {eventConfig.edition}
            <br />
            {eventConfig.descriptor}
            <br />
            {eventConfig.organizer}
          </p>
        </div>

        {/* Navigation column */}
        <div>
          <h3 className={styles.colTitle}>Navigation</h3>
          <nav className={styles.linkList} aria-label="Footer navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact column */}
        <div>
          <h3 className={styles.colTitle}>Contact</h3>
          <div className={styles.linkList}>
            {!isPlaceholder(eventConfig.contactEmail) ? (
              <a
                href={`mailto:${eventConfig.contactEmail}`}
                className={styles.link}
              >
                {eventConfig.contactEmail}
              </a>
            ) : (
              <span className={styles.placeholder}>
                Contact email to be announced
              </span>
            )}
            {!isPlaceholder(eventConfig.contactPhone) ? (
              <a
                href={`tel:${eventConfig.contactPhone}`}
                className={styles.link}
              >
                {eventConfig.contactPhone}
              </a>
            ) : (
              <span className={styles.placeholder}>
                Contact phone to be announced
              </span>
            )}
            {eventConfig.socialLinks.length > 0 ? (
              eventConfig.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))
            ) : (
              <span className={styles.placeholder}>
                Social links to be announced
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} {eventConfig.organizer}. All rights
          reserved.
        </span>
        <div className={styles.legalLinks}>
          <span
            className={styles.legalLink}
            style={{ cursor: "default", opacity: 0.5 }}
          >
            Privacy Policy
          </span>
          <span
            className={styles.legalLink}
            style={{ cursor: "default", opacity: 0.5 }}
          >
            Terms
          </span>
          <span
            className={styles.legalLink}
            style={{ cursor: "default", opacity: 0.5 }}
          >
            Accessibility
          </span>
        </div>
      </div>
    </footer>
  );
}
