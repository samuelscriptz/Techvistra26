import { useEffect, useRef, useState } from "react";
import styles from "./EventSection.module.css";

// ---------------------------------------------------------------------------
// Events per tab. Replace titles / images / regUrls with the real ones.
// Senior Technical: 5 cards, Senior Non-Technical: 5 cards, Junior: 8 cards.
// ---------------------------------------------------------------------------
export interface EventItem {
  id: number;
  title: string;
  image: string;
  regUrl: string;
}

export interface EventTab {
  key: string;
  label: string; // shown on desktop / tablet
  short: string; // shown on mobile (keeps the 3 buttons on one tidy row)
  items: EventItem[];
}

// Default placeholder images from Framer CDN (used until replaced with real posters)
const IMG = "https://framerusercontent.com/images/";
const IMAGES = [
  "N7Y4BH5eKgVbSmG1yTRK9i0GUUQ.jpg?width=736&height=1308",
  "MiW6JiHcCDZ1LyaDXTG4hychXQs.jpg?width=1080&height=1438",
  "TaZp9mBPNQ337Ni3gNXA4UrX7BY.jpg?width=736&height=1308",
  "Xx6FqPaPHfQhhl49IX1ncHL48vw.jpg?width=736&height=977",
  "n2GvvsAaCN0wfzq8V8CuCaqPqmo.jpg?width=816&height=1456",
  "3JSsmNTZ7ENPQPIrzQAbjRCNDw.jpg?width=1200&height=2141",
  "c4I4sAxTGlzETJTTbBc2JFFSsaw.jpg?width=735&height=761",
  "pGTHvY23mIKlxKFELGXoKJe0at0.jpg?width=1080&height=1350",
].map((f) => IMG + f);

// ---------------------------------------------------------------------------
// EVENTS DATA:
// To add or update an event poster manually:
// 1. Put your image in the `public/` directory (e.g. `public/my-event.jpeg`).
// 2. Set `image: "/my-event.jpeg"`.
// 3. Set `title: "Your Event Title"`.
// 4. Set `regUrl: "your-registration-link-or-form-url"`.
// ---------------------------------------------------------------------------

const SENIOR_TECHNICAL_EVENTS: EventItem[] = [
  { id: 1, title: "Senior Technical 1", image: IMAGES[0], regUrl: "register.html?event=senior-technical-1" },
  { id: 2, title: "Senior Technical 2", image: IMAGES[1], regUrl: "register.html?event=senior-technical-2" },
  { id: 3, title: "Senior Technical 3", image: IMAGES[2], regUrl: "register.html?event=senior-technical-3" },
  { id: 4, title: "Senior Technical 4", image: IMAGES[3], regUrl: "register.html?event=senior-technical-4" },
  { id: 5, title: "Senior Technical 5", image: IMAGES[4], regUrl: "register.html?event=senior-technical-5" },
];

const SENIOR_NON_TECHNICAL_EVENTS: EventItem[] = [
  { id: 1, title: "Senior Non-Technical 1", image: IMAGES[5], regUrl: "register.html?event=senior-non-technical-1" },
  { id: 2, title: "Senior Non-Technical 2", image: IMAGES[6], regUrl: "register.html?event=senior-non-technical-2" },
  { id: 3, title: "Senior Non-Technical 3", image: IMAGES[7], regUrl: "register.html?event=senior-non-technical-3" },
  { id: 4, title: "Senior Non-Technical 4", image: IMAGES[0], regUrl: "register.html?event=senior-non-technical-4" },
  { id: 5, title: "Senior Non-Technical 5", image: IMAGES[1], regUrl: "register.html?event=senior-non-technical-5" },
];

