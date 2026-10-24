import { useEffect, useRef } from "react";
import { Phone, Mail, MapPin, Facebook, ExternalLink, ArrowUpRight } from "lucide-react";
import { eventConfig, isPlaceholder } from "../../config/eventConfig";
import styles from "./Section.module.css";

// ============================================================================
// 🔗 FACEBOOK URL: PASTE YOUR FACEBOOK LINK HERE LATER
// ============================================================================
// When you have your Facebook URL, just paste it between the quotes "" below:
// Example: export const FACEBOOK_PAGE_URL = "https://www.facebook.com/techvistra";
export const FACEBOOK_PAGE_URL = "";
// ============================================================================

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

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  const coordinators = [
    { name: "Monish P", phone: "+91 97909 49122", tel: "+919790949122" },
    { name: "Dharshini mahalakshmi B", phone: "+91 70925 01895", tel: "+917092501895" },
    { name: "Narmadha S", phone: "+91 80150 05125", tel: "+918015005125" },
    { name: "Naveed Ahamed H", phone: "+91 89460 56229", tel: "+918946056229" },
  ];

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.442881273934!2d80.17538227485455!3d13.069377987255146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261504145fe7d%3A0x58810f43c3a748ae!2sDr.%20M.G.R.%20Educational%20And%20Research%20Institute!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";
  const directionsUrl =
    "https://www.google.com/maps/place/Dr.+M.G.R.+Educational+And+Research+Institute/@13.0708594,80.176078,19z/data=!4m6!3m5!1s0x3a5261504145fe7d:0x58810f43c3a748ae!8m2!3d13.069378!4d80.1779609!16s%2Fm%2F05q5w0l";

  const effectiveFacebookUrl =
    FACEBOOK_PAGE_URL.trim() || eventConfig.facebookUrl?.trim() || "";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={styles.contactSection}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <span className={styles.sectionLabel}>Connect</span>
        <h2 id="contact-title" className={styles.sectionTitle}>
          Get in Touch // Coordination Desk
        </h2>
        <div className={styles.divider} />
        <p className={styles.sectionSubtitle}>
          Have inquiries regarding tracks, team registrations, or campus access?
          Reach out to our symposium student coordinators and event desk directly.
        </p>

        {/* Desktop 2-column layout: Left = Google Map (45%), Right = ONE single contact card (55%) */}
        <div className={styles.contactLayout}>
          {/* LEFT COLUMN: Working Google Map with exact campus location */}
          <div className={styles.mapColumn}>
            <div className={styles.mapWrapper}>
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                className={styles.mapIframe}
                loading="lazy"
                title="Google Maps location of Dr. M.G.R. Educational and Research Institute"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Fallback & quick-access link for verified campus location */}
              <div className={styles.mapFooterBar}>
                <div className={styles.mapFooterText}>
                  <MapPin size={14} className={styles.goldIcon} aria-hidden="true" />
                  <span>Dr. M.G.R. Campus (13.069378, 80.1779609)</span>
                </div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapDirectLink}
                  aria-label="Open location directly in Google Maps"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ONE SINGLE CONTACT BOX containing all 4 sections separated by thin lines */}
          <div className={styles.singleContactCard}>
            {/* SECTION A: Event Coordinators & Contact */}
            <div className={styles.cardSection}>
              <h3 className={styles.sectionHeading}>
                <Phone size={16} className={styles.goldIcon} aria-hidden="true" />
                <span>Event Coordinators &amp; Contact</span>
              </h3>
              <div className={styles.coordinatorsList}>
                {coordinators.map((coordinator, idx) => (
                  <div key={idx} className={styles.coordinatorRow}>
                    <span className={styles.coordinatorName}>{coordinator.name}</span>
                    <a
                      href={`tel:${coordinator.tel}`}
                      className={styles.phoneLink}
                      aria-label={`Call coordinator ${coordinator.name} at ${coordinator.phone}`}
                    >
                      <Phone size={12} className={styles.goldIcon} aria-hidden="true" />
                      <span>{coordinator.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Thin subtle gold divider line */}
            <div className={styles.sectionDivider} />

            {/* SECTION B: Email */}
            <div className={styles.cardSection}>
              <h3 className={styles.sectionHeading}>
                <Mail size={16} className={styles.goldIcon} aria-hidden="true" />
                <span>Email</span>
              </h3>
              <a
                href="mailto:techvistra@drmgrdu.ac.in"
                className={styles.emailTextLink}
                aria-label="Send email to techvistra@drmgrdu.ac.in"
              >
                <span>techvistra@drmgrdu.ac.in</span>
                <ArrowUpRight size={14} className={styles.linkArrow} aria-hidden="true" />
              </a>
            </div>

            {/* Thin subtle gold divider line */}
            <div className={styles.sectionDivider} />

            {/* SECTION C: Address */}
            <div className={styles.cardSection}>
              <h3 className={styles.sectionHeading}>
                <MapPin size={16} className={styles.goldIcon} aria-hidden="true" />
                <span>Address</span>
              </h3>
              <address className={styles.addressBlock}>
                <strong className={styles.institutionName}>
                  Dr. MGR Educational and Research Institute
                </strong>
                <span className={styles.addressLine}>
                  Poonamallee High Rd, Vishwas Nagar, Maduravoyal, Chennai
                </span>
                <span className={styles.addressLine}>Tamil Nadu - 600095</span>
              </address>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapTextLink}
                aria-label="Open Dr. M.G.R. Educational and Research Institute in Google Maps"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

            {/* Thin subtle gold divider line */}
            <div className={styles.sectionDivider} />

            {/* SECTION D: Follow Us */}
            <div className={styles.cardSection}>
              <h3 className={styles.sectionHeading}>
                <span>Follow Us</span>
              </h3>
              <a
                href={effectiveFacebookUrl || "#"}
                target={effectiveFacebookUrl ? "_blank" : undefined}
                rel={effectiveFacebookUrl ? "noopener noreferrer" : undefined}
                onClick={!effectiveFacebookUrl ? (e) => e.preventDefault() : undefined}
                className={styles.facebookRow}
                aria-label="Follow Techvistra on Facebook"
                title={
                  effectiveFacebookUrl
                    ? "Visit Techvistra on Facebook"
                    : "Paste Facebook URL in FACEBOOK_PAGE_URL at top of ContentSections.tsx"
                }
              >
                <div className={styles.facebookCircle}>
                  <Facebook size={16} aria-hidden="true" />
                </div>
                <div className={styles.facebookMeta}>
                  <span className={styles.facebookName}>Facebook</span>
                  <span className={styles.facebookStatus}>
                    {effectiveFacebookUrl
                      ? "Visit Official Page"
                      : "Official link can be added here"}
                  </span>
                </div>
                {effectiveFacebookUrl && (
                  <ExternalLink size={13} className={styles.linkArrow} aria-hidden="true" />
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
