import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { eventConfig, isPlaceholder, themeWords } from "../../config/eventConfig";
import styles from "./Hero.module.css";

const VIDEO_SRC = "/hero-bg.mp4";
const POSTER_SRC = "/hero-bg-poster.jpg";
const LOGO_SRC = "/logo.png";

/**
 * Hero section with the native gold video playing as it is.
 * - No ScrollTrigger or scrub attached to the video
 * - Autoplays, loops, muted, playsInline
 * - Clear, high-contrast branding and quick facts
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Ensure autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay policy fallback: muted video is permitted in modern browsers
      });
    }
  }, []);

  // Entrance animation for content elements
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    import("gsap").then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        gsap.from(content.children, {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
      }, content);
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  const regUrl = isPlaceholder(eventConfig.registrationUrl)
    ? undefined
    : eventConfig.registrationUrl;

  return (
    <section
      className={styles.hero}
      id="home"
      aria-labelledby="hero-title"
    >
      {/* Video Background Layer - Native Playback */}
      <div className={styles.videoContainer} aria-hidden="true">
        {!videoFailed ? (
          <video
            ref={videoRef}
            className={styles.video}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <img src={POSTER_SRC} alt="" className={styles.poster} />
        )}

        {/* Subtle cinematic gradient overlays for pristine readability */}
        <div className={styles.topGradient} />
        <div className={styles.bottomGradient} />
        <div className={styles.vignette} />
      </div>

      {/* Foreground Content */}
      <div ref={contentRef} className={styles.content}>
        {/* Edition Tag */}
        <div className={styles.editionBadge}>
          <span className={styles.editionDot} />
          <span>{eventConfig.edition}</span>
          <span className={styles.editionDot} />
        </div>

        {/* Hidden semantic H1 for SEO/Accessibility */}
        <h1 id="hero-title" className={styles.srOnly}>
          {eventConfig.name} — {eventConfig.descriptor} — {eventConfig.organizer}
        </h1>

        {/* Centered Logo */}
        <div className={styles.logoWrapper}>
          <img
            src={LOGO_SRC}
            alt="Techvistra '26 — 2nd National Level Technical Symposium — Department of Data Science"
            className={styles.logo}
          />
        </div>

        {/* Event Sub-descriptors */}
        <p className={styles.descriptor}>{eventConfig.descriptor}</p>
        <p className={styles.organizer}>{eventConfig.organizer}</p>

        {/* Event Facts Strip */}
        <div className={styles.factsStrip} role="list" aria-label="Symposium facts">
          <div className={styles.factItem} role="listitem">
            <span className={styles.factLabel}>Date</span>
            <span
              className={`${styles.factValue} ${
                isPlaceholder(eventConfig.eventDates) ? styles.placeholder : ""
              }`}
            >
              {isPlaceholder(eventConfig.eventDates)
                ? "Coming Soon"
                : eventConfig.eventDates}
            </span>
          </div>

          <div className={styles.factDivider} aria-hidden="true" />

          <div className={styles.factItem} role="listitem">
            <span className={styles.factLabel}>Venue</span>
            <span
              className={`${styles.factValue} ${
                isPlaceholder(eventConfig.venue) ? styles.placeholder : ""
              }`}
            >
              {isPlaceholder(eventConfig.venue)
                ? "To be announced"
                : eventConfig.venue}
            </span>
          </div>

          <div className={styles.factDivider} aria-hidden="true" />

          <div className={styles.factItem} role="listitem">
            <span className={styles.factLabel}>Registration</span>
            <span className={`${styles.factValue} ${styles.placeholder}`}>
              {eventConfig.registrationState === "open"
                ? "Open Now"
                : eventConfig.registrationState === "closed"
                ? "Closed"
                : "Coming Soon"}
            </span>
          </div>
        </div>

        {/* CTA Group */}
        <div className={styles.ctaGroup}>
          <a
            href={regUrl ?? "#register"}
            className={styles.ctaBtn}
            {...(regUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span>Register Now</span>
            {regUrl ? (
              <ExternalLink size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </a>
          <span className={styles.ctaNote}>
            {regUrl
              ? "Registration continues on the official external portal"
              : "Registration portal details will be announced soon"}
          </span>
        </div>

        {/* Acrostic Theme Keywords */}
        <div className={styles.themeWords} aria-label="Theme keywords">
          {themeWords.map((word) => (
            <span key={word} className={styles.themeWord}>
              <span className={styles.highlight}>{word[0]}</span>
              {word.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll down indicator */}
      <a
        href="#about"
        className={styles.scrollIndicator}
        aria-label="Scroll to About section"
      >
        <span>Scroll to Explore</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
