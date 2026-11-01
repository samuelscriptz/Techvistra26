import { useEffect, useRef } from "react";
import "./SectionTitle.css";

interface SectionTitleProps {
  id: string;
  title: string;
  className?: string;
  variant?: "default" | "gold";
}

export default function SectionTitle({
  id,
  title,
  className,
  variant = "default",
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

  const lines = title.split("\n");

  return (
    <h2
      ref={headingRef}
      id={id}
      className={`section-title-animated${variant === "gold" ? " section-title-animated--gold" : ""}${className ? ` ${className}` : ""}`}
      aria-label={title.replace(/\n/g, " ")}
    >
      {lines.map((line, lineIndex) => {
        const offset = lines
          .slice(0, lineIndex)
          .reduce((sum, prev) => sum + prev.length, 0);

        return (
          <span
            key={lineIndex}
            className={lines.length > 1 ? "section-title-animated__line" : undefined}
          >
            {Array.from(line).map((character, charIndex) => (
              <span
                key={charIndex}
                className="section-title-animated__letter"
                aria-hidden="true"
              >
                <span
                  className="section-title-animated__glyph"
                  style={{ animationDelay: `${(offset + charIndex) * 60}ms` }}
                >
                  {character}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </h2>
  );
}