const JUNIOR_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Pixel Paradox",
    image: "/pixel paradox.jpeg",
    regUrl: "register.html?event=pixel-paradox",
  },
  { id: 2, title: "Junior Event 2", image: IMAGES[1], regUrl: "register.html?event=junior-2" },
  { id: 3, title: "Junior Event 3", image: IMAGES[2], regUrl: "register.html?event=junior-3" },
  { id: 4, title: "Junior Event 4", image: IMAGES[3], regUrl: "register.html?event=junior-4" },
  { id: 5, title: "Junior Event 5", image: IMAGES[4], regUrl: "register.html?event=junior-5" },
  { id: 6, title: "Junior Event 6", image: IMAGES[5], regUrl: "register.html?event=junior-6" },
  { id: 7, title: "Junior Event 7", image: IMAGES[6], regUrl: "register.html?event=junior-7" },
  { id: 8, title: "Junior Event 8", image: IMAGES[7], regUrl: "register.html?event=junior-8" },
];

export const EVENT_TABS: EventTab[] = [
  { key: "senior-technical", label: "Senior Technical Events", short: "Senior Tech", items: SENIOR_TECHNICAL_EVENTS },
  { key: "senior-non-technical", label: "Senior Non-Technical Events", short: "Senior Non-Tech", items: SENIOR_NON_TECHNICAL_EVENTS },
  { key: "junior", label: "Junior Events", short: "Junior", items: JUNIOR_EVENTS },
];

// How much page scroll it takes to move from one card to the next (in % of screen height).
const SCROLL_VH_PER_CARD = 70;
const SCROLL_VH_PER_CARD_MOBILE = 60;
// Gentle always-on sway, in cards (0 = off). Keeps the carousel feeling alive without changing which card is in front.
const AMBIENT = 0.15;

// Geometry measured from the recording, in units of a 960x457 frame (desktop / tablet).
const K_DESKTOP = {
  xR: [0, 145, 240, 390, 520], xL: [0, 160, 250, 410, 540],
  sc: [1, 0.62, 0.56, 0.52, 0.45],
  yb: [0, 25, 25, 30, 35],
  rR: [0, 5, 3, 7, 8], rL: [0, 3, 5, 8, 10],
  oR: [1, 0.85, 0.7, 0.6, 0.35], oL: [1, 0.7, 0.7, 0.6, 0.35],
};

// Mobile geometry: same look, but the side cards sit closer so the big front card fits a phone screen.
// Units are of a 320px-wide frame (see MOBILE_REF_W).
const K_MOBILE = {
  xR: [0, 118, 185, 250, 300], xL: [0, 118, 185, 250, 300],
  sc: [1, 0.66, 0.55, 0.48, 0.42],
  yb: [0, 18, 22, 26, 30],
  rR: [0, 5, 3, 7, 8], rL: [0, 3, 5, 8, 10],
  oR: [1, 0.8, 0.6, 0.5, 0.3], oL: [1, 0.8, 0.6, 0.5, 0.3],
};

const ACTIVE_W = 150;
const ACTIVE_H = 267;
const CARD_SCALE = 1.3; // must match the 1.3 used in the CSS (.card width/height)
const MOBILE_REF_W = 320; // on mobile, the front card is ~61% of the screen width
const TITLE_SPACE = 52; // px kept free under the front card for its title (mobile sizing)

