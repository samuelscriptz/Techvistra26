import { useEffect, useRef } from "react";
import "./SectionTitle.css";

interface SectionTitleProps {
  id: string;
  title: string;
  className?: string;
}

export default function SectionTitle({
  id,
  title,
  className,
}: SectionTitleProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let observer: IntersectionObserver | undefined;

    const reveal = () => heading.classList.add("is-in");
    const revealFrame = window.requestAnimationFrame(reveal);
    if (reducedMotion || !("IntersectionObserver" in window)) {
      reveal();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            observer?.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(heading);
    }

    let animationFrame = 0;
    const updateParallax = () => {
      animationFrame = 0;
      const rect = heading.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height)
        )
      );
      heading.style.setProperty("--title-progress", String(progress));
    };
    const scheduleParallaxUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    if (!reducedMotion) {
      window.addEventListener("scroll", scheduleParallaxUpdate, {
        passive: true,
      });
      window.addEventListener("resize", scheduleParallaxUpdate);
    }

    return () => {
      window.cancelAnimationFrame(revealFrame);
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleParallaxUpdate);
      window.removeEventListener("resize", scheduleParallaxUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <h2
      ref={headingRef}
      id={id}
      className={`section-title-animated${className ? ` ${className}` : ""}`}
      aria-label={title}
    >
      {Array.from(title).map((character, index) => (
        <span
          key={index}
          className="section-title-animated__letter"
          aria-hidden="true"
        >
          <span
            className="section-title-animated__glyph"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {character}
          </span>
        </span>
      ))}
    </h2>
  );
}
