import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  CircleHelp,
  ExternalLink,
  FileText,
  IndianRupee,
  Laptop,
  Mail,
  MapPin,
  Plus,
  Phone,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { eventConfig, isPlaceholder } from "../../config/eventConfig";
import SectionTitle from "../SectionTitle/SectionTitle";
import AboutEvent from "../AboutEvent/AboutEvent";
import {
  dayLabels,
  schedule,
  TBC,
  type Category,
  type Level,
} from "../ScheduleSection/scheduleData";
import styles from "./Section.module.css";
import "../ScheduleSection/ScheduleSection.css";

type ScheduleFilter = "All" | Category;

const SCHEDULE_LEVELS: Level[] = ["Junior", "Senior"];
const SCHEDULE_FILTERS: ScheduleFilter[] = ["All", "Technical", "Non-Technical"];

const scheduleTimeToMinutes = (time: string) => {
  const [hm, period] = time.split(" ");
  const [hours, minutes] = hm.split(":").map(Number);
  return ((hours % 12) + (period === "PM" ? 12 : 0)) * 60 + minutes;
};

const scheduleCss = (
  vars: Record<string, string | number>
) => vars as CSSProperties;

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
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
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
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
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
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Cards stagger
        const cards = el.querySelectorAll(`.${styles.card}`);
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse",
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
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
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
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // About highlight cards reveal on scroll
        const aboutHighlights = el.querySelectorAll(`.${styles.aboutHighlight}`);
        if (aboutHighlights.length > 0) {
          gsap.set(aboutHighlights, {
            x: 40,
            opacity: 0,
          });

          const highlightTween = gsap.to(aboutHighlights, {
            x: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.18,
            ease: "power3.out",
            paused: true,
          });

          ScrollTrigger.create({
            trigger: el,
            start: "top 75%",
            end: "bottom 20%",
            onEnter: () => highlightTween.restart(),
            onEnterBack: () => highlightTween.restart(),
          });
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
  return <AboutEvent />;
}

