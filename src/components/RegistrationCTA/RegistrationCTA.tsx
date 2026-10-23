import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { eventConfig, isPlaceholder } from "../../config/eventConfig";
import styles from "./RegistrationCTA.module.css";

export default function RegistrationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const regUrl = isPlaceholder(eventConfig.registrationUrl)
    ? undefined
    : eventConfig.registrationUrl;

  // GSAP ScrollTrigger animation
  useEffect(() => {
    const el = sectionRef.current;
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
        if (!inner) return;

        // Scale up entrance
        gsap.fromTo(
          inner,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Ambient glow pulse
        gsap.to(el, {
          "--glow-opacity": 0.6,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play pause resume pause",
          },
        });
      }, el);

      ScrollTrigger.refresh();
    };

    init();
    return () => { ctx?.revert(); };
  }, []);

  const statusLabel = (() => {
    switch (eventConfig.registrationState) {
      case "open":
        return { text: "Registration Open", className: styles.statusOpen };
      case "closed":
        return { text: "Registration Closed", className: styles.statusClosed };
      case "opens_on_date":
        return {
          text: isPlaceholder(eventConfig.registrationOpenDate)
            ? "Opening date to be announced"
            : `Opens ${eventConfig.registrationOpenDate}`,
          className: styles.statusPending,
        };
      default:
        return {
          text: "Registration details coming soon",
          className: styles.statusPending,
        };
    }
  })();

  return (
    <section
      ref={sectionRef}
      id="register"
      className={styles.section}
      aria-labelledby="register-title"
    >
      <div className={styles.inner}>
        <span className={styles.label}>Register</span>
        <h2 id="register-title" className={styles.title}>
          Be Part of {eventConfig.name}
        </h2>
        <p className={styles.identity}>
          {eventConfig.edition} · {eventConfig.descriptor} ·{" "}
          {eventConfig.organizer}
        </p>
        <span className={statusLabel.className}>{statusLabel.text}</span>
        <p className={styles.subtitle}>
          {eventConfig.registrationState === "open"
            ? "Secure your spot at the symposium. Registration is handled through the official external portal."
            : "Registration details will be available once confirmed by the organizers."}
        </p>

        {regUrl && eventConfig.registrationState === "open" ? (
          <>
            <a
              href={regUrl}
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register on the Official Portal
              <ExternalLink size={18} aria-hidden="true" />
            </a>
            <span className={styles.note}>
              You will be redirected to the official registration portal (opens
              in a new tab)
            </span>
          </>
        ) : (
          <>
            <div
              className={styles.cta}
              style={{ opacity: 0.5, cursor: "not-allowed" }}
              aria-disabled="true"
            >
              Registration{" "}
              {eventConfig.registrationState === "closed"
                ? "Closed"
                : "Coming Soon"}
            </div>
            {!isPlaceholder(eventConfig.contactEmail) && (
              <span className={styles.note}>
                Questions? Contact{" "}
                <a
                  href={`mailto:${eventConfig.contactEmail}`}
                  style={{ color: "var(--accent-secondary)" }}
                >
                  {eventConfig.contactEmail}
                </a>
              </span>
            )}
          </>
        )}
      </div>
    </section>
  );
}
