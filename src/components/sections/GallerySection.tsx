import { useEffect, useRef } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./GallerySection.module.css";

const galleryColumns = [
  [
    {
      src: "/Gallery%20images/optimized/image1.webp",
      alt: "Students collaborating around a laptop",
      // caption: "Ideas take shape",
    },
    {
      src: "/Gallery%20images/optimized/image2.webp",
      alt: "Team sharing ideas around a table",
      // caption: "Built together",
    },
    {
      src: "/Gallery%20images/optimized/image3.webp",
      alt: "Close-up of a circuit board",
      // caption: "Into the details",
    },
    {
      src: "/Gallery%20images/optimized/image4.webp",
      alt: "A group working together in a bright studio",
      // caption: "One shared vision",
    },
  ],
  [
    {
      src: "/Gallery%20images/optimized/image5.webp",
      alt: "Audience attending a conference",
      // caption: "A room full of possibility",
    },
    {
      src: "/Gallery%20images/optimized/image6.webp",
      alt: "Immersive digital art installation",
      // caption: "Think beyond",
    },
    {
      src: "/Gallery%20images/optimized/image7.webp",
      alt: "Collaborators working together at computers",
      // caption: "Make it happen",
    },
    {
      src: "/Gallery%20images/optimized/image8.webp",
      alt: "Colorful retro technology and electronics",
      // caption: "Curiosity in action",
    },
  ],
  [
    {
      src: "/Gallery%20images/optimized/image9.webp",
      alt: "A team collaborating around a table",
      // caption: "Stronger as a team",
    },
    {
      src: "/Gallery%20images/optimized/image10.webp",
      alt: "Professionals collaborating in a modern workspace",
      // caption: "Where work meets wonder",
    },
    {
      src: "/Gallery%20images/optimized/image11.webp",
      alt: "Laptop displaying a colorful digital interface",
      // caption: "A glimpse of what’s next",
    },
    {
      src: "/Gallery%20images/optimized/image12.webp",
      alt: "Team meeting in a sunlit conference room",
      // caption: "The next big idea",
    },
  ],
];

const galleryImages = galleryColumns.flat();
const mobileGalleryColumns = [
  galleryImages.filter((_, index) => index % 2 === 0),
  galleryImages.filter((_, index) => index % 2 === 1),
];

export default function GallerySection() {
  const stageRef = useRef<HTMLDivElement>(null);

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
        const mobileFrame = visibleFrames.find((frame) => frame.classList.contains(styles.galleryFrameMobile));
        if (mobileFrame) {
          const columnHeight = Math.max(
            0,
            ...Array.from(mobileFrame.querySelectorAll<HTMLElement>(`.${styles.galleryColumn}`))
              .map((column) => column.scrollHeight)
          );
          const scrollDistance = Math.max(0, columnHeight - mobileFrame.clientHeight);
          stage.style.height = `${mobileFrame.clientHeight + scrollDistance + 80}px`;
        }
        return;
      }

      const frameHeight = Math.max(
        0,
        ...visibleFrames.map((frame) => frame.getBoundingClientRect().height)
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
          (frame) => Number.parseFloat(window.getComputedStyle(frame).top) || 0
        )
      );
      stage.style.height = `${frameHeight + maxColumnScroll + stickyTop}px`;
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
          const isMobileFrame = frame.classList.contains(styles.galleryFrameMobile);
          if (isMobile !== isMobileFrame || frame.getClientRects().length === 0) return;

          const columns = Array.from(
            frame.querySelectorAll<HTMLElement>(`.${styles.galleryColumn}`)
          );
          columns.forEach((column) => {
            gsap.fromTo(
              column,
              { y: 0 },
              {
                y: () => -Math.max(0, column.scrollHeight - frame.clientHeight),
                ease: "none",
                scrollTrigger: {
                  trigger: stage,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                },
              }
            );

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
          title="Gallery"
          className={styles.sectionTitle}
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
                {column.map((image) => (
                  <figure className={styles.galleryItem} key={image.src}>
                    <img
                      className={styles.galleryImage}
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className={styles.caption}>
                      {/* {image.caption} */}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
