import { useEffect, useRef } from "react";

interface UseTiltOptions {
  /** Max rotation in degrees on each axis. */
  maxTilt?: number;
  /** Scale applied while hovered. */
  scale?: number;
  /** 0–1 smoothing factor per frame (lower = floatier). */
  ease?: number;
  disabled?: boolean;
}

interface TiltState {
  rx: number; // rotateX (deg)
  ry: number; // rotateY (deg)
  s: number;  // scale
  mx: number; // pointer x in % (for the spotlight)
  my: number; // pointer y in %
}

/**
 * Pointer-driven 3D tilt. Writes CSS variables (--rx, --ry, --s, --mx, --my)
 * onto the element and toggles `data-hover`, so all the visuals live in CSS.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  maxTilt = 7,
  scale = 1.025,
  ease = 0.14,
  disabled = false,
}: UseTiltOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const noHover = window.matchMedia("(hover: none)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduceMotion) return;

    const target: TiltState = { rx: 0, ry: 0, s: 1, mx: 50, my: 50 };
    const current: TiltState = { ...target };
    let raf = 0;

    const render = () => {
      el.style.setProperty("--rx", `${current.rx.toFixed(3)}deg`);
      el.style.setProperty("--ry", `${current.ry.toFixed(3)}deg`);
      el.style.setProperty("--s", current.s.toFixed(4));
      el.style.setProperty("--mx", `${current.mx.toFixed(2)}%`);
      el.style.setProperty("--my", `${current.my.toFixed(2)}%`);
    };

    const tick = () => {
      let moving = false;
      (Object.keys(target) as (keyof TiltState)[]).forEach((k) => {
        const delta = target[k] - current[k];
        if (Math.abs(delta) > 0.001) {
          current[k] += delta * ease;
          moving = true;
        } else {
          current[k] = target[k];
        }
      });
      render();
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      el.dataset.hover = "true";
      target.s = scale;
      kick();
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;  // 0 → 1
      const py = (e.clientY - rect.top) / rect.height;  // 0 → 1
      target.ry = (px - 0.5) * 2 * maxTilt;   // left/right
      target.rx = -(py - 0.5) * 2 * maxTilt;  // up/down
      target.mx = px * 100;
      target.my = py * 100;
      target.s = scale;
      kick();
    };

    const onLeave = () => {
      delete el.dataset.hover;
      target.rx = 0;
      target.ry = 0;
      target.s = 1;
      kick();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [maxTilt, scale, ease, disabled]);

  return ref;
}
