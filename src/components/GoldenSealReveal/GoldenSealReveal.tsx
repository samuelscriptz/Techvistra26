import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./GoldenSealReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

interface GoldenSealRevealProps {
  children: React.ReactNode;
}

/**
 * GoldenSealReveal
 *
 * Cinematic Golden Seal Opening Transition.
 * - Pinned at top of page: container stays locked in place while scrolling through the seal opening.
 * - Initially: An opaque, radiant metallic-gold curtain covers the Hero with a glowing central medallion.
 * - On scroll down:
 *   1. Luminous vertical seam draws from top center down to the bottom.
 *   2. Upon reaching the bottom, bursts with a bright severance flash.
 *   3. Splits into left and right panels moving off-screen to reveal the preserved Hero.
 *   4. Clean release to normal page scrolling.
 * - Tied 1:1 to scroll progress; fully reversible on upward scroll.
 * - Zero audio, zero modifications to Hero's video or logo.
 */
export default function GoldenSealReveal({ children }: GoldenSealRevealProps) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const seamContainerRef = useRef<HTMLDivElement>(null);
  const seamLineRef = useRef<HTMLDivElement>(null);
  const seamGlowRef = useRef<HTMLDivElement>(null);
  const seamSparkRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinWrapperRef.current || !overlayRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Master scrubbing timeline
      const tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      // Initial setup: ensure panels cover screen and seam is primed
      gsap.set([leftPanelRef.current, rightPanelRef.current], {
        xPercent: 0,
        force3D: true,
      });

      gsap.set([seamLineRef.current, seamGlowRef.current], {
        scaleY: 0,
        transformOrigin: "top center",
        force3D: true,
      });

      gsap.set(seamSparkRef.current, {
        top: "0%",
        opacity: 0,
        scale: 0.7,
        force3D: true,
      });

      gsap.set(overlayRef.current, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      // Phase 1: Center seal crest dissolves as seam begins (progress 0.0 -> 0.12)
      if (crestRef.current) {
        tl.to(
          crestRef.current,
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.12,
            ease: "power1.out",
          },
          0
        );
      }

      // Phase 2: Luminous vertical seam draws from top to bottom (progress 0.0 -> 0.44)
      tl.to(
        seamSparkRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.04,
        },
        0
      );

      tl.to(
        [seamLineRef.current, seamGlowRef.current],
        {
          scaleY: 1,
          duration: 0.44,
        },
        0
      );

      tl.to(
        seamSparkRef.current,
        {
          top: "100%",
          duration: 0.44,
        },
        0
      );

      // Phase 3: Severance pulse & flash at the bottom (progress 0.44 -> 0.50)
      tl.to(
        seamSparkRef.current,
        {
          scale: 1.8,
          duration: 0.06,
          ease: "power2.inOut",
        },
        0.44
      );

      tl.to(
        seamGlowRef.current,
        {
          scaleX: 2.2,
          opacity: 1,
          duration: 0.06,
          ease: "power2.inOut",
        },
        0.44
      );

      // Phase 4: Gold screen splits into two panels moving off left & right edges (progress 0.50 -> 0.94)
      // 101% ensures panels fully exit the viewport on all screen sizes
      tl.to(
        leftPanelRef.current,
        {
          xPercent: -101,
          duration: 0.44,
          ease: "power2.inOut",
        },
        0.5
      );

      tl.to(
        rightPanelRef.current,
        {
          xPercent: 101,
          duration: 0.44,
          ease: "power2.inOut",
        },
        0.5
      );

      // Seam fades away as panels part
      tl.to(
        seamContainerRef.current,
        {
          opacity: 0,
          duration: 0.22,
          ease: "power1.out",
        },
        0.5
      );

      tl.to(
        seamSparkRef.current,
        {
          opacity: 0,
          scale: 0.2,
          duration: 0.18,
          ease: "power1.out",
        },
        0.5
      );

      // Phase 5: Complete hand-off to normal page scrolling (progress 0.94 -> 1.0)
      tl.to(
        overlayRef.current,
        {
          autoAlpha: 0,
          duration: 0.06,
          pointerEvents: "none",
        },
        0.94
      );

      // Responsive scroll distance
      const isMobile = window.innerWidth <= 768;
      const scrollDistance = isMobile ? 850 : 1200;

      // Pin the entire pinWrapper so the Hero is completely stationary during the reveal
      ScrollTrigger.create({
        trigger: pinWrapperRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (overlayRef.current) {
            if (self.progress >= 0.95) {
              overlayRef.current.style.pointerEvents = "none";
            } else {
              overlayRef.current.style.pointerEvents = "auto";
            }
          }
        },
      });

      // Trigger refresh to ensure accurate initial position calculation
      ScrollTrigger.refresh();
    }, pinWrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pinWrapperRef} className={styles.pinWrapper}>
      {/* Preserved underlying Hero (untouched, video autoplays natively) */}
      <div className={styles.heroSlot}>{children}</div>

      {/* Decorative Golden Seal Curtain Overlay */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        aria-hidden="true"
        role="presentation"
      >
        {/* Left Metallic Gold Panel */}
        <div ref={leftPanelRef} className={styles.panelLeft} />

        {/* Right Metallic Gold Panel */}
        <div ref={rightPanelRef} className={styles.panelRight} />

        {/* Central Luminous Vertical Seam System */}
        <div ref={seamContainerRef} className={styles.seamContainer}>
          <div ref={seamGlowRef} className={styles.seamGlow} />
          <div ref={seamLineRef} className={styles.seamLine} />
          <div ref={seamSparkRef} className={styles.seamSpark} />
        </div>

        {/* Initial Center Seal Medallion & Scroll Cue */}
        <div ref={crestRef} className={styles.crest}>
          <div className={styles.crestMedallion}>
            <div className={styles.crestInnerRing}>
              <span className={styles.crestCore}>Q</span>
            </div>
          </div>
          <div className={styles.crestPrompt}>
            <span>Scroll to Unseal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
