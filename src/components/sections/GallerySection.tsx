import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./GallerySection.module.css";

const galleryColumns = [
  [
    {
      src: "/Gallery%20images/optimized/image1.webp",
      alt: "Students collaborating around a laptop",
    },
    {
      src: "/Gallery%20images/optimized/image2.webp",
      alt: "Team sharing ideas around a table",
    },
    {
      src: "/Gallery%20images/optimized/image3.webp",
      alt: "Close-up of a circuit board",
    },
    {
      src: "/Gallery%20images/optimized/image4.webp",
      alt: "A group working together in a bright studio",
    },
  ],
  [
    {
      src: "/Gallery%20images/optimized/image5.webp",
      alt: "Audience attending a conference",
    },
    {
      src: "/Gallery%20images/optimized/image6.webp",
      alt: "Immersive digital art installation",
    },
    {
      src: "/Gallery%20images/optimized/image7.webp",
      alt: "Collaborators working together at computers",
    },
    {
      src: "/Gallery%20images/optimized/image8.webp",
      alt: "Colorful retro technology and electronics",
    },
  ],
  [
    {
      src: "/Gallery%20images/optimized/image9.webp",
      alt: "A team collaborating around a table",
    },
    {
      src: "/Gallery%20images/optimized/image10.webp",
      alt: "Professionals collaborating in a modern workspace",
    },
    {
      src: "/Gallery%20images/optimized/image11.webp",
      alt: "Laptop displaying a colorful digital interface",
    },
    {
      src: "/Gallery%20images/optimized/image12.webp",
      alt: "Team meeting in a sunlit conference room",
    },
  ],
];

export interface GalleryMoment {
  src: string;
  alt: string;
}

const TECHVISTRA_26_MOMENTS: GalleryMoment[] = [
  {
    src: "/Gallery%20images/optimized/image13.jpeg",
    alt: "TechVistra '26 Opening Ceremony",
  },
  {
    src: "/Gallery%20images/optimized/image14.jpeg",
    alt: "TechVistra '26 Competitive Arenas",
  },
  {
    src: "/Gallery%20images/optimized/image15.jpeg",
    alt: "TechVistra '26 Innovation Hackathon",
  },
  {
    src: "/Gallery%20images/optimized/image16.jpeg",
    alt: "TechVistra '26 Awards & Recognition",
  },
];

const galleryImages = galleryColumns.flat();
const allImages = [...galleryImages, ...TECHVISTRA_26_MOMENTS];

const mobileGalleryColumns = [
  galleryImages.filter((_, index) => index % 2 === 0),
  galleryImages.filter((_, index) => index % 2 === 1),
];

