import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Countdown from "../Countdown/Countdown";
import { eventConfig } from "../../config/eventConfig";
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
  const logoWrapperRef = useRef<HTMLDivElement>(null);
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

  // Interactive 3D mouse tilt on Techvistra logo
  useEffect(() => {
    const logoWrapper = logoWrapperRef.current;
    if (!logoWrapper) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    let gsapInstance: typeof import("gsap").default | null = null;
    import("gsap").then(({ default: gsap }) => {
      gsapInstance = gsap;
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!gsapInstance || !logoWrapper) return;
      const rect = logoWrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      gsapInstance.to(logoWrapper, {
        rotateY: deltaX * 12,
        rotateX: -deltaY * 10,
        transformPerspective: 900,
        duration: 0.45,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!gsapInstance || !logoWrapper) return;
      gsapInstance.to(logoWrapper, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
        {/* Hidden semantic H1 for SEO/Accessibility */}
        <h1 id="hero-title" className={styles.srOnly}>
          {eventConfig.name} — {eventConfig.descriptor} — {eventConfig.organizer}
        </h1>

        {/* Presenter Association & Department Header (Stylish Text, NO Pill) */}
        <div className={styles.presenterLine}>
          <img
            src="/college-crest.png"
            alt="Association of Universal Data & Intelligence"
            className={styles.associationCrest}
          />
          <div className={styles.presenterText}>
            <span className={styles.departmentName}>Department of Data Science</span>
            <div className={styles.presentsRow}>
              <span className={styles.presentsLine} />
              <span className={styles.presentsTag}>PRESENTS</span>
              <span className={styles.presentsLine} />
            </div>
          </div>
        </div>

        {/* Centered Logo with 3D Tilt */}
        <div ref={logoWrapperRef} className={styles.logoWrapper}>
          <img
            src={LOGO_SRC}
            alt="Techvistra '26 — 2nd National Level Technical Symposium — Department of Data Science"
            className={styles.logo}
          />
        </div>

        {/* Event Date (Bold Typography, NO Pill) */}
        <div className={styles.eventDateText}>
          NOVEMBER 16 & 17, 2026
        </div>

        {/* Cyber-Gold Live Countdown (Front & Center!) */}
        <Countdown targetDate="2026-11-16T09:00:00" />

        {/* Sci-Fi Rectangular Register Now CTA Button (Navigates to Events) */}
        <div className={styles.sickCtaWrap}>
          <a
            href="#events"
            className={styles.sickCtaBtn}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("events");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.pushState(null, "", "#events");
              } else {
                window.location.hash = "#events";
              }
            }}
          >
            <span className={styles.sickCtaGlow} aria-hidden="true" />
            <span className={styles.sickCtaBorder} aria-hidden="true" />
            <span className={styles.sickCtaSheen} aria-hidden="true" />
            <span className={styles.sickCtaContent}>
              <span className={styles.sickCtaText}>REGISTER NOW</span>
              <ArrowRight size={20} strokeWidth={2.4} className={styles.sickCtaArrow} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
