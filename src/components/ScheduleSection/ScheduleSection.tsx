import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { schedule, dayLabels, TBC, type Category, type Level } from "./scheduleData";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./ScheduleSection.css";

type Filter = "All" | Category;

const LEVELS: Level[] = ["Junior", "Senior"];
const FILTERS: Filter[] = ["All", "Technical", "Non-Technical"];

const toMinutes = (t: string) => {
  const [hm, ap] = t.split(" ");
  const [h, m] = hm.split(":").map(Number);
  return ((h % 12) + (ap === "PM" ? 12 : 0)) * 60 + m;
};

const css = (vars: Record<string, string | number>) => vars as CSSProperties;

export default function ScheduleSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const rootRef = useRef<HTMLElement>(null);

  // One flat list of cards (a card = one time slot of one level), grouped by day and sorted by time.
  const days = useMemo(() => {
    const all = LEVELS.flatMap((level) =>
      schedule[level].flatMap((d) => d.slots.map((s) => ({ ...s, level, day: d.day })))
    );
    const nums = Array.from(new Set(all.map((c) => c.day))).sort((a, b) => a - b);
    return nums.map((day) => ({
      day,
      cards: all
        .filter((c) => c.day === day)
        .sort((a, b) => toMinutes(a.start) - toMinutes(b.start) || a.level.localeCompare(b.level)),
    }));
  }, []);

  const visible = useMemo(
    () =>
      days
        .map(({ day, cards }) => ({
          day,
          cards: cards
            .map((c) => ({ ...c, events: c.events.filter((e) => filter === "All" || e.category === filter) }))
            .filter((c) => c.events.length > 0),
        }))
        .filter((d) => d.cards.length > 0),
    [days, filter]
  );

  // Scroll reveal: add "is-in" the first time an element enters the viewport.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  // Scroll-linked effects: backdrop drift (--p) and the gold timeline line filling up (--prog).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = root.getBoundingClientRect();
      root.style.setProperty("--p", String(clamp((vh - r.top) / (vh + r.height))));
      root.querySelectorAll<HTMLElement>(".cards").forEach((c) => {
        const cr = c.getBoundingClientRect();
        // The line follows a point ~65% down the screen. As the list's bottom comes into view the
        // point eases down to the bottom edge, so the line and the last ring always finish.
        const anchor = vh * 0.65 + vh * 0.35 * clamp((vh * 1.35 - cr.bottom) / (vh * 0.35));
        const prog = clamp((anchor - cr.top) / cr.height);
        c.style.setProperty("--prog", prog.toFixed(3));
        // fill each ring once the gold line has reached it
        const fillY = cr.top + prog * cr.height;
        c.querySelectorAll<HTMLElement>(".card").forEach((card) => {
          card.classList.toggle("is-reached", card.getBoundingClientRect().top + 24 <= fillY);
        });
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [filter]);

  return (
    <section ref={rootRef} className="sched" id="schedule" aria-labelledby="schedule-title">
      <div className="sched__dots" aria-hidden="true" />
      <div className="sched__inner">
        <SectionTitle
          id="schedule-title"
          title="SCHEDULE"
          className="sched__title"
        />

        <div className="pills" role="group" aria-label="Filter by category">
          {FILTERS.map((f) => (
            <button key={f} className="pill" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        {visible.length === 0 && <p className="sched__empty">No events match this filter.</p>}

        {/* key={filter} remounts the list so the entrance animations replay on every filter change */}
        <div key={filter}>
          {visible.map(({ day, cards }) => (
            <div className="day" key={day}>
              <h3 className="day__title" data-reveal>
                {dayLabels[day] ?? `Day ${day}`}
              </h3>
              <ol className="cards">
                {cards.map((c, i) => (
                  <li
                    className="card"
                    data-reveal
                    key={`${c.level}-${c.start}`}
                    style={css({ "--d": `${Math.min(i, 4) * 70}ms` })}
                  >
                    <div className="card__head">
                      <span className="card__time">
                        {c.start} – {c.end}
                      </span>
                      <span className="card__level" data-level={c.level}>
                        {c.level}
                      </span>
                    </div>
                    <ul className="events">
                      {c.events.map((e) => (
                        <li className="event" key={e.name}>
                          <h4>{e.name}</h4>
                          <div className="event__meta">
                            <span className="tag" data-kind={e.category === "Technical" ? "tech" : "non"}>
                              {e.category}
                            </span>
                            <span className={`venue${e.venue === TBC ? " is-tbc" : ""}`}>
                              <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                                <path
                                  d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5C3.5 9.5 8 14.5 8 14.5s4.5-5 4.5-8.5A4.5 4.5 0 0 0 8 1.5Zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Z"
                                  fill="currentColor"
                                />
                              </svg>
                              {e.venue}
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