export default function GallerySection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const lightboxTitleId = useId();

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedImageIndex((current) =>
          current === null
            ? null
            : (current - 1 + allImages.length) % allImages.length
        );
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedImageIndex((current) =>
          current === null ? null : (current + 1) % allImages.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;
    const frames = Array.from(
      stage.querySelectorAll<HTMLElement>(`.${styles.galleryFrame}`)
    );

    const sizeStageToGallery = () => {
      const visibleFrames = frames.filter((frame) => frame.getClientRects().length > 0);
      if (window.innerWidth <= 768) {
        const mobileFrame = visibleFrames.find((frame) =>
          frame.classList.contains(styles.galleryFrameMobile)
        );
        if (mobileFrame) {
          const columnHeight = Math.max(
            0,
            ...Array.from(
              mobileFrame.querySelectorAll<HTMLElement>(`.${styles.galleryColumn}`)
            ).map((column) => column.scrollHeight)
          );
          const scrollDistance = Math.max(
            0,
            columnHeight - mobileFrame.clientHeight
          );
          stage.style.height = `${mobileFrame.clientHeight + scrollDistance + 80}px`;
        }
        return;
      }

      const frameHeight = Math.max(
        0,
        ...visibleFrames.map((frame) => frame.offsetHeight || frame.clientHeight || frame.getBoundingClientRect().height)
      );
      const maxColumnScroll = Math.max(
        0,
        ...visibleFrames.flatMap((frame) =>
          Array.from(
            frame.querySelectorAll<HTMLElement>(`.${styles.galleryColumn}`)
          ).map((column) => column.scrollHeight - frame.clientHeight)
        )
      );
      const stickyTop = Math.max(
        0,
        ...visibleFrames.map(
          (frame) =>
            Number.parseFloat(window.getComputedStyle(frame).top) || 0
        )
      );
      stage.style.height = `${frameHeight + maxColumnScroll + stickyTop + 140}px`;
    };

    sizeStageToGallery();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        stage.style.removeProperty("height");
      };
    }

    const init = async () => {
      const isMobile = window.innerWidth <= 768;
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        sizeStageToGallery();

        frames.forEach((frame) => {
          const isMobileFrame = frame.classList.contains(
            styles.galleryFrameMobile
          );
          if (
            isMobile !== isMobileFrame ||
            frame.getClientRects().length === 0
          ) {
            return;
          }

          const columns = Array.from(
            frame.querySelectorAll<HTMLElement>(`.${styles.galleryColumn}`)
          );

          gsap.fromTo(
            frame,
            {
              rotateX: isMobileFrame ? 0 : 10,
              scale: isMobileFrame ? 1 : 0.98,
              y: isMobileFrame ? 18 : 28,
            },
            {
              rotateX: isMobileFrame ? 0 : 7,
              scale: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: "top bottom",
                end: "top top",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            }
          );

          columns.forEach((column) => {
            gsap.to(column, {
              y: () =>
                -Math.max(0, column.scrollHeight - frame.clientHeight),
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.1,
                invalidateOnRefresh: true,
              },
            });
          });
        });
      }, stage);

      ScrollTrigger.refresh();
    };

    let resizeFrame = 0;
    const onResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        ctx?.revert();
        ctx = undefined;
        void init();
      });
    };

    const handleImageLoad = () => {
      sizeStageToGallery();
    };

    stage.querySelectorAll("img").forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", handleImageLoad, { once: true });
      }
    });

    window.addEventListener("resize", onResize);
    void init();
    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(resizeFrame);
      ctx?.revert();
      stage.style.removeProperty("height");
    };
  }, []);

  return (
    <section
      id="gallery"
      className={styles.section}
      aria-labelledby="gallery-title"
    >
      <div className={styles.inner}>
        <SectionTitle
          id="gallery-title"
          title={"Legacy of\nTechVistra"}
          className={styles.sectionTitle}
          variant="gold"
        />
      </div>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.ambientGlow} aria-hidden="true" />
        {[galleryColumns, mobileGalleryColumns].map((columns, layoutIndex) => (
          <div
            className={`${styles.galleryFrame} ${layoutIndex === 1 ? styles.galleryFrameMobile : ""}`}
            key={`gallery-layout-${layoutIndex}`}
          >
            {columns.map((column, columnIndex) => (
              <div
                className={styles.galleryColumn}
                key={`gallery-column-${columnIndex}`}
              >
                {column.map((image) => {
                  const imageIndex = galleryImages.findIndex(
                    (galleryImage) => galleryImage.src === image.src
                  );

                  return (
                    <figure className={styles.galleryItem} key={image.src}>
                      <button
                        type="button"
                        className={styles.galleryButton}
                        onClick={() => setSelectedImageIndex(imageIndex)}
                        aria-label={`Open enlarged image: ${image.alt}`}
                      >
                        <img
                          className={styles.galleryImage}
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption className={styles.caption} />
                      </button>
                    </figure>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* TechVistra '26 Showcase Block */}
      <div className={styles.techvistra26Block}>
        <div className={styles.techvistra26Inner}>
          <SectionTitle
            id="techvistra-26-title"
            title="TechVistra '26"
            className={styles.techvistra26Title}
            variant="gold"
          />

          <div className={styles.techvistra26Grid}>
            {TECHVISTRA_26_MOMENTS.map((item, idx) => {
              const globalIndex = galleryImages.length + idx;
              return (
                <div
                  key={`techvistra26-item-${idx}`}
                  className={styles.techvistra26Card}
                  onClick={() => setSelectedImageIndex(globalIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedImageIndex(globalIndex);
                    }
                  }}
                  aria-label={`View enlarged photo: ${item.alt}`}
                >
                  <div className={styles.techvistra26ImageWrap}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={styles.techvistra26Img}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedImageIndex !== null && (
        <div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby={lightboxTitleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedImageIndex(null);
            }
          }}
        >
          <h2 id={lightboxTitleId} className={styles.lightboxTitle}>
            {allImages[selectedImageIndex].alt}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.lightboxClose}
            onClick={() => setSelectedImageIndex(null)}
            aria-label="Close image preview"
          >
            <X size={22} aria-hidden="true" />
          </button>

          <div className={styles.lightboxContent}>
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowPrevious}`}
              onClick={() =>
                setSelectedImageIndex(
                  (selectedImageIndex - 1 + allImages.length) %
                  allImages.length
                )
              }
              aria-label="View previous image"
            >
              <ChevronLeft size={28} aria-hidden="true" />
            </button>

            <figure className={styles.lightboxFigure}>
              <img
                className={styles.lightboxImage}
                src={allImages[selectedImageIndex].src}
                alt={allImages[selectedImageIndex].alt}
                decoding="async"
              />
            </figure>

            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowNext}`}
              onClick={() =>
                setSelectedImageIndex(
                  (selectedImageIndex + 1) % allImages.length
                )
              }
              aria-label="View next image"
            >
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          </div>

          <div className={styles.lightboxCounter} aria-live="polite">
            {selectedImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
