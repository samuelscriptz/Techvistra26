// import { useState, useEffect, useRef, type ReactNode } from "react";
// import SectionTitle from "../SectionTitle/SectionTitle";
// import "./about.css";

// export interface AboutItem {
//   id: string;
//   number: string;
//   eyebrow: string;
//   title: string;
//   description: ReactNode;
//   slot: "edition" | "tracks" | "awards" | "host";
//   tone?: "dark" | "navy";
// }

// const ABOUT_ITEMS: AboutItem[] = [
//   {
//     id: "edition",
//     number: "01",
//     eyebrow: "National Level Symposium",
//     title: "2nd Edition",
//     description: (
//       <>
//         Building on the success of{" "}
//         <a
//           href="https://www.techvistra.in/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <b>TechVistra '25</b>
//         </a>
//         , this edition welcomes students from universities across India.
//       </>
//     ),
//     slot: "edition",
//     tone: "dark",
//   },
//   {
//     id: "tracks",
//     number: "02",
//     eyebrow: "More than 18 events",
//     title: "18+ Events",
//     description:
//       "Technical, non-technical, and junior events give students a chance to showcase their skills, creativity, and talent.",
//     slot: "tracks",
//     tone: "navy",
//   },
//   {
//     id: "awards",
//     number: "03",
//     eyebrow: "Cash prizes & trophies",
//     title: "₹1,00,000+ Prize Pool",
//     description:
//       "Compete for cash prizes and merit awards across the events. Every participant receives a certificate.",
//     slot: "awards",
//     tone: "dark",
//   },
//   {
//     id: "host",
//     number: "04",
//     eyebrow: "Host & organizer",
//     title: "Department of Data Science",
//     description:
//       "The symposium is organized by the faculty, researchers, and student innovators of the Department of Data Science.",
//     slot: "host",
//     tone: "navy",
//   },
// ];

// interface AboutCardProps {
//   item: AboutItem;
//   index: number;
// }

// function AboutCard({ item, index }: AboutCardProps) {
//   const cardRef = useRef<HTMLElement>(null);

//   const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
//     const el = cardRef.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const px = (e.clientX - rect.left) / rect.width;
//     const py = (e.clientY - rect.top) / rect.height;
//     const maxTilt = 7;
//     const ry = (px - 0.5) * 2 * maxTilt;
//     const rx = -(py - 0.5) * 2 * maxTilt;

//     el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
//     el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
//     el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
//     el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
//     el.style.setProperty("--s", "1.02");
//     el.dataset.hover = "true";
//   };

//   const handlePointerLeave = () => {
//     const el = cardRef.current;
//     if (!el) return;
//     el.style.setProperty("--rx", "0deg");
//     el.style.setProperty("--ry", "0deg");
//     el.style.setProperty("--s", "1");
//     delete el.dataset.hover;
//   };

//   return (
//     <div
//       className={`about-slot about-slot--${item.slot}`}
//       data-direction={index % 2 === 0 ? "left" : "right"}
//     >
//       <article
//         ref={cardRef}
//         className={`about-card about-card--${item.tone ?? "dark"}`}
//         onPointerMove={handlePointerMove}
//         onPointerLeave={handlePointerLeave}
//       >
//         <div className="about-card__bg" aria-hidden="true">
//           <div className="about-card__spotlight" />
//         </div>

//         <span className="about-card__number">{item.number}</span>

//         <div className="about-card__content">
//           <span className="about-card__eyebrow">{item.eyebrow}</span>
//           <h3 className="about-card__title">{item.title}</h3>
//           <p className="about-card__desc">{item.description}</p>
//         </div>
//       </article>
//     </div>
//   );
// }

// export interface AboutProps {
//   id?: string;
//   heading?: string;
//   intro?: string;
//   items?: AboutItem[];
// }

// export default function About({
//   id = "about",
//   heading = "ABOUT",
//   intro,
//   items = ABOUT_ITEMS,
// }: AboutProps) {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [isVisible, setIsVisible] = useState(() =>
//     typeof window !== "undefined" &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches
//   );

//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el || isVisible) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.12 }
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [isVisible]);

//   return (
//     <section
//       id={id}
//       ref={sectionRef}
//       className={`about-section ${isVisible ? "is-visible" : ""}`}
//       aria-labelledby="about-title"
//     >
//       <div className="about-inner">
//         <SectionTitle
//           id="about-title"
//           title={heading}
//           className="about-heading"
//         />

//         {intro && <p className="about-intro">{intro}</p>}

//         <div className="about-grid">
//           {items.map((item, i) => (
//             <AboutCard key={item.id} item={item} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export { About as AboutEvent };


import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./about.css";

/* --------------------------------------------------------------------------
   Configuration — edit these to match your project
   -------------------------------------------------------------------------- */

const COLLEGE_CREST_SRC = "/college-crest.png";
const COLLEGE_NAME = ""; // e.g. "Your College Name" (falls back to "the College")

const EVENT_LOGO_SRC = "/logo.png";
const EVENT_FULLFORM_SRC = ""; // optional: set a path to show a full-form logo below the main logo

const DEPARTMENT_URL = "https://drmgrds.com/";
const PREVIOUS_EDITION_URL = "https://www.techvistra.in/";

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */

type RevealStyle = CSSProperties & { "--d"?: string };

const delay = (seconds: number): RevealStyle => ({ "--d": `${seconds}s` });

