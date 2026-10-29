import { useEffect, useRef } from "react";

interface UseScrollSequenceOptions {
  /** Number of [data-reveal] items inside the section (re-runs the setup if it changes). */
  itemCount: number;
  /** Fraction of the scroll distance to wait before the first item starts. */
  lead?: number;
  /** Fraction of the scroll distance left at the end after the last item finishes. */
  tail?: number;
  /** Fraction of an item's animation that overlaps with the next item (0–0.9). */
  overlap?: number;
  /** 0–1 smoothing per frame (higher = more responsive, lower = floatier). */
  smoothing?: number;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Scroll-linked sequence with mathematically aligned windows and smooth interpolation.
 */
export function useScrollSequence<T extends HTMLElement = HTMLElement>({
  itemCount,
  lead = 0.02,
  tail = 0.04,
  overlap = 0.45,
  smoothing = 0.26,
}: UseScrollSequenceOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const n = items.length;
    if (n === 0) return;

    const target: number[] = new Array(n).fill(0);
    const current: number[] = new Array(n).fill(0);
    let raf = 0;

    const apply = (i: number) => {
      const el = items[i];
      el.style.setProperty("--r", easeOutCubic(current[i]).toFixed(4));
      el.dataset.ready = String(current[i] > 0.95);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((_, i) => {
        current[i] = 1;
        apply(i);
      });
      return;
    }

    // Mathematically exact window calculations:
    // Item 0 starts at lead, item n-1 finishes precisely at 1 - tail.
    // Each item has duration `windowSize`, and consecutive items are spaced by `step`.
    const available = Math.max(0.1, 1 - lead - tail);
    const safeOverlap = Math.min(0.85, Math.max(0, overlap));
    const denom = 1 + (n - 1) * (1 - safeOverlap);
    const windowSize = available / denom;
    const step = windowSize * (1 - safeOverlap);

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? clamp01(-rect.top / travel) : 1;
      for (let i = 0; i < n; i++) {
        const start = lead + i * step;
        target[i] = clamp01((p - start) / windowSize);
      }
    };

    const tick = () => {
      let moving = false;
      for (let i = 0; i < n; i++) {
        const delta = target[i] - current[i];
        if (Math.abs(delta) > 0.0005) {
          current[i] += delta * smoothing;
          moving = true;
        } else {
          current[i] = target[i];
        }
        apply(i);
      }
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [itemCount, lead, tail, overlap, smoothing]);

  return ref;
}
