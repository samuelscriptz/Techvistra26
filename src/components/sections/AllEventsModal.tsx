import { useState, useEffect, useId } from "react";
import { X, ArrowRight, Eye, Sparkles } from "lucide-react";
import type { EventTab } from "./EventSection";
import styles from "./AllEventsModal.module.css";

interface AllEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: EventTab[];
  onSelectEvent: (tabIndex: number, itemIndex: number) => void;
}

export default function AllEventsModal({
  isOpen,
  onClose,
  tabs,
  onSelectEvent,
}: AllEventsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const headingId = useId();

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flatten all items with category info
  const allEvents = tabs.flatMap((tab, tabIdx) =>
    tab.items.map((item, itemIdx) => ({
      ...item,
      tabIndex: tabIdx,
      itemIndex: itemIdx,
      categoryKey: tab.key,
      categoryLabel: tab.label,
      categoryShort: tab.short,
    }))
  );

  const displayedEvents =
    selectedCategory === "all"
      ? allEvents
      : allEvents.filter((e) => e.categoryKey === selectedCategory);

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <div className={styles.modal}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.badge}>
              <Sparkles size={13} aria-hidden="true" /> TechVistra &apos;26 Symposium
            </span>
            <h2 id={headingId} className={styles.title}>All Events Catalog</h2>
            <p className={styles.subtitle}>
              Browse all 18 events across Technical, Non-Technical, and Junior tracks.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close all events modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Category Filters Bar */}
        <div className={styles.filtersBar} role="tablist" aria-label="Filter events by category">
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === "all"}
            className={`${styles.filterBtn} ${selectedCategory === "all" ? styles.filterBtnActive : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Events ({allEvents.length})
          </button>
          {tabs.map((t) => {
            const count = allEvents.filter((e) => e.categoryKey === t.key).length;
            const active = selectedCategory === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.filterBtn} ${active ? styles.filterBtnActive : ""}`}
                onClick={() => setSelectedCategory(t.key)}
              >
                {t.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Scrollable Events Grid */}
        <div className={styles.content}>
          <div className={styles.grid}>
            {displayedEvents.map((evt) => (
              <article key={`${evt.categoryKey}-${evt.id}`} className={styles.card}>
                <div className={styles.posterWrap}>
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className={styles.posterImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardCategory}>{evt.categoryShort}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{evt.title}</h3>
                  <div className={styles.cardActions}>
                    <a href={evt.regUrl} className={styles.regBtn}>
                      <span>Register</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      className={styles.threeDBtn}
                      onClick={() => onSelectEvent(evt.tabIndex, evt.itemIndex)}
                      title="Experience this event card in the 3D rotating carousel"
                    >
                      <Eye size={13} aria-hidden="true" />
                      <span>3D View</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

