import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import StarBorderButton from "../ReactBits/StarBorderButton";
import { eventConfig, isPlaceholder } from "../../config/eventConfig";
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

        {/* Lifted Animated ReactBits CTA Button */}
        <div className={styles.liftedCta}>
          <StarBorderButton
            href={regUrl ?? "#register"}
            color="#f59e0b"
            speed="4.5s"
            icon={
              regUrl ? (
                <ExternalLink size={18} aria-hidden="true" />
              ) : (
                <ChevronDown size={18} aria-hidden="true" />
              )
            }
            {...(regUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Register Now
          </StarBorderButton>
        </div>
      </div>
    </section>
  );
}
