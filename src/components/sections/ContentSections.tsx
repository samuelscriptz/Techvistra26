import { useEffect, useRef } from "react";
import { eventConfig, isPlaceholder } from "../../config/eventConfig";
import styles from "./Section.module.css";

/**
 * Shared hook for GSAP ScrollTrigger reveal animations on sections.
 * Applies staggered fade-up entrance to child elements.
 */
function useSectionReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const init = async () => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) return;

      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Section label slide in
        const label = el.querySelector(`.${styles.sectionLabel}`);
        if (label) {
          gsap.fromTo(
            label,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Title reveal
        const title = el.querySelector(`.${styles.sectionTitle}`);
        if (title) {
          gsap.fromTo(
            title,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Divider grow
        const divider = el.querySelector(`.${styles.divider}`);
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 0.7,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Cards stagger
        const cards = el.querySelectorAll(`.${styles.card}`);
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Placeholder cards
        const placeholders = el.querySelectorAll(`.${styles.placeholderCard}`);
        if (placeholders.length > 0) {
          gsap.fromTo(
            placeholders,
            { y: 35, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Subtitle text
        const subtitle = el.querySelector(`.${styles.sectionSubtitle}`);
        if (subtitle) {
          gsap.fromTo(
            subtitle,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }, el);

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [ref]);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const hasContent = !isPlaceholder(eventConfig.eventSummary);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.sectionAlt}
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        <span className={styles.sectionLabel}>About</span>
        <h2 id="about-title" className={styles.sectionTitle}>
          About the Event
        </h2>
        <div className={styles.divider} />
        <p className={styles.sectionSubtitle}>{eventConfig.eventSummary}</p>

        <div className={styles.cardGrid} style={{ marginTop: "var(--space-lg)" }}>
          <div className={styles.card}>
            <span style={{ color: "var(--accent-primary)", fontSize: "1.75rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
              2nd Edition
            </span>
            <h4 style={{ marginTop: "4px", fontSize: "1.1rem" }}>National Level Symposium</h4>
            <p className={styles.cardDesc}>
              Following the success of TechVistra '25, expanding national participation across Indian universities.
            </p>
          </div>

          <div className={styles.card}>
            <span style={{ color: "var(--accent-primary)", fontSize: "1.75rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
              6+ Tracks
            </span>
            <h4 style={{ marginTop: "4px", fontSize: "1.1rem" }}>Competitive Arenas</h4>
            <p className={styles.cardDesc}>
              Spanning AI Hackathons, Competitive Coding, Quantum Research Colloquiums, and Web3 Architectures.
            </p>
          </div>

          <div className={styles.card}>
            <span style={{ color: "var(--accent-primary)", fontSize: "1.75rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
              Grand Awards
            </span>
            <h4 style={{ marginTop: "4px", fontSize: "1.1rem" }}>Cash Prizes &amp; Trophies</h4>
            <p className={styles.cardDesc}>
              Exciting cash prizes and merit awards for winning teams, with verified participation certificates for all.
            </p>
          </div>

          <div className={styles.card}>
            <span style={{ color: "var(--color-teal-accent)", fontSize: "1.75rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
              Dept. of Data Science
            </span>
            <h4 style={{ marginTop: "4px", fontSize: "1.1rem" }}>Host &amp; Organizer</h4>
            <p className={styles.cardDesc}>
              Organized with pride by the faculty, researchers, and student innovators of the Department of Data Science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProgramSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const hasTracks = eventConfig.programTracks.length > 0;

  return (
    <section
      ref={sectionRef}
      id="program"
      className={styles.section}
      aria-labelledby="program-title"
    >
      <div className={styles.inner}>
        <span className={styles.sectionLabel}>Program</span>
        <h2 id="program-title" className={styles.sectionTitle}>
          Tracks &amp; Experiences
        </h2>
        <div className={styles.divider} />
        {hasTracks ? (
          <div className={styles.cardGrid}>
            {eventConfig.programTracks.map((track, i) => (
              <div key={i} className={styles.card}>
                {track.icon && (
                  <div className={styles.cardIcon}>{track.icon}</div>
                )}
                <h3 className={styles.cardTitle}>{track.title}</h3>
                <p className={styles.cardDesc}>{track.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.placeholderCard}>
            <div className={styles.placeholderIcon}>🧪</div>
            <p className={styles.placeholderText}>
              Tracks, workshops, and competitions will be announced by the
              organizers.
            </p>
            <p className={styles.placeholderNote}>
              Check back soon for the full program lineup.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const hasSchedule = eventConfig.schedule.length > 0;

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className={styles.sectionAlt}
      aria-labelledby="schedule-title"
    >
      <div className={styles.inner}>
        <span className={styles.sectionLabel}>Schedule</span>
        <h2 id="schedule-title" className={styles.sectionTitle}>
          Event Schedule
        </h2>
        <div className={styles.divider} />
        {hasSchedule ? (
          <div>
            {eventConfig.schedule.map((day, i) => (
              <div key={i} style={{ marginBottom: "var(--space-lg)" }}>
                <h3 className={styles.cardTitle}>{day.day}</h3>
                {day.events.map((evt, j) => (
                  <div
                    key={j}
                    className={styles.card}
                    style={{ marginTop: "var(--space-sm)" }}
                  >
                    <span
                      style={{
                        color: "var(--accent-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {evt.time}
                    </span>
                    <h4 style={{ marginTop: 4 }}>{evt.title}</h4>
                    {evt.description && (
                      <p className={styles.cardDesc}>{evt.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.placeholderCard}>
            <div className={styles.placeholderIcon}>📅</div>
            <p className={styles.placeholderText}>
              The detailed schedule will be published once finalized by the
              organizers.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function VenueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const hasVenue = !isPlaceholder(eventConfig.venue);

  return (
    <section
      ref={sectionRef}
      id="venue"
      className={styles.section}
      aria-labelledby="venue-title"
    >
      <div className={styles.inner}>
        <span className={styles.sectionLabel}>Venue</span>
        <h2 id="venue-title" className={styles.sectionTitle}>
          Location &amp; Venue
        </h2>
        <div className={styles.divider} />
        {hasVenue ? (
          <div className={styles.card}>
            <p className={styles.cardDesc}>{eventConfig.venue}</p>
          </div>
        ) : (
          <div className={styles.placeholderCard}>
            <div className={styles.placeholderIcon}>📍</div>
            <p className={styles.placeholderText}>
              Venue details, directions, and access information will be
              announced by the organizers.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const hasFaq = eventConfig.faq.length > 0;

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={styles.sectionAlt}
      aria-labelledby="faq-title"
    >
      <div className={styles.inner}>
        <span className={styles.sectionLabel}>FAQ</span>
        <h2 id="faq-title" className={styles.sectionTitle}>
          Frequently Asked Questions
        </h2>
        <div className={styles.divider} />
        {hasFaq ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-sm)",
            }}
          >
            {eventConfig.faq.map((item, i) => (
              <details key={i} className={styles.card}>
                <summary
                  style={{
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    listStyle: "none",
                  }}
                >
                  {item.question}
                </summary>
                <p
                  className={styles.cardDesc}
                  style={{ marginTop: "var(--space-sm)" }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        ) : (
          <div className={styles.placeholderCard}>
            <div className={styles.placeholderIcon}>❓</div>
            <p className={styles.placeholderText}>
              FAQs will be added once confirmed by the organizers.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
