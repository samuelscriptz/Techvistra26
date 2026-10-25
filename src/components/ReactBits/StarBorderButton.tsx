import React from "react";
import "./StarBorderButton.css";

interface StarBorderButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: string;
  speed?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * StarBorderButton — Animated React Bits Component
 * Features traveling luminous starburst borders, liquid specular shimmer sweep, and spring hover bloom.
 */
export default function StarBorderButton({
  color = "#cdac68",
  speed = "5s",
  children,
  icon,
  className = "",
  ...props
}: StarBorderButtonProps) {
  return (
    <a className={`star-border-btn ${className}`} {...props}>
      <div
        className="star-border-glow star-border-glow-top"
        style={{
          background: `radial-gradient(circle, ${color} 0%, rgba(205, 172, 104, 0.4) 30%, transparent 70%)`,
          animationDuration: speed,
        }}
        aria-hidden="true"
      />
      <div
        className="star-border-glow star-border-glow-bottom"
        style={{
          background: `radial-gradient(circle, ${color} 0%, rgba(165, 160, 152, 0.4) 30%, transparent 70%)`,
          animationDuration: speed,
        }}
        aria-hidden="true"
      />
      <div className="star-border-inner">
        <span>{children}</span>
        {icon && <span className="star-border-icon">{icon}</span>}
      </div>
    </a>
  );
}