export function ScheduleSection() {
  const [filter, setFilter] = useState<ScheduleFilter>("All");
  const rootRef = useRef<HTMLElement>(null);

  const days = useMemo(() => {
    const all = SCHEDULE_LEVELS.flatMap((level) =>
      schedule[level].flatMap((day) =>
        day.slots.map((slot) => ({ ...slot, level, day: day.day }))
      )
    );
    const dayNumbers = Array.from(new Set(all.map((card) => card.day))).sort(
      (a, b) => a - b
    );

    return dayNumbers.map((day) => ({
      day,
      cards: all
        .filter((card) => card.day === day)
        .sort(
          (a, b) =>
            scheduleTimeToMinutes(a.start) - scheduleTimeToMinutes(b.start) ||
            a.level.localeCompare(b.level)
        ),
    }));
  }, []);

  const visible = useMemo(
    () =>
      days
        .map(({ day, cards }) => ({
          day,
          cards: cards
            .map((card) => ({
              ...card,
              events: card.events.filter(
                (event) => filter === "All" || event.category === filter
              ),
            }))
            .filter((card) => card.events.length > 0),
        }))
        .filter((day) => day.cards.length > 0),
    [days, filter]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let animationFrame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const update = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      const sectionRect = root.getBoundingClientRect();
      root.style.setProperty(
        "--p",
        String(
          clamp(
            (viewportHeight - sectionRect.top) /
              (viewportHeight + sectionRect.height)
          )
        )
      );

      root.querySelectorAll<HTMLElement>(".cards").forEach((cards) => {
        const cardsRect = cards.getBoundingClientRect();
        const anchor =
          viewportHeight * 0.65 +
          viewportHeight *
            0.35 *
            clamp(
              (viewportHeight * 1.35 - cardsRect.bottom) /
                (viewportHeight * 0.35)
            );
        const progress = clamp((anchor - cardsRect.top) / cardsRect.height);
        cards.style.setProperty("--prog", progress.toFixed(3));
        const fillY = cardsRect.top + progress * cardsRect.height;

        cards.querySelectorAll<HTMLElement>(".card").forEach((card) => {
          card.classList.toggle(
            "is-reached",
            card.getBoundingClientRect().top + 24 <= fillY
          );
        });
      });
    };
    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [filter]);

  return (
    <section
      ref={rootRef}
      className="sched"
      id="schedule"
      aria-labelledby="schedule-title"
    >
      <div className="sched__dots" aria-hidden="true" />
      <div className="sched__inner">
        <SectionTitle
          id="schedule-title"
          title="SCHEDULE"
          className="sched__title"
        />

        <div className="pills" role="group" aria-label="Filter by category">
          {SCHEDULE_FILTERS.map((category) => (
            <button
              key={category}
              className="pill"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="sched__empty">No events match this filter.</p>
        )}

        <div key={filter}>
          {visible.map(({ day, cards }) => (
            <div className="day" key={day}>
              <h3 className="day__title" data-reveal>
                {dayLabels[day] ?? `Day ${day}`}
              </h3>
              <ol className="cards">
                {cards.map((card, index) => (
                  <li
                    className="card"
                    data-reveal
                    key={`${card.level}-${card.start}`}
                    style={scheduleCss({
                      "--d": `${Math.min(index, 4) * 70}ms`,
                    })}
                  >
                    <div className="card__head">
                      <span className="card__time">
                        {card.start} – {card.end}
                      </span>
                      <span className="card__level" data-level={card.level}>
                        {card.level}
                      </span>
                    </div>
                    <ul className="events">
                      {card.events.map((event) => (
                        <li className="event" key={event.name}>
                          <h4>{event.name}</h4>
                          <div className="event__meta">
                            <span
                              className="tag"
                              data-kind={
                                event.category === "Technical" ? "tech" : "non"
                              }
                            >
                              {event.category}
                            </span>
                            <span
                              className={`venue${event.venue === TBC ? " is-tbc" : ""}`}
                            >
                              <svg
                                viewBox="0 0 16 16"
                                width="13"
                                height="13"
                                aria-hidden="true"
                              >
                                <path
                                  d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5C3.5 9.5 8 14.5 8 14.5s4.5-5 4.5-8.5A4.5 4.5 0 0 0 8 1.5Zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Z"
                                  fill="currentColor"
                                />
                              </svg>
                              {event.venue}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          ))}
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
        <SectionTitle
          id="program-title"
          title="Tracks & Experiences"
          className={styles.sectionTitle}
        />
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

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const faqIcons = [Users, FileText, IndianRupee, Laptop, Trophy];

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={styles.faqSection}
      aria-labelledby="faq-heading"
    >
      <div className={styles.faqDecorations} aria-hidden="true">
        <span className={`${styles.faqDecoration} ${styles.faqLeftRing}`} />
        <span className={`${styles.faqDecoration} ${styles.faqLeftOrb}`} />
        <span className={`${styles.faqDecoration} ${styles.faqCenterOrb}`} />
        <span className={`${styles.faqDecoration} ${styles.faqRightOrb}`} />
        <span className={`${styles.faqDecoration} ${styles.faqRightRing}`} />
        <span className={`${styles.faqDecoration} ${styles.faqBottomRing}`} />
      </div>
      <div className={styles.faqInner}>
        <div className={styles.faqIntro}>
          <span className={styles.faqEyebrow}>Techvistra '26 / Q-Vortex</span>
          <SectionTitle
            id="faq-heading"
            title="FAQ"
            className={styles.faqTitle}
          />
          <h3 className={styles.faqSubtitle}>
            Everything
            <br />
            You <span>Need to Know</span>
          </h3>
          <p className={styles.faqDescription}>
            Explore answers to frequently asked questions about TechVistra '26
            – Q-Vortex.
          </p>
          {!isPlaceholder(eventConfig.contactEmail) && (
            <a
              className={styles.faqContact}
              href={`mailto:${eventConfig.contactEmail}`}
            >
              Still have a question?
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
        </div>

        <div className={styles.faqList}>
          {eventConfig.faq.map((item, i) => {
            const Icon = faqIcons[i] ?? CircleHelp;
            const isActive = activeFaq === i;

            return (
              <article
                className={`${styles.faqItem} ${isActive ? styles.faqItemActive : ""}`}
                key={item.question}
                onPointerEnter={() => setActiveFaq(i)}
                onPointerLeave={(event) => {
                  if (!event.currentTarget.contains(document.activeElement)) {
                    setActiveFaq(null);
                  }
                }}
                onFocus={() => setActiveFaq(i)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setActiveFaq(null);
                  }
                }}
              >
                <button
                  type="button"
                  className={styles.faqQuestion}
                  aria-expanded={isActive}
                >
                  <span className={styles.faqIcon} aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className={styles.faqQuestionText}>{item.question}</span>
                  <Plus
                    className={styles.faqExpandIcon}
                    size={20}
                    aria-hidden="true"
                  />
                </button>
                <div className={styles.faqAnswer}>{item.answer}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const revealStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = revealStageRef.current;
    const section = stage?.parentElement;
    if (!stage || !section) return;

    let media: ReturnType<typeof import("gsap").default.matchMedia> | undefined;
    let cancelled = false;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const prompt = stage.querySelector(`.${styles.revealPrompt}`);
      const hero = stage.querySelector(`.${styles.revealHero}`);
      if (!prompt || !hero) return;

      media = gsap.matchMedia(section);
      media.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => {
          const animation = gsap.context(() => {
            const reveal = gsap.timeline({
              scrollTrigger: {
                trigger: stage,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });

            reveal
              .to(
                prompt,
                {
                  yPercent: -35,
                  autoAlpha: 0,
                  filter: "blur(8px)",
                  ease: "none",
                  duration: 0.45,
                },
                0
              )
              .fromTo(
                hero,
                {
                  yPercent: 12,
                  clipPath: "inset(100% 0 0 0)",
                  autoAlpha: 0,
                },
                {
                  yPercent: 0,
                  clipPath: "inset(0% 0 0 0)",
                  autoAlpha: 1,
                  ease: "none",
                  duration: 0.65,
                },
                0.2
              );
          }, section);

          return () => animation.revert();
        }
      );

      ScrollTrigger.refresh();
    };

    init();
    return () => {
      cancelled = true;
      media?.revert();
    };
  }, []);

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
  const facebookUrl =
    FACEBOOK_PAGE_URL.trim() || eventConfig.facebookUrl?.trim() || "";

  return (
    <section
      id="contact"
      className={styles.contactSection}
      aria-labelledby="contact-title"
    >
      <div ref={revealStageRef} className={styles.contactRevealStage}>
        <div className={styles.revealPrompt}>
          <span className={styles.revealPromptText}>Scroll down to reveal</span>
          <span className={styles.revealLine} aria-hidden="true">
            <span className={styles.revealLineIndicator} />
          </span>
        </div>
        <div className={styles.revealHero}>
          <p className={styles.revealEyebrow}>
            {eventConfig.edition} <span aria-hidden="true">/</span> Q-Vortex
          </p>
          <SectionTitle
            id="contact-title"
            title="Ready to Connect?"
            className={styles.contactHeroTitle}
          />
          <p className={styles.revealDescription}>
            Be part of TechVistra Q-Vortex. Reach out to our event coordinators
            for symposium and campus information.
          </p>
          {!isPlaceholder(eventConfig.contactEmail) && (
            <a
              href={`mailto:${eventConfig.contactEmail}`}
              className={styles.revealCta}
            >
              Contact the organizers
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className={styles.contactDetails}>
        <div className={styles.contactDetailColumn}>
          <h3 className={styles.contactColumnHeading}>
            <span className={styles.contactHeadingIcon}>
              <MapPin size={15} aria-hidden="true" />
            </span>
            <span>Find Us</span>
          </h3>
          <div className={styles.contactMap}>
            <iframe
              src={mapEmbedUrl}
              title="Map showing Dr. M.G.R. Educational and Research Institute"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <address className={styles.contactAddress}>
            <strong>Dr. M.G.R. Educational and Research Institute, Chennai</strong>
            <span>Poonamallee High Rd, Vishwas Nagar, Maduravoyal, Chennai</span>
            <span>Tamil Nadu - 600095</span>
          </address>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactMapLink}
          >
            Open in Google Maps
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>

        <div className={styles.contactDetailColumn}>
          <h3 className={styles.contactColumnHeading}>
            <span className={styles.contactHeadingIcon}>
              <Users size={15} aria-hidden="true" />
            </span>
            <span>Contact the Team</span>
          </h3>
          <div className={styles.contactTeamList}>
            {coordinators.map((coordinator) => (
              <div className={styles.contactTeamRow} key={coordinator.tel}>
                <span className={styles.contactPersonIcon}>
                  <UserRound size={15} aria-hidden="true" />
                </span>
                <span className={styles.contactPersonName}>{coordinator.name}</span>
                <a
                  href={`tel:${coordinator.tel}`}
                  className={styles.contactPhoneLink}
                  aria-label={`Call ${coordinator.name} at ${coordinator.phone}`}
                >
                  <Phone size={14} aria-hidden="true" />
                  <span>{coordinator.phone}</span>
                </a>
              </div>
            ))}
          </div>
          {!isPlaceholder(eventConfig.contactEmail) && (
            <a
              href={`mailto:${eventConfig.contactEmail}`}
              className={styles.contactEmailLink}
            >
              <Mail size={16} aria-hidden="true" />
              <span>{eventConfig.contactEmail}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          {eventConfig.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactSocialLink}
            >
              {link.label}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          ))}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactSocialLink}
            >
              Facebook
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