const lerp = (arr: number[], a: number): number => {
  const i = Math.min(3, Math.floor(a));
  const t = Math.min(1, a - i);
  return arr[i] + (arr[i + 1] - arr[i]) * t;
};

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export default function EventSection() {
  const [tab, setTab] = useState(0);
  const [active, setActive] = useState(0);
  const items = EVENT_TABS[tab].items;
  const mobile = useMediaQuery("(max-width: 768px)");

  const wrapRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const s = useRef({
    view: 0, lean: 0, mx: 0, my: 0, pmx: 0, pmy: 0, lastView: 0,
    extra: 0, vel: 0, dragging: false, lastX: 0, lastT: 0, U: 1, active: 0,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !stage || !sticky) return;
    const st = s.current;
    const N = items.length;
    const K = mobile ? K_MOBILE : K_DESKTOP;

    // The cursor-follow (parallax) effect is only for devices with a real mouse on larger screens.
    const parallax =
      !mobile && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Fresh start for the selected tab: first card in front, no leftover drag.
    st.extra = 0;
    st.vel = 0;
    st.dragging = false;
    st.active = 0;
    setActive(0);

    // 0 → N-1 across the pinned scroll distance (card 1 in front → card N in front).
    const scrollPos = () => {
      const r = wrap.getBoundingClientRect();
      const total = r.height - sticky.clientHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      return p * (N - 1);
    };

    const resize = () => {
      const r = stage.getBoundingClientRect();
      st.U = mobile
        ? Math.min(r.width / MOBILE_REF_W, (r.height - TITLE_SPACE) / (ACTIVE_H * CARD_SCALE + 10))
        : Math.min(r.width / 960, r.height / 457);
      stage.style.setProperty("--u", String(st.U));
      cardRefs.current.forEach((c) => {
        if (!c) return;
        c.style.setProperty("--w", ACTIVE_W * st.U + "px");
        c.style.setProperty("--h", ACTIVE_H * st.U + "px");
      });
    };

    const render = () => {
      const { view, lean, U } = st;
      cardRefs.current.forEach((c, k) => {
        if (!c) return;
        const d = ((((k - view) % N) + N * 1.5) % N) - N / 2; // signed, wrapped: a true loop
        const a = Math.abs(d);
        const R = d >= 0;
        const swing = a < 1 ? Math.sin(Math.PI * d) : 0;
        const x = (R ? 1 : -1) * lerp(R ? K.xR : K.xL, a);
        const y = lerp(K.yb, a) - 45 * swing;
        const sc = lerp(K.sc, a);
        const rz = (R ? 1 : -1) * lerp(R ? K.rR : K.rL, a) + 12 * swing;
        const cl = Math.max(-2.5, Math.min(2.5, d));
        const ry = -34 * Math.sin((cl * Math.PI) / 5) + lean * -4;
        const rx = swing * -9;
        const z = (-a * 150 + (1 - Math.min(1, a)) * 70) * U;
        // Fade the card that is about to wrap to the other side so it never visibly pops.
        const wrapFade = Math.max(0, Math.min(1, (N / 2 - a) / 0.4));
        c.style.transform = `translate3d(${x * U}px,${y * U}px,${z}px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz + lean * 2}deg) scale(${sc})`;
        c.style.opacity = String(lerp(R ? K.oR : K.oL, a) * wrapFade);
        c.style.zIndex = String(100 - Math.round(a * 10));
      });
    };

    let prev = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      if (!st.dragging) {
        st.extra += st.vel; // flick momentum
        st.vel *= 0.94;
        st.extra *= Math.exp(-dt * 0.9); // drag offset glides back so scroll stays the source of truth
      }
      const sp = scrollPos();
      const sway = Math.sin(now / 1800) * AMBIENT;
      const target = sp + st.extra + sway;

      // Keep the arrows / counter in sync with the card that is currently in front.
      const idx = Math.round(sp);
      if (idx !== st.active) {
        st.active = idx;
        setActive(idx);
      }

      st.view += (target - st.view) * (1 - Math.exp(-dt * 10));
      const v = dt ? (st.view - st.lastView) / dt : 0;
      st.lastView = st.view;
      st.lean += (Math.max(-2, Math.min(2, v)) - st.lean) * Math.min(1, dt * 6);
      if (parallax) {
        st.pmx += (st.mx - st.pmx) * Math.min(1, dt * 5);
        st.pmy += (st.my - st.pmy) * Math.min(1, dt * 5);
        stage.style.perspectiveOrigin = `${50 + st.pmx * 9}% ${50 + st.pmy * 9}%`;
      }
      render();
      raf = requestAnimationFrame(tick);
    };

    const onWindowPointerMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      st.mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      st.my = ((e.clientY - r.top) / r.height) * 2 - 1;
    };

    // Vertical wheel = normal page scroll (which drives the carousel).
    // Only horizontal trackpad swipes are captured, to peek at neighbouring cards.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        st.vel += e.deltaX / 2500;
      }
    };

    // No cursor effect on mobile / touch: keep the view perfectly centred.
    st.pmx = st.pmy = st.mx = st.my = 0;
    stage.style.perspectiveOrigin = "50% 50%";

    resize();
    st.view = st.lastView = scrollPos(); // correct card even if the page loads mid-scroll
    render();
    stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: "ease-out" });
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    if (parallax) window.addEventListener("pointermove", onWindowPointerMove);
    stage.addEventListener("wheel", onWheel, { passive: false });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onWindowPointerMove);
      stage.removeEventListener("wheel", onWheel);
    };
  }, [tab, items, mobile]);

  // Switch tab in place (no navigation). If the section is pinned, reset the scroll to the start of the
  // pin first, so the new set always begins on its first card and the screen doesn't visibly move.
  const selectTab = (i: number) => {
    if (i === tab) return;
    const wrap = wrapRef.current;
    if (wrap) {
      const r = wrap.getBoundingClientRect();
      if (r.top < 0) window.scrollTo({ top: window.scrollY + r.top, behavior: "instant" as ScrollBehavior });
    }
    setTab(i);
  };

  // Arrow buttons: scroll the page to the exact spot where the chosen card is in front.
  const goTo = (i: number) => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    const N = items.length;
    if (!wrap || !sticky || N < 2) return;
    const next = Math.max(0, Math.min(N - 1, i));
    const total = wrap.offsetHeight - sticky.clientHeight;
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: wrapTop + (next / (N - 1)) * total, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(`.${styles.reg}`)) return;
    const st = s.current;
    st.dragging = true;
    st.lastX = e.clientX;
    st.lastT = performance.now();
    st.vel = 0;
    stageRef.current?.classList.add(styles.drag);
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = s.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    const dt = Math.max(1, performance.now() - st.lastT);
    const dp = -dx / (150 * st.U);
    st.extra += dp;
    st.vel = dp * (16 / dt) * 0.9;
    st.lastX = e.clientX;
    st.lastT = performance.now();
  };

  const endDrag = () => {
    s.current.dragging = false;
    stageRef.current?.classList.remove(styles.drag);
  };

  const perCard = mobile ? SCROLL_VH_PER_CARD_MOBILE : SCROLL_VH_PER_CARD;
  const scrollLength = `${(items.length - 1) * perCard}vh`;

  return (
    <section
      ref={wrapRef}
      id="events"
      className={styles.wrap}
      style={{ "--scroll": scrollLength } as React.CSSProperties}
      aria-label="Events"
    >
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.top}>
          <h2 className={styles.heading}>Events</h2>
          <div className={styles.tabs} role="tablist" aria-label="Event categories">
            {EVENT_TABS.map((t, i) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={i === tab}
                aria-label={t.label}
                className={`${styles.tab} ${i === tab ? styles.tabActive : ""}`}
                onClick={() => selectTab(i)}
              >
                <span className={styles.tabFull}>{t.label}</span>
                <span className={styles.tabShort}>{t.short}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={stageRef}
          className={styles.stage}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {items.map((item, idx) => (
            <div
              key={`${tab}-${item.id}`}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className={styles.card}
            >
              <div className={styles.media}>
                <img src={item.image} alt={item.title} draggable={false} />
                <a href={item.regUrl} className={styles.reg}>Register now</a>
              </div>
              <div className={styles.title}>{item.title}</div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active - 1)}
            disabled={active <= 0}
            aria-label="Previous event"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <div className={styles.counter} aria-live="polite">
            <span className={styles.counterNow}>{active + 1}</span> / {items.length}
          </div>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active + 1)}
            disabled={active >= items.length - 1}
            aria-label="Next event"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}