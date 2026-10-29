import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import ShinyText from "../ReactBits/ShinyText";
import styles from "./GoldenSealReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

interface GoldenSealRevealProps {
  children: React.ReactNode;
}

const VORTEX_IMAGE_SRC = "/vortex-frames/frame_001.webp";

/**
 * GoldenSealReveal
 *
 * Cinematic Golden Vortex Page Split Transition:
 * - 100% Hardware-Accelerated 120 FPS GPU Transforms (zero video-decoder lag).
 * - Perfect seamless union at rest (0-px hairline gap, zero scrollbar offset).
 * - On scroll down:
 *   1. Center prompt fades out.
 *   2. Center seal medallion charges and fractures.
 *   3. Electric quantum lightning cracks down the vertical center with branching fissures.
 *   4. Supersonic severance shockwave bursts at the core.
 *   5. The whole page physically splits into two vault doors (xPercent: -101 & 101).
 *   6. From the center between the parting panels, the underlying Hero page smoothly emerges.
 *   7. Top navbar slides gracefully into place.
 * - Reversible: Scrolling upwards smoothly re-unites the panels back into the sealed golden vortex.
 */
export default function GoldenSealReveal({ children }: GoldenSealRevealProps) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const heroSlotRef = useRef<HTMLDivElement>(null);
  const portalFlareRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const splitEdgeLeftRef = useRef<HTMLDivElement>(null);
  const splitEdgeRightRef = useRef<HTMLDivElement>(null);
  const centerSealRef = useRef<HTMLDivElement>(null);
  const seamContainerRef = useRef<HTMLDivElement>(null);
  const seamLineRef = useRef<HTMLDivElement>(null);
  const seamGlowRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<SVGSVGElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !pinWrapperRef.current ||
      !overlayRef.current ||
      !leftPanelRef.current ||
      !rightPanelRef.current
    ) {
      return;
    }

    // Keep inner panel dimensions exactly synchronized to the overlay's pixel width
    const updateDimensions = () => {
      if (overlayRef.current) {
        const width = overlayRef.current.clientWidth;
        overlayRef.current.style.setProperty("--seal-width", `${width}px`);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const headerEl = document.querySelector("header");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      // Initial resting state (100% sealed & unified)
      gsap.set([leftPanelRef.current, rightPanelRef.current], {
        xPercent: 0,
        force3D: true,
      });

      gsap.set([splitEdgeLeftRef.current, splitEdgeRightRef.current], {
        opacity: 0,
        force3D: true,
      });

      gsap.set(heroSlotRef.current, {
        scale: 0.92,
        opacity: 0.85,
        force3D: true,
      });

      gsap.set(portalFlareRef.current, {
        scale: 0.5,
        opacity: 0,
        force3D: true,
      });

      if (centerSealRef.current) {
        gsap.set(centerSealRef.current, {
          scale: 1,
          opacity: 1,
          force3D: true,
        });
      }

      gsap.set([seamLineRef.current, seamGlowRef.current], {
        scaleY: 0,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(lightningRef.current, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(burstRef.current, {
        scale: 0.3,
        opacity: 0,
        force3D: true,
      });

      gsap.set(overlayRef.current, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      if (promptRef.current) {
        gsap.set(promptRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      }

      // Navbar initially hidden while seal is closed
      if (headerEl) {
        gsap.set(headerEl, {
          opacity: 0,
          y: -15,
          pointerEvents: "none",
        });
      }

      // Phase 1: Scroll prompt fades out (0.0 -> 0.08)
      if (promptRef.current) {
        tl.to(
          promptRef.current,
          {
            opacity: 0,
            y: -18,
            scale: 0.9,
            duration: 0.08,
            ease: "power1.out",
          },
          0
        );
      }

      // Phase 1b: Center seal medallion charges with golden luminescence (0.0 -> 0.12)
      if (centerSealRef.current) {
        tl.to(
          centerSealRef.current,
          {
            scale: 1.06,
            duration: 0.12,
            ease: "power2.out",
          },
          0
        );
      }

      // Phase 2: Electric Lightning Crack ignites from center, shooting vertically (0.06 -> 0.26)
      tl.to(
        [seamLineRef.current, seamGlowRef.current],
        {
          scaleY: 1,
          duration: 0.20,
          ease: "power2.inOut",
        },
        0.06
      );

      tl.to(
        lightningRef.current,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.18,
          ease: "power1.in",
        },
        0.08
      );

      // Phase 3: Supersonic Severance Burst Shockwave (0.24 -> 0.32)
      tl.to(
        burstRef.current,
        {
          opacity: 1,
          scale: 1.8,
          duration: 0.04,
          ease: "power2.out",
        },
        0.24
      );

      tl.to(
        burstRef.current,
        {
          opacity: 0,
          scale: 3.2,
          duration: 0.04,
          ease: "power2.in",
        },
        0.28
      );

      // Center seal fractures & dissolves into energy (0.24 -> 0.30)
      if (centerSealRef.current) {
        tl.to(
          centerSealRef.current,
          {
            scale: 1.25,
            opacity: 0,
            duration: 0.06,
            ease: "power2.in",
          },
          0.24
        );
      }

      // Portal flare shines from the center opening (0.26 -> 0.60)
      tl.to(
        portalFlareRef.current,
        {
          opacity: 0.85,
          scale: 1.2,
          duration: 0.22,
          ease: "power2.out",
        },
        0.26
      );

      tl.to(
        portalFlareRef.current,
        {
          opacity: 0,
          scale: 1.8,
          duration: 0.30,
          ease: "power2.in",
        },
        0.48
      );

      // Edge bevels & drop shadows become visible as the split initiates (0.26 -> 0.32)
      tl.to(
        [splitEdgeLeftRef.current, splitEdgeRightRef.current],
        {
          opacity: 1,
          duration: 0.06,
          ease: "power1.out",
        },
        0.26
      );

      // Phase 4: THE WHOLE PAGE SPLITS INTO TWO! (0.26 -> 0.86)
      // Left and right vault panels slide off-screen; Hero emerges from center
      tl.to(
        leftPanelRef.current,
        {
          xPercent: -101,
          duration: 0.60,
          ease: "power2.inOut",
        },
        0.26
      );

      tl.to(
        rightPanelRef.current,
        {
          xPercent: 101,
          duration: 0.60,
          ease: "power2.inOut",
        },
        0.26
      );

      // Center seam & lightning fade away as panels part (0.28 -> 0.42)
      tl.to(
        seamContainerRef.current,
        {
          opacity: 0,
          duration: 0.14,
          ease: "power1.out",
        },
        0.28
      );

      // Underlying Hero scales up and emerges with full brightness from the center (0.28 -> 0.86)
      tl.to(
        heroSlotRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.58,
          ease: "power2.out",
        },
        0.28
      );

      // Phase 5: Navbar slides gracefully into place as the curtains open (0.65 -> 0.88)
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
          0.65
        );
      }

      // Edge bevels fade off as panels exit (0.78 -> 0.88)
      tl.to(
        [splitEdgeLeftRef.current, splitEdgeRightRef.current],
        {
          opacity: 0,
          duration: 0.10,
          ease: "power1.in",
        },
        0.78
      );

      // Phase 6: Clean hand-off to page scrolling (0.90 -> 0.98)
      tl.to(
        overlayRef.current,
        {
          autoAlpha: 0,
          duration: 0.08,
          pointerEvents: "none",
        },
        0.90
      );

      const isMobile = window.innerWidth <= 768;
      const scrollDistance = isMobile ? 800 : 1100;

      ScrollTrigger.create({
        trigger: pinWrapperRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.25, // Ultra-responsive, buttery smooth 120 FPS
        fastScrollEnd: true,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents =
              self.progress >= 0.88 ? "none" : "auto";
          }
          if (headerEl) {
            headerEl.style.pointerEvents =
              self.progress >= 0.65 ? "auto" : "none";
          }
        },
      });

      ScrollTrigger.refresh();
    }, pinWrapperRef);

    return () => {
      window.removeEventListener("resize", updateDimensions);
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
      {/* Preserved underlying Hero emerging from the center */}
      <div ref={heroSlotRef} className={styles.heroSlot}>
        {children}
      </div>

      {/* Radiant Portal Flare shining from center behind parting panels */}
      <div ref={portalFlareRef} className={styles.portalFlare} />

      {/* Luxury Golden Vortex Two-Panel Split Overlay */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        aria-hidden="true"
        role="presentation"
      >
        {/* Left Vault Panel */}
        <div ref={leftPanelRef} className={styles.panelLeft}>
          <div className={styles.panelInnerLeft}>
            <img
              src={VORTEX_IMAGE_SRC}
              alt=""
              className={styles.vortexImg}
              loading="eager"
            />
            <div className={styles.vignette} />
            <div className={styles.glowEdge} />
          </div>
          {/* Dynamic edge bevel & shadow visible only during the split */}
          <div ref={splitEdgeLeftRef} className={styles.splitEdgeLeft} />
        </div>

        {/* Right Vault Panel */}
        <div ref={rightPanelRef} className={styles.panelRight}>
          <div className={styles.panelInnerRight}>
            <img
              src={VORTEX_IMAGE_SRC}
              alt=""
              className={styles.vortexImg}
              loading="eager"
            />
            <div className={styles.vignette} />
            <div className={styles.glowEdge} />
          </div>
          {/* Dynamic edge bevel & shadow visible only during the split */}
          <div ref={splitEdgeRightRef} className={styles.splitEdgeRight} />
        </div>

        {/* Center Quantum Seal Medallion in the Vortex Eye */}
        <div ref={centerSealRef} className={styles.centerSealCrest}>
          <div className={styles.sealRingOuter} />
          <span className={styles.sealCoreGlyph}>Q</span>
          <span className={styles.sealSubtitle}>Techvistra '26</span>
        </div>

        {/* Central Luminous Vertical Seam System & Electric Lightning Fracture */}
        <div ref={seamContainerRef} className={styles.seamContainer}>
          <div ref={seamGlowRef} className={styles.seamGlow} />
          <div ref={seamLineRef} className={styles.seamLine} />

          {/* Electric Jagged Lightning Fracture SVG with branching fissures */}
          <svg
            ref={lightningRef}
            className={styles.lightningSvg}
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="crackGlow"
                x="-50%"
                y="-20%"
                width="200%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="6" result="blur1" />
                <feGaussianBlur stdDeviation="14" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="crackGoldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="20%" stopColor="#cdac68" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="80%" stopColor="#cdac68" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Golden outer plasma aura */}
            <g stroke="url(#crackGoldGrad)" fill="none" strokeLinecap="round">
              <path
                d="M50 0 L48 90 L53 160 L47 240 L54 330 L46 420 L53 500 L47 580 L54 670 L48 760 L53 850 L49 930 L50 1000"
                strokeWidth="10"
                opacity="0.85"
                filter="url(#crackGlow)"
              />
              <path
                d="M47 240 L34 265 L24 280"
                strokeWidth="4"
                opacity="0.75"
              />
              <path
                d="M54 330 L68 355 L78 370"
                strokeWidth="4"
                opacity="0.75"
              />
              <path
                d="M46 420 L32 445 L20 465"
                strokeWidth="4.5"
                opacity="0.75"
              />
              <path
                d="M53 500 L70 525 L82 540"
                strokeWidth="5"
                opacity="0.8"
              />
              <path
                d="M47 580 L30 605 L18 625"
                strokeWidth="4"
                opacity="0.75"
              />
              <path
                d="M54 670 L68 695 L80 715"
                strokeWidth="4"
                opacity="0.75"
              />
            </g>

            {/* Brilliant white core beam */}
            <g stroke="#ffffff" fill="none" strokeLinecap="round">
              <path
                d="M50 0 L48 90 L53 160 L47 240 L54 330 L46 420 L53 500 L47 580 L54 670 L48 760 L53 850 L49 930 L50 1000"
                strokeWidth="3.2"
              />
              <path d="M47 240 L34 265 L24 280" strokeWidth="1.5" />
              <path d="M54 330 L68 355 L78 370" strokeWidth="1.5" />
              <path d="M46 420 L32 445 L20 465" strokeWidth="1.8" />
              <path d="M53 500 L70 525 L82 540" strokeWidth="2.0" />
              <path d="M47 580 L30 605 L18 625" strokeWidth="1.5" />
              <path d="M54 670 L68 695 L80 715" strokeWidth="1.5" />
            </g>
          </svg>

          {/* Supersonic severance shockwave burst system */}
          <div ref={burstRef} className={styles.burstShockwave}>
            <div className={styles.shockwaveRing1} />
            <div className={styles.shockwaveRing2} />
            <div className={styles.shockwaveFlash} />
          </div>
        </div>

        {/* Scroll To Crack & Unseal Prompt */}
        <div ref={promptRef} className={styles.prompt}>
          <div className={styles.badge}>
            <span className={styles.indicator} />
            <ShinyText
              text="Scroll to Crack & Unseal"
              color="#ffffff"
              shineColor="#cdac68"
              speed={2.2}
              shineWidth={55}
            />
          </div>
          <div className={styles.scrollArrow}>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