interface BrandImageProps {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
  fallbackClassName?: string;
}

/** Image with a graceful text fallback if the asset path is wrong or missing. */
function BrandImage({
  src,
  alt,
  fallback,
  className,
  fallbackClassName,
}: BrandImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className={fallbackClassName}>{fallback}</span>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

/* --------------------------------------------------------------------------
   Component
   -------------------------------------------------------------------------- */

export interface AboutProps {
  id?: string;
  heading?: string;
}

export default function About({ id = "about", heading = "ABOUT" }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`about-section ${isVisible ? "is-visible" : ""}`}
      aria-labelledby="about-title"
    >
      <div className="about-inner">
        <SectionTitle
          id="about-title"
          title={heading}
          className="about-heading"
        />

        <div className="about-split">
          {/* ============================ LEFT: DEPARTMENT ============================ */}
          <article className="about-dept" aria-labelledby="about-dept-title">
            <p className="about-kicker reveal" style={delay(0.05)}>
              <span className="about-kicker__num">01</span>
              <span className="about-kicker__rule" aria-hidden="true" />
              <span>The Department</span>
            </p>

            <div className="about-dept__head">
              <div className="about-dept__heading">
                <h3
                  id="about-dept-title"
                  className="about-dept__title reveal"
                  style={delay(0.2)}
                >
                  Department of
                  <br />
                  <em>Data Science</em>
                </h3>

                <p className="about-assoc reveal" style={delay(0.3)}>
                  In association with{" "}
                  <span className="about-assoc__name">
                    {COLLEGE_NAME || "AUDI"}
                  </span>
                </p>
              </div>

              <div
                className="about-crest reveal reveal--logo"
                style={delay(0.25)}
              >
                <svg
                  className="about-crest__orbit"
                  viewBox="0 0 200 200"
                  aria-hidden="true"
                >
                  <circle cx="100" cy="100" r="98" className="orbit-solid" />
                  <circle cx="100" cy="100" r="86" className="orbit-dashed" />
                  <circle cx="100" cy="2" r="3" className="orbit-dot" />
                </svg>
                <BrandImage
                  src={COLLEGE_CREST_SRC}
                  alt="College crest"
                  fallback="DRMGR"
                  className="about-crest__img"
                  fallbackClassName="about-crest__fallback"
                />
              </div>
            </div>

            <div className="about-dept__body reveal" style={delay(0.45)}>
              <p>
                Committed to academic excellence, innovation, and practical
                learning, the department nurtures students through research,
                workshops, and technical events.
              </p>
            </div>

            <a
              className="about-btn reveal"
              style={delay(0.65)}
              href={DEPARTMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="about-btn__label">Explore Department</span>
              <span className="about-btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </article>

          {/* ============================ SEPARATOR ============================ */}
          <div className="about-divider" aria-hidden="true">
            <span className="about-divider__line" />
            <span className="about-divider__diamond" />
            <span className="about-divider__line" />
          </div>

          {/* ============================ RIGHT: TECHVISTRA'26 ============================ */}
          <article className="about-event" aria-labelledby="about-event-title">
            <span
              className="about-event__corner about-event__corner--tl"
              aria-hidden="true"
            />
            <span
              className="about-event__corner about-event__corner--br"
              aria-hidden="true"
            />

            <p className="about-kicker reveal" style={delay(0.1)}>
              <span className="about-kicker__num">02</span>
              <span className="about-kicker__rule" aria-hidden="true" />
              <span>The Symposium · 2nd Edition</span>
            </p>

            <h3 id="about-event-title" className="visually-hidden">
              About TechVistra’26
            </h3>

            <div className="about-brand">
              <div
                className="about-brand__main reveal reveal--logo"
                style={delay(0.2)}
              >
                <BrandImage
                  src={EVENT_LOGO_SRC}
                  alt="TechVistra’26 logo"
                  fallback="TechVistra’26"
                  className="about-brand__logo"
                  fallbackClassName="about-brand__fallback"
                />
              </div>

              {EVENT_FULLFORM_SRC && (
                <div className="about-brand__full reveal" style={delay(0.4)}>
                  <img
                    src={EVENT_FULLFORM_SRC}
                    alt="TechVistra full form"
                    className="about-brand__fullimg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </div>

            <dl className="about-stats">
              <div className="about-stat reveal" style={delay(0.5)}>
                <dt className="about-stat__label">Events</dt>
                <dd className="about-stat__value">
                  18<span className="about-stat__plus">+</span>
                </dd>
                <dd className="about-stat__desc">
                  Technical and non-technical events conducted as part of
                  TechVistra’26.
                </dd>
              </div>

              <div className="about-stat reveal" style={delay(0.65)}>
                <dt className="about-stat__label">Prize Pool</dt>
                <dd className="about-stat__value about-stat__value--currency">
                  <span className="about-stat__rupee">₹</span>1,00,000
                  <span className="about-stat__plus">+</span>
                </dd>
                <dd className="about-stat__desc">
                  Prize pool for participants across the events.
                </dd>
              </div>
            </dl>

            <a
              className="about-archive reveal"
              style={delay(0.85)}
              href={PREVIOUS_EDITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitors: TechVistra’25 (opens previous edition website in a new tab)"
            >
              <span className="about-archive__tag">Visitors</span>
              <span className="about-archive__name">TechVistra’25</span>
              <span className="about-archive__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export { About as AboutEvent };