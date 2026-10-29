import { useMemo, type CSSProperties, type ReactNode } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useScrollSequence } from "./hooks/useScrollSequence";
import { useTilt } from "./hooks/useTilt";
import "./EventsHosted.css";

type Tone = "dark" | "navy";
type Area = "tech" | "workshops" | "hack" | "dept";

export interface EventItem {
  id: string;
  number: string; // "01"
  title: string;
  /** Small label above the title. Defaults to "Event 01". */
  eyebrow?: string;
  description: ReactNode;
  area: Area;
  tone: Tone;
}

export const DEFAULT_EVENTS: EventItem[] = [
  { id: "tech", number: "01", title: "Technical Events", description: "Technical symposiums, competitions and innovation-driven events.", area: "tech", tone: "dark" },
  { id: "workshops", number: "02", title: "Workshops", description: "Hands-on learning sessions led by faculty and industry experts.", area: "workshops", tone: "navy" },
  { id: "hack", number: "03", title: "Hackathons", description: "Build, collaborate and ship solutions to real-world problems.", area: "hack", tone: "dark" },
  { id: "dept", number: "04", title: "Department Activities", description: "Cultural, sports and community events that bring everyone together.", area: "dept", tone: "navy" },
];

/* Deterministic pseudo-random so dots are stable between renders / SSR. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

interface EventCardProps {
  item: EventItem;
  index: number;
}

function EventCard({ item, index }: EventCardProps) {
  const tiltRef = useTilt<HTMLElement>({ maxTilt: 7, scale: 1.025 });

  // Tiny floating particles that wake up on hover.
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const seed = index * 100 + i;
        return {
          x: `${(rand(seed) * 92 + 4).toFixed(1)}%`,
          y: `${(rand(seed + 50) * 88 + 6).toFixed(1)}%`,
          size: `${(rand(seed + 9) * 2 + 1.5).toFixed(1)}px`,
          dur: `${(rand(seed + 21) * 3 + 3).toFixed(2)}s`,
          delay: `${(rand(seed + 33) * -4).toFixed(2)}s`,
        };
      }),
    [index]
  );

  return (
    <div
      className={`event-slot event-slot--${item.area}`}
      data-reveal
      data-reveal-direction={index % 2 === 0 ? "left" : "right"}
    >
      <article ref={tiltRef} className={`event-card event-card--${item.tone}`}>
        {/* Clipped background layer (kept separate so content can pop in 3D) */}
        <div className="event-card__bg" aria-hidden="true">
          <div className="event-card__spotlight" />
          {dots.map((d, i) => (
            <span
              key={i}
              className="event-card__dot"
              style={
                {
                  "--x": d.x,
                  "--y": d.y,
                  "--size": d.size,
                  "--dur": d.dur,
                  "--delay": d.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <span className="event-card__number">{item.number}</span>

        <div className="event-card__content">
          <span className="event-card__eyebrow">{item.eyebrow ?? `Event ${item.number}`}</span>
          <h3 className="event-card__title">{item.title}</h3>
          <p className="event-card__desc">{item.description}</p>
        </div>
      </article>
    </div>
  );
}

interface EventsHostedProps {
  id?: string;
  heading?: string;
  /** Optional short paragraph shown under the heading. */
  intro?: string;
  events?: EventItem[];
  /** Scroll distance (in vh) spent on each item. Bigger = slower sequence. */
  scrollPerItem?: number;
}

export default function EventsHosted({
  id = "about",
  heading = "ABOUT",
  intro,
  events = DEFAULT_EVENTS,
  scrollPerItem = 30,
}: EventsHostedProps) {
  const itemCount = events.length + (intro ? 1 : 0);
  const sectionRef = useScrollSequence<HTMLElement>({
    itemCount,
    lead: 0.02,
    tail: 0.04,
    overlap: 0.45,
    smoothing: 0.26,
  });

  return (
    <section
      id={id}
      ref={sectionRef}
      className="events-hosted"
      aria-labelledby="about-title"
      style={{ height: `${100 + itemCount * scrollPerItem}vh` }}
    >
      <div className="events__sticky">
        <SectionTitle
          id="about-title"
          title={heading}
          className="events__heading"
        />
        {intro && <p className="events__intro" data-reveal>{intro}</p>}

        <div className="events__grid">
          {events.map((item, i) => (
            <EventCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
