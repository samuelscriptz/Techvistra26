import { useState, useEffect } from "react";
import styles from "./Countdown.module.css";

interface CountdownProps {
  targetDate?: string;
}

export default function Countdown({ targetDate = "2026-11-16T09:00:00" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isLive: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  if (timeLeft.isLive) {
    return (
      <div className={styles.countdownWrap}>
        <div className={styles.liveBadge}>
          <span className={styles.pulseDot} />
          <span>SYMPOSIUM IS LIVE NOW</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.countdownWrap} aria-label="Symposium Countdown">
      <div className={styles.tilesRow}>
        <div className={styles.tile}>
          <span className={styles.number}>{pad(timeLeft.days)}</span>
          <span className={styles.label}>Days</span>
        </div>

        <span className={styles.separator} aria-hidden="true">:</span>

        <div className={styles.tile}>
          <span className={styles.number}>{pad(timeLeft.hours)}</span>
          <span className={styles.label}>Hours</span>
        </div>

        <span className={styles.separator} aria-hidden="true">:</span>

        <div className={styles.tile}>
          <span className={styles.number}>{pad(timeLeft.minutes)}</span>
          <span className={styles.label}>Mins</span>
        </div>

        <span className={styles.separator} aria-hidden="true">:</span>

        <div className={styles.tile}>
          <span className={styles.number}>{pad(timeLeft.seconds)}</span>
          <span className={styles.label}>Secs</span>
        </div>
      </div>
    </div>
  );
}
