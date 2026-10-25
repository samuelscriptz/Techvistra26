import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyText from "../ReactBits/ShinyText";
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
 * - Initially: An opaque, luxurious metallic-gold screen covers the screen with dynamic gold alloy waves
 *   and an illuminated central quantum medallion. The navbar is hidden behind the closed seal.
 * - On scroll down:
 *   1. Center medallion dissolves with quantum dissipation.
 *   2. An aerodynamic rocket ignites at the bottom and travels straight up to the top, cutting open
 *      the seam with a blazing trailing laser wake.
 *   3. At the top apex, an apogee sonic severance shockwave bursts.
 *   4. The gold curtain splits into left and right panels moving off-screen.
 *   5. The navbar gracefully appears at the top of the hero page as the panels part.
 *   6. Clean release to normal page scrolling with the navbar permanently perched on top.
 * - 100% lag-free 60fps GPU acceleration: optimized scrub, zero expensive blend modes, pure hardware-accelerated transforms.
 * - Tied 1:1 to scroll progress; scrolling upward reverses smoothly.
 */
export default function GoldenSealReveal({ children }: GoldenSealRevealProps) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const seamContainerRef = useRef<HTMLDivElement>(null);
  const seamLineRef = useRef<HTMLDivElement>(null);
  const seamGlowRef = useRef<HTMLDivElement>(null);
  const rocketContainerRef = useRef<HTMLDivElement>(null);
  const apogeeBurstRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinWrapperRef.current || !overlayRef.current) {
      return;
    }

    const headerEl = document.querySelector("header");

    const ctx = gsap.context(() => {
      // Master scrubbing timeline
      const tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      // Initial setup: ensure panels cover screen and rocket is primed at bottom
      gsap.set([leftPanelRef.current, rightPanelRef.current], {
        xPercent: 0,
        force3D: true,
      });

      gsap.set([seamLineRef.current, seamGlowRef.current], {
        scaleY: 0,
        transformOrigin: "bottom center",
        force3D: true,
      });

      gsap.set(rocketContainerRef.current, {
        y: 0,
        opacity: 1,
        force3D: true,
      });

      gsap.set(apogeeBurstRef.current, {
        scale: 0.3,
        opacity: 0,
        force3D: true,
      });

      gsap.set(overlayRef.current, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      // Initially hide the header so it is never seen while the gold seal is closed
      if (headerEl) {
        gsap.set(headerEl, {
          opacity: 0,
          y: -15,
          pointerEvents: "none",
        });
      }

      // Phase 1: Center seal crest dissolves as rocket initiates ignition (progress 0.0 -> 0.08)
      if (crestRef.current) {
        tl.to(
          crestRef.current,
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.08,
            ease: "power1.out",
          },
          0
        );
      }

      // Phase 2: Rocket ascends from bottom (y: 0) to top (y: -viewportHeight), drawing the incision seam behind it (progress 0.05 -> 0.48)
      tl.to(
        rocketContainerRef.current,
        {
          y: () =>
            -(pinWrapperRef.current
              ? pinWrapperRef.current.clientHeight + 160
              : window.innerHeight + 160),
          duration: 0.43,
          ease: "none",
        },
        0.05
      );

      tl.to(
        [seamLineRef.current, seamGlowRef.current],
        {
          scaleY: 1,
          duration: 0.43,
          ease: "none",
        },
        0.05
      );

      // Phase 3: Apogee supersonic severance burst at top apex (progress 0.48 -> 0.54)
      tl.to(
        apogeeBurstRef.current,
        {
          opacity: 1,
          scale: 1.6,
          duration: 0.03,
          ease: "power2.out",
        },
        0.48
      );

      tl.to(
        apogeeBurstRef.current,
        {
          opacity: 0,
          scale: 2.8,
          duration: 0.03,
          ease: "power2.in",
        },
        0.51
      );

      tl.to(
        seamGlowRef.current,
        {
          scaleX: 2.2,
          opacity: 1,
          duration: 0.04,
          ease: "power2.inOut",
        },
        0.48
      );

      // Phase 4: Gold curtain splits into two panels moving off left & right edges (progress 0.52 -> 0.94)
      tl.to(
        leftPanelRef.current,
        {
          xPercent: -101,
          duration: 0.42,
          ease: "power2.inOut",
        },
        0.52
      );

      tl.to(
        rightPanelRef.current,
        {
          xPercent: 101,
          duration: 0.42,
          ease: "power2.inOut",
        },
        0.52
      );

      // Rocket and seam fade away cleanly as panels open
      tl.to(
        [seamContainerRef.current, rocketContainerRef.current],
        {
          opacity: 0,
          duration: 0.18,
          ease: "power1.out",
        },
        0.52
      );

      // The navbar smoothly appears right on top of the hero as the curtain opens
      if (headerEl) {
        tl.to(
          headerEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            pointerEvents: "auto",
            ease: "power2.out",
          },
          0.54
        );
      }

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
      const scrollDistance = isMobile ? 800 : 1100;

      // Pin the pinWrapper so the Hero is completely stationary during the reveal
      // scrub: 0.35 gives immediate response without sluggish inertia lag
      ScrollTrigger.create({
        trigger: pinWrapperRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.35,
        fastScrollEnd: true,
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
          if (headerEl) {
            if (self.progress >= 0.54) {
              headerEl.style.pointerEvents = "auto";
            } else {
              headerEl.style.pointerEvents = "none";
            }
          }
        },
      });

      ScrollTrigger.refresh();
    }, pinWrapperRef);

    return () => {
      ctx.revert();
      if (headerEl) {
        headerEl.style.opacity = "";
        headerEl.style.transform = "";
        headerEl.style.pointerEvents = "";
      }
    };
  }, []);

  return (
    <div ref={pinWrapperRef} className={styles.pinWrapper}>
      {/* Preserved underlying Hero (video autoplays natively, logo centered) */}
      <div className={styles.heroSlot}>{children}</div>

      {/* Luxury Golden Seal Curtain Overlay */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        aria-hidden="true"
        role="presentation"
      >
        {/* Left Metallic Gold Panel */}
        <div ref={leftPanelRef} className={styles.panelLeft}>
          <div className={styles.moltenGoldWave} />
          <div className={styles.circuitGrid} />
          <div className={styles.brushedSheen} />
        </div>

        {/* Right Metallic Gold Panel */}
        <div ref={rightPanelRef} className={styles.panelRight}>
          <div className={styles.moltenGoldWave} />
          <div className={styles.circuitGrid} />
          <div className={styles.brushedSheen} />
        </div>

        {/* Central Luminous Vertical Seam System & Rocket Craft */}
        <div ref={seamContainerRef} className={styles.seamContainer}>
          <div ref={seamGlowRef} className={styles.seamGlow} />
          <div ref={seamLineRef} className={styles.seamLine} />
          <div className={styles.shockTrail} />

          {/* Aerospace Rocket Entity */}
          <div ref={rocketContainerRef} className={styles.rocketContainer}>
            {/* Supersonic Nose Cone Incision Laser */}
            <div className={styles.noseConeGlow} />

            {/* Aerodynamic High-Tech Rocket SVG */}
            <svg
              className={styles.rocketSvg}
              viewBox="0 0 64 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Left Delta Fin */}
              <path
                d="M24 48 L6 76 L24 71 Z"
                fill="url(#wingGradientL)"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="1"
              />
              {/* Right Delta Fin */}
              <path
                d="M40 48 L58 76 L40 71 Z"
                fill="url(#wingGradientR)"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="1"
              />
              {/* Titanium-Gold Fuselage */}
              <path
                d="M32 4 C30 18 24 38 24 70 L40 70 C40 38 34 18 32 4 Z"
                fill="url(#fuselageGradient)"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1.5"
              />
              {/* Dorsal Keel Line */}
              <line
                x1="32"
                y1="4"
                x2="32"
                y2="70"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeOpacity="0.9"
              />
              {/* Quantum Reactor Core / Cockpit */}
              <ellipse
                cx="32"
                cy="38"
                rx="3.5"
                ry="9"
                fill="url(#coreGradient)"
                stroke="#ffffff"
                strokeWidth="1"
              />
              {/* Dual Exhaust Engine Bells */}
              <path
                d="M26 70 L24 78 L30 78 L29 70 Z"
                fill="#5f5b55"
                stroke="#cdac68"
                strokeWidth="0.8"
              />
              <path
                d="M35 70 L34 78 L40 78 L38 70 Z"
                fill="#5f5b55"
                stroke="#cdac68"
                strokeWidth="0.8"
              />

              <defs>
                <linearGradient
                  id="fuselageGradient"
                  x1="24"
                  y1="4"
                  x2="40"
                  y2="70"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#e8e3dd" />
                  <stop offset="70%" stopColor="#cdac68" />
                  <stop offset="100%" stopColor="#5f5b55" />
                </linearGradient>
                <linearGradient
                  id="wingGradientL"
                  x1="6"
                  y1="48"
                  x2="24"
                  y2="76"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#cdac68" />
                  <stop offset="100%" stopColor="#5f5b55" />
                </linearGradient>
                <linearGradient
                  id="wingGradientR"
                  x1="58"
                  y1="48"
                  x2="40"
                  y2="76"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#cdac68" />
                  <stop offset="100%" stopColor="#5f5b55" />
                </linearGradient>
                <linearGradient
                  id="coreGradient"
                  x1="32"
                  y1="29"
                  x2="32"
                  y2="47"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#cdac68" />
                  <stop offset="100%" stopColor="#1d1f21" />
                </linearGradient>
              </defs>
            </svg>

            {/* Dynamic Ion Thruster Plasma Plume */}
            <div className={styles.thrusterPlume}>
              <div className={styles.plasmaCore} />
              <div className={styles.plasmaEnvelope} />
            </div>
          </div>
        </div>

        {/* Apogee Severance Shockwave Burst at Top Apex */}
        <div ref={apogeeBurstRef} className={styles.apogeeBurst}>
          <div className={styles.burstRing} />
          <div className={styles.burstFlare} />
        </div>

        {/* Initial Center Quantum Seal Medallion & ReactBits ShinyText Prompt */}
        <div ref={crestRef} className={styles.crest}>
          <div className={styles.crestMedallion}>
            <div className={styles.starBorderRing} />
            <div className={styles.crestInnerRing}>
              <div className={styles.quantumGlyph}>
                <span className={styles.glyphTop}>
                  <ShinyText text="TECHVISTRA" color="#cdac68" shineColor="#ffffff" speed={2.8} />
                </span>
                <span className={styles.crestCore}>
                  <ShinyText text="Q" color="#1d1f21" shineColor="#cdac68" speed={2.0} glow={1.0} />
                </span>
                <span className={styles.glyphBottom}>
                  <ShinyText text="2026" color="#cdac68" shineColor="#ffffff" speed={2.8} />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.crestPrompt}>
            <span className={styles.launchIcon}>▲</span>
            <ShinyText
              text="Scroll to Launch Rocket & Unseal"
              color="#1d1f21"
              shineColor="#cdac68"
              speed={2.2}
              shineWidth={60}
              glow={0.6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
