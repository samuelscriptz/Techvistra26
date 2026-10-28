import { useEffect, useRef } from "react";
import styles from "./GallerySection.module.css";

const galleryColumns = [
  [
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
      alt: "Students collaborating around a laptop",
      caption: "Ideas take shape",
    },
    {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85",
      alt: "Team sharing ideas around a table",
      caption: "Built together",
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
      alt: "Close-up of a circuit board",
      caption: "Into the details",
    },
    {
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
      alt: "A group working together in a bright studio",
      caption: "One shared vision",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85",
      alt: "Audience attending a conference",
      caption: "A room full of possibility",
    },
    {
      src: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=85",
      alt: "Immersive digital art installation",
      caption: "Think beyond",
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=85",
      alt: "Collaborators working together at computers",
      caption: "Make it happen",
    },
    {
      src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85",
      alt: "Colorful retro technology and electronics",
      caption: "Curiosity in action",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
      alt: "A team collaborating around a table",
      caption: "Stronger as a team",
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=85",
      alt: "Professionals collaborating in a modern workspace",
      caption: "Where work meets wonder",
    },
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=85",
      alt: "Laptop displaying a colorful digital interface",
      caption: "A glimpse of what’s next",
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
      alt: "Team meeting in a sunlit conference room",
      caption: "The next big idea",
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

          gsap.fromTo(
            frame,
            isMobile
              ? { rotateX: 14, rotateZ: -2.8, scale: 0.92 }
              : { rotateX: 12, scale: 0.94 },
            {
              rotateX: 0,
              rotateZ: isMobile ? 0.8 : 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );

          const columns = Array.from(
            frame.querySelectorAll<HTMLElement>(`.${styles.galleryColumn}`)
          );
          columns.forEach((column, columnIndex) => {
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
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );

            if (isMobile) {
              gsap.to(column, {
                x: columnIndex === 0 ? -3 : 3,
                ease: "none",
                scrollTrigger: {
                  trigger: stage,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1,
                },
              });
            }
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
        <h2 id="gallery-title" className={styles.sectionTitle}>
          Gallery
        </h2>
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
                    />
                    <figcaption className={styles.caption}>
                      {image.caption}
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
